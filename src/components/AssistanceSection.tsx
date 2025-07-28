
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Zap, Crown, Users } from "lucide-react";

const AssistanceSection = () => {
  const plans = [
    {
      name: "Free Trial",
      icon: Users,
      price: "R$ 0",
      period: "/month",
      description: "Try our AI assistant with limited queries",
      features: [
        "3 queries per month",
        "Basic NCM search",
        "General tax information",
        "Email support"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "outline"
    },
    {
      name: "Premium",
      icon: Crown,
      price: "R$ 29.90",
      period: "/month",
      description: "Unlimited access to our AI fiscal assistant",
      features: [
        "Unlimited queries",
        "Advanced NCM & CFOP search",
        "Tax calculations",
        "Priority support",
        "Custom recommendations",
        "Export conversations"
      ],
      buttonText: "Subscribe Now",
      buttonStyle: "default",
      popular: true
    }
  ];

  const handleChatbotTest = () => {
    console.log("Opening chatbot test");
    alert("Chatbot test would open here - this will be integrated with the AI chatbot service");
  };

  const handleSubscribe = (planName: string) => {
    console.log(`Subscribing to: ${planName}`);
    alert(`Redirecting to subscription for ${planName} plan`);
  };

  return (
    <section id="assistance" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            AI-Powered Fiscal Assistance
          </h2>
          <p className="text-lg text-muted-foreground font-montserrat max-w-2xl mx-auto">
            Get instant answers to your fiscal questions with our intelligent chatbot. 
            From NCM classifications to tax regulations, we've got you covered 24/7.
          </p>
        </div>

        {/* Chat Demo Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="border-fizko-blue/20">
            <CardHeader className="text-center">
              <CardTitle className="font-playfair text-2xl flex items-center justify-center gap-2">
                <MessageCircle className="w-6 h-6 text-fizko-coral" />
                Try Our AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-fizko-beige/30 rounded-lg p-6 mb-6">
                <div className="space-y-4">
                  {/* Sample conversation */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-fizko-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-md">
                      <p className="font-montserrat text-sm">
                        Hello! I'm FIZK.O Assistant. What fiscal question can I help you with today?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end">
                    <div className="bg-fizko-coral text-white rounded-lg p-3 shadow-sm max-w-md">
                      <p className="font-montserrat text-sm">
                        What's the NCM code for pharmaceutical products?
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">You</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-fizko-blue rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white rounded-lg p-3 shadow-sm max-w-md">
                      <p className="font-montserrat text-sm">
                        Pharmaceutical products typically fall under NCM chapter 30. For example:
                        <br />• 3004.90.19 - Paracetamol tablets
                        <br />• 3004.90.29 - Antibiotics
                        <br />• 3006.30.00 - Bandages
                        <br /><br />
                        Would you like specific information about any particular medication?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={handleChatbotTest}
                  className="bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat px-8"
                >
                  Test Now - Free
                </Button>
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
                  ? 'border-fizko-coral border-2 scale-105' 
                  : 'border-fizko-blue/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-fizko-coral text-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-fizko-blue/10 flex items-center justify-center">
                  <plan.icon className="w-8 h-8 text-fizko-blue" />
                </div>
                <CardTitle className="font-playfair text-xl">{plan.name}</CardTitle>
                <div className="text-3xl font-playfair font-bold text-fizko-coral">
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
                      <div className="w-2 h-2 bg-fizko-coral rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full font-montserrat ${
                    plan.buttonStyle === 'outline' 
                      ? 'border-fizko-coral text-fizko-coral hover:bg-fizko-coral hover:text-white' 
                      : 'bg-fizko-coral hover:bg-fizko-coral/90 text-white'
                  }`}
                  variant={plan.buttonStyle === 'outline' ? 'outline' : 'default'}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssistanceSection;
