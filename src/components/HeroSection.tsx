
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 h-[50vh] flex items-center hexagon-pattern">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold leading-tight">
              Soluções fiscais{" "}
              <span className="text-fizko-coral">personalizadas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-montserrat leading-relaxed">
              Acesse tabelas de dados tributários, baixe planilhas personalizadas, 
              contrate consultoria especializada e use nosso chatbot fiscal inteligente. 
              Tudo para sua gestão tributária em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-[#4a606b] hover:bg-[#4a606b]/90 text-white font-montserrat px-8"
              >
                Conhecer Serviços
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-[#4a606b] text-[#4a606b] hover:bg-[#4a606b] hover:text-white font-montserrat px-8"
              >
                Acessar Tabelas
              </Button>
            </div>
          </div>

          {/* Visual Element with Image */}
          <div className="relative">
            <div className="w-full h-80 bg-gradient-to-br from-fizko-blue/20 to-fizko-coral/20 rounded-3xl flex items-center justify-center p-6">
              <div className="relative w-full h-full">
                {/* Elegant Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-fizko-beige/30 rounded-2xl shadow-2xl border-4 border-fizko-coral/30 transform rotate-1 animate-float"></div>
                <div className="absolute inset-2 bg-white rounded-xl shadow-lg overflow-hidden transform -rotate-1">
                  <img 
                    src="/lovable-uploads/bdd2c740-c3ba-40d8-9125-95336fc1e7b3.png" 
                    alt="Tabela de produtos fiscais" 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-fizko-blue/20 to-transparent"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-fizko-blue rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-fizko-coral rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
