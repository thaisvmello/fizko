import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import taxSpreadsheetBg from "@/assets/tax-spreadsheet-bg.jpg";
import chatbotIllustration from "@/assets/chatbot-illustration.png";

const HeroSection = () => {
  return (
    <>
      {/* Gray stripe separator */}
      <div className="h-1 bg-gradient-to-r from-fizko-light-gray/50 via-fizko-gray/30 to-fizko-light-gray/50"></div>
      
      <section 
        id="home" 
        className="relative pt-20 min-h-[80vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(237, 232, 219, 0.9), rgba(237, 232, 219, 0.8)), url(${taxSpreadsheetBg})`
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <Badge className="bg-fizko-coral text-white px-4 py-2 text-sm font-montserrat rounded-full">
                NOVO: IA fiscal para Simples Nacional
              </Badge>
              
              {/* Headline */}
              <h1 className="text-4xl lg:text-6xl font-playfair font-bold leading-tight text-fizko-blue-dark">
                Automatize sua rotina fiscal com{" "}
                <span className="text-fizko-coral">inteligência</span>
              </h1>
              
              {/* Description */}
              <p className="text-lg lg:text-xl text-fizko-blue/80 font-montserrat leading-relaxed max-w-lg">
                Tabelas tributárias, planilhas inteligentes, consultoria e IA fiscal. 
                Tudo em um só lugar.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat px-8 py-4 text-lg rounded-lg"
                  onClick={() => window.open('https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/30/16/20250730160400-G8B5OPNZ.json', '_blank')}
                >
                  Experimentar o chatbot fiscal
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-fizko-blue text-fizko-blue hover:bg-fizko-blue hover:text-white font-montserrat px-8 py-4 text-lg rounded-lg bg-white/80 backdrop-blur-sm"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver tabelas tributárias
                </Button>
              </div>
            </div>

            {/* Right Visual Element */}
            <div className="relative flex justify-center lg:justify-end">
              <Card className="relative bg-gradient-to-br from-white/90 to-fizko-beige/60 backdrop-blur-sm border-2 border-fizko-coral/20 rounded-3xl p-8 shadow-2xl max-w-md">
                {/* Chatbot Illustration */}
                <div className="text-center mb-6">
                  <img 
                    src={chatbotIllustration} 
                    alt="Assistente IA Fiscal" 
                    className="w-24 h-24 mx-auto mb-4 rounded-2xl shadow-lg"
                  />
                  <h3 className="text-lg font-playfair font-bold text-fizko-blue-dark mb-2">
                    Assistente IA Fiscal
                  </h3>
                </div>
                
                {/* Sample Tax Info Dialog */}
                <div className="bg-white rounded-xl p-4 shadow-lg border border-fizko-coral/20">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-montserrat font-semibold text-fizko-blue-dark">
                        Farinha de trigo
                      </span>
                      <Badge variant="outline" className="text-xs border-fizko-coral text-fizko-coral">
                        Consultado
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-fizko-blue/70">Código:</span>
                        <span className="font-medium text-fizko-blue-dark">1101001</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-fizko-blue/70">NCM:</span>
                        <span className="font-medium text-fizko-blue-dark">1101.00.10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-fizko-blue/70">Alíquota:</span>
                        <span className="font-bold text-fizko-coral">7%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-3 -right-3 w-6 h-6 bg-fizko-coral rounded-full animate-float"></div>
                <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-fizko-blue rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;