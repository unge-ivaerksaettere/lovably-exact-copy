import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_date: string;
  event_time: string | null;
  location: string | null;
  max_attendees: number | null;
  current_attendees: number;
  image_url: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
  status: 'upcoming' | 'past';
}

export const useEvents = (status: 'upcoming' | 'past' | 'all' = 'all') => {
  return useQuery({
    queryKey: ['events', status],
    queryFn: async (): Promise<Event[]> => {
      const { data, error } = await supabase.rpc('get_events_by_status', {
        event_status: status
      });
      
      if (error) throw error;
      return (data || []).map((event: any) => ({
        ...event,
        status: event.status as 'upcoming' | 'past'
      }));
    },
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at' | 'status' | 'current_attendees'>) => {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
};

export const useUserRole = () => {
  return useQuery({
    queryKey: ['userRole'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();
      
      if (error) return null;
      return data?.role;
    },
  });
};