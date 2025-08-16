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
        console.error("Failed to send confirmation email:", emailError);
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

export const useEventRegistrations = (eventId: string) => {
  return useQuery({
    queryKey: ['event-registrations', eventId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_registrations")
        .select("*")
        .eq("event_id", eventId)
        .not("confirmed_at", "is", null);

      if (error) throw error;
      return data;
    },
  });
};