import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currency";
import { Calendar, MapPin } from "lucide-react";
import { Event } from "@/lib/fixtures";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export const EventCard = ({ event, onClick }: EventCardProps) => {
  const eventDate = new Date(event.date);
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg group"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={event.image_url} 
          alt={event.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        {event.is_top_seller && (
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            Más Vendido
          </Badge>
        )}
        {event.is_upcoming && (
          <Badge className="absolute top-2 right-2 bg-accent text-foreground">
            Próximamente
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold transition-colors line-clamp-2 group-hover:text-primary">
          {event.name}
        </h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(eventDate, "d 'de' MMMM, yyyy - HH:mm", { locale: es })}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{event.venue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm text-muted-foreground">Desde</span>
          <span className="text-lg font-bold text-primary">
            {formatCurrency(event.price_from_cents)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
