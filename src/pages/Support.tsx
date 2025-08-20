import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, HeadphonesIcon, Mail, MessageCircle, Phone } from "lucide-react";

const supportSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(5, "Assunto deve ter pelo menos 5 caracteres"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type SupportFormData = z.infer<typeof supportSchema>;

const Support = () => {
  const [user, setUser] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<SupportFormData>({
    resolver: zodResolver(supportSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  useEffect(() => {
    // Allow Builder.io to access without auth check
    setUser({ id: 'demo-user', email: 'demo@example.com' });

    // Pre-fill with demo data for Builder editing
    form.reset({
      name: "Usuário Demo",
      email: "demo@example.com",
      subject: "",
      message: "",
    });
  }, []);

  const onSubmit = async (data: SupportFormData) => {
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-support-email', {
        body: data
      });

      if (error) throw error;
      
      toast({
        title: "Mensagem enviada!",
        description: "Recebemos sua mensagem e responderemos em breve.",
      });
      
      form.reset({
        name: data.name,
        email: data.email,
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error('Error sending support email:', error);
      toast({
        title: "Erro",
        description: "Erro ao enviar mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-fisko-beige pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 text-fisko-blue-dark hover:text-fisko-coral"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>

          <div className="text-center mb-8">
            <div className="mx-auto bg-fisko-coral/10 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <HeadphonesIcon className="h-8 w-8 text-fisko-coral" />
            </div>
            <h1 className="text-3xl font-bold font-montserrat text-fisko-blue-dark mb-2">
              Suporte ao Cliente
            </h1>
            <p className="text-fisko-blue/70">
              Estamos aqui para ajudar! Entre em contato conosco
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Formulário de Contato */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-montserrat text-fisko-blue-dark flex items-center">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Envie uma Mensagem
                </CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo e responderemos o mais rápido possível
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Seu nome" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="seu@email.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Qual o motivo do contato?" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Descreva detalhadamente sua dúvida ou problema..."
                              className="min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Informações de Contato */}
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-montserrat text-fisko-blue-dark flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Outras Formas de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-fisko-coral/10 p-2 rounded-full">
                      <Mail className="h-4 w-4 text-fisko-coral" />
                    </div>
                    <div>
                      <p className="font-medium text-fisko-blue-dark">Email</p>
                      <p className="text-sm text-fizko-blue/70">contato@fizko.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-fisko-coral/10 p-2 rounded-full">
                      <Phone className="h-4 w-4 text-fisko-coral" />
                    </div>
                    <div>
                      <p className="font-medium text-fisko-blue-dark">Telefone</p>
                      <p className="text-sm text-fizko-blue/70">
                        <a href="https://w.app/fizko" target="_blank" rel="noopener noreferrer" className="hover:text-fizko-coral transition-colors">
                          +55 21 96457-9471
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="bg-fisko-coral/10 p-2 rounded-full">
                      <MessageCircle className="h-4 w-4 text-fisko-coral" />
                    </div>
                    <div>
                      <p className="font-medium text-fisko-blue-dark">Chatbot</p>
                      <p className="text-sm text-fisko-blue/70">Disponível 24/7</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/#assistance')}
                        className="mt-2"
                      >
                        Usar Chatbot
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-fisko-coral/10 backdrop-blur-sm border-0">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-fisko-blue-dark mb-2">
                    Horário de Atendimento
                  </h3>
                  <p className="text-sm text-fisko-blue/70">
                    Segunda a Sexta: 9h às 18h<br />
                    Sábado: 9h às 12h<br />
                    Domingo: Fechado
                  </p>
                  <p className="text-xs text-fisko-blue/60 mt-2">
                    * O chatbot está disponível 24 horas por dia
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
