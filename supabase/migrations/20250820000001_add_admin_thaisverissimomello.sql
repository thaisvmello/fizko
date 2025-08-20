-- Add thaisverissimomello@gmail.com as admin user
INSERT INTO public.admin_users (email) 
VALUES ('thaisverissimomello@gmail.com') 
ON CONFLICT (email) DO NOTHING;

-- Also ensure the existing admin email is correct if needed
INSERT INTO public.admin_users (email) 
VALUES ('thaisverissimo@gmail.com') 
ON CONFLICT (email) DO NOTHING;
