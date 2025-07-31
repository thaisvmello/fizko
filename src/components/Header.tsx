import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Produtos", href: "#purchase" },
    { name: "Chatbot", href: "#assistance" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fisko-beige/95 backdrop-blur-sm border-b border-fisko-blue/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/70578b8b-dd8f-4d27-a553-ba92873fb937.png" 
            alt="FISK.O Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-montserrat text-sm font-medium text-fisko-blue-dark hover:text-fisko-coral transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button asChild className="bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat text-sm px-6">
            <a href="/auth">Entrar / Cadastrar</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-fisko-blue-dark" /> : <Menu className="h-6 w-6 text-fisko-blue-dark" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-fisko-beige border-b border-fisko-blue/20 md:hidden">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block font-montserrat text-sm font-medium text-fisko-blue-dark hover:text-fisko-coral transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button asChild className="w-full bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat text-sm">
                <a href="/auth">Entrar / Cadastrar</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;