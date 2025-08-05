-- Create admin users table
CREATE TABLE public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Policy to allow reading admin status
CREATE POLICY "Anyone can check admin status" ON public.admin_users
  FOR SELECT
  USING (true);

-- Policy for service role to manage admins
CREATE POLICY "Service can manage admins" ON public.admin_users
  FOR ALL
  USING (true);

-- Insert the admin user
INSERT INTO public.admin_users (email) VALUES ('thaisverissimo@gmail.com');

-- Create user_dashboard_layout table for customizable dashboard
CREATE TABLE public.user_dashboard_layout (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  layout_data JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_dashboard_layout ENABLE ROW LEVEL SECURITY;

-- Policies for dashboard layout
CREATE POLICY "Users can manage their own layout" ON public.user_dashboard_layout
  FOR ALL
  USING (user_id = auth.uid());

-- Add trigger for updated_at
CREATE TRIGGER update_user_dashboard_layout_updated_at
  BEFORE UPDATE ON public.user_dashboard_layout
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();