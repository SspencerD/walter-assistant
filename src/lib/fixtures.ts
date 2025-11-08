import type { MerchItem, SeatOption } from "@/types";

export const mockEvent = {
  id: "evento-1",
  name: "Gran Arena Monticello",
  date: "2025-12-15T20:00:00",
  venue: "Arena Monticello",
};

export const mockSeatOptions: SeatOption[] = [
  {
    section_id: "primeras-filas",
    section_name: "Primeras Filas",
    score: 95,
    motivo:
      "Vista perfecta del escenario, cerca de la acción, excelente acústica",
    preview_url:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=600&fit=crop",
    price_cents: 17250000,
  },
  {
    section_id: "platinum",
    section_name: "Platinum",
    score: 92,
    motivo:
      "Vista frontal premium, asientos cómodos, buen balance precio-calidad",
    preview_url:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    price_cents: 12650000,
  },
  {
    section_id: "black",
    section_name: "Black",
    score: 88,
    motivo: "Excelente vista lateral, buen precio, asientos espaciosos",
    preview_url:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=600&fit=crop",
    price_cents: 10350000,
  },
  {
    section_id: "platea-joker-bajo",
    section_name: "Platea Joker Bajo",
    score: 85,
    motivo: "Buena vista frontal, precio accesible, cerca de servicios",
    preview_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
    price_cents: 10235000,
  },
  {
    section_id: "platea-corazon-bajo",
    section_name: "Platea Corazón Bajo",
    score: 85,
    motivo: "Excelente ubicación central, vista equilibrada del escenario",
    preview_url:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    price_cents: 10235000,
  },
];

export const mockMerchItems: MerchItem[] = [
  {
    id: 1,
    name: "Polera Oficial del Evento",
    price_cents: 2500000,
    tags: ["ropa", "popular"],
    preview_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description: "Polera 100% algodón con diseño exclusivo",
  },
  {
    id: 2,
    name: "Gorra Edición Limitada",
    price_cents: 1800000,
    tags: ["ropa", "limitado"],
    preview_url:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop",
    description: "Gorra ajustable con bordado premium",
  },
  {
    id: 3,
    name: "Poster del Concierto",
    price_cents: 1200000,
    tags: ["coleccionable"],
    preview_url:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&h=400&fit=crop",
    description: "Poster oficial tamaño A2, papel de alta calidad",
  },
  {
    id: 4,
    name: "Taza Conmemorativa",
    price_cents: 900000,
    tags: ["accesorio", "popular"],
    preview_url:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    description: "Taza cerámica con diseño exclusivo",
  },
  {
    id: 5,
    name: "Llavero Premium",
    price_cents: 600000,
    tags: ["accesorio"],
    preview_url:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    description: "Llavero metálico con acabado de lujo",
  },
  {
    id: 6,
    name: "Hoodie Oficial",
    price_cents: 3500000,
    tags: ["ropa", "premium"],
    preview_url:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    description: "Hoodie unisex con capucha y bolsillos",
  },
];

export const sections = [
  {
    id: "primeras-filas",
    name: "Primeras Filas",
    price_cents: 17250000,
    color: "#D946A6",
    available_seats: 45,
  },
  {
    id: "platinum",
    name: "Platinum",
    price_cents: 12650000,
    color: "#E91E63",
    available_seats: 120,
  },
  {
    id: "black",
    name: "Black",
    price_cents: 10350000,
    color: "#1A1A1A",
    available_seats: 85,
  },
  {
    id: "platea-joker-bajo",
    name: "Platea Joker Bajo",
    price_cents: 10235000,
    color: "#4CAF50",
    available_seats: 200,
  },
  {
    id: "platea-corazon-bajo",
    name: "Platea Corazón Bajo",
    price_cents: 10235000,
    color: "#F44336",
    available_seats: 180,
  },
  {
    id: "platea-diamante-bajo",
    name: "Platea Diamante Bajo",
    price_cents: 10235000,
    color: "#E1BEE7",
    available_seats: 190,
  },
  {
    id: "platea-pica-bajo-vp",
    name: "Platea Pica Bajo V/P",
    price_cents: 10235000,
    color: "#FFE082",
    available_seats: 95,
  },
  {
    id: "platea-trebol-bajo-vp",
    name: "Platea Trébol Bajo V/P",
    price_cents: 10235000,
    color: "#64B5F6",
    available_seats: 100,
  },
  {
    id: "platea-pica-bajo",
    name: "Platea Pica Bajo",
    price_cents: 10235000,
    color: "#FFA726",
    available_seats: 210,
  },
  {
    id: "platea-trebol-bajo",
    name: "Platea Trébol Bajo",
    price_cents: 10235000,
    color: "#42A5F5",
    available_seats: 205,
  },
  {
    id: "platea-joker-alto",
    name: "Platea Joker Alto",
    price_cents: 7475000,
    color: "#81C784",
    available_seats: 250,
  },
  {
    id: "platea-diamante-alta",
    name: "Platea Diamante Alta",
    price_cents: 7475000,
    color: "#F8BBD0",
    available_seats: 240,
  },
  {
    id: "platea-corazon-alta",
    name: "Platea Corazón Alta",
    price_cents: 7475000,
    color: "#EF5350",
    available_seats: 230,
  },
  {
    id: "platea-pica-alto",
    name: "Platea Pica Alto",
    price_cents: 7475000,
    color: "#FFCC80",
    available_seats: 260,
  },
  {
    id: "platea-trebol-alto",
    name: "Platea Trébol Alto",
    price_cents: 7475000,
    color: "#90CAF9",
    available_seats: 255,
  },
  {
    id: "platea-pica-alto-vp",
    name: "Platea Pica Alto V/P",
    price_cents: 4485000,
    color: "#FFD54F",
    available_seats: 320,
  },
  {
    id: "platea-trebol-alto-vp",
    name: "Platea Trébol Alto V/P",
    price_cents: 4485000,
    color: "#81D4FA",
    available_seats: 310,
  },
  {
    id: "silla-ruedas",
    name: "Silla de Ruedas",
    price_cents: 10235000,
    color: "#757575",
    available_seats: 12,
  },
];
