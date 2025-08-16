-- Create audit_logs table for security monitoring
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_user_id UUID,
  target_user_email TEXT,
  old_value TEXT,
  new_value TEXT,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs" 
ON public.audit_logs 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  action_type TEXT,
  target_user_id UUID DEFAULT NULL,
  target_user_email TEXT DEFAULT NULL,
  old_val TEXT DEFAULT NULL,
  new_val TEXT DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    target_user_id,
    target_user_email,
    old_value,
    new_value
  ) VALUES (
    auth.uid(),
    action_type,
    target_user_id,
    target_user_email,
    old_val,
    new_val
  );
END;
$$;