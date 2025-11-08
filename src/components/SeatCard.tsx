import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import type { SeatOption } from '@/types';
import { formatCurrency } from '@/lib/currency';

interface SeatCardProps {
  seat: SeatOption;
  onSelect: (seat: SeatOption) => void;
  selected?: boolean;
}

export function SeatCard({ seat, onSelect, selected }: SeatCardProps) {
  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg ${selected ? 'ring-2 ring-primary' : ''}`}>
      <div className="relative h-48">
        <img
          src={seat.preview_url}
          alt={seat.section_name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <Star className="h-4 w-4 text-warning fill-warning" />
          <span className="font-bold text-sm">{seat.score}</span>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg">{seat.section_name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3" />
              <span>Sección {seat.section_id}</span>
            </div>
          </div>
          <Badge variant="secondary" className="whitespace-nowrap">
            {formatCurrency(seat.price_cents)}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground">{seat.motivo}</p>

        <Button
          className="w-full"
          variant={selected ? 'default' : 'outline'}
          onClick={() => onSelect(seat)}
        >
          {selected ? 'Seleccionado' : 'Elegir esta sección'}
        </Button>
      </div>
    </Card>
  );
}
