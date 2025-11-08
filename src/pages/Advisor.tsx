import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { SeatCard } from '@/components/SeatCard';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStore } from '@/store/useStore';
import { getSeatAdvice } from '@/lib/api';
import type { SeatOption, UserPreferences } from '@/types';
import { Sparkles, ArrowRight, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import seatingMap from '@/assets/seating-map.png';
import { sections } from '@/lib/fixtures';
import { formatCurrency } from '@/lib/currency';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Advisor() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'form' | 'map' | 'results'>('form');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<SeatOption[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const preferences = useStore((state) => state.preferences);
  const setPreferences = useStore((state) => state.setPreferences);
  const seatSelection = useStore((state) => state.seatSelection);
  const setSeatSelection = useStore((state) => state.setSeatSelection);

  const [formData, setFormData] = useState<UserPreferences>(
    preferences || {
      age: undefined,
      sex: undefined,
      height: undefined,
      mobility_reduced: false,
      vision_problems: false,
    }
  );

  const handleFormChange = (field: keyof UserPreferences, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitForm = () => {
    setPreferences(formData);
    setStep('map');
  };

  const handleSelectFromMap = async () => {
    if (!selectedSection) {
      toast.error('Selecciona una zona del mapa');
      return;
    }

    setLoading(true);
    try {
      const result = await getSeatAdvice('evento-1', { ...formData, section: selectedSection } as any);
      setRecommendations(result.top);
      setStep('results');
    } catch (error) {
      toast.error('Error al obtener recomendaciones');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const result = await getSeatAdvice('evento-1', formData);
      setRecommendations(result.top);
      setStep('results');
    } catch (error) {
      toast.error('Error al obtener recomendaciones');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSeat = (seat: SeatOption) => {
    setSeatSelection(seat);
    toast.success('Sección seleccionada', {
      description: seat.section_name,
    });
  };

  const handleProceedToCheckout = () => {
    if (!seatSelection) {
      toast.error('Selecciona una sección primero');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {/* Step 1: Form */}
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="h-6 w-6 text-brand-purple" />
                  <h1 className="text-2xl font-bold">Encuentra tu asiento perfecto</h1>
                </div>

                <p className="text-muted-foreground mb-6">
                  Responde estas preguntas para recibir recomendaciones personalizadas
                </p>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Edad</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={formData.age || ''}
                        onChange={(e) => handleFormChange('age', parseInt(e.target.value))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sex">Sexo</Label>
                      <Select
                        value={formData.sex}
                        onValueChange={(v) => handleFormChange('sex', v)}
                      >
                        <SelectTrigger id="sex">
                          <SelectValue placeholder="Selecciona" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="m">Masculino</SelectItem>
                          <SelectItem value="f">Femenino</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={formData.height || ''}
                      onChange={(e) => handleFormChange('height', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="mobility"
                        checked={formData.mobility_reduced}
                        onCheckedChange={(checked) =>
                          handleFormChange('mobility_reduced', checked === true)
                        }
                      />
                      <Label htmlFor="mobility" className="cursor-pointer">
                        Movilidad reducida
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vision"
                        checked={formData.vision_problems}
                        onCheckedChange={(checked) =>
                          handleFormChange('vision_problems', checked === true)
                        }
                      />
                      <Label htmlFor="vision" className="cursor-pointer">
                        Problemas de visión
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={handleSubmitForm} className="flex-1">
                    Ver mapa de ubicaciones
                  </Button>
                  <Button onClick={handleGetRecommendations} variant="outline" className="flex-1">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Recomendaciones IA
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Map Selection */}
          {step === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-6 w-6 text-brand-orange" />
                  <h2 className="text-2xl font-bold">Selecciona tu zona preferida</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                  Haz clic en una zona para ver el precio. Luego obtén recomendaciones personalizadas.
                </p>

                {/* Seating Map */}
                <div className="relative bg-muted rounded-lg p-4 mb-6">
                  <img
                    src={seatingMap}
                    alt="Mapa de ubicaciones"
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* Section Grid - Interactive */}
                <TooltipProvider>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {sections.map((section) => (
                      <Tooltip key={section.id}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={selectedSection === section.id ? 'default' : 'outline'}
                            className="justify-start h-auto py-3 hover:scale-105 transition-transform"
                            onClick={() => setSelectedSection(section.id)}
                          >
                            <div className="flex items-center gap-2 w-full">
                              <div
                                className="w-4 h-4 rounded flex-shrink-0"
                                style={{ backgroundColor: section.color }}
                              />
                              <div className="flex-1 text-left min-w-0">
                                <span className="text-xs font-medium truncate block">{section.name}</span>
                              </div>
                            </div>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <div className="space-y-1">
                            <p className="font-semibold">{section.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Precio: <span className="font-medium text-foreground">{formatCurrency(section.price_cents)}</span>
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Disponibles: <span className="font-medium text-foreground">{section.available_seats} asientos</span>
                            </p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('form')}>
                    Volver
                  </Button>
                  <Button
                    onClick={handleSelectFromMap}
                    disabled={!selectedSection || loading}
                    className="flex-1"
                  >
                    {loading ? 'Cargando...' : 'Ver recomendaciones'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Results */}
          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-gradient-accent text-white">
                <h2 className="text-2xl font-bold mb-2">
                  Tus mejores opciones
                </h2>
                <p className="text-white/90">
                  Basado en tus preferencias, estas son las 3 secciones que más te convenien
                </p>
              </Card>

              {loading ? (
                <div className="grid md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4">
                      <Skeleton className="h-48 w-full mb-4" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-10 w-full" />
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-6">
                  {recommendations.map((seat, index) => (
                    <motion.div
                      key={seat.section_id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <SeatCard
                        seat={seat}
                        onSelect={handleSelectSeat}
                        selected={seatSelection?.section_id === seat.section_id}
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep('map')}>
                  Ver otras opciones
                </Button>
                <Button
                  onClick={handleProceedToCheckout}
                  disabled={!seatSelection}
                  className="flex-1"
                >
                  Continuar al pago
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
