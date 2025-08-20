import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, User, Settings, Package, HeadphonesIcon, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, Link } from "react-router-dom";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // For Builder.io design mode - set demo user
    const demoUser = {
      id: 'demo-user',
      email: 'demo@example.com',
      user_metadata: { full_name: 'Usuário Demo' }
    };

    setUser(demoUser as any);
    setProfile({ full_name: 'Usuário Demo' });
    setHasAccess(true);
  }, []);

  // Removed fetchProfile for Builder.io compatibility

  const handleSignOut = async () => {
    // Simplified for Builder.io - just navigate to home
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
    { name: "Início", href: "/" },
    { name: "Produtos", href: "/products" },
    { name: "Sobre", href: "/about" },
    { name: "Contato", href: "/support" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-fisko-beige/95 backdrop-blur-sm border-b border-fisko-blue/20">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/050301e4-b562-4b42-aded-519ca1a67848.png" 
            alt="FIZK.O Logo" 
            className="h-12 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-montserrat text-lg font-medium text-fisko-blue-dark hover:text-fisko-coral transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User Avatar or CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/dashboard')}
                  className="border-fisko-coral text-fisko-coral hover:bg-fisko-coral hover:text-white font-montserrat"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  DASHBOARD
                </Button>
              )}
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
                  {hasAccess && (
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                  )}
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
            </>
          ) : (
            <Button asChild className="bg-[hsl(var(--auth-orange))] hover:bg-[hsl(var(--auth-orange))]/90 text-white font-montserrat text-lg px-6">
              <Link to="/auth">ENTRAR / CADASTRAR</Link>
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
                <Link
                  key={item.name}
                  to={item.href}
                  className="block font-montserrat text-lg font-medium text-fisko-blue-dark hover:text-fisko-coral transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <Button 
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-fizko-coral hover:bg-fizko-coral/90 text-white font-montserrat text-lg"
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  DASHBOARD
                </Button>
              ) : (
                <Button asChild className="w-full bg-[hsl(var(--auth-orange))] hover:bg-[hsl(var(--auth-orange))]/90 text-white font-montserrat text-lg">
                  <a href="/auth">ENTRAR / CADASTRAR</a>
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
