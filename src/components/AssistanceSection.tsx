
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Zap, Crown, Users } from "lucide-react";
import BotpressChatbot from "@/components/BotpressChatbot";

const AssistanceSection = () => {
  const plans = [
    {
      name: "Teste Gratuito",
      icon: Users,
      price: "R$ 0",
      period: "/mês",
      description: "Experimente nosso assistente IA com consultas limitadas",
      features: [
        "10 perguntas por mês",
        "Busca básica de NCM",
        "Informações fiscais gerais",
        "Suporte por email"
      ],
      buttonText: "Testar Agora - Grátis",
      buttonStyle: "outline"
    },
    {
      name: "Premium",
      icon: Crown,
      price: "R$ 49.90",
      period: "/mês",
      description: "Acesso ilimitado ao nosso assistente fiscal IA",
      features: [
        "Consultas ilimitadas",
        "Busca avançada NCM & CFOP",
        "Cálculos tributários",
        "Suporte prioritário",
        "Recomendações personalizadas",
        "Exportar conversas"
      ],
      buttonText: "Assinar Agora",
      buttonStyle: "default",
      popular: true
    }
  ];


  const handleSubscribe = (planName: string) => {
    console.log(`Subscribing to: ${planName}`);
    alert(`Redirecting to subscription for ${planName} plan`);
  };

  return (
    <section id="assistance" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Assistente Fiscal com IA
          </h2>
          <p className="text-lg text-muted-foreground font-montserrat max-w-2xl mx-auto">
            Obtenha respostas instantâneas para suas dúvidas fiscais com nosso chatbot inteligente. 
            De classificações NCM a regulamentações tributárias, estamos aqui 24/7.
          </p>
        </div>

        {/* Chat Demo Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-fisko-blue/20">
            <CardHeader className="text-center">
              <CardTitle className="font-playfair text-2xl flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6 text-fisko-coral" />
                Teste Nosso Assistente IA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-fisko-beige/30 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  {/* Sample conversation */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-fisko-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-md">
                      <p className="font-montserrat text-sm">
                        Olá! Sou o Assistente FISK.O. Como posso ajudar com suas questões fiscais hoje?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-fisko-coral text-white rounded-lg p-3 shadow-sm max-w-md">
                      <p className="font-montserrat text-sm">
                        Qual o código NCM para produtos farmacêuticos?
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">Você</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-fisko-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-md">
                      <p className="font-montserrat text-sm">
                        Produtos farmacêuticos geralmente estão no capítulo 30 do NCM. Por exemplo:
                        <br />• 3004.90.19 - Comprimidos de Paracetamol
                        <br />• 3004.90.29 - Antibióticos
                        <br />• 3006.30.00 - Bandagens
                        <br /><br />
                        Gostaria de informações específicas sobre algum medicamento?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <BotpressChatbot />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${
                plan.popular 
                  ? 'border-fisko-coral border-2 scale-105' 
                  : 'border-fisko-blue/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-fisko-coral text-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-fisko-blue/10 flex items-center justify-center">
                  <plan.icon className="w-8 h-8 text-fisko-blue" />
                </div>
                <CardTitle className="font-playfair text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-playfair font-bold text-fisko-coral">
                  {plan.price}
                  <span className="text-sm text-muted-foreground font-montserrat">
                    {plan.period}
                  </span>
                </div>
                <p className="text-muted-foreground font-montserrat text-sm">
                  {plan.description}
                </p>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 font-montserrat text-sm">
                      <div className="w-2 h-2 bg-fisko-coral rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.name === "Teste Gratuito" ? (
                  <BotpressChatbot />
                ) : (
                  <Button 
                    className="w-full bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat"
                    onClick={() => handleSubscribe(plan.name)}
                  >
                    {plan.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssistanceSection;
