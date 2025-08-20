import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PurchaseSection from "@/components/PurchaseSection";
import AssistanceSection from "@/components/AssistanceSection";
import Footer from "@/components/Footer";
import AdminSetup from "@/components/AdminSetup";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        {/* Componente temporário para configurar admin */}
        <div className="py-8 bg-fisko-beige/30">
          <div className="container mx-auto px-4">
            <h2 className="text-center text-2xl font-playfair font-bold mb-4">
              Configuração de Administrador
            </h2>
            <AdminSetup />
          </div>
        </div>
        <ServicesSection />
        <PurchaseSection />
        <AssistanceSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
