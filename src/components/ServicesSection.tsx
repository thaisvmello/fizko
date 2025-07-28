
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, BookOpen, MessageCircle, Shield } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: FileSpreadsheet,
      title: "Custom Spreadsheets",
      description: "Ready-to-use fiscal spreadsheets for grocery, pharmacy, gas stations and more",
      features: ["NCM Classification", "Tax Calculations", "Inventory Control", "Financial Reports"]
    },
    {
      icon: BookOpen,
      title: "Expert eBooks",
      description: "Comprehensive guides for fiscal compliance and business management",
      features: ["Legal Updates", "Best Practices", "Case Studies", "Step-by-step Guides"]
    },
    {
      icon: MessageCircle,
      title: "AI Chatbot Assistant",
      description: "Get instant answers to your fiscal questions with our intelligent assistant",
      features: ["NCM Queries", "CFOP Information", "Tax Guidance", "24/7 Support"]
    },
    {
      icon: Shield,
      title: "Restricted Data Access",
      description: "Secure access to comprehensive fiscal data tables and databases",
      features: ["Product Databases", "Tax Tables", "Regulation Updates", "Compliance Data"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Our Services & Products
          </h2>
          <p className="text-lg text-muted-foreground font-montserrat max-w-2xl mx-auto">
            Comprehensive fiscal solutions designed to streamline your business operations 
            and ensure compliance with all regulations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-fizko-blue/20 hover:border-fizko-coral/50">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-fizko-blue/10 flex items-center justify-center group-hover:bg-fizko-coral/10 transition-colors">
                  <service.icon className="w-8 h-8 text-fizko-blue group-hover:text-fizko-coral transition-colors" />
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
            Sample Fiscal Data Access
          </h3>
          <div className="bg-fizko-beige/50 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-fizko-blue/20">
                  <tr>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Product</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">NCM Code</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Tax Rate</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Category</th>
                    <th className="px-6 py-4 text-left font-montserrat font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { product: "Paracetamol 500mg", ncm: "3004.90.19", tax: "17.5%", category: "Medication", status: "Active" },
                    { product: "Bread (500g)", ncm: "1905.90.90", tax: "0%", category: "Food", status: "Active" },
                    { product: "Gasoline Common", ncm: "2710.12.41", tax: "25%", category: "Fuel", status: "Active" },
                    { product: "Milk (1L)", ncm: "0401.10.10", tax: "7%", category: "Food", status: "Active" },
                  ].map((item, index) => (
                    <tr key={index} className="border-t border-fizko-blue/10 hover:bg-fizko-blue/5">
                      <td className="px-6 py-4 font-montserrat">{item.product}</td>
                      <td className="px-6 py-4 font-montserrat text-fizko-coral">{item.ncm}</td>
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
            <div className="p-4 text-center">
              <p className="text-sm text-muted-foreground font-montserrat">
                🔒 Full access available with subscription - over 10,000+ products
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
