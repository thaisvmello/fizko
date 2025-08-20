import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SimpleNavigation = () => {
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Auth', path: '/auth' },
    { name: 'Profile', path: '/profile' },
    { name: 'Products', path: '/products' },
    { name: 'Support', path: '/support' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Hortifruit Table', path: '/tabelas/hortifruit' },
  ];

  return (
    <div className="bg-fisko-beige/30 p-4 border-b">
      <div className="container mx-auto">
        <h3 className="text-lg font-semibold mb-4 text-center">
          Navegação para Builder.io (modo design)
        </h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {pages.map((page) => (
            <Button
              key={page.path}
              asChild
              variant="outline"
              size="sm"
              className="border-fisko-blue text-fisko-blue hover:bg-fisko-blue hover:text-white"
            >
              <Link to={page.path}>{page.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleNavigation;
