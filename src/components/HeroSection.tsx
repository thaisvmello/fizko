import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <>
      {/* Gray stripe separator */}
      <div className="h-1 bg-gradient-to-r from-fizko-light-gray/50 via-fizko-gray/30 to-fizko-light-gray/50"></div>
      
      <section 
        id="home" 
        className="relative pt-20 min-h-[80vh] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(240,239,235,0.88), rgba(240,239,235,0.88)), url(/lovable-uploads/8b4350b6-8266-4ec3-b703-bcf1dd1c4e0b.png)`
        }}
      >
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <Badge className="bg-fisko-coral text-white px-4 py-2 text-sm font-montserrat rounded-full">
                NOVO: IA fiscal para Simples Nacional
              </Badge>
              
               {/* Headline */}
               <h1 className="text-4xl lg:text-6xl font-playfair font-bold leading-tight text-fisko-blue-dark">
                 Automatize sua rotina fiscal com{" "}
                 <span className="text-fisko-coral">inteligência</span>
               </h1>
               
               {/* Description */}
               <p className="text-lg lg:text-xl text-fisko-blue-dark/80 font-montserrat leading-relaxed max-w-lg">
                 Tabelas tributárias, planilhas inteligentes, consultoria e IA fiscal. 
                 Tudo em um só lugar.
               </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat px-8 py-4 text-lg rounded-lg"
                  onClick={() => window.open('https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/07/30/16/20250730160400-G8B5OPNZ.json', '_blank')}
                >
                  Experimentar o chatbot fiscal
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-fisko-blue text-fisko-blue hover:bg-fisko-blue hover:text-white font-montserrat px-8 py-4 text-lg rounded-lg bg-white/80 backdrop-blur-sm"
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Ver tabelas tributárias
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;