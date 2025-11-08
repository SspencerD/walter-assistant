import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { LockerQR } from '@/components/LockerQR';
import { useStore } from '@/store/useStore';
import { formatCurrency } from '@/lib/currency';
import { assignLocker } from '@/lib/api';
import { ShoppingBag, Ticket, Package, Check, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import type { LockerInfo } from '@/types';

export default function Checkout() {
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [locker, setLocker] = useState<LockerInfo | null>(null);

  const cart = useStore((state) => state.cart);
  const seatSelection = useStore((state) => state.seatSelection);
  const clearCart = useStore((state) => state.clearCart);
  const user = useStore((state) => state.user);

  const hasTicket = seatSelection !== null;
  const hasMerch = cart.some((item) => item.kind === 'merch');

  const ticketTotal = seatSelection ? seatSelection.price_cents : 0;
  const merchTotal = cart
    .filter((item) => item.kind === 'merch')
    .reduce((sum, item) => sum + item.unit_price_cents * item.qty, 0);
  const total = ticketTotal + merchTotal;

  const handleSimulatePayment = async () => {
    if (!hasTicket) {
      toast.error('Debes seleccionar un asiento primero');
      return;
    }

    setProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Assign locker if there's merch
      let lockerInfo: LockerInfo | null = null;
      if (hasMerch) {
        lockerInfo = await assignLocker('order-' + Date.now());
        setLocker(lockerInfo);
      }

      setCompleted(true);
      toast.success('¡Pago exitoso!', {
        description: 'Te enviamos el resumen por WhatsApp',
      });

      // Clear cart after successful payment
      setTimeout(() => {
        clearCart();
      }, 1000);
    } catch (error) {
      toast.error('Error al procesar el pago');
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-subtle py-8">
        <div className="container max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <Card className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-success/10 p-4">
                  <Check className="h-12 w-12 text-success" />
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-3">¡Compra exitosa!</h1>
              <p className="text-muted-foreground mb-6">
                Tu entrada ha sido confirmada. Revisa tu WhatsApp para ver el resumen completo.
              </p>

              {seatSelection && (
                <Card className="p-4 bg-muted/50 mb-6">
                  <div className="flex items-center gap-3">
                    <Ticket className="h-8 w-8 text-primary" />
                    <div className="text-left">
                      <p className="font-semibold">{seatSelection.section_name}</p>
                      <p className="text-sm text-muted-foreground">Gran Arena Monticello</p>
                    </div>
                  </div>
                </Card>
              )}

              {locker && (
                <div className="mb-6">
                  <LockerQR locker={locker} />
                </div>
              )}

              <div className="space-y-2">
                <Button asChild className="w-full">
                  <a href="/">Volver al inicio</a>
                </Button>
                <p className="text-xs text-muted-foreground">
                  Recibirás tus entradas por correo electrónico
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Resumen de compra</h1>
              </div>

              {/* Event Info */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Evento</h3>
                <Card className="p-4 bg-muted/50">
                  <p className="font-medium">Gran Arena Monticello</p>
                  <p className="text-sm text-muted-foreground">15 de Diciembre, 2025 - 20:00</p>
                </Card>
              </div>

              {/* Seat Selection */}
              {seatSelection ? (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Tu entrada</h3>
                  </div>
                  <Card className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium">{seatSelection.section_name}</p>
                        <Badge variant="outline" className="mt-1">
                          {seatSelection.section_id}
                        </Badge>
                      </div>
                      <p className="font-bold">{formatCurrency(seatSelection.price_cents)}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{seatSelection.motivo}</p>
                  </Card>
                </div>
              ) : (
                <Card className="p-6 text-center mb-6">
                  <Ticket className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    No has seleccionado un asiento aún
                  </p>
                  <Button asChild variant="outline" className="mt-3">
                    <a href="/advisor">Seleccionar asiento</a>
                  </Button>
                </Card>
              )}

              {/* Cart Items */}
              {cart.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-5 w-5 text-accent" />
                    <h3 className="font-semibold">Merchandise</h3>
                  </div>
                  <div className="space-y-2">
                    {cart.filter((item) => item.kind === 'merch').map((item, index) => (
                      <Card key={index} className="p-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline">{item.qty}x</Badge>
                            <p className="font-medium text-sm">{item.name}</p>
                          </div>
                          <p className="font-semibold">
                            {formatCurrency(item.unit_price_cents * item.qty)}
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Payment Summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Total a pagar</h3>

              <div className="space-y-3 mb-4">
                {hasTicket && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Entrada</span>
                    <span className="font-medium">{formatCurrency(ticketTotal)}</span>
                  </div>
                )}

                {hasMerch && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Merchandise</span>
                    <span className="font-medium">{formatCurrency(merchTotal)}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>

              <Button
                onClick={handleSimulatePayment}
                disabled={!hasTicket || processing}
                className="w-full"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Simular pago'
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-3">
                Este es un pago simulado. No se realizará ningún cargo real.
              </p>

              {user && (
                <Card className="p-3 bg-muted/50 mt-4">
                  <p className="text-xs text-muted-foreground">
                    <strong>Usuario:</strong> {user.name}<br />
                    <strong>Teléfono:</strong> {user.phone}
                  </p>
                </Card>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
