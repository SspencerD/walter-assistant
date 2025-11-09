import { Card } from "@/components/ui/card";
import { EventCategory } from "@/lib/fixtures";
import { format } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";
import monticelloStage from "@/assets/img/monticellostage.svg";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SECTIONS_MONTICELLO } from "@/utils/Sections";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SeatMatrix } from "@/components/SeatMatrix";

interface EventInformationProps {
  id: string;
  category: EventCategory;
  description: string;
  name: string;
  date: string;
  venue: string;
  image_url: string;
}

export function EventInformation() {
  const { state } = useLocation();
  const navigation = useNavigate();
  const { name, description, date, venue, image_url } =
    state.data as EventInformationProps;
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [seatSelected, setSeatSelected] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);

  const seats = Array.from({ length: 50 }).map((_, i) => ({
    id: `A${i}`,
    section: selectedSection || "General",
    row: String.fromCharCode(65 + Math.floor(i / 10)), // A, B, C...
    number: (i % 10) + 1,
    price: 45000 + Math.floor(Math.random() * 5000),
    available: Math.random() > 0.2,
    reducedVisibility: Math.random() > 0.8,
    reducedAccess: Math.random() > 0.9,
  }));
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full p-6 mb-6">
        {image_url && (
          <img
            src={image_url}
            alt={name}
            className="w-full h-auto mb-4 rounded-lg"
          />
        )}
        <h2 className="mb-2 text-2xl font-bold text-center">{name}</h2>
        <p className="mb-4 text-gray-700">{description}</p>
        <p className="mb-1 text-gray-600">
          Fecha: {format(new Date(date), "dd/MM/yyyy HH:mm")}
        </p>
        <p className="mb-1 text-gray-600">Lugar: {venue}</p>
      </Card>
      <Card className="flex flex-col p-6 mb-4 rounded-md shadow-md md:w-1/2 item-center">
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-semibold text-purple-800">
            Mapa de ubicaciones
          </p>
          <p className="text-lg font-medium text-gray-600">{venue}</p>
          <div className="flex flex-col items-center w-full mt-4">
            <div className="p-4 mx-auto max-w-7xl">
              <img src={monticelloStage} alt="Stage Layout" className="mb-4" />
              {step === 0 ? (
                <div className="flex flex-col items-center w-full">
                  <div className="flex flex-col w-full">
                    <p className="mb-4 font-sans text-xl font-medium text-center">
                      Secciones del stage
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-4 md:grid-cols-2 lg:grid-cols-2">
                      {SECTIONS_MONTICELLO.map((section) => {
                        return (
                          <div
                            key={section.id}
                            className="flex items-center mb-2 "
                          >
                            <div
                              className="w-6 h-6 mr-2 rounded"
                              style={{ backgroundColor: section.color }}
                            ></div>
                            <span>{section.name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <Label className="w-full">
                      Selecciona una sección
                      <Select
                        onValueChange={(value) => setSelectedSection(value)}
                        value={selectedSection}
                        aria-label="País de residencia"
                      >
                        <SelectTrigger className="w-full px-3 py-2 mt-2 text-sm text-left bg-white border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder="Seleccione una sección" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {SECTIONS_MONTICELLO.map((section) => (
                              <SelectItem key={section.id} value={section.id}>
                                {section.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </Label>
                  </div>
                  <Button
                    className="px-4 py-2 mt-6 text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
                    disabled={!selectedSection}
                    onClick={() => setStep(1)}
                  >
                    Continuar a la selección de asientos
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="max-w-4xl mx-auto mt-10">
                    <h1 className="mb-6 text-2xl font-semibold text-center">
                      Selecciona tu asiento
                    </h1>
                    <SeatMatrix
                      seats={seats}
                      rows={["A", "B", "C", "D", "E"]}
                      cols={10}
                      onSelect={(seat) => setSeatSelected(seat.id)}
                    />
                  </div>
                  <div className="flex justify-center w-full">
                    <Button
                      className="px-4 py-2 mt-6 text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50"
                      disabled={!seatSelected}
                      onClick={() => {
                        navigation("/checkout");
                    }}
                  >
                   ir al pago
                  </Button>
                  </div>
                </div>
              )}
            </div>
            {/*  <SeatPicker
        sections={SECTIONS_MONTICELLO}
        multiple
        maxSelect={2}
        onChange={(ids) => console.log("Seleccionadas:", ids)}
        onSelectSection={(s) => console.log("Última elegida:", s)}
        viewBox="0 0 687 496" 
        backgroundUrl={monticelloStage}
      /> */}
          </div>
        </div>
      </Card>
    </div>
  );
}
