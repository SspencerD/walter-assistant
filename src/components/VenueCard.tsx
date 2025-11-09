import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";
import { Venue } from "@/lib/fixtures";

interface VenueCardProps {
  venue: Venue;
  onClick?: () => void;
}

const venueTypeLabels = {
  estadio: 'Estadio',
  teatro: 'Teatro',
  sitio: 'Sitio',
  arena: 'Arena',
};

export const VenueCard = ({ venue, onClick }: VenueCardProps) => {
  return (
    <Card 
      className="overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg group"
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img 
          src={venue.image_url} 
          alt={venue.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        <Badge className="absolute top-2 left-2 bg-background/90 text-foreground">
          {venueTypeLabels[venue.type]}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
          {venue.name}
        </h3>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{venue.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>Capacidad: {venue.capacity.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
