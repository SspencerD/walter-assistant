import { Section } from "@/components/SeatPicker";

export const SECTIONS: Section[] = [
  {
    id: "PRIMERAS_FILAS",
    name: "Primeras Filas",
    price: 150000,
    fee: 22500,
    color: "#9B5CF6",
    d: "M120,180 L260,180 L260,240 L120,240 Z",
  },
  {
    id: "PLATINUM",
    name: "Platinum",
    price: 110000,
    fee: 16500,
    color: "#E24066",
    d: "M280,180 L420,180 L420,240 L280,240 Z",
  },
  // ...tus paths reales exportados del SVG
];
// helper rápido para rand
const rnd = (min: number, max: number) =>
  Math.round((Math.random() * (max - min) + min) / 10) * 10;

export const SECTIONS_MONTICELLO: Section[] = [
  // Frente escenario (centrales)
  {
    id: "PRIMERAS_FILAS",
    name: "Primeras Filas",
    price: 150_000,
    fee: 22_500,
    color: "#8E63E6", // violeta
    d: "M0,0 h10 v10 h-10 Z" // REEMPLAZAR por path real
  },
  {
    id: "PLATINUM",
    name: "Platinum",
    price: 110_000,
    fee: 16_500,
    color: "#E24066", // rojo frambuesa
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "BLACK",
    name: "Black",
    price: 90_000,
    fee: 13_500,
    color: "#2E2E2E", // negro
    d: "M0,0 h10 v10 h-10 Z"
  },

  // Anillo bajo (cercano)
  {
    id: "PLATEA_JOKER_BAJO",
    name: "Platea Joker Bajo",
    price: rnd(85_000, 95_000),
    fee: 13_350,
    color: "#2E97F2", // azul medio
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_CORAZON_BAJO",
    name: "Platea Corazón Bajo",
    price: rnd(85_000, 95_000),
    fee: 13_350,
    color: "#E33B3B", // rojo
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_DIAMANTE_BAJO",
    name: "Platea Diamante Bajo",
    price: rnd(85_000, 95_000),
    fee: 13_350,
    color: "#F5A2E5", // rosado claro
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_PICA_BAJO_VP",
    name: "Platea Pica Bajo V/P",
    price: rnd(85_000, 95_000),
    fee: 13_350,
    color: "#6CC9FF", // celeste
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_TREBOL_BAJO_VP",
    name: "Platea Trébol Bajo V/P",
    price: rnd(85_000, 95_000),
    fee: 13_350,
    color: "#B7F3FF", // celeste muy claro
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_PICA_BAJO",
    name: "Platea Pica Bajo",
    price: rnd(85_000, 95_000),
    fee: 13_350,
    color: "#6DA8FF", // azul pastel
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_TREBOL_BAJO",
    name: "Platea Trébol Bajo",
    price: rnd(85_000, 95_000),
    fee: 13_350,
    color: "#AEE7FF", // celeste pastel
    d: "M0,0 h10 v10 h-10 Z"
  },

  // Anillo alto (segundo nivel)
  {
    id: "PLATEA_JOKER_ALTO",
    name: "Platea Joker Alto",
    price: 65_000,
    fee: 9_750,
    color: "#1A77C7", // azul más oscuro
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_DIAMANTE_ALTA",
    name: "Platea Diamante Alta",
    price: 65_000,
    fee: 9_750,
    color: "#F38DD9", // rosa
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_CORAZON_ALTA",
    name: "Platea Corazón Alta",
    price: 65_000,
    fee: 9_750,
    color: "#E56A7B", // rojo rosado
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_PICA_ALTO",
    name: "Platea Pica Alto",
    price: 65_000,
    fee: 9_750,
    color: "#9CD6FF", // celeste suave
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_TREBOL_ALTO",
    name: "Platea Trébol Alto",
    price: 65_000,
    fee: 9_750,
    color: "#C7F0FF", // muy claro
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_PICA_ALTO_VP",
    name: "Platea Pica Alto V/P",
    price: 39_000,
    fee: 5_850,
    color: "#FFD466", // amarillo pálido
    d: "M0,0 h10 v10 h-10 Z"
  },
  {
    id: "PLATEA_TREBOL_ALTO_VP",
    name: "Platea Trébol Alto V/P",
    price: 39_000,
    fee: 5_850,
    color: "#FFB700", // amarillo
    d: "M0,0 h10 v10 h-10 Z"
  },

  // Accesibilidad
  {
    id: "SILLA_DE_RUEDAS",
    name: "Silla de Ruedas",
    price: 89_000,
    fee: 13_350,
    color: "#A0A0A0", // gris
    d: "M0,0 h10 v10 h-10 Z",
    status: "available"
  }
];
