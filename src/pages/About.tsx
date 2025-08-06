import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Target, Users, Award, Lightbulb } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-fizko-beige pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-fizko-blue-dark hover:text-fizko-coral"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="text-center mb-12">
            <div className="mx-auto bg-fizko-coral/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <Lightbulb className="h-8 w-8 text-fizko-coral" />
            </div>
            <h1 className="text-4xl font-bold font-montserrat text-fizko-blue-dark mb-4">
              Sobre a FIZK.O
            </h1>
            <p className="text-lg text-fizko-blue/70 max-w-2xl mx-auto">
              Transformando a gestão fiscal brasileira através de tecnologia e inteligência artificial
            </p>
          </div>

          <div className="grid gap-8 mb-12">
            {/* Nossa História */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat text-fizko-blue-dark flex items-center">
                  <Target className="mr-3 h-6 w-6 text-fizko-coral" />
                  Nossa História
                </CardTitle>
              </CardHeader>
              <CardContent className="text-fizko-blue/80 leading-relaxed">
                <p className="mb-4">
                  A FIZK.O nasceu da necessidade de simplificar a complexa gestão tributária brasileira. 
                  Fundada por especialistas em contabilidade e tecnologia, nossa empresa surgiu com o 
                  objetivo de democratizar o acesso a soluções fiscais de qualidade.
                </p>
                <p className="mb-4">
                  Percebemos que muitas empresas, especialmente pequenas e médias, enfrentavam dificuldades 
                  para manter-se atualizadas com as constantes mudanças na legislação tributária e para 
                  acessar ferramentas especializadas que tradicionalmente eram caras e complexas.
                </p>
                <p>
                  Assim nasceu a FIZK.O: uma plataforma que combina expertise fiscal com inteligência 
                  artificial para oferecer soluções personalizadas, acessíveis e sempre atualizadas.
                </p>
              </CardContent>
            </Card>

            {/* Nossa Proposta */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat text-fizko-blue-dark flex items-center">
                  <Award className="mr-3 h-6 w-6 text-fizko-coral" />
                  Nossa Proposta
                </CardTitle>
              </CardHeader>
              <CardContent className="text-fizko-blue/80 leading-relaxed">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-fizko-blue-dark mb-2">Simplificação</h3>
                    <p className="text-sm">
                      Transformamos informações fiscais complexas em dados claros e acionáveis 
                      para sua empresa.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-fizko-blue-dark mb-2">Personalização</h3>
                    <p className="text-sm">
                      Cada empresa é única. Nossas soluções se adaptam ao seu segmento e 
                      necessidades específicas.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-fizko-blue-dark mb-2">Atualização</h3>
                    <p className="text-sm">
                      Monitoramos constantemente as mudanças na legislação para manter 
                      você sempre em conformidade.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-fizko-blue-dark mb-2">Acessibilidade</h3>
                    <p className="text-sm">
                      Soluções profissionais com preços justos para empresas de todos os 
                      tamanhos.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Nossa Equipe */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-montserrat text-fizko-blue-dark flex items-center">
                  <Users className="mr-3 h-6 w-6 text-fizko-coral" />
                  Nossa Equipe
                </CardTitle>
              </CardHeader>
              <CardContent className="text-fizko-blue/80 leading-relaxed">
                <p className="mb-4">
                  Nossa equipe é formada por contadores experientes, desenvolvedores especializados 
                  e consultores fiscais que entendem profundamente os desafios do empresário brasileiro.
                </p>
                <p className="mb-4">
                  Combinamos décadas de experiência em gestão tributária com conhecimento em 
                  tecnologia de ponta, incluindo inteligência artificial e automação de processos.
                </p>
                <p>
                  Estamos constantemente investindo em capacitação e atualização para oferecer 
                  sempre o melhor serviço aos nossos clientes.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-fizko-coral/10 to-fizko-blue/10 border-0 shadow-lg">
            <CardContent className="text-center py-8">
              <h3 className="text-2xl font-bold text-fizko-blue-dark mb-4">
                Pronto para Simplificar sua Gestão Fiscal?
              </h3>
              <p className="text-fizko-blue/70 mb-6 max-w-2xl mx-auto">
                Junte-se a centenas de empresas que já confiam na FIZK.O para 
                manter sua contabilidade sempre em dia e em conformidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate('/#purchase')}
                  className="bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat"
                >
                  Conhecer Produtos
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/support')}
                  className="border-fizko-coral text-fizko-coral hover:bg-fizko-coral hover:text-white"
                >
                  Falar Conosco
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;