import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const AdminSetup = () => {
  const [email, setEmail] = useState('thaisverissimomello@gmail.com');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const addAdminUser = async () => {
    if (!email) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('add-admin-user', {
        body: { email }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Sucesso!",
        description: `Email ${email} adicionado como admin com sucesso!`,
      });

      // Refresh the page to update admin status
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error: any) {
      console.error('Error adding admin:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao adicionar usuário admin",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addDirectly = async () => {
    setIsLoading(true);
    try {
      // Try to add directly to the admin_users table
      const { error } = await supabase
        .from('admin_users')
        .upsert({ email }, { onConflict: 'email' });

      if (error) {
        throw error;
      }

      toast({
        title: "Sucesso!",
        description: `Email ${email} adicionado como admin com sucesso!`,
      });

      // Refresh the page to update admin status
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    } catch (error: any) {
      console.error('Error adding admin directly:', error);
      toast({
        title: "Tentando método alternativo...",
        description: "Usando função serverless para adicionar admin",
      });
      
      // Fallback to function method
      await addAdminUser();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Configurar Admin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email do administrador"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Button 
            onClick={addDirectly}
            disabled={isLoading}
            className="w-full bg-fisko-coral hover:bg-fisko-coral/90"
          >
            {isLoading ? 'Adicionando...' : 'Adicionar como Admin'}
          </Button>
          
          <Button 
            onClick={addAdminUser}
            disabled={isLoading}
            variant="outline"
            className="w-full"
          >
            {isLoading ? 'Processando...' : 'Usar Função Supabase'}
          </Button>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          <p>Este componente pode ser removido após configurar o admin.</p>
          <p>Email padrão: thaisverissimomello@gmail.com</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
