// src/pages/Queue.tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MerchSidebar } from '@/components/MerchSidebar';
import { useStore } from '@/store/useStore';
import { Clock, Users, Check, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { QueueSlot } from '@/types';

// Helpers
const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

type QueueStatus = 'waiting' | 'held' | 'notified';

export default function Queue() {
  const navigate = useNavigate();

  // Store (mantengo tus estados globales)
  const queue = useStore((s) => s.queue);
  const setQueue = useStore((s) => s.setQueue);
  const user = useStore((s) => s.user);
	const event = useStore((e) => e.selectedEvents);
  const whatsappConnected = useStore((s) => s.whatsappConnected);
  const setWhatsappConnected = useStore((s) => s.setWhatsappConnected);

  // Local sim de cola
  const [loading, setLoading] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Pago simulado
  const [payName, setPayName] = useState('');
  const [payLast, setPayLast] = useState('');
  const [payCard, setPayCard] = useState('');
  const [payCvv, setPayCvv] = useState('');
  const [payExp, setPayExp] = useState('');

  // Timer ref
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Calcular ETA en minutos aprox: (pos / 2) pasos * 10s -> /60
  const etaMinutes = useMemo(() => {
    if (!queue?.position || queue.position <= 0) return 0;
    const steps = Math.ceil(queue.position / 2);
    return Math.max(1, Math.round((steps * 10) / 60));
  }, [queue?.position]);

  const canPay =
    payName.trim().length > 1 &&
    payLast.trim().length > 1 &&
    /^\d{13,19}$/.test(payCard.replace(/\s+/g, '')) &&
    /^\d{3,4}$/.test(payCvv) &&
    /^(0[1-9]|1[0-2])\/\d{2}$/.test(payExp)

  // Unirse a la cola con posición >= 1000
  const handleJoinQueue = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para unirte a la fila');
      return;
    }
    setLoading(true);
    try {
      const initialPos = randInt(1000, 2000);
      setQueue({
        slot_id: crypto.randomUUID(),
        position: initialPos,
        status: 'waiting' as QueueSlot['status'],
        estimated_time_minutes: Math.max(1, Math.round(((initialPos / 2) * 10) / 60)),
      });
      toast.success('¡Te uniste a la fila!', {
        description: `Tu posición es ${initialPos}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // “Reservar mi turno” → mensaje + abrir Sheet
  const handleHoldTurnAsk = () => {
    const t = toast.message('¿No quieres esperar? Reserva tu puesto', {
      action: {
        label: 'Reservar ahora',
        onClick: () => {
          // Abre el Sheet de pago
          setSheetOpen(true);
        },
      },
      cancel: {
        label: 'Seguir esperando',
        onClick: () => {},
      },
      duration: 6000,
    });
    return t;
  };

  // Pagar dentro del Sheet
  const handlePay = async () => {
    if (!queue) return;

    // Simular procesamiento
    toast.loading('Procesando pago...', { id: 'pay' });
    setTimeout(() => {
      toast.success('La compra se ha realizado con éxito', { id: 'pay' });
      setTimeout(() => {
        toast.success('Se ha reservado tu puesto en la fila');
        // “Reserva”: marcamos estado held para congelar la posición 10 min (sim simple)
        setQueue({
          ...queue,
          status: "notified",
        });
        setSheetOpen(false);
      }, 700);
    }, 1200);
  };

  // Notificaciones externas
  const handleConnectWhatsApp = () => {
    setWhatsappConnected(true);
    toast.success('WhatsApp conectado', {
      description: 'Te avisaremos cuando sea tu turno',
    });
  };

  const handleProceedToSeats = () => {
    navigate('/event/'+event.id,{state:{data:event}});
  };

  // Intervalo: baja 2 cada 10s, salvo que esté "held" (reservado)
  useEffect(() => {
    if (!queue?.slot_id) return;

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setQueue((prev: any) => {
        if (!prev) return prev;
        if (prev.status === 'held') return prev; // mientras está reservado, no baja
        if (prev.position <= 0) return prev;

        const nextPos = Math.max(0, prev.position - 2);
        const nextStatus: QueueStatus = nextPos === 0 ? 'notified' : 'waiting';

        return {
          ...prev,
          position: nextPos,
          status: nextStatus,
          estimated_time_minutes: Math.max(
            0,
            Math.round((((Math.ceil(nextPos / 2)) * 10) / 60))
          ),
        };
      });
    }, 10_000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [queue?.slot_id, setQueue]);

  // Cuando se convierte en notified, avisar una sola vez
  const notifiedOnce = useRef(false);
  useEffect(() => {
    if (!queue) return;
    if (queue.status === 'notified' && !notifiedOnce.current) {
      notifiedOnce.current = true;
      toast.success('¡Es tu turno!', {
        description: 'Ya puedes proceder a elegir tus asientos',
      });
    }
  }, [queue]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1fr,320px]">
          {/* Main */}
          <div className="space-y-6">
            {/* Header */}
           {/*  <Card className="p-6 text-white bg-gradient-primary">
              <h1 className="mb-2 text-3xl font-bold">Gran Arena Monticello</h1>
              <p className="flex items-center gap-2 text-white/90">
                <Clock className="w-4 h-4" />
                15 de Diciembre, 2025 - 20:00
              </p>
            </Card> */}

            {/* Estado de la cola */}
            {!queue ? (
              <Card className="p-8 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
                <h2 className="mb-3 text-2xl font-bold">Únete a la fila virtual</h2>
                <p className="mb-6 text-muted-foreground">
                  Asegura tu lugar sin esperar físicamente. Te avisaremos cuando sea tu turno.
                </p>
                <Button size="lg" onClick={handleJoinQueue} disabled={loading} className="px-8">
                  {loading ? 'Uniéndote...' : 'Unirme a la fila'}
                </Button>
              </Card>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Tarjeta de posición */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="mb-1 text-sm text-muted-foreground">Tu posición en la fila</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-primary">{queue.position}</span>
                        <Badge variant={queue.status === 'notified' ? 'default' : 'secondary'}>
                          {queue.status === 'notified'
                            ? '¡Es tu turno!'
                            : queue.status === 'held'
                            ? 'Reservado'
                            : 'Esperando'}
                        </Badge>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Tiempo estimado</p>
                      <p className="text-2xl font-bold">{etaMinutes} min</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={handleHoldTurnAsk}
                      variant="outline"
                      className="w-full"
                      disabled={!queue || queue.status === 'held' || queue.status === 'notified'}
                    >
                      Reservar mi turno
                    </Button>

                    {queue.status === 'notified' && (
                      <Button onClick={handleProceedToSeats} size="lg" className="w-full">
                        Elegir mis asientos ahora
                      </Button>
                    )}
                  </div>
                </Card>

                {/* WhatsApp */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle
                        className={`h-5 w-5 ${
                          whatsappConnected ? 'text-green-600' : 'text-muted-foreground'
                        }`}
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {whatsappConnected ? 'WhatsApp conectado' : 'Conectar WhatsApp'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {whatsappConnected
                            ? 'Te avisaremos cuando te toque'
                            : 'Recibe notificaciones en tiempo real'}
                        </p>
                      </div>
                    </div>
                    {whatsappConnected ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Button size="sm" variant="outline" onClick={handleConnectWhatsApp}>
                        Conectar
                      </Button>
                    )}
                  </div>
                </Card>

                {/* Info */}
                <Card className="p-4 bg-muted/50">
                  <p className="text-xs text-muted-foreground">
                    💡 <strong>Consejo:</strong> Mientras esperas, explora nuestras recomendaciones
                    de merchandise en la barra lateral. ¡Agrega productos a tu carrito y completa
                    todo en un solo checkout!
                  </p>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <MerchSidebar />
          </div>
        </div>
      </div>

      {/* Drawer de pago simulado */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Reserva prioritaria</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Paga una pequeña reserva para asegurar tu lugar y saltarte la espera.
              </p>
              <div className="p-3 text-sm border rounded-lg">
                <p className="flex items-center justify-between">
                  <span>Reserva rápida</span>
                  <span className="font-semibold">$ {new Intl.NumberFormat('es-CL').format(2990)}</span>
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" value={payName} onChange={(e) => setPayName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="last">Apellido</Label>
                  <Input id="last" value={payLast} onChange={(e) => setPayLast(e.target.value)} />
                </div>
              </div>

              <div>
                <Label htmlFor="card">Número de tarjeta</Label>
                <Input
                  id="card"
                  inputMode="numeric"
                  placeholder="4111 1111 1111 1111"
                  value={payCard}
                  onChange={(e) => setPayCard(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="exp">Vencimiento (MM/AA)</Label>
                  <Input id="exp" placeholder="12/28" value={payExp} onChange={(e) => setPayExp(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    inputMode="numeric"
                    placeholder="123"
                    value={payCvv}
                    onChange={(e) => setPayCvv(e.target.value)}
                  />
                </div>
              </div>

              <Button className="w-full" onClick={handlePay}>
                Pagar y reservar
              </Button>

              <p className="text-xs text-muted-foreground">
                Simulación de pago. No se realizará ningún cargo real.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
