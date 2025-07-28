
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center hexagon-pattern">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold leading-tight">
              Fiscal solutions{" "}
              <span className="text-fizko-coral">tailored to you</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-montserrat leading-relaxed">
              Simplify your business finances with our comprehensive spreadsheets, 
              expert eBooks, and intelligent chatbot assistance. Everything you need 
              for fiscal management in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat px-8"
              >
                Learn More
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-fizko-blue text-fizko-blue hover:bg-fizko-blue hover:text-white font-montserrat px-8"
              >
                View Services
              </Button>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-fizko-blue/20 to-fizko-coral/20 rounded-3xl flex items-center justify-center">
              <div className="w-64 h-64 bg-fizko-beige rounded-full shadow-2xl flex items-center justify-center">
                <div className="w-32 h-32 bg-fizko-coral rounded-lg transform rotate-45 opacity-80"></div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-fizko-blue rounded-full animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-fizko-coral rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
