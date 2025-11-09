"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type Seat = {
  id: string;
  section: string;
  row: string;
  number: number;
  price: number;
  available: boolean;
  reducedVisibility?: boolean;
  reducedAccess?: boolean;
};

interface SeatMatrixProps {
  seats: Seat[]; // Lista de asientos
  rows: string[]; // Etiquetas de filas (A, B, C...)
  cols: number;   // Cantidad de columnas
  onSelect?: (seat: Seat) => void;
}

export function SeatMatrix({ seats, rows, cols, onSelect }: SeatMatrixProps) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const handleSelect = (seat: Seat) => {
    if (!seat.available) return;
    setSelectedSeat(seat.id);
    onSelect?.(seat);
  };

  const getSeatColor = (seat: Seat) => {
    if (!seat.available) return "bg-gray-400";
    if (seat.reducedVisibility || seat.reducedAccess) return "bg-yellow-500";
    if (selectedSeat === seat.id) return "bg-indigo-600";
    return "bg-emerald-500";
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="space-y-6">
        {/* Matriz de asientos */}
        <Card className="p-4 shadow-sm">
          <div className="grid justify-center gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 2rem)` }}>
            {rows.map((row) =>
              seats
                .filter((s) => s.row === row)
                .map((seat) => (
                  <Tooltip key={seat.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSelect(seat)}
                        className={cn(
                          "w-8 h-8 rounded-md transition-colors",
                          getSeatColor(seat),
                          !seat.available && "cursor-not-allowed opacity-60",
                          seat.available && "hover:scale-105"
                        )}
                      >
                        <span className="text-xs font-semibold text-white">{seat.number}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-sm">
                      <div className="space-y-1">
                        <p><strong>Sección:</strong> {seat.section}</p>
                        <p><strong>Fila:</strong> {seat.row}</p>
                        <p><strong>Asiento:</strong> {seat.number}</p>
                        <p><strong>Precio:</strong> ${seat.price.toLocaleString()}</p>
                        <p><strong>Estado:</strong> {seat.available ? "Disponible" : "Ocupado"}</p>
                        {seat.reducedVisibility && <p className="text-yellow-600">Visibilidad reducida</p>}
                        {seat.reducedAccess && <p className="text-yellow-600">Acceso reducido</p>}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                ))
            )}
          </div>
        </Card>

        {/* Infografía */}
        <Card className="p-3 text-sm">
          <p className="mb-2 font-semibold">Leyenda:</p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500" />
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded" />
              <span>Ocupado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded" />
              <span>Visibilidad o acceso reducido</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-indigo-600 rounded" />
              <span>Seleccionado</span>
            </div>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  );
}
