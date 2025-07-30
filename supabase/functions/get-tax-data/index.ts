import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[GET-TAX-DATA] ${step}${detailsStr}`);
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

    const { query, tableType = "ncm" } = await req.json();
    
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check if user has access to this table type
    const { data: accessData } = await supabaseClient
      .from("table_access")
      .select("access_granted")
      .eq("user_id", user.id)
      .eq("table_type", tableType)
      .single();

    if (!accessData?.access_granted) {
      return new Response(JSON.stringify({ 
        error: "Access denied", 
        message: "You need to purchase access to this table type" 
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 403,
      });
    }

    // Get data from Airtable
    const airtableApiKey = Deno.env.get("AIRTABLE_API_KEY");
    const airtableBaseId = Deno.env.get("AIRTABLE_BASE_ID");
    
    if (!airtableApiKey || !airtableBaseId) {
      throw new Error("Airtable configuration missing");
    }

    const tableName = tableType === "ncm" ? "NCM" : "CFOP";
    const searchField = tableType === "ncm" ? "Codigo" : "Codigo";
    
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/${tableName}`;
    const filterFormula = query ? `SEARCH("${query}", {${searchField}})` : "";
    
    const response = await fetch(`${airtableUrl}?filterByFormula=${encodeURIComponent(filterFormula)}&maxRecords=10`, {
      headers: {
        "Authorization": `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const data = await response.json();
    logStep("Retrieved data from Airtable", { recordCount: data.records?.length || 0 });

    const results = data.records?.map((record: any) => ({
      id: record.id,
      codigo: record.fields.Codigo,
      descricao: record.fields.Descricao || record.fields.Descrição,
      aliquota: record.fields.Aliquota || record.fields["Alíquota"],
      observacoes: record.fields.Observacoes || record.fields.Observações,
    })) || [];

    return new Response(JSON.stringify({ results }), {
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