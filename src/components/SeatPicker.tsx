/* eslint-disable @typescript-eslint/no-unused-expressions */
import MonticelloBackdrop from "@/assets/img/svgComponents/monticelloStage";
import React, { useMemo, useRef, useState } from "react";

/** Modelo de una sección dibujada como <path> del SVG */
export type Section = {
  id: string;
  name: string;
  price: number;
  fee: number;
  color: string;
  d: string; // path del SVG
  available?: number; // cupos restantes
  status?: "available" | "soldout" | "disabled";
};

export type SeatPickerProps = {
  /** Lista de secciones a pintar (cada una trae su path `d`) */
  sections: Section[];
  /** Permitir seleccionar varias zonas */
  multiple?: boolean;
  /** Límite de selección cuando multiple=true */
  maxSelect?: number;
  /** Selección controlada (ids de secciones) */
  selected?: string[];
  /** Callback al cambiar selección (controlado o no) */
  onChange?: (ids: string[]) => void;
  /** Callback al seleccionar (para pasar al checkout, etc.) */
  onSelectSection?: (s: Section) => void;
  /** viewBox del SVG exportado desde tu editor */
  viewBox?: string;
  /** Mostrar panel lateral con total y lista */
  showSidebar?: boolean;
  /** Título del panel lateral (opcional) */
  sidebarTitle?: string;
  /** Render del botón continuar (opcional) */
  renderContinueButton?: (
    selected: Section[],
    total: number
  ) => React.ReactNode;
  backgroundUrl?: string;
};

const CL = (...xs: (string | false | undefined)[]) =>
  xs.filter(Boolean).join(" ");
const currency = (n: number) =>
  n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export function SeatPicker({
  sections,
  multiple = false,
  maxSelect = 2,
  selected,
  onChange,
  onSelectSection,
  viewBox = "0 0 1200 600",
  showSidebar = true,
  sidebarTitle = "Tu selección",
backgroundUrl,
  renderContinueButton,
}: SeatPickerProps) {
  const [internalSel, setInternalSel] = useState<string[]>([]);
  const [hover, setHover] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; s?: Section }>(
    {
      x: 0,
      y: 0,
    }
  );
  const svgRef = useRef<SVGSVGElement>(null);

  const sel = selected ?? internalSel;
  const selectedSections = useMemo(
    () =>
      sel
        .map((id) => sections.find((s) => s.id === id))
        .filter(Boolean) as Section[],
    [sel, sections]
  );

  const setSel = (next: string[]) => {
    selected ? onChange?.(next) : setInternalSel(next);
    if (next.length && onSelectSection) {
      const s = sections.find((x) => x.id === next[next.length - 1]);
      if (s) onSelectSection(s);
    }
  };

  const pick = (s: Section) => {
    if (s.status === "soldout" || s.status === "disabled") return;
    if (!multiple) return setSel([s.id]);
    const exists = sel.includes(s.id);
    let next = exists ? sel.filter((id) => id !== s.id) : [...sel, s.id];
    if (next.length > maxSelect) next = next.slice(-maxSelect);
    setSel(next);
  };

  const total = useMemo(
    () => selectedSections.reduce((acc, s) => acc + (s.price + s.fee), 0),
    [selectedSections]
  );

  const showTip = (e: React.MouseEvent, s: Section) => {
    const pt = svgRef.current?.createSVGPoint();
    if (!pt) return;
    pt.x = e.clientX;
    pt.y = e.clientY;
    const ctm = svgRef.current!.getScreenCTM();
    if (!ctm) return;
    const p = pt.matrixTransform(ctm.inverse());
    setTooltip({ x: p.x, y: p.y, s });
  };

  return (
    <div
      className={CL("grid gap-4", showSidebar && "md:grid-cols-[1fr_320px]")}
    >
      {/* SVG */}
      <div className="w-full">
        <svg
          ref={svgRef}
          viewBox={viewBox}
          className="w-full h-auto"
          role="img"
          aria-label="Mapa de ubicaciones"
        >
          {backgroundUrl && (
            <MonticelloBackdrop />
          )}
          {/* Secciones */}
          {sections.map((s) => {
            const isSel = sel.includes(s.id);
            const isHover = hover === s.id;
            const disabled = s.status === "disabled";
            const soldout = s.status === "soldout";
            const baseOpacity = soldout ? 0.25 : disabled ? 0.35 : 0.7;
            const opacity = isSel ? 0.95 : isHover ? 0.85 : baseOpacity;
            const stroke = isSel ? "#111" : soldout ? "#999" : "white";
            const strokeWidth = isSel ? 4 : 2;

            return (
              <g key={s.id}>
                <path
                  d={s.d}
                  fill={s.color}
                  opacity={opacity}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  tabIndex={soldout || disabled ? -1 : 0}
                  className={CL(
                    "transition-all duration-150",
                    !soldout && !disabled && "cursor-pointer",
                    soldout && "cursor-not-allowed"
                  )}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  onMouseMove={(e) => showTip(e, s)}
                  onClick={() => pick(s)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && pick(s)
                  }
                />

                {/* Hitbox invisible para facilitar tap en móvil */}
                <path
                  d={s.d}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={18}
                  pointerEvents="stroke"
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  onMouseMove={(e) => showTip(e, s)}
                  onClick={() => pick(s)}
                />
              </g>
            );
          })}

          {/* Tooltip simple dentro del SVG */}
          {hover && tooltip.s && (
            <g transform={`translate(${tooltip.x + 8}, ${tooltip.y - 8})`}>
              <rect
                rx="6"
                width="260"
                height="64"
                fill="white"
                stroke="#e5e7eb"
              />
              <text x="10" y="24" fontSize="14" fill="#111" fontWeight={600}>
                {tooltip.s.name}
              </text>
              <text x="10" y="44" fontSize="13" fill="#6b7280">
                Precio final: {currency(tooltip.s.price + tooltip.s.fee)}
              </text>
              {typeof tooltip.s.available === "number" && (
                <text x="10" y="60" fontSize="12" fill="#6b7280">
                  Cupos: {tooltip.s.available}
                </text>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Sidebar */}
      {showSidebar && (
        <aside className="p-4 bg-white border shadow-sm rounded-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{sidebarTitle}</h3>
            <span className="text-sm text-gray-600">
              Total: <strong>{currency(total)}</strong>
            </span>
          </div>

          {selectedSections.length ? (
            <ul className="mt-2 space-y-2">
              {selectedSections.map((s) => (
                <li key={s.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded"
                      style={{ background: s.color }}
                    />
                    <span>{s.name}</span>
                  </div>
                  <button
                    className="text-xs text-indigo-600"
                    onClick={() => {
                      const next = sel.filter((x) => x !== s.id);
                      setSel(next);
                    }}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              Toca una zona para seleccionar.
            </p>
          )}

          <div className="mt-4">
            {renderContinueButton ? (
              renderContinueButton(selectedSections, total)
            ) : (
              <button
                className="w-full py-2 font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50"
                disabled={!selectedSections.length}
                onClick={() => {
                  /* navega al checkout o dispara onSelectSection del último */
                }}
              >
                Continuar
              </button>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>
              <span className="inline-block w-3 h-3 align-middle mr-1 bg-[rgba(0,0,0,0.7)]"></span>{" "}
              Seleccionado
            </p>
            <p>Secciones agotadas se muestran atenuadas.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
