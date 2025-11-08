import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/Skeleton';
import { Plus, Sparkles } from 'lucide-react';
import { getMerchRecs } from '@/lib/api';
import { useStore } from '@/store/useStore';
import { formatCurrency } from '@/lib/currency';
import type { MerchItem } from '@/types';
import { toast } from 'sonner';

export function MerchSidebar() {
  const [items, setItems] = useState<MerchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useStore((state) => state.addToCart);
  const user = useStore((state) => state.user);

  useEffect(() => {
    async function loadMerch() {
      try {
        const recs = await getMerchRecs('evento-1', user?.id || 'guest');
        setItems(recs);
      } catch (error) {
        console.error('Error loading merch:', error);
      } finally {
        setLoading(false);
      }
    }
    loadMerch();
  }, [user]);

  const handleAddToCart = (item: MerchItem) => {
    addToCart({
      kind: 'merch',
      refId: item.id,
      name: item.name,
      qty: 1,
      unit_price_cents: item.price_cents,
    });
    toast.success('Agregado al carrito', {
      description: item.name,
    });
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-5 w-5 text-brand-orange" />
          <h3 className="font-semibold">Recomendado para ti</h3>
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4">
            <Skeleton className="h-24 w-full mb-3" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-brand-orange" />
        <h3 className="font-semibold">Recomendado para ti</h3>
      </div>

      {items.map((item) => (
        <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
          {item.preview_url && (
            <img
              src={item.preview_url}
              alt={item.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
          )}
          <h4 className="font-medium text-sm mb-1">{item.name}</h4>
          <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-primary">{formatCurrency(item.price_cents)}</span>
            <Button
              size="sm"
              onClick={() => handleAddToCart(item)}
              className="gap-1"
            >
              <Plus className="h-4 w-4" />
              Agregar
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
