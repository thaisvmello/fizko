
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PurchaseSection from "@/components/PurchaseSection";
import AssistanceSection from "@/components/AssistanceSection";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/ChatbotWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PurchaseSection />
        <AssistanceSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Index;
