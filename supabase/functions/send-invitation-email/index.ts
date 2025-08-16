import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface InvitationEmailRequest {
  email: string;
  inviteCode: string;
  inviterName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, inviteCode, inviterName }: InvitationEmailRequest = await req.json();

    const signupUrl = `https://lovably-exact-copy.lovable.app/?invite=${inviteCode}&email=${encodeURIComponent(email)}`;

    const emailResponse = await resend.emails.send({
      from: "Unge Iværksættere <no-reply@ungeivaerksaettere.dk>",
      to: [email],
      subject: "Du er inviteret til Unge Iværksættere admin panel",
      html: `
        <!DOCTYPE html>
        <html lang="da">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invitation til Unge Iværksættere</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #10b981; margin-bottom: 10px;">Unge Iværksættere</h1>
            <h2 style="color: #333; font-weight: 600;">Du er inviteret! 🎉</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h3 style="color: #10b981; margin-top: 0;">Velkommen til teamet!</h3>
            <p>Du er blevet inviteret til at få adgang til <strong>Unge Iværksættere</strong> admin panelet.</p>
            ${inviterName ? `<p>Invitationen er sendt af <strong>${inviterName}</strong>.</p>` : ''}
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
              <h4 style="margin-top: 0; color: #333;">Din invitationskode:</h4>
              <div style="font-family: 'Courier New', monospace; font-size: 20px; font-weight: bold; color: #10b981; background: #f1f5f9; padding: 12px; border-radius: 6px; text-align: center; letter-spacing: 2px;">
                ${inviteCode}
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${signupUrl}" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
              🚀 Opret min konto
            </a>
          </div>
          
          <div style="background: #e3f2fd; border: 1px solid #90caf9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #0d47a1;">Sådan kommer du i gang:</h4>
            <ol style="color: #0d47a1; margin: 0; padding-left: 20px;">
              <li>Klik på "Opret min konto" knappen ovenfor</li>
              <li>Udfyld registreringsformen med din information</li>
              <li>Brug invitationskoden: <strong>${inviteCode}</strong></li>
              <li>Når din konto er oprettet, får du adgang til admin panelet</li>
            </ol>
          </div>

          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>Vigtigt:</strong> Denne invitation udløber om 7 dage. Hvis du ikke opretter din konto inden da, skal du bede om en ny invitation.</p>
          </div>
          
          <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px; text-align: center; color: #6c757d; font-size: 14px;">
            <p>Hvis du ikke forventede denne invitation, kan du ignorere denne email.</p>
            <p>
              <strong>Unge Iværksættere</strong><br>
              Danmarks community for startup-entreprenører
            </p>
            <div style="margin-top: 15px;">
              <a href="#" style="color: #10b981; text-decoration: none; margin: 0 10px;">🌐 Website</a>
              <a href="#" style="color: #10b981; text-decoration: none; margin: 0 10px;">📱 LinkedIn</a>
              <a href="#" style="color: #10b981; text-decoration: none; margin: 0 10px;">📧 Instagram</a>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Invitation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-invitation-email function:", error);
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