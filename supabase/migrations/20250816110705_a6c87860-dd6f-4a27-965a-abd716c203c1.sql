-- Create invites table
CREATE TABLE public.invites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  invite_code TEXT NOT NULL UNIQUE,
  invited_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on invites
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Create policies for invites
CREATE POLICY "Admins can view all invites" 
ON public.invites 
FOR SELECT 
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can create invites" 
ON public.invites 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update invites" 
ON public.invites 
FOR UPDATE 
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create function to generate unique invite codes
CREATE OR REPLACE FUNCTION public.generate_invite_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN := TRUE;
BEGIN
  WHILE exists_check LOOP
    -- Generate 8-character code
    code := upper(substring(encode(gen_random_bytes(6), 'base64') from 1 for 8));
    -- Remove potentially confusing characters
    code := replace(replace(replace(replace(code, '0', 'A'), 'O', 'B'), 'I', 'C'), 'L', 'D');
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.invites WHERE invite_code = code) INTO exists_check;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Create function to validate invite
CREATE OR REPLACE FUNCTION public.validate_invite(email_input TEXT, code_input TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  invite_exists BOOLEAN := FALSE;
BEGIN
  -- Check if invite exists, is for this email, hasn't been used, and hasn't expired
  SELECT EXISTS(
    SELECT 1 FROM public.invites 
    WHERE email = lower(email_input) 
    AND invite_code = upper(code_input)
    AND used_at IS NULL 
    AND expires_at > now()
  ) INTO invite_exists;
  
  RETURN invite_exists;
END;
$$;

-- Create function to mark invite as used
CREATE OR REPLACE FUNCTION public.use_invite(email_input TEXT, code_input TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.invites 
  SET used_at = now() 
  WHERE email = lower(email_input) 
  AND invite_code = upper(code_input)
  AND used_at IS NULL;
  
  RETURN FOUND;
END;
$$;

-- Update the handle_new_user function to check for valid invite
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  invite_code_from_meta TEXT;
  user_count INTEGER;
BEGIN
  -- Get invite code from user metadata
  invite_code_from_meta := NEW.raw_user_meta_data ->> 'invite_code';
  
  -- Count existing users
  SELECT COUNT(*) FROM auth.users INTO user_count;
  
  -- If this isn't the first user, validate invite
  IF user_count > 1 THEN
    IF invite_code_from_meta IS NULL OR NOT public.validate_invite(NEW.email, invite_code_from_meta) THEN
      RAISE EXCEPTION 'Invalid or expired invite code';
    END IF;
    
    -- Mark invite as used
    PERFORM public.use_invite(NEW.email, invite_code_from_meta);
  END IF;
  
  -- Insert user profile
  INSERT INTO public.profiles (user_id, first_name, last_name)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  )
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Give first user admin role, others get user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    CASE 
      WHEN user_count = 1 THEN 'admin'::app_role
      ELSE 'user'::app_role
    END
  )
  ON CONFLICT (user_id, role) DO NOTHING;
  
  RETURN NEW;
END;
$$;