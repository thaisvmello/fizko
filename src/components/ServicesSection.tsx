
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Download, Users, MessageCircle } from "lucide-react";
import BotpressChatbot from "@/components/BotpressChatbot";

const ServicesSection = () => {
  const services = [
    {
      icon: Database,
      title: "Tabelas de Dados Tributários",
      description: "Acesso a tabelas responsivas segmentadas por setor: farmácia, hortifruti, construção e mais",
      features: ["Busca por NCM", "Filtros por regime tributário", "Grande volume de dados", "Atualizações constantes"]
    },
    {
      icon: Download,
      title: "Downloads de Planilhas",
      description: "Planilhas personalizadas em formato Excel com layouts pré-configurados",
      features: ["Formulário online", "Personalização por setor", "Layouts responsivos", "Múltiplas colunas"]
    },
    {
      icon: Users,
      title: "Consultoria Personalizada",
      description: "Serviços de consultoria fiscal customizada com especialistas tributários",
      features: ["Pré-formulário de necessidades", "Chat direto com consultor", "Orçamento personalizado", "Suporte especializado"]
    },
    {
      icon: MessageCircle,
      title: "Chatbot Fiscal",
      description: "Assistente IA treinado em base estruturada para questões tributárias específicas",
      features: ["10 perguntas gratuitas", "Acesso básico e premium", "Respostas por estado/setor", "Base de dados estruturada"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Nossos Serviços & Produtos
          </h2>
          <p className="text-lg text-muted-foreground font-montserrat max-w-2xl mx-auto">
            Soluções fiscais completas projetadas para otimizar suas operações empresariais 
            e garantir conformidade com todas as regulamentações brasileiras.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-fisko-blue/20 hover:border-fisko-coral/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-fisko-blue/10 flex items-center justify-center group-hover:bg-fisko-coral/10 transition-colors">
                  <service.icon className="w-8 h-8 text-fisko-blue group-hover:text-fisko-coral transition-colors" />
                </div>
                <CardTitle className="font-playfair text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground font-montserrat mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-muted-foreground font-montserrat">
                      • {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Table Preview */}
        <div className="mt-16">
          <h3 className="text-2xl font-playfair font-semibold text-center mb-8">
            Exemplo de Acesso a Dados Fiscais
          </h3>
          <div className="bg-fisko-beige/50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-fisko-blue/20">
                  <tr>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Produto</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Código NCM</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Alíquota</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Categoria</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { product: "Paracetamol 500mg", ncm: "3004.90.19", tax: "17.5%", category: "Medicamento", status: "Ativo" },
                    { product: "Pão (500g)", ncm: "1905.90.90", tax: "0%", category: "Alimento", status: "Ativo" },
                    { product: "Gasolina Comum", ncm: "2710.12.41", tax: "25%", category: "Combustível", status: "Ativo" },
                    { product: "Leite (1L)", ncm: "0401.10.10", tax: "7%", category: "Alimento", status: "Ativo" },
                  ].map((item, index) => (
                    <tr key={index} className="border-t border-fisko-blue/10 hover:bg-fisko-blue/5">
                      <td className="px-6 py-4 font-montserrat">{item.product}</td>
                      <td className="px-6 py-4 font-montserrat text-fisko-coral">{item.ncm}</td>
                      <td className="px-6 py-4 font-montserrat font-semibold">{item.tax}</td>
                      <td className="px-6 py-4 font-montserrat">{item.category}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-montserrat">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 text-center space-y-3">
              <p className="text-sm text-muted-foreground font-montserrat">
                🔒 Acesso completo disponível com assinatura - mais de 10.000+ produtos
              </p>
              <div className="max-w-xs mx-auto">
                <BotpressChatbot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
