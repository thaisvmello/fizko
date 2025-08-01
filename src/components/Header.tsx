import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, User, Settings, Package, HeadphonesIcon, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    setProfile(data);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    return user?.email?.split('@')[0] || 'Usuário';
  };

  const getAvatarUrl = () => {
    if (profile?.avatar_url) return profile.avatar_url;
    if (user?.user_metadata?.avatar_url) return user.user_metadata.avatar_url;
    if (user?.user_metadata?.picture) return user.user_metadata.picture;
    return null;
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const navigation = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Produtos", href: "#purchase" },
    { name: "Chatbot", href: "#assistance" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fisko-beige/95 backdrop-blur-sm border-b border-fisko-blue/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/050301e4-b562-4b42-aded-519ca1a67848.png" 
            alt="Fizk.o Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="font-montserrat text-sm font-medium text-fisko-blue-dark hover:text-fisko-coral transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* User Avatar or CTA Button */}
        <div className="hidden md:block">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getAvatarUrl() || undefined} alt={getDisplayName()} />
                    <AvatarFallback className="bg-fisko-coral text-white text-sm">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="font-medium text-sm">{getDisplayName()}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Editar perfil
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/products')} className="cursor-pointer">
                  <Package className="mr-2 h-4 w-4" />
                  Meus produtos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/support')} className="cursor-pointer">
                  <HeadphonesIcon className="mr-2 h-4 w-4" />
                  Suporte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat text-sm px-6">
              <a href="/auth">Entrar / Cadastrar</a>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-fisko-blue-dark" /> : <Menu className="h-6 w-6 text-fisko-blue-dark" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-fisko-beige border-b border-fisko-blue/20 md:hidden">
            <nav className="container mx-auto px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block font-montserrat text-sm font-medium text-fisko-blue-dark hover:text-fisko-coral transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Button asChild className="w-full bg-fisko-coral hover:bg-fisko-coral/90 text-white font-montserrat text-sm">
                <a href="/auth">Entrar / Cadastrar</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;