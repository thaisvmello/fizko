import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Download, Users, MessageCircle, Star } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

const PurchaseSection = () => {
  const products = [
    {
      title: "Acesso a Tabelas - Farmácia",
      price: "R$ 29.90",
      period: "/mês",
      description: "Acesso completo às tabelas de dados tributários para farmácias",
      features: ["Base NCM farmacêutica", "Filtros por regime", "Busca responsiva", "Atualizações automáticas"],
      icon: Database,
      popular: false,
      type: "subscription"
    },
    {
      title: "Planilhas Personalizadas",
      price: "R$ 49.90",
      period: "/download",
      description: "Planilhas customizadas conforme suas especificações",
      features: ["Formulário online", "Layout personalizado", "Múltiplas colunas", "Formato Excel"],
      icon: Download,
      popular: true,
      type: "oneoff"
    },
    {
      title: "Consultoria Fiscal",
      price: "R$ 150.00",
      period: "/hora",
      description: "Consultoria especializada com profissionais tributários",
      features: ["Análise personalizada", "Chat direto", "Relatório detalhado", "Suporte contínuo"],
      icon: Users,
      popular: false,
      type: "service"
    },
    {
      title: "Chatbot Premium",
      price: "R$ 49.90",
      period: "/mês",
      description: "Acesso ilimitado ao assistente fiscal IA",
      features: ["Consultas ilimitadas", "Base estruturada", "Por estado/setor", "Suporte 24/7"],
      icon: MessageCircle,
      popular: false,
      type: "subscription"
    }
  ];

  const handlePurchase = async (productTitle: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Você precisa fazer login para realizar uma compra.');
        return;
      }

      // Find product details
      const product = products.find(p => p.title === productTitle);
      if (!product) return;

      // Convert price string to number
      const priceMatch = product.price.match(/R\$ ([\d,]+\.?\d*)/);
      const priceAmount = priceMatch ? parseFloat(priceMatch[1].replace(',', '.')) : 0;

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          productType: product.type,
          priceAmount: priceAmount,
          productName: product.title,
        }
      });

      if (error) throw error;
      
      // Open Stripe checkout in new tab
      window.open(data.url, '_blank');
    } catch (error: any) {
      console.error('Purchase error:', error);
      alert('Erro ao iniciar compra. Tente novamente.');
    }
  };

  const handleConsultingForm = () => {
    console.log("Opening consulting form");
    alert("Abrindo formulário de consultoria personalizada");
  };

  return (
    <section id="purchase-section" className="py-20 bg-fisko-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Nossos Produtos & Serviços
          </h2>
          <p className="text-lg text-muted-foreground font-montserrat max-w-2xl mx-auto">
            Soluções fiscais completas para sua empresa. Escolha o plano que melhor 
            atende às suas necessidades tributárias.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative transition-all duration-300 hover:shadow-lg ${
                product.popular 
                  ? 'border-fisko-coral border-2 scale-105' 
                  : 'border-fisko-blue/20 hover:border-fisko-coral/50'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-fisko-coral text-white px-3 py-1 rounded-full text-xs font-montserrat font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Mais Popular
                  </span>
                </div>
              )}

              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-fisko-blue/10 flex items-center justify-center">
                  <product.icon className="w-8 h-8 text-fisko-blue" />
                </div>
                <CardTitle className="font-playfair text-lg leading-tight">
                  {product.title}
                </CardTitle>
                <div className="text-2xl font-playfair font-bold text-fisko-coral">
                  {product.price}
                  <span className="text-sm text-muted-foreground font-montserrat">
                    {product.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground font-montserrat text-sm mb-4 text-center">
                  {product.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 font-montserrat text-sm">
                      <div className="w-1.5 h-1.5 bg-fisko-coral rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat text-sm"
                  onClick={() => product.type === 'service' ? handleConsultingForm() : handlePurchase(product.title)}
                >
                  {product.type === 'service' ? 'Solicitar Orçamento' : 
                   product.type === 'subscription' ? 'Assinar' : 'Comprar'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sector-Specific Tables Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-playfair font-semibold text-center mb-8">
            Tabelas por Setor
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { sector: "Farmácia", items: "3.500+ produtos", price: "R$ 29.90/mês", productName: "Acesso a Tabelas - Farmácia" },
              { sector: "Hortifruti", items: "2.800+ produtos", price: "R$ 24.90/mês", productName: "Acesso a Tabelas - Hortifruti" },
              { sector: "Construção", items: "4.200+ produtos", price: "R$ 34.90/mês", productName: "Acesso a Tabelas - Construção" },
            ].map((sector, index) => (
              <Card key={index} className="text-center border-fisko-blue/20 hover:border-fisko-coral/50 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-playfair font-semibold text-lg mb-2">{sector.sector}</h4>
                  <p className="text-muted-foreground font-montserrat text-sm mb-3">{sector.items}</p>
                  <div className="text-xl font-playfair font-bold text-fisko-coral mb-4">{sector.price}</div>
                  <Button 
                    variant="outline" 
                    className="w-full border-fisko-blue text-fisko-blue hover:bg-fisko-blue hover:text-white font-montserrat text-sm"
                    onClick={() => handlePurchase(sector.productName)}
                  >
                    Acessar Tabela
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Tax Regime Filter Info */}
        <div className="bg-white rounded-lg p-6 text-center">
          <h3 className="font-playfair font-semibold text-lg mb-3">
            Filtros por Regime Tributário
          </h3>
          <p className="text-muted-foreground font-montserrat text-sm mb-4">
            Todas as tabelas podem ser filtradas por regime tributário específico
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Simples Nacional", "Lucro Presumido", "Lucro Real"].map((regime, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-fisko-blue/10 text-fisko-blue-dark rounded-full text-sm font-montserrat"
              >
                {regime}
              </span>
            ))}
          </div>
        </div>

        {/* Security & Payment Info */}
        <div className="mt-12 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground font-montserrat">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Pagamento seguro via Stripe
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Garantia de satisfação
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Acesso via Google
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSection;