-- Fix the generate_invite_code function to use proper PostgreSQL functions
CREATE OR REPLACE FUNCTION public.generate_invite_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  code TEXT;
  exists_check BOOLEAN := TRUE;
BEGIN
  WHILE exists_check LOOP
    -- Generate 8-character code using gen_random_uuid() instead of gen_random_bytes
    code := upper(substring(replace(gen_random_uuid()::text, '-', '') from 1 for 8));
    -- Remove potentially confusing characters
    code := replace(replace(replace(replace(code, '0', 'A'), 'O', 'B'), 'I', 'C'), 'L', 'D');
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM public.invites WHERE invite_code = code) INTO exists_check;
  END LOOP;
  
  RETURN code;
END;
$$;

-- Update the invites table default for invite_code to use the fixed function
ALTER TABLE public.invites ALTER COLUMN invite_code SET DEFAULT public.generate_invite_code();

-- Ensure the invite_code column exists and has proper constraints
DO $$
BEGIN
  -- Check if the column needs to be updated
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'invites' 
    AND column_name = 'invite_code' 
    AND column_default LIKE '%generate_invite_code%'
  ) THEN
    -- Update the default
    ALTER TABLE public.invites ALTER COLUMN invite_code SET DEFAULT public.generate_invite_code();
  END IF;
END $$;