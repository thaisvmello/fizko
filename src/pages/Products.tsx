import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Package, CheckCircle, XCircle } from "lucide-react";
import ProductChatbot from "@/components/ProductChatbot";

const Products = () => {
  const [user, setUser] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/auth');
      return;
    }

    setUser(session.user);
    await fetchSubscriptions(session.user.id);
    setLoading(false);
  };

  const fetchSubscriptions = async (userId: string) => {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (data) {
      setSubscriptions(data);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'canceled':
        return 'Cancelado';
      case 'past_due':
        return 'Em Atraso';
      case 'inactive':
        return 'Inativo';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fisko-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-fisko-coral mx-auto"></div>
          <p className="mt-4 text-fisko-blue-dark">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fisko-beige pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-fisko-blue-dark hover:text-fisko-coral"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="text-center mb-8">
            <div className="mx-auto bg-fisko-coral/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-fisko-coral" />
            </div>
            <h1 className="text-3xl font-bold font-montserrat text-fisko-blue-dark mb-2">
              Meus Produtos
            </h1>
            <p className="text-fisko-blue/70">
              Gerencie suas assinaturas e produtos adquiridos
            </p>
          </div>

          {subscriptions.length === 0 ? (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="text-center py-12">
                <Package className="h-16 w-16 text-fisko-blue/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-fisko-blue-dark mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-fisko-blue/70 mb-6">
                  Você ainda não possui nenhuma assinatura ativa.
                </p>
                <Button
                  onClick={() => navigate('/#purchase')}
                  className="bg-fisko-coral hover:bg-fisko-coral/90 text-white"
                >
                  Explorar Produtos
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-montserrat text-fisko-blue-dark">
                          {subscription.product_type === 'premium' ? 'Acesso Premium' : 
                           subscription.product_type === 'basic' ? 'Acesso Básico' : subscription.product_type}
                        </CardTitle>
                        <CardDescription>
                          {subscription.subscription_tier && (
                            <span className="text-sm text-fisko-blue/70">
                              Plano: {subscription.subscription_tier}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(subscription.subscription_status)}>
                        {subscription.subscription_status === 'active' ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <XCircle className="w-3 h-3 mr-1" />
                        )}
                        {getStatusText(subscription.subscription_status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-fisko-blue-dark">Data de criação:</span>
                        <p className="text-fisko-blue/70">
                          {new Date(subscription.created_at).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      {subscription.subscription_end && (
                        <div>
                          <span className="font-medium text-fisko-blue-dark">Vencimento:</span>
                          <p className="text-fisko-blue/70">
                            {new Date(subscription.subscription_end).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      )}
                      {subscription.stripe_subscription_id && (
                        <div>
                          <span className="font-medium text-fisko-blue-dark">ID da Assinatura:</span>
                          <p className="text-fisko-blue/70 font-mono text-xs">
                            {subscription.stripe_subscription_id}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {subscription.subscription_status === 'active' && (
                      <div className="mt-4 pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/#assistance', '_blank')}
                          className="mr-2"
                        >
                          Usar Chatbot
                        </Button>
                        {subscription.stripe_customer_id && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={async () => {
                              // Implementar portal do cliente Stripe
                              const response = await supabase.functions.invoke('customer-portal');
                              if (response.data?.url) {
                                window.open(response.data.url, '_blank');
                              }
                            }}
                          >
                            Gerenciar Assinatura
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Products;