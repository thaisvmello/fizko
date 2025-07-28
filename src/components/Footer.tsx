
import { Button } from "@/components/ui/button";

const Footer = () => {
  const links = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Purchase", href: "#purchase" },
    { name: "Assistance", href: "#assistance" },
    { name: "Contact", href: "#contact" },
    { name: "Terms", href: "#terms" },
    { name: "Privacy", href: "#privacy" },
  ];

  return (
    <footer className="bg-gray-100 border-t border-fizko-blue/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-playfair font-bold text-foreground mb-4">
              FIZK.O
            </div>
            <p className="text-muted-foreground font-montserrat text-sm leading-relaxed">
              Simplified fiscal solutions for modern businesses. 
              Streamline your operations with our comprehensive tools and expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {links.slice(0, 4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground font-montserrat text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-semibold mb-4">Legal</h4>
            <nav className="space-y-2">
              {links.slice(4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-foreground font-montserrat text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & CTA */}
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-semibold mb-4">Get Started</h4>
            <div className="space-y-4">
              <div className="space-y-2 text-sm font-montserrat text-muted-foreground">
                <p>📧 support@fizko.com</p>
                <p>📱 WhatsApp: +55 11 99999-9999</p>
              </div>
              <Button className="w-full bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat text-sm">
                Access Now
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-fizko-blue/10 mt-8 pt-8 text-center">
          <p className="text-muted-foreground font-montserrat text-sm">
            © 2024 FIZK.O. All rights reserved. Simplifying fiscal solutions for Brazilian businesses.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
