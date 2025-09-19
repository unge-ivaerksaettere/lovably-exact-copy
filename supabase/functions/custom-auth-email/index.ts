import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AuthEmailRequest {
  user: {
    email: string;
    id: string;
    raw_user_meta_data?: {
      first_name?: string;
      last_name?: string;
    };
  };
  email_data: {
    token: string;
    token_hash: string;
    redirect_to: string;
    email_action_type: string;
    site_url: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Received auth email request");
    
    const { user, email_data }: AuthEmailRequest = await req.json();
    console.log("Email action type:", email_data.email_action_type);
    console.log("User email:", user.email);

    const firstName = user.raw_user_meta_data?.first_name || '';
    const confirmationUrl = `${email_data.site_url}/auth/confirm?token_hash=${email_data.token_hash}&type=${email_data.email_action_type}&redirect_to=${encodeURIComponent(email_data.redirect_to)}`;

    let emailContent: string;
    let subject: string;

    if (email_data.email_action_type === 'signup') {
      subject = "Bekræft din konto hos Unge Iværksættere";
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #10b981; margin: 0;">Unge Iværksættere</h1>
            <p style="color: #666; margin: 5px 0;">Danmarks største startup community</p>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Velkommen${firstName ? `, ${firstName}` : ''}! 🎉</h2>
          
          <p style="margin-bottom: 20px; line-height: 1.6;">
            Tak for din tilmelding til Unge Iværksættere! Vi er glade for at have dig med i Danmarks største community for startup-entreprenører.
          </p>
          
          <p style="margin-bottom: 20px; line-height: 1.6;">
            For at bekræfte din konto og få adgang til alle vores events og ressourcer, skal du klikke på knappen nedenfor:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" style="display: inline-block; background-color: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Bekræft min konto
            </a>
          </div>
          
          <p style="margin-bottom: 20px; line-height: 1.6; color: #666; font-size: 14px;">
            Hvis knappen ikke virker, kan du kopiere og indsætte dette link i din browser:
            <br><a href="${confirmationUrl}" style="color: #10b981; word-break: break-all;">${confirmationUrl}</a>
          </p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
            <h3 style="color: #333; margin-bottom: 15px;">Hvad kan du forvente?</h3>
            <ul style="color: #666; line-height: 1.6;">
              <li>Adgang til eksklusive startup events</li>
              <li>Netværk med andre iværksættere</li>
              <li>Inspiration fra succesfulde entrepreneurs</li>
              <li>Gratis deltagelse i de fleste arrangementer</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 14px;">
            <p>Med venlig hilsen,<br><strong>Team Unge Iværksættere</strong></p>
            <p style="margin-top: 20px;">
              Følg os: 
              <a href="#" style="color: #10b981; text-decoration: none;">LinkedIn</a> | 
              <a href="#" style="color: #10b981; text-decoration: none;">Instagram</a> | 
              <a href="#" style="color: #10b981; text-decoration: none;">Podcast</a>
            </p>
          </div>
        </div>
      `;
    } else {
      // Default for other email types (password reset, etc.)
      subject = "Handling påkrævet - Unge Iværksættere";
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #10b981; margin: 0;">Unge Iværksættere</h1>
          </div>
          
          <h2 style="color: #333; margin-bottom: 20px;">Handling påkrævet</h2>
          
          <p style="margin-bottom: 20px; line-height: 1.6;">
            Klik på knappen nedenfor for at fortsætte:
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" style="display: inline-block; background-color: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Fortsæt
            </a>
          </div>
          
          <p style="margin-bottom: 20px; line-height: 1.6; color: #666; font-size: 14px;">
            Hvis knappen ikke virker, kan du kopiere og indsætte dette link i din browser:
            <br><a href="${confirmationUrl}" style="color: #10b981; word-break: break-all;">${confirmationUrl}</a>
          </p>
        </div>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Unge Iværksættere <no-reply@ungeivaerksaettere.dk>",
      to: [user.email],
      subject: subject,
      html: emailContent,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in custom-auth-email function:", error);
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