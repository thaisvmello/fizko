-- Create table access control for produtos_hortfruit
ALTER TABLE public.table_access ADD COLUMN IF NOT EXISTS stripe_product_id TEXT;

-- Insert access control for hortifruti product
INSERT INTO public.table_access (table_type, stripe_product_id) 
VALUES ('produtos_hortfruit', 'prod_SmClFA0KKsWJjp')
ON CONFLICT DO NOTHING;