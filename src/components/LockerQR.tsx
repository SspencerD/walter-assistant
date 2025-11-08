import { QRCodeSVG } from 'qrcode.react';
import { Card } from '@/components/ui/card';
import { Package } from 'lucide-react';
import type { LockerInfo } from '@/types';

interface LockerQRProps {
  locker: LockerInfo;
}

export function LockerQR({ locker }: LockerQRProps) {
  return (
    <Card className="p-6 text-center space-y-4">
      <div className="flex justify-center">
        <div className="rounded-full bg-accent/10 p-3">
          <Package className="h-8 w-8 text-accent" />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-1">Tu casillero está listo</h3>
        <p className="text-sm text-muted-foreground">
          Código: <span className="font-mono font-bold text-foreground">{locker.code}</span>
        </p>
      </div>

      <div className="flex justify-center p-4 bg-white rounded-lg">
        <QRCodeSVG
          value={locker.qr_png_b64}
          size={200}
          level="H"
          includeMargin
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Presenta este código QR en el venue para retirar tus productos
      </p>
    </Card>
  );
}
