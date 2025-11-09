import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, QueueSlot, SeatOption, UserPreferences, AppEvent } from '@/types';
import { EventCategory } from '@/lib/fixtures';

interface StoreState {
  // User
  user: {
    id?: string;
    name: string;
    lastname?: string;
    birthday?: string;
    country?: string;
    phonePrefix?: string;
    phoneNumber: string;
    email?:string;
    documentType?: string;
    documentNumber?: string;
    gender?: string;
    consent?:boolean;
  } | null;
  setUser: (user: StoreState['user']) => void;

  //Event
  events: { 
    id?: string;
    category: EventCategory;
      description: string;
      name: string;
      artist: string;
      address: string;
      city: string;
      country: string;
      capacity: number | null;
      start_at: string | Date;
      venue_name: string;
      imgUrl?: string;
  } | null;
  setEvent: (event: StoreState['events']) => void;

  // Selected events (UI state)
  selectedEvents: AppEvent | null;
  setSelectedEvents: (ev: AppEvent | null) => void;


  // Queue
  queue: QueueSlot | null;
  setQueue: (queue: QueueSlot | null) => void;
  
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  updateCartQty: (index: number, qty: number) => void;
  clearCart: () => void;

  // Seat Selection
  seatSelection: SeatOption | null;
  setSeatSelection: (seat: SeatOption | null) => void;

  // User Preferences
  preferences: UserPreferences | null;
  setPreferences: (prefs: UserPreferences) => void;


  // WhatsApp notification
  whatsappConnected: boolean;
  setWhatsappConnected: (connected: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
     user: null,
      setUser: (user) => set({ user }),

      events: null,
      setEvent: (event) => set({ events: event }),

      // selected event(s)
      selectedEvents: null,
      setSelectedEvents: (ev) => set({ selectedEvents: ev }),

      queue: null,
      setQueue: (queue) => set({ queue }),

      cart: [],
      addToCart: (item) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (i) => i.kind === item.kind && i.refId === item.refId && i.name === item.name
          );
          if (existingIndex >= 0) {
            const newCart = [...state.cart];
            newCart[existingIndex].qty += item.qty;
            return { cart: newCart };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (index) =>
        set((state) => ({
          cart: state.cart.filter((_, i) => i !== index),
        })),
      updateCartQty: (index, qty) =>
        set((state) => {
          const newCart = [...state.cart];
          if (qty <= 0) {
            newCart.splice(index, 1);
          } else {
            newCart[index].qty = qty;
          }
          return { cart: newCart };
        }),
      clearCart: () => set({ cart: [] }),

      seatSelection: null,
      setSeatSelection: (seat) => set({ seatSelection: seat }),

      preferences: null,
      setPreferences: (prefs) => set({ preferences: prefs }),

  

      whatsappConnected: false,
      setWhatsappConnected: (connected) => set({ whatsappConnected: connected }),
    }),
    {
      name: 'audienceview-storage',
      partialize: (state) => ({
        cart: state.cart,
        seatSelection: state.seatSelection,
        whatsappConnected: state.whatsappConnected,
      }),
    }
  )
);
