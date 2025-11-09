export type QueueStatus = "waiting" | "notified" | "expired";

export type SeatOption = {
  section_id?: string;
  section_name: string;
  seat_id?:string;
  seat_name?:string;
  seat_row?:string;
  price: number;
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

// App-level event type (covers both API shape and legacy/mock shape)
export type AppEvent = {
  id: number | string;
  name?: string;
  artist?: string;
  // API field
  starts_at?: string;
  // legacy/mock field
  date?: string;
  // venue
  venue_name?: string;
  venue?: string;
  city?: string;
  country?: string;
  imgUrl?: string | null;
  image_url?: string | null;
  // allow extra fields
  [key: string]: unknown;
};
