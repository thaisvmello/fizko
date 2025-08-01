import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";

// Schema de validação
const signupSchema = z.object({
  fullName: z.string().min(2, "Nome completo deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  confirmEmail: z.string().email("Email inválido"),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP deve ter 8 dígitos"),
  street: z.string().min(1, "Rua é obrigatória"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().length(2, "UF deve ter 2 caracteres"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato XXX.XXX.XXX-XX"),
  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .regex(/(?=.*[a-z])/, "Senha deve conter pelo menos uma letra minúscula")
    .regex(/(?=.*[A-Z])/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/(?=.*\d)/, "Senha deve conter pelo menos um número")
    .regex(/(?=.*[@$!%*?&])/, "Senha deve conter pelo menos um caractere especial"),
  confirmPassword: z.string()
}).refine((data) => data.email === data.confirmEmail, {
  message: "Os emails não coincidem",
  path: ["confirmEmail"]
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
});

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória")
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Formulário de login
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Formulário de cadastro
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      confirmEmail: "",
      cep: "",
      street: "",
      neighborhood: "",
      city: "",
      state: "",
      cpf: "",
      password: "",
      confirmPassword: ""
    }
  });

  // Verificar se usuário já está logado
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  // Buscar endereço pelo CEP
  const fetchAddressByCep = async (cep: string) => {
    try {
      const cleanCep = cep.replace(/\D/g, "");
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        signupForm.setValue("street", data.logradouro || "");
        signupForm.setValue("neighborhood", data.bairro || "");
        signupForm.setValue("city", data.localidade || "");
        signupForm.setValue("state", data.uf || "");
      } else {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP informado",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Tente novamente",
        variant: "destructive"
      });
    }
  };

  // Login com Google
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Login com email/senha
  const handleLogin = async (data: LoginFormData) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) {
        toast({
          title: "Erro no login",
          description: error.message,
          variant: "destructive"
        });
      } else {
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Cadastro
  const handleSignup = async (data: SignupFormData) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: data.fullName,
            cep: data.cep,
            street: data.street,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            cpf: data.cpf
          }
        }
      });

      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Cadastro realizado!",
          description: "Verifique seu email para confirmar a conta",
        });
        setIsLogin(true);
      }
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Formatar CPF
  const formatCpf = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  // Formatar CEP
  const formatCep = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img 
              src="/lovable-uploads/050301e4-b562-4b42-aded-519ca1a67848.png" 
              alt="Fizk.o Logo" 
              className="h-16 w-auto"
            />
          </div>
          <CardTitle className="text-2xl">
            {isLogin ? "Entrar" : "Criar Conta"}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? "Entre na sua conta para continuar" 
              : "Preencha os dados para criar sua conta"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Login com Google */}
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ou</span>
            </div>
          </div>

          {/* Formulário de Login */}
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...loginForm.register("email")}
                  placeholder="seu@email.com"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...loginForm.register("password")}
                    placeholder="Sua senha"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {loginForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
          ) : (
            /* Formulário de Cadastro */
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
              {/* Nome Completo */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  {...signupForm.register("fullName")}
                  placeholder="Seu nome completo"
                />
                {signupForm.formState.errors.fullName && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <Input
                  id="signupEmail"
                  type="email"
                  {...signupForm.register("email")}
                  placeholder="seu@email.com"
                />
                {signupForm.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Confirmar Email */}
              <div className="space-y-2">
                <Label htmlFor="confirmEmail">Confirmar Email</Label>
                <Input
                  id="confirmEmail"
                  type="email"
                  {...signupForm.register("confirmEmail")}
                  placeholder="Confirme seu email"
                />
                {signupForm.formState.errors.confirmEmail && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.confirmEmail.message}
                  </p>
                )}
              </div>

              {/* CEP */}
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  {...signupForm.register("cep")}
                  placeholder="00000-000"
                  maxLength={9}
                  onChange={(e) => {
                    const formatted = formatCep(e.target.value);
                    signupForm.setValue("cep", formatted);
                    if (formatted.length === 9) {
                      fetchAddressByCep(formatted);
                    }
                  }}
                />
                {signupForm.formState.errors.cep && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.cep.message}
                  </p>
                )}
              </div>

              {/* Endereço */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input
                    id="street"
                    {...signupForm.register("street")}
                    placeholder="Nome da rua"
                  />
                  {signupForm.formState.errors.street && (
                    <p className="text-sm text-destructive">
                      {signupForm.formState.errors.street.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    {...signupForm.register("neighborhood")}
                    placeholder="Bairro"
                  />
                  {signupForm.formState.errors.neighborhood && (
                    <p className="text-sm text-destructive">
                      {signupForm.formState.errors.neighborhood.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    {...signupForm.register("city")}
                    placeholder="Cidade"
                  />
                  {signupForm.formState.errors.city && (
                    <p className="text-sm text-destructive">
                      {signupForm.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">UF</Label>
                  <Input
                    id="state"
                    {...signupForm.register("state")}
                    placeholder="SP"
                    maxLength={2}
                    style={{ textTransform: 'uppercase' }}
                  />
                  {signupForm.formState.errors.state && (
                    <p className="text-sm text-destructive">
                      {signupForm.formState.errors.state.message}
                    </p>
                  )}
                </div>
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  {...signupForm.register("cpf")}
                  placeholder="000.000.000-00"
                  maxLength={14}
                  onChange={(e) => {
                    const formatted = formatCpf(e.target.value);
                    signupForm.setValue("cpf", formatted);
                  }}
                />
                {signupForm.formState.errors.cpf && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.cpf.message}
                  </p>
                )}
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="signupPassword">Senha</Label>
                <div className="relative">
                  <Input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    {...signupForm.register("password")}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {signupForm.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirmar Senha */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Repetir Senha</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...signupForm.register("confirmPassword")}
                    placeholder="Repita a senha"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {signupForm.formState.errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </form>
          )}

          {/* Toggle entre Login/Cadastro */}
          <div className="text-center">
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Não tem conta? Cadastre-se" : "Já tem conta? Faça login"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;