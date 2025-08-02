import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[BOTPRESS-CHAT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { message, conversationId, userId } = await req.json();
    logStep("Request received", { message, conversationId, userId });

    const botpressApiKey = 'bp_bak_BnR9c9W1JQU_019fgHs_6t-QE6uQgWvTrtgy';
    
    // Create or continue conversation
    const botpressResponse = await fetch('https://api.botpress.cloud/v1/chat/conversations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${botpressApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversationId: conversationId || undefined,
        message: {
          type: 'text',
          text: message,
        },
        userId: userId || 'anonymous',
      }),
    });

    if (!botpressResponse.ok) {
      const errorText = await botpressResponse.text();
      logStep("Botpress API error", { status: botpressResponse.status, error: errorText });
      throw new Error(`Botpress API error: ${botpressResponse.status} - ${errorText}`);
    }

    const data = await botpressResponse.json();
    logStep("Botpress response received", data);

    return new Response(JSON.stringify({
      response: data.message?.text || data.messages?.[0]?.text || "Desculpe, não consegui processar sua mensagem.",
      conversationId: data.conversationId,
      success: true
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    logStep("ERROR in botpress-chat", { message: error.message });
    return new Response(JSON.stringify({ 
      error: error.message,
      response: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
      success: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});