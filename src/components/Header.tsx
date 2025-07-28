
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Purchase", href: "#purchase" },
    { name: "Assistance", href: "#assistance" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fizko-beige/95 backdrop-blur-sm border-b border-fizko-blue/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-playfair font-bold text-foreground">
            FIZK.O
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-montserrat text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button className="bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat text-sm px-6">
            Launch Site
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-fizko-beige border-b border-fizko-blue/20 md:hidden">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block font-montserrat text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button className="w-full bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat text-sm">
                Launch Site
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
