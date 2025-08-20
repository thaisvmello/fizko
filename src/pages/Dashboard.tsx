import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { 
  LayoutDashboard, 
  Settings, 
  Download, 
  MessageCircle, 
  FileText, 
  Shield,
  Calendar,
  TrendingUp,
  Users,
  Bell,
  Lock,
  Unlock,
  Crown,
  ChevronRight,
  Home,
  Grid3X3,
  BarChart3,
  Clock
} from 'lucide-react';

interface Subscription {
  id: string;
  user_id: string;
  product_type: string;
  subscription_status: string;
  subscription_tier: string;
  subscription_end: string;
}

interface DashboardWidget {
  id: string;
  title: string;
  content: string;
  type: 'stat' | 'chart' | 'table' | 'action';
  position: { x: number; y: number };
  size: { w: number; h: number };
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      // Allow Builder.io to access without auth check
      const demoUser = {
        id: 'demo-user',
        email: 'demo@example.com',
        user_metadata: { full_name: 'Usuário Demo' }
      };

      setUser(demoUser as any);
      
      // Set demo admin status for Builder
      setIsAdmin(true);

      // Set demo subscriptions for Builder
      setSubscriptions([
        {
          id: 'demo-sub-1',
          user_id: 'demo-user',
          product_type: 'tabelas',
          subscription_status: 'active',
          subscription_tier: 'Premium',
          subscription_end: '2024-12-31'
        }
      ]);
      setLoading(false);
    };

    getUser();
  }, [navigate]);

  const defaultWidgets: DashboardWidget[] = [
    {
      id: '1',
      title: 'Planos Ativos',
      content: 'active_plans',
      type: 'stat',
      position: { x: 0, y: 0 },
      size: { w: 2, h: 1 }
    },
    {
      id: '2',
      title: 'Consultas Realizadas',
      content: 'consultations',
      type: 'stat',
      position: { x: 2, y: 0 },
      size: { w: 2, h: 1 }
    },
    {
      id: '3',
      title: 'Ações Rápidas',
      content: 'quick_actions',
      type: 'action',
      position: { x: 0, y: 1 },
      size: { w: 4, h: 2 }
    },
    {
      id: '4',
      title: 'Tabelas Disponíveis',
      content: 'tables',
      type: 'table',
      position: { x: 0, y: 3 },
      size: { w: 4, h: 2 }
    }
  ];

  const quickActions = [
    { 
      icon: MessageCircle, 
      title: 'Assistente IA', 
      description: 'Fazer consulta fiscal',
      action: () => window.open('https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/30/16/20250730160400-G8B5OPNZ.json', '_blank')
    },
    { 
      icon: Download, 
      title: 'Baixar Planilha', 
      description: 'Planilha personalizada',
      action: () => toast({ title: "Em breve", description: "Funcionalidade sendo desenvolvida" })
    },
    { 
      icon: FileText, 
      title: 'Consultar NCM', 
      description: 'Buscar código NCM',
      action: () => navigate('/products')
    },
    { 
      icon: Settings, 
      title: 'Configurações', 
      description: 'Editar perfil',
      action: () => navigate('/profile')
    }
  ];

  const availableTables = [
    {
      name: 'Tabelas Tributárias - Farmácia',
      description: 'Produtos farmacêuticos e NCM',
      hasAccess: isAdmin || subscriptions.some(s => s.product_type === 'farmacia'),
      icon: Shield,
      count: '1.320 produtos'
    },
    {
      name: 'Tabelas Tributárias - Hortifrúti',
      description: 'Produtos hortifruti e CEST',
      hasAccess: isAdmin || subscriptions.some(s => s.product_type === 'hortfruit'),
      icon: Shield,
      count: '2.450 produtos'
    },
    {
      name: 'Planilha Simples Nacional',
      description: 'Cálculos tributários',
      hasAccess: isAdmin || subscriptions.some(s => s.subscription_tier === 'Premium'),
      icon: BarChart3,
      count: 'Ilimitado'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fizko-beige via-background to-fizko-beige/50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-fizko-light-gray/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4" style={{ backgroundColor: "#f3f3f4" }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="/lovable-uploads/050301e4-b562-4b42-aded-519ca1a67848.png" 
                alt="FIZK.O Logo" 
                className="h-10 w-auto"
              />
              <div>
                <h1 className="text-xl font-playfair font-bold text-fizko-blue">
                  Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Bem-vindo, {user?.user_metadata?.full_name || user?.email}
                  {isAdmin && (
                    <Badge variant="secondary" className="ml-2 bg-fizko-coral text-white">
                      <Crown className="w-3 h-3 mr-1" />
                      ADMIN
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/')}
                className="border-fizko-blue text-fizko-blue hover:bg-fizko-blue hover:text-white"
              >
                <Home className="w-4 h-4 mr-2" />
                Página Inicial
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast({ title: "Notificações", description: "Nenhuma notificação nova" })}
              >
                <Bell className="w-4 h-4" />
              </Button>
              
              <Avatar className="border-2 border-fizko-coral">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-fizko-coral text-white">
                  {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-fizko-coral to-fizko-coral/80 text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-montserrat">Planos Ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-playfair font-bold">
                {isAdmin ? '∞' : subscriptions.length}
              </div>
              <p className="text-sm opacity-90">
                {isAdmin ? 'Acesso Total (Admin)' : 'assinaturas ativas'}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-fizko-blue to-fizko-blue/80 text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-montserrat">Consultas IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-playfair font-bold">47</div>
              <p className="text-sm opacity-90">este mês</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-fizko-blue-dark to-fizko-blue text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-montserrat">Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-playfair font-bold">12</div>
              <p className="text-sm opacity-90">planilhas baixadas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-montserrat">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold">ATIVO</div>
              <p className="text-sm opacity-90">todos os serviços</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-white/60 backdrop-blur-sm border-fizko-light-gray/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-fizko-blue font-playfair">
              <Grid3X3 className="w-5 h-5" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-fizko-beige hover:border-fizko-coral transition-all duration-200"
                  onClick={action.action}
                >
                  <action.icon className="w-6 h-6 text-fizko-coral" />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Plans */}
        <Card className="mb-8 bg-white/60 backdrop-blur-sm border-fizko-light-gray/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-fizko-blue font-playfair">
              <TrendingUp className="w-5 h-5" />
              Seus Planos Ativos
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <div className="bg-gradient-to-r from-fizko-coral/10 to-fizko-blue/10 border border-fizko-coral/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="w-8 h-8 text-fizko-coral" />
                    <div>
                      <h3 className="font-playfair font-bold text-lg">Acesso Administrativo</h3>
                      <p className="text-muted-foreground">Acesso total a todas as funcionalidades</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-fizko-coral text-white">
                    ADMIN
                  </Badge>
                </div>
              </div>
            ) : subscriptions.length > 0 ? (
              <div className="space-y-4">
                {subscriptions.map((sub) => (
                  <div 
                    key={sub.id} 
                    className="border border-fizko-light-gray/50 rounded-lg p-4 bg-white/50"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{sub.product_type}</h3>
                        <p className="text-sm text-muted-foreground">
                          Plano: {sub.subscription_tier}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Válido até: {new Date(sub.subscription_end).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <Badge 
                        variant={sub.subscription_status === 'active' ? 'default' : 'secondary'}
                        className={sub.subscription_status === 'active' ? 'bg-green-500' : ''}
                      >
                        {sub.subscription_status === 'active' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Nenhum plano ativo</h3>
                <p className="text-muted-foreground mb-4">
                  Assine um plano para acessar as funcionalidades exclusivas
                </p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-fizko-coral hover:bg-fizko-coral/90"
                >
                  Ver Planos Disponíveis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Tables */}
        <Card className="bg-white/60 backdrop-blur-sm border-fizko-light-gray/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-fizko-blue font-playfair">
              <FileText className="w-5 h-5" />
              Tabelas e Recursos Dispon��veis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {availableTables.map((table, index) => (
                <Card 
                  key={index} 
                  className={`transition-all duration-200 cursor-pointer ${
                    table.hasAccess 
                      ? 'hover:shadow-lg hover:scale-105 bg-gradient-to-br from-white to-fizko-beige/30 border-fizko-coral/30' 
                      : 'opacity-60 bg-gray-50 border-gray-200'
                  }`}
                  onClick={() => {
                    if (table.hasAccess) {
                      navigate('/products');
                    } else {
                      toast({
                        title: "Acesso restrito",
                        description: "Assine um plano para acessar esta funcionalidade"
                      });
                    }
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <table.icon className={`w-6 h-6 ${table.hasAccess ? 'text-fizko-coral' : 'text-gray-400'}`} />
                      {table.hasAccess ? (
                        <Unlock className="w-4 h-4 text-green-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <CardTitle className="text-sm font-montserrat">{table.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-2">{table.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold">{table.count}</span>
                      {table.hasAccess && <ChevronRight className="w-4 h-4 text-fizko-coral" />}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
