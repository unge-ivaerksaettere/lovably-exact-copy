-- Fix search path for log_admin_action function
CREATE OR REPLACE FUNCTION public.log_admin_action(
  action_type TEXT,
  target_user_id UUID DEFAULT NULL,
  target_user_email TEXT DEFAULT NULL,
  old_val TEXT DEFAULT NULL,
  new_val TEXT DEFAULT NULL
) RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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