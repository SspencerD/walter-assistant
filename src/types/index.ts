export type QueueStatus = "waiting" | "notified" | "expired";

export type SeatOption = {
  section_id: string;
  section_name: string;
  score: number;
  motivo: string;
  preview_url: string;
  price_cents: number;
};

export type MerchItem = {
  id: number;
  name: string;
  price_cents: number;
  tags: string[];
  preview_url?: string;
  description?: string;
};

export type CartItem = {
  kind: "ticket" | "merch" | "locker";
  refId?: number | string;
  name: string;
  qty: number;
  unit_price_cents: number;
};

export type UserPreferences = {
  age?: number;
  sex?: "m" | "f" | "other";
  height?: number;
  mobility_reduced?: boolean;
  vision_problems?: boolean;
};

export type QueueSlot = {
  slot_id: string;
  position: number;
  status: QueueStatus;
  estimated_time_minutes?: number;
  hold_expires_at?: string;
};

export type LockerInfo = {
  code: string;
  qr_png_b64: string;
};
