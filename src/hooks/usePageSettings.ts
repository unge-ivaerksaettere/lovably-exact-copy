import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PageSetting {
  id: string;
  page_key: string;
  page_name: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const usePageSettings = () => {
  return useQuery({
    queryKey: ["pageSettings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_settings")
        .select("*")
        .order("page_name");

      if (error) throw error;
      return data as PageSetting[];
    },
  });
};

export const useUpdatePageVisibility = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_visible }: { id: string; is_visible: boolean }) => {
      const { data, error } = await supabase
        .from("page_settings")
        .update({ is_visible })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pageSettings"] });
      toast({
        title: "Siden opdateret",
        description: `${data.page_name} er nu ${data.is_visible ? "synlig" : "skjult"}`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Fejl",
        description: error.message || "Kunne ikke opdatere siden",
        variant: "destructive",
      });
    },
  });
};

export const useVisiblePages = () => {
  return useQuery({
    queryKey: ["visiblePages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_settings")
        .select("page_key, page_name")
        .eq("is_visible", true)
        .order("page_name");

      if (error) throw error;
      return data;
    },
  });
};