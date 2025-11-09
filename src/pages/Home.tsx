import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockEvents, mockVenues, EventCategory } from "@/lib/fixtures";
import { EventCard } from "@/components/EventCard";
import { VenueCard } from "@/components/VenueCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Music, Trophy, Sparkles, Theater, Store } from "lucide-react";

const categoryIcons = {
  musica: Music,
  deportes: Trophy,
  espectaculo: Sparkles,
  "artes-teatro": Theater,
  "ferias-expo": Store,
};

const categoryLabels = {
  musica: "Música",
  deportes: "Deportes",
  espectaculo: "Espectáculo",
  "artes-teatro": "Artes y Teatro",
  "ferias-expo": "Ferias y Expo",
};

const Home = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | "all">("all");

  const topSellerEvents = mockEvents.filter((e) => e.is_top_seller);
  const upcomingEvents = mockEvents.filter((e) => e.is_upcoming);
  
  const filteredEvents = selectedCategory === "all" 
    ? mockEvents.filter((e) => !e.is_top_seller && !e.is_upcoming)
    : mockEvents.filter((e) => e.category === selectedCategory);

  const handleEventClick = (event:{
    id: string;
    category: EventCategory;
    name: string;
    date: string;
    venue: string;
    image_url: string;

  }) => {
    const eventId = event.id
    console.log("Event ID:", eventId);
    if (!eventId) return;
    // Navigate to queue with event context
    navigate(`/event/${eventId}`, { state: { data: event } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Carousel - Top Sellers */}
      <section className="px-4 py-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-6 text-3xl font-bold">Los Más Vendidos</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {topSellerEvents.map((event) => (
                <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                  <EventCard event={event} onClick={() => handleEventClick(event)} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="px-4 py-12">
          <div className="container mx-auto max-w-7xl">
            <h2 className="mb-6 text-3xl font-bold">Próximamente</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} onClick={() => handleEventClick(event.id)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Filter */}
      <section className="px-4 py-12 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-6 text-3xl font-bold">Explora por Categoría</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              Todos
            </Button>
            {(Object.keys(categoryLabels) as EventCategory[]).map((category) => {
              const Icon = categoryIcons[category];
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {categoryLabels[category]}
                </Button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} onClick={() => handleEventClick(event.id)} />
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-7xl">
          <h2 className="mb-2 text-3xl font-bold">Lugares y Recintos</h2>
          <p className="mb-6 text-muted-foreground">
            Descubre los mejores estadios, teatros y arenas donde se realizan los eventos
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} onClick={() => {}} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
