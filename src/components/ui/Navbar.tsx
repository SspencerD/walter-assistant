import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, User } from 'lucide-react';
import logo from '@/assets/logo.webp';
import { useStore } from '@/store/useStore';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function Navbar() {
  const location = useLocation();
  const cart = useStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const navItems = [
    { path: '/queue', label: 'Fila' },
    { path: '/advisor', label: 'Asientos' },
    { path: '/checkout', label: 'Pagar' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center  max-w-7xl mx-auto px-4">
        <Link to="/queue" className="flex items-center gap-3">
          <img src={logo} alt="AudienceView" className="h-8 w-auto" />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center justify-end gap-4">
          <Tooltip key={Math.random()}>
            <TooltipTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              asChild
            >
              <Link to="/checkout">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-brand-pink text-white text-xs flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>
          </TooltipTrigger >
           <TooltipContent className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-semibold">Carrito</p>
                          </div>
                        </TooltipContent>
          </Tooltip>
          <Tooltip key={Math.random()}>
            <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              asChild
            >
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipTrigger >
           <TooltipContent className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-semibold">Iniciar sesión</p>
                          </div>
                        </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="md:hidden flex items-center justify-around border-t px-4 py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'text-xs font-medium px-3 py-2 rounded-lg transition-colors',
              location.pathname === item.path
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

