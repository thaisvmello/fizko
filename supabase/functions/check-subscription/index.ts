import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

// Helper function to check if user has access to hortifruti product
const checkHortifruitAccess = async (subscriptions: any[], paymentIntents: any[], stripe: any) => {
  const hortifruitProductId = "prod_SmClFA0KKsWJjp";
  
  // Check active subscriptions for hortifruti product
  for (const subscription of subscriptions) {
    for (const item of subscription.items.data) {
      const price = await stripe.prices.retrieve(item.price.id);
      if (price.product === hortifruitProductId) {
        return true;
      }
    }
  }
  
  // Check completed one-time payments for hortifruti product
  for (const paymentIntent of paymentIntents) {
    if (paymentIntent.status === 'succeeded' && paymentIntent.metadata?.product_id === hortifruitProductId) {
      return true;
    }
  }
  
  return false;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    logStep("Function started");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { 
      apiVersion: "2023-10-16" 
    });

    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found");
      await supabaseClient.from("subscriptions").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: null,
        subscription_status: "inactive",
        product_type: "none",
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email,product_type' });
      
      return new Response(JSON.stringify({ subscriptions: [], hortifruti_access: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Check subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
    });

    // Check payment history for one-time purchases
    const paymentIntents = await stripe.paymentIntents.list({
      customer: customerId,
      limit: 100,
    });

    const activeSubscriptions = [];
    const purchases = [];
    
    // Check hortifruti access
    const hasHortifruitAccess = await checkHortifruitAccess(subscriptions.data, paymentIntents.data, stripe);

    // Process subscriptions
    for (const sub of subscriptions.data) {
      const price = sub.items.data[0].price;
      const amount = price.unit_amount || 0;
      const subscriptionEnd = new Date(sub.current_period_end * 1000).toISOString();
      
      let tier = "Basic";
      if (amount > 2000) tier = "Premium";
      if (amount > 5000) tier = "Enterprise";

      activeSubscriptions.push({
        type: "subscription",
        tier,
        status: "active",
        end_date: subscriptionEnd,
      });

      await supabaseClient.from("subscriptions").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: customerId,
        stripe_subscription_id: sub.id,
        subscription_status: "active",
        subscription_tier: tier,
        subscription_end: subscriptionEnd,
        product_type: "subscription",
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email,product_type' });
    }

    // Process one-time purchases
    for (const payment of paymentIntents.data) {
      if (payment.status === "succeeded") {
        purchases.push({
          type: "purchase",
          amount: payment.amount,
          currency: payment.currency,
          created: new Date(payment.created * 1000).toISOString(),
        });
      }
    }

    // Update table access for hortifruti
    if (hasHortifruitAccess) {
      await supabaseClient.from("table_access").upsert({
        user_id: user.id,
        table_type: "produtos_hortfruit",
        stripe_product_id: "prod_SmClFA0KKsWJjp",
        access_granted: true,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,table_type' });
    }

    logStep("Updated database with subscription info", { 
      activeSubscriptions: activeSubscriptions.length,
      purchases: purchases.length,
      hasHortifruitAccess 
    });

    return new Response(JSON.stringify({
      subscriptions: activeSubscriptions,
      purchases: purchases,
      hortifruti_access: hasHortifruitAccess,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});