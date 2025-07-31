-- Adicionar novos campos à tabela profiles para dados completos do usuário
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS cep TEXT,
ADD COLUMN IF NOT EXISTS street TEXT,
ADD COLUMN IF NOT EXISTS neighborhood TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS cpf TEXT;

-- Atualizar a função handle_new_user para incluir os novos campos
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (
    user_id, 
    email, 
    full_name,
    cep,
    street,
    neighborhood,
    city,
    state,
    cpf
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Usuário'),
    NEW.raw_user_meta_data->>'cep',
    NEW.raw_user_meta_data->>'street',
    NEW.raw_user_meta_data->>'neighborhood',
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'state',
    NEW.raw_user_meta_data->>'cpf'
  );
  RETURN NEW;
END;
$$;