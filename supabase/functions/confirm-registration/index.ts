import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.55.0";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(
        `
        <!DOCTYPE html>
        <html lang="da">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Fejl - Unge Iværksættere</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; }
            .error { color: #dc3545; }
          </style>
        </head>
        <body>
          <h1>❌ Fejl</h1>
          <p class="error">Ugyldigt bekræftelseslink. Kontakt support hvis problemet fortsætter.</p>
        </body>
        </html>
        `,
        {
          status: 400,
          headers: { "Content-Type": "text/html", ...corsHeaders },
        }
      );
    }

    // Find the registration with this token
    const { data: registration, error: findError } = await supabase
      .from("event_registrations")
      .select(`
        *,
        events (
          title,
          event_date,
          event_time,
          location
        )
      `)
      .eq("confirmation_token", token)
      .is("confirmed_at", null)
      .single();

    if (findError || !registration) {
      console.error("Registration not found or already confirmed:", findError);
      return new Response(
        `
        <!DOCTYPE html>
        <html lang="da">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Tilmelding ikke fundet - Unge Iværksættere</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; }
            .warning { color: #ffc107; }
          </style>
        </head>
        <body>
          <h1>⚠️ Tilmelding ikke fundet</h1>
          <p class="warning">Denne tilmelding er allerede bekræftet eller linket er udløbet.</p>
          <a href="/" style="color: #10b981; text-decoration: none;">← Tilbage til hjemmesiden</a>
        </body>
        </html>
        `,
        {
          status: 404,
          headers: { "Content-Type": "text/html", ...corsHeaders },
        }
      );
    }

    // Confirm the registration
    const { error: updateError } = await supabase
      .from("event_registrations")
      .update({ 
        confirmed_at: new Date().toISOString(),
        confirmation_token: null // Clear the token after use
      })
      .eq("id", registration.id);

    if (updateError) {
      console.error("Error confirming registration:", updateError);
      throw new Error("Kunne ikke bekræfte tilmelding");
    }

    // If user subscribed to newsletter, add them to MailerLite (optional)
    if (registration.subscribe_newsletter) {
      try {
        await supabase.functions.invoke("mailerlite-subscribe", {
          body: {
            email: registration.email,
            name: [registration.first_name, registration.last_name].filter(Boolean).join(" ") || "Abonnent"
          }
        });
        console.log("Added to newsletter subscription");
      } catch (newsletterError) {
        console.error("Newsletter subscription failed:", newsletterError);
        // Don't fail the registration if newsletter signup fails
      }
    }

    const eventDetails = registration.events;
    const name = [registration.first_name, registration.last_name].filter(Boolean).join(" ") || "Deltager";
    
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("da-DK", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return new Response(
      `
      <!DOCTYPE html>
      <html lang="da">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Tilmelding bekræftet - Unge Iværksættere</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            line-height: 1.6; 
          }
          .success { 
            background: #d4edda; 
            border: 1px solid #c3e6cb; 
            padding: 20px; 
            border-radius: 8px; 
            text-align: center; 
          }
          .event-details { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border-left: 4px solid #10b981; 
          }
          .btn { 
            background: #10b981; 
            color: white; 
            padding: 12px 24px; 
            text-decoration: none; 
            border-radius: 6px; 
            display: inline-block; 
            margin: 10px; 
          }
          .calendar-link { 
            background: #007bff; 
          }
        </style>
      </head>
      <body>
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #10b981;">Unge Iværksættere</h1>
        </div>
        
        <div class="success">
          <h2>🎉 Tilmelding bekræftet!</h2>
          <p><strong>Hej ${name}!</strong></p>
          <p>Din tilmelding til <strong>${eventDetails.title}</strong> er nu bekræftet.</p>
        </div>
        
        <div class="event-details">
          <h3>📅 Event detaljer:</h3>
          <p><strong>Titel:</strong> ${eventDetails.title}</p>
          <p><strong>Dato:</strong> ${formatDate(eventDetails.event_date)}</p>
          ${eventDetails.event_time ? `<p><strong>Tidspunkt:</strong> ${eventDetails.event_time}</p>` : ''}
          ${eventDetails.location ? `<p><strong>Lokation:</strong> ${eventDetails.location}</p>` : ''}
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="/" class="btn">🏠 Tilbage til hjemmesiden</a>
          <a href="/events" class="btn">📅 Se alle events</a>
        </div>

        ${registration.subscribe_newsletter ? `
        <div style="background: #e3f2fd; border: 1px solid #90caf9; padding: 15px; border-radius: 8px; text-align: center;">
          <p>📧 Du vil også modtage vores nyhedsbrev med opdateringer om kommende events.</p>
        </div>
        ` : ''}
        
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d;">
          <p>Vi glæder os til at se dig til eventet! 🚀</p>
        </div>
      </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in confirm-registration function:", error);
    return new Response(
      `
      <!DOCTYPE html>
      <html lang="da">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fejl - Unge Iværksættere</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; padding: 50px; }
          .error { color: #dc3545; }
        </style>
      </head>
      <body>
        <h1>❌ Fejl</h1>
        <p class="error">Der opstod en fejl ved bekræftelse af tilmelding. Prøv igen eller kontakt support.</p>
        <a href="/" style="color: #10b981; text-decoration: none;">← Tilbage til hjemmesiden</a>
      </body>
      </html>
      `,
      {
        status: 500,
        headers: { "Content-Type": "text/html", ...corsHeaders },
      }
    );
  }
};

serve(handler);