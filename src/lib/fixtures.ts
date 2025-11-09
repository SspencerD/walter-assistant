import type { MerchItem, SeatOption } from '@/types';

export const mockEvent = {
  id: 'evento-1',
  name: 'Gran Arena Monticello',
  date: '2025-12-15T20:00:00',
  venue: 'Arena Monticello',
};

export const mockSeatOptions: SeatOption[] = [
  {
    section_id: 'primeras-filas',
    section_name: 'Primeras Filas',
    score: 95,
    motivo: 'Vista perfecta del escenario, cerca de la acción, excelente acústica',
    preview_url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    price_cents: 17250000,
  },
  {
    section_id: 'platinum',
    section_name: 'Platinum',
    score: 92,
    motivo: 'Vista frontal premium, asientos cómodos, buen balance precio-calidad',
    preview_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    price_cents: 12650000,
  },
  {
    section_id: 'black',
    section_name: 'Black',
    score: 88,
    motivo: 'Excelente vista lateral, buen precio, asientos espaciosos',
    preview_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop',
    price_cents: 10350000,
  },
  {
    section_id: 'platea-joker-bajo',
    section_name: 'Platea Joker Bajo',
    score: 85,
    motivo: 'Buena vista frontal, precio accesible, cerca de servicios',
    preview_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    price_cents: 10235000,
  },
  {
    section_id: 'platea-corazon-bajo',
    section_name: 'Platea Corazón Bajo',
    score: 85,
    motivo: 'Excelente ubicación central, vista equilibrada del escenario',
    preview_url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
    price_cents: 10235000,
  },
];

export const mockMerchItems: MerchItem[] = [
  {
    id: 1,
    name: 'Polera Oficial del Evento',
    price_cents: 2500000,
    tags: ['ropa', 'popular'],
    preview_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Polera 100% algodón con diseño exclusivo',
  },
  {
    id: 2,
    name: 'Gorra Edición Limitada',
    price_cents: 1800000,
    tags: ['ropa', 'limitado'],
    preview_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
    description: 'Gorra ajustable con bordado premium',
  },
  {
    id: 3,
    name: 'Poster del Concierto',
    price_cents: 1200000,
    tags: ['coleccionable'],
    preview_url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop',
    description: 'Poster oficial tamaño A2, papel de alta calidad',
  },
  {
    id: 4,
    name: 'Taza Conmemorativa',
    price_cents: 900000,
    tags: ['accesorio', 'popular'],
    preview_url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
    description: 'Taza cerámica con diseño exclusivo',
  },
  {
    id: 5,
    name: 'Llavero Premium',
    price_cents: 600000,
    tags: ['accesorio'],
    preview_url: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
    description: 'Llavero metálico con acabado de lujo',
  },
  {
    id: 6,
    name: 'Hoodie Oficial',
    price_cents: 3500000,
    tags: ['ropa', 'premium'],
    preview_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
    description: 'Hoodie unisex con capucha y bolsillos',
  },
];

export const sections = [
  { id: 'primeras-filas', name: 'Primeras Filas', price_cents: 17250000, color: '#D946A6', available_seats: 45 },
  { id: 'platinum', name: 'Platinum', price_cents: 12650000, color: '#E91E63', available_seats: 120 },
  { id: 'black', name: 'Black', price_cents: 10350000, color: '#1A1A1A', available_seats: 85 },
  { id: 'platea-joker-bajo', name: 'Platea Joker Bajo', price_cents: 10235000, color: '#4CAF50', available_seats: 200 },
  { id: 'platea-corazon-bajo', name: 'Platea Corazón Bajo', price_cents: 10235000, color: '#F44336', available_seats: 180 },
  { id: 'platea-diamante-bajo', name: 'Platea Diamante Bajo', price_cents: 10235000, color: '#E1BEE7', available_seats: 190 },
  { id: 'platea-pica-bajo-vp', name: 'Platea Pica Bajo V/P', price_cents: 10235000, color: '#FFE082', available_seats: 95 },
  { id: 'platea-trebol-bajo-vp', name: 'Platea Trébol Bajo V/P', price_cents: 10235000, color: '#64B5F6', available_seats: 100 },
  { id: 'platea-pica-bajo', name: 'Platea Pica Bajo', price_cents: 10235000, color: '#FFA726', available_seats: 210 },
  { id: 'platea-trebol-bajo', name: 'Platea Trébol Bajo', price_cents: 10235000, color: '#42A5F5', available_seats: 205 },
  { id: 'platea-joker-alto', name: 'Platea Joker Alto', price_cents: 7475000, color: '#81C784', available_seats: 250 },
  { id: 'platea-diamante-alta', name: 'Platea Diamante Alta', price_cents: 7475000, color: '#F8BBD0', available_seats: 240 },
  { id: 'platea-corazon-alta', name: 'Platea Corazón Alta', price_cents: 7475000, color: '#EF5350', available_seats: 230 },
  { id: 'platea-pica-alto', name: 'Platea Pica Alto', price_cents: 7475000, color: '#FFCC80', available_seats: 260 },
  { id: 'platea-trebol-alto', name: 'Platea Trébol Alto', price_cents: 7475000, color: '#90CAF9', available_seats: 255 },
  { id: 'platea-pica-alto-vp', name: 'Platea Pica Alto V/P', price_cents: 4485000, color: '#FFD54F', available_seats: 320 },
  { id: 'platea-trebol-alto-vp', name: 'Platea Trébol Alto V/P', price_cents: 4485000, color: '#81D4FA', available_seats: 310 },
  { id: 'silla-ruedas', name: 'Silla de Ruedas', price_cents: 10235000, color: '#757575', available_seats: 12 },
];

export type EventCategory = 'musica' | 'deportes' | 'espectaculo' | 'artes-teatro' | 'ferias-expo';

export type Event = {
  id: string;
  name?: string;
  category?: EventCategory;
  description?: string;
  date?: string;
  venue?: string;
  venue_id?: string;
  image_url?: string;
  price_from_cents?: number;
  is_top_seller?: boolean;
  is_upcoming?: boolean;
};

export type Venue = {
  id: string;
  name: string;
  type: 'estadio' | 'teatro' | 'sitio' | 'arena';
  location: string;
  capacity: number;
  image_url: string;
};

export const mockEvents: Event[] = [
  // Top Sellers
  {
    id: 'evento-1',
    name: 'Coldplay - Music of the Spheres',
    category: 'musica',
    description: 'Un viaje a través de la música de Coldplay. No te pierdas su espectacular show en vivo.',
    date: '2025-12-15T20:00:00',
    venue: 'Arena Monticello',
    venue_id: 'venue-1',
    image_url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop',
    price_from_cents: 7475000,
    is_top_seller: true,
  },
  {
    id: 'evento-2',
    name: 'Taylor Swift - The Eras Tour',
    category: 'musica',
    date: '2025-11-20T21:00:00',
    venue: 'Estadio Nacional',
    venue_id: 'venue-2',
    image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
    price_from_cents: 10235000,
    is_top_seller: true,
  },
  {
    id: 'evento-3',
    name: 'Universidad de Chile vs Colo-Colo',
    category: 'deportes',
    date: '2025-11-25T18:00:00',
    venue: 'Estadio Nacional',
    venue_id: 'venue-2',
    image_url: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=600&fit=crop',
    price_from_cents: 2500000,
    is_top_seller: true,
  },
  // Música
  {
    id: 'evento-4',
    name: 'Bruno Mars en Concierto',
    category: 'musica',
    date: '2025-12-01T20:00:00',
    venue: 'Movistar Arena',
    venue_id: 'venue-4',
    image_url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop',
    price_from_cents: 8500000,
    is_upcoming: true,
  },
  {
    id: 'evento-5',
    name: 'Bad Bunny - World Tour',
    category: 'musica',
    date: '2026-01-15T21:00:00',
    venue: 'Arena Monticello',
    venue_id: 'venue-1',
    image_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    price_from_cents: 9200000,
    is_upcoming: true,
  },
  // Deportes
  {
    id: 'evento-6',
    name: 'Chile vs Argentina - Eliminatorias',
    category: 'deportes',
    date: '2025-12-10T20:30:00',
    venue: 'Estadio Nacional',
    venue_id: 'venue-2',
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop',
    price_from_cents: 4500000,
  },
  {
    id: 'evento-7',
    name: 'NBA - Los Angeles Lakers vs Golden State Warriors',
    category: 'deportes',
    date: '2026-02-20T19:00:00',
    venue: 'Movistar Arena',
    venue_id: 'venue-4',
    image_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
    price_from_cents: 15000000,
  },
  // Espectáculo
  {
    id: 'evento-8',
    name: 'Cirque du Soleil - Crystal',
    category: 'espectaculo',
    date: '2025-12-05T19:00:00',
    venue: 'Arena Monticello',
    venue_id: 'venue-1',
    image_url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop',
    price_from_cents: 6500000,
  },
  {
    id: 'evento-9',
    name: 'Disney on Ice',
    category: 'espectaculo',
    date: '2026-01-10T17:00:00',
    venue: 'Movistar Arena',
    venue_id: 'venue-4',
    image_url: 'https://images.unsplash.com/photo-1464047736614-af63643285bf?w=800&h=600&fit=crop',
    price_from_cents: 3500000,
  },
  // Artes y Teatro
  {
    id: 'evento-10',
    name: 'El Fantasma de la Ópera',
    category: 'artes-teatro',
    date: '2025-11-30T20:00:00',
    venue: 'Teatro Municipal',
    venue_id: 'venue-3',
    image_url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&h=600&fit=crop',
    price_from_cents: 4500000,
  },
  {
    id: 'evento-11',
    name: 'Ballet Nacional - El Cascanueces',
    category: 'artes-teatro',
    date: '2025-12-20T19:00:00',
    venue: 'Teatro Municipal',
    venue_id: 'venue-3',
    image_url: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=800&h=600&fit=crop',
    price_from_cents: 3800000,
  },
  // Ferias y Expo
  {
    id: 'evento-12',
    name: 'Feria del Libro Santiago',
    category: 'ferias-expo',
    date: '2025-11-22T10:00:00',
    venue: 'Centro Cultural Estación Mapocho',
    venue_id: 'venue-5',
    image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
    price_from_cents: 500000,
  },
  {
    id: 'evento-13',
    name: 'Expo Comida Internacional',
    category: 'ferias-expo',
    date: '2026-03-15T11:00:00',
    venue: 'Centro Cultural Estación Mapocho',
    venue_id: 'venue-5',
    image_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
    price_from_cents: 800000,
  },
];

export const mockVenues: Venue[] = [
  {
    id: 'venue-1',
    name: 'Arena Monticello',
    type: 'arena',
    location: 'San Francisco de Mostazal',
    capacity: 15000,
    image_url: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600&h=400&fit=crop',
  },
  {
    id: 'venue-2',
    name: 'Estadio Nacional',
    type: 'estadio',
    location: 'Ñuñoa, Santiago',
    capacity: 48665,
    image_url: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=400&fit=crop',
  },
  {
    id: 'venue-3',
    name: 'Teatro Municipal',
    type: 'teatro',
    location: 'Santiago Centro',
    capacity: 1500,
    image_url: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=600&h=400&fit=crop',
  },
  {
    id: 'venue-4',
    name: 'Movistar Arena',
    type: 'arena',
    location: 'Macul, Santiago',
    capacity: 15000,
    image_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
  },
  {
    id: 'venue-5',
    name: 'Centro Cultural Estación Mapocho',
    type: 'sitio',
    location: 'Santiago Centro',
    capacity: 5000,
    image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop',
  },
  {
    id: 'venue-6',
    name: 'Estadio Monumental',
    type: 'estadio',
    location: 'Macul, Santiago',
    capacity: 47347,
    image_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop',
  },
];
