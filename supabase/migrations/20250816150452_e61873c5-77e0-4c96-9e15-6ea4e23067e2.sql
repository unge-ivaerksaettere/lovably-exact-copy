-- Ensure RLS is enabled (idempotent)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create DELETE policy for admins only if it doesn't already exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'profiles'
      AND policyname = 'Admins can delete any profile'
  ) THEN
    CREATE POLICY "Admins can delete any profile"
    ON public.profiles
    FOR DELETE
    USING (is_admin(auth.uid()));
  END IF;
END $$;