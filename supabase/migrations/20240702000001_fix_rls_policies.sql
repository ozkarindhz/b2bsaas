-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
CREATE POLICY "Users can view their own data"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
CREATE POLICY "Users can insert their own data"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Allow public access to users table for auth purposes
DROP POLICY IF EXISTS "Public access to users" ON public.users;
CREATE POLICY "Public access to users"
  ON public.users
  FOR SELECT
  USING (true);

-- Allow public insert to users table for registration
DROP POLICY IF EXISTS "Public insert to users" ON public.users;
CREATE POLICY "Public insert to users"
  ON public.users
  FOR INSERT
  WITH CHECK (true);
