import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/Skeleton';
import { MerchSidebar } from '@/components/MerchSidebar';
import { useStore } from '@/store/useStore';
import { joinQueue, getQueueStatus, holdTurn } from '@/lib/api';
import { Clock, Users, Check, X, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Queue() {
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const queue = useStore((state) => state.queue);
const setQueue = useStore((state) => state.setQueue);
const user = useStore((state) => state.user);
const whatsappConnected = useStore((state) => state.whatsappConnected);
const setWhatsappConnected = useStore((state) => state.setWhatsappConnected);

useEffect(() => {
	let interval: NodeJS.Timeout;

	if (queue?.slot_id) {
		// Poll every 5 seconds
		interval = setInterval(async () => {
			try {
				const status = await getQueueStatus(queue.slot_id);
				setQueue(status);

				// Notify when turn is ready
				if (status.status === 'notified' && queue.status !== 'notified') {
					toast.success('¡Es tu turno!', {
						description: 'Ya puedes proceder a elegir tus asientos',
					});
				}
			} catch (error) {
				console.error('Error polling queue:', error);
			}
		}, 5000);
	}

	return () => {
		if (interval) clearInterval(interval);
	};
}, [queue, setQueue]);

const handleJoinQueue = async () => {
	if (!user) return;
	setLoading(true);
	try {
		const slot = await joinQueue('evento-1', user.id);
		setQueue(slot);
		toast.success('¡Te uniste a la fila!', {
			description: `Tu posición es ${slot.position}`,
		});
	} catch (error) {
		toast.error('Error al unirse a la fila');
		console.error(error);
	} finally {
		setLoading(false);
	}
};

const handleHoldTurn = async () => {
	if (!queue?.slot_id) return;
	try {
		await holdTurn(queue.slot_id);
		toast.success('Turno reservado', {
			description: 'Tu posición está asegurada por 10 minutos',
		});
	} catch (error) {
		toast.error('Error al reservar turno');
		console.error(error);
	}
};

const handleConnectWhatsApp = () => {
	setWhatsappConnected(true);
	toast.success('WhatsApp conectado', {
		description: 'Te avisaremos cuando sea tu turno',
	});
};

const handleProceedToSeats = () => {
	navigate('/advisor');
};

return (
	<div className="min-h-screen bg-gradient-subtle">
		<div className="container max-w-7xl mx-auto px-4 py-8">
			<div className="grid lg:grid-cols-[1fr,320px] gap-6">
				{/* Main Content */}
				<div className="space-y-6">
					{/* Event Header */}
					<Card className="p-6 bg-gradient-primary text-white">
						<h1 className="text-3xl font-bold mb-2">Gran Arena Monticello</h1>
						<p className="text-white/90 flex items-center gap-2">
							<Clock className="h-4 w-4" />
							15 de Diciembre, 2025 - 20:00
						</p>
					</Card>

					{/* Queue Status */}
					{!queue ? (
						<Card className="p-8 text-center">
							<Users className="h-16 w-16 mx-auto mb-4 text-primary" />
							<h2 className="text-2xl font-bold mb-3">Únete a la fila virtual</h2>
							<p className="text-muted-foreground mb-6">
								Asegura tu lugar sin esperar físicamente. Te avisaremos cuando sea tu turno.
							</p>
							<Button
								size="lg"
								onClick={handleJoinQueue}
								disabled={loading}
								className="px-8"
							>
								{loading ? 'Uniéndote...' : 'Unirme a la fila'}
							</Button>
						</Card>
				) : (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="space-y-4"
						>
							{/* Position Card */}
							<Card className="p-6">
								<div className="flex items-center justify-between mb-4">
									<div>
										<p className="text-sm text-muted-foreground mb-1">Tu posición en la fila</p>
										<div className="flex items-baseline gap-2">
											<span className="text-5xl font-bold text-primary">{queue.position}</span>
											<Badge variant={queue.status === 'notified' ? 'default' : 'secondary'}>
												{queue.status === 'notified' ? '¡Es tu turno!' : 'Esperando'}
											</Badge>
										</div>
									</div>
									{queue.estimated_time_minutes && (
										<div className="text-right">
											<p className="text-sm text-muted-foreground">Tiempo estimado</p>
											<p className="text-2xl font-bold">{queue.estimated_time_minutes} min</p>
										</div>
									)}
								</div>

								<div className="space-y-3">
									<Button
										onClick={handleHoldTurn}
										variant="outline"
										className="w-full"
									>
										Reservar mi turno
									</Button>

									{queue.status === 'notified' && (
										<Button
											onClick={handleProceedToSeats}
											size="lg"
											className="w-full"
										>
											Elegir mis asientos ahora
										</Button>
									)}
								</div>
							</Card>

							{/* WhatsApp Notification */}
							<Card className="p-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<MessageCircle className={`h-5 w-5 ${whatsappConnected ? 'text-success' : 'text-muted-foreground'}`} />
										<div>
											<p className="font-medium text-sm">
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
										<Check className="h-5 w-5 text-success" />
									) : (
										<Button
											size="sm"
											variant="outline"
											onClick={handleConnectWhatsApp}
										>
											Conectar
										</Button>
									)}
								</div>
							</Card>

							{/* Queue Info */}
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
	</div>
);
}
