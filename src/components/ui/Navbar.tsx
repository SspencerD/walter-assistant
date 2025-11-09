import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ShoppingCart, User } from 'lucide-react';
import logo from '@/assets/logo.webp';
import { useStore } from '@/store/useStore';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
export function Navbar() {
  const location = useLocation();
  const cart = useStore((state) => state.cart);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const {user} = useStore();

  const navItems = [
    { path: '/queue', label: 'Fila' },
    { path: '/advisor', label: 'Asientos' },
    { path: '/checkout', label: 'Pagar' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-16 px-4 mx-auto max-w-7xl">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="AudienceView" className="w-auto h-8" />
        </Link>

        <nav className="items-center hidden gap-6 md:flex">
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
        <div className="flex items-center justify-end gap-4 ml-auto">
          <Tooltip key={Math.random()}>
            <TooltipTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              asChild
            >
              <Link to="/checkout">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full -top-1 -right-1 bg-brand-pink">
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
          {user && user.name ? (
            <span className="text-sm font-medium text-muted-foreground">
              Hola, {user.name}
            </span>
          ) :(
          <Tooltip key={Math.random()}>
            <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              asChild
            >
              <Link to="/login">
                <User className="w-5 h-5" />
              </Link>
            </Button>
          </TooltipTrigger >
           <TooltipContent className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-semibold">Iniciar sesión</p>
                          </div>
                        </TooltipContent>
          </Tooltip>
          )}
        </div>
        <Drawer>
          <DrawerContent>
            
          </DrawerContent>
        </Drawer>
      </div>

      {/* Mobile nav */}
    {/*   <nav className="flex items-center justify-around px-4 py-2 border-t md:hidden">
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
      </nav> */}
    </header>
  );
}

