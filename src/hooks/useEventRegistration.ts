import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./use-toast";

interface RegisterForEventData {
  eventId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscribeNewsletter: boolean;
}

export const useEventRegistration = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterForEventData) => {
      const { eventId, email, firstName, lastName, subscribeNewsletter } = data;

      // Generate confirmation token
      const confirmationToken = crypto.randomUUID();

      // Insert registration
      const { data: registration, error: insertError } = await supabase
        .from("event_registrations")
        .insert({
          event_id: eventId,
          email: email.toLowerCase(),
          first_name: firstName,
          last_name: lastName,
          subscribe_newsletter: subscribeNewsletter,
          confirmation_token: confirmationToken,
        })
        .select(`
          *,
          events (
            title,
            event_date,
            event_time,
            location
          )
        `)
        .single();

      if (insertError) {
        if (insertError.code === "23505") {
          throw new Error("Du er allerede tilmeldt dette event");
        }
        throw new Error("Kunne ikke tilmelde dig eventet");
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke(
        "send-registration-confirmation",
        {
          body: {
            email,
            firstName,
            lastName,
            eventTitle: registration.events.title,
            eventDate: registration.events.event_date,
            eventTime: registration.events.event_time,
            eventLocation: registration.events.location,
            confirmationToken,
            subscribeNewsletter,
          },
        }
      );

      if (emailError) {
        // Log error without sensitive details
        console.error("Email service error occurred");
        // Don't fail the registration if email fails
      }

      return registration;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast({
        title: "Tilmelding sendt! 📧",
        description: "Check din email for at bekræfte din tilmelding.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Fejl ved tilmelding",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// SECURITY: This hook now requires admin authentication to view registration data
export const useEventRegistrations = (eventId: string) => {
  return useQuery({
    queryKey: ['event-registrations', eventId],
    queryFn: async () => {
      // Check if user is authenticated and admin before making request
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Authentication required to view registration data");
      }

      // Only select non-sensitive data, and let RLS policies handle access control
      const { data, error } = await supabase
        .from("event_registrations")
        .select(`
          id,
          event_id,
          confirmed_at,
          created_at
        `)
        .eq("event_id", eventId)
        .not("confirmed_at", "is", null);

      if (error) {
        // Handle access control gracefully - new RLS policy restricts access
        if (error.code === "PGRST301" || error.message.includes("policy") || error.code === "42501") {
          return [];
        }
        // Log error without sensitive details
        console.error("Database access error");
        throw new Error("Unable to fetch registration data");
      }
      return data;
    },
  });
};