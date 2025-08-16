import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AdminUser {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  role: string;
  created_at: string | null;
}

export const useAdminUsers = () => {
  return useQuery({
    queryKey: ['adminUsers'],
    queryFn: async (): Promise<AdminUser[]> => {
      // Get current user and their role
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get current user's role to verify admin access
      const { data: currentUserRole } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (currentUserRole?.role !== 'admin') {
        // If not admin, return only current user data
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        return [{
          id: user.id,
          email: user.email || '',
          first_name: profile?.first_name || null,
          last_name: profile?.last_name || null,
          role: currentUserRole?.role || 'user',
          created_at: user.created_at,
        }];
      }

      // Admin can see all users - get all profiles and their roles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');
      
      if (profilesError) throw profilesError;

      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) throw rolesError;

      // For admin users, try to get all auth users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        // Fallback: return profiles with available data
        return profiles?.map(profile => {
          const role = userRoles?.find(r => r.user_id === profile.user_id)?.role || 'user';
          return {
            id: profile.user_id,
            email: 'email@example.com', // Placeholder since we can't get auth data
            first_name: profile.first_name,
            last_name: profile.last_name,
            role: role,
            created_at: profile.created_at,
          };
        }) || [];
      }

      // Combine auth user data with profiles and roles
      const users: AdminUser[] = authUsers.users.map(authUser => {
        const profile = profiles?.find(p => p.user_id === authUser.id);
        const role = userRoles?.find(r => r.user_id === authUser.id)?.role || 'user';
        
        return {
          id: authUser.id,
          email: authUser.email || '',
          first_name: profile?.first_name || null,
          last_name: profile?.last_name || null,
          role: role,
          created_at: authUser.created_at,
        };
      });

      return users;
    },
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      // First, remove existing role
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);
      
      if (deleteError) throw deleteError;

      // Then add new role
      const { data, error } = await supabase
        .from('user_roles')
        .insert([{ user_id: userId, role: role as any }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminUsers'] });
      queryClient.invalidateQueries({ queryKey: ['userRole'] });
    },
  });
};