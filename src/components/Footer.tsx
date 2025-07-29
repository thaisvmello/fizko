import { Button } from "@/components/ui/button";

const Footer = () => {
  const links = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Produtos", href: "#purchase" },
    { name: "Chatbot", href: "#assistance" },
    { name: "Contato", href: "#contact" },
    { name: "Termos", href: "#terms" },
    { name: "Privacidade", href: "#privacy" },
  ];

  return (
    <footer className="bg-fisko-beige/50 border-t border-fisko-blue/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="text-2xl font-playfair font-bold text-fisko-blue-dark mb-4">
              FISK.O
            </div>
            <p className="text-muted-foreground font-montserrat text-sm leading-relaxed">
              Soluções fiscais personalizadas para empresas brasileiras. 
              Simplifique sua gestão tributária com nossas ferramentas especializadas.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-semibold mb-4 text-fisko-blue-dark">Links Rápidos</h4>
            <nav className="space-y-2">
              {links.slice(0, 4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-fisko-coral font-montserrat text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-semibold mb-4 text-fisko-blue-dark">Jurídico</h4>
            <nav className="space-y-2">
              {links.slice(4).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-fisko-coral font-montserrat text-sm transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact & CTA */}
          <div className="md:col-span-1">
            <h4 className="font-montserrat font-semibold mb-4 text-fisko-blue-dark">Começar Agora</h4>
            <div className="space-y-4">
              <div className="space-y-2 text-sm font-montserrat text-muted-foreground">
                <p>📧 contato@fisko.com.br</p>
                <p>📱 WhatsApp: +55 11 99999-9999</p>
              </div>
              <Button className="w-full bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat text-sm">
                Acessar Agora
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-fisko-blue/10 mt-8 pt-8 text-center">
          <p className="text-muted-foreground font-montserrat text-sm">
            © 2024 FISK.O. Todos os direitos reservados. Simplificando soluções fiscais para empresas brasileiras.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;