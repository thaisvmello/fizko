import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SupportEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: SupportEmailRequest = await req.json();

    // Send email to support
    const emailResponse = await resend.emails.send({
      from: "FIZK.O Suporte <onboarding@resend.dev>",
      to: ["contato@fizko.com.br"],
      subject: `[SUPORTE] ${subject}`,
      html: `
        <h2>Nova mensagem de suporte</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <h3>Mensagem:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <small>Enviado através do formulário de contato do site FIZK.O</small>
      `,
      reply_to: email,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "FIZK.O <onboarding@resend.dev>",
      to: [email],
      subject: "Mensagem recebida - FIZK.O",
      html: `
        <h1>Obrigado pelo contato, ${name}!</h1>
        <p>Recebemos sua mensagem e nossa equipe entrará em contato em breve.</p>
        <p><strong>Resumo da sua mensagem:</strong></p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong> ${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p>Atenciosamente,<br>
        Equipe FIZK.O<br>
        contato@fizko.com.br<br>
        WhatsApp: +55 21 96457-9471</p>
      `,
    });

    console.log("Support email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-support-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);