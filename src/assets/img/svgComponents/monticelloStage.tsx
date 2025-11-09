// src/assets/monticelloStage.tsx
import * as React from "react";

/**
 * Fondo/base del mapa de Monticello para usar dentro del <svg> de SeatPicker.
 * No contiene zonas/paths seleccionables. Solo decorativos (escenario, pasillos, labels).
 * Úsalo insertándolo como <MonticelloBackdrop /> dentro del <svg> del SeatPicker,
 * antes de iterar las secciones.
 */
export function MonticelloBackdrop(props: React.SVGProps<SVGGElement>) {
  return (
    <g {...props} aria-label="Decoración Monticello">
      {/* Escenario */}
      <rect x={450} y={40} width={300} height={80} rx={10} fill="#111111" />
      <text
        x={600}
        y={93}
        textAnchor="middle"
        fontSize={28}
        fill="#ffffff"
        style={{ pointerEvents: "none", fontWeight: 700 }}
      >
        Escenario
      </text>

      {/* Pasillos / guía visual muy ligera (opcional) */}
      <g opacity={0.08}>
        <rect x={0} y={0} width={1200} height={600} fill="#000" />
      </g>

      {/* Etiquetas de referencia de zonas (opcional, solo guía visual) */}
      <text x={600} y={180} textAnchor="middle" fontSize={14} fill="#6b7280">
        Zona central
      </text>
      <text x={250} y={260} textAnchor="middle" fontSize={12} fill="#6b7280">
        Anillo lateral Izquierdo
      </text>
      <text x={950} y={260} textAnchor="middle" fontSize={12} fill="#6b7280">
        Anillo lateral Derecho
      </text>
      <text x={600} y={360} textAnchor="middle" fontSize={12} fill="#6b7280">
        Segundo nivel
      </text>

      {/* Puedes dibujar pasillos como líneas suaves si quieres más contexto */}
      <g stroke="#9CA3AF" strokeDasharray="6 6" strokeWidth={1} opacity={0.4}>
        <line x1={120} y1={210} x2={1080} y2={210} />
        <line x1={120} y1={310} x2={1080} y2={310} />
      </g>
    </g>
  );
}

export default MonticelloBackdrop;
