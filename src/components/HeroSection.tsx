
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center hexagon-pattern">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight">
              Soluções fiscais{" "}
              <span className="text-fisko-coral">personalizadas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-montserrat leading-relaxed">
              Acesse tabelas de dados tributários, baixe planilhas personalizadas, 
              contrate consultoria especializada e use nosso chatbot fiscal inteligente. 
              Tudo para sua gestão tributária em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat px-8"
              >
                Conhecer Serviços
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-fisko-blue text-fisko-blue hover:bg-fisko-blue hover:text-white font-montserrat px-8"
              >
                Acessar Tabelas
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-fisko-blue/20 to-fisko-coral/20 rounded-3xl flex items-center justify-center">
              <div className="w-64 h-64 bg-fisko-beige rounded-full shadow-2xl flex items-center justify-center">
                <div className="w-32 h-32 bg-fisko-coral rounded-lg transform rotate-45 opacity-80"></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-fisko-blue rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-fisko-coral rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
