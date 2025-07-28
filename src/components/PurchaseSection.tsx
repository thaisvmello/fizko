
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Star, Clock, Shield } from "lucide-react";

const PurchaseSection = () => {
  const products = [
    {
      title: "Grocery Store Kit",
      price: "R$ 49.90",
      description: "Complete spreadsheet package for grocery businesses",
      features: ["Inventory Control", "Price Management", "Tax Calculations", "Sales Reports"],
      popular: true,
      downloadType: "Excel + PDF Guide"
    },
    {
      title: "Pharmacy Management",
      price: "R$ 79.90",
      description: "Specialized tools for pharmaceutical businesses",
      features: ["Medicine Registry", "Prescription Tracking", "Regulatory Compliance", "Expiry Control"],
      popular: false,
      downloadType: "Excel + Templates"
    },
    {
      title: "Gas Station Pro",
      price: "R$ 99.90",
      description: "Comprehensive solution for fuel station operations",
      features: ["Fuel Tracking", "Tank Management", "Environmental Reports", "Tax Compliance"],
      popular: false,
      downloadType: "Excel + Calculators"
    },
    {
      title: "Restaurant Suite",
      price: "R$ 59.90",
      description: "All-in-one package for restaurant fiscal management",
      features: ["Menu Costing", "Ingredient Control", "Staff Management", "Revenue Reports"],
      popular: false,
      downloadType: "Excel + Guides"
    }
  ];

  const handlePurchase = (productTitle: string) => {
    console.log(`Purchase initiated for: ${productTitle}`);
    // This would integrate with payment system
    alert(`Redirecting to payment for ${productTitle}`);
  };

  return (
    <section id="purchase" className="py-20 bg-fizko-beige/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Ready-to-Use Fiscal Solutions
          </h2>
          <p className="text-lg text-muted-foreground font-montserrat max-w-2xl mx-auto">
            Download immediately after purchase. Each package includes comprehensive 
            spreadsheets, templates, and detailed implementation guides.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-xl transition-all duration-300 ${
                product.popular 
                  ? 'border-fizko-coral border-2 scale-105' 
                  : 'border-fizko-blue/20 hover:border-fizko-coral/50'
              }`}
            >
              {product.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-fizko-coral text-white px-4 py-1 rounded-full text-xs font-montserrat font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-fizko-blue/20 to-fizko-coral/20 flex items-center justify-center">
                  <Download className="w-10 h-10 text-fizko-coral" />
                </div>
                <CardTitle className="font-playfair text-xl mb-2">{product.title}</CardTitle>
                <div className="text-3xl font-playfair font-bold text-fizko-coral mb-2">
                  {product.price}
                </div>
                <p className="text-sm text-muted-foreground font-montserrat">
                  {product.downloadType}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground font-montserrat text-center">
                  {product.description}
                </p>
                
                <ul className="space-y-3">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3 font-montserrat text-sm">
                      <div className="w-2 h-2 bg-fizko-coral rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground font-montserrat pt-4 border-t border-fizko-blue/10">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Instant Download
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Secure Payment
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat text-sm py-6"
                  onClick={() => handlePurchase(product.title)}
                >
                  Buy Now - Instant Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground font-montserrat mb-4">
            All purchases include 30-day money-back guarantee and free updates for 6 months
          </p>
          <div className="flex justify-center gap-8 text-xs text-muted-foreground font-montserrat">
            <span>✓ Secure SSL Payment</span>
            <span>✓ Instant Email Delivery</span>
            <span>✓ Compatible with Excel & Google Sheets</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSection;
