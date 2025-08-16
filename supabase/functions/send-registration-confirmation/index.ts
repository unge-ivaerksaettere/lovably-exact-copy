import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RegistrationConfirmationRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  eventTitle: string;
  eventDate: string;
  eventTime?: string;
  eventLocation?: string;
  confirmationToken: string;
  subscribeNewsletter: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      email,
      firstName,
      lastName,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      confirmationToken,
      subscribeNewsletter
    }: RegistrationConfirmationRequest = await req.json();

    const name = [firstName, lastName].filter(Boolean).join(" ") || "Deltager";
    const confirmUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/confirm-registration?token=${confirmationToken}`;
    
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("da-DK", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const emailResponse = await resend.emails.send({
      from: "Unge Iværksættere <no-reply@ungeivaerksaettere.dk>",
      to: [email],
      subject: `Bekræft din tilmelding til ${eventTitle}`,
      html: `
        <!DOCTYPE html>
        <html lang="da">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bekræft din tilmelding</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #10b981; margin-bottom: 10px;">Unge Iværksættere</h1>
            <h2 style="color: #333; font-weight: 600;">Bekræft din tilmelding</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
            <h3 style="color: #10b981; margin-top: 0;">Hej ${name}! 👋</h3>
            <p>Tak for din tilmelding til <strong>${eventTitle}</strong>!</p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
              <h4 style="margin-top: 0; color: #333;">Event detaljer:</h4>
              <p><strong>📅 Dato:</strong> ${formatDate(eventDate)}</p>
              ${eventTime ? `<p><strong>🕐 Tidspunkt:</strong> ${eventTime}</p>` : ''}
              ${eventLocation ? `<p><strong>📍 Lokation:</strong> ${eventLocation}</p>` : ''}
            </div>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmUrl}" 
               style="background: #10b981; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: 600; display: inline-block; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
              ✅ Bekræft min tilmelding
            </a>
          </div>
          
          <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>Vigtigt:</strong> Du skal bekræfte din tilmelding ved at klikke på knappen ovenfor for at sikre din plads til eventet.</p>
          </div>

          ${subscribeNewsletter ? `
          <div style="background: #e3f2fd; border: 1px solid #90caf9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #0d47a1;">📧 Du vil også modtage vores nyhedsbrev med opdateringer om kommende events og iværksætter-nyheder.</p>
          </div>
          ` : ''}
          
          <div style="border-top: 1px solid #e9ecef; padding-top: 20px; margin-top: 30px; text-align: center; color: #6c757d; font-size: 14px;">
            <p>Hvis du ikke har tilmeldt dig dette event, kan du ignorere denne email.</p>
            <p>
              <strong>Unge Iværksættere</strong><br>
              Støtter unge iværksættere i Danmark
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

    console.log("Confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-registration-confirmation function:", error);
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