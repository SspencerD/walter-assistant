import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, QueueSlot, SeatOption, UserPreferences } from '@/types';

interface StoreState {
  // User
  user: {
    id: string;
    name: string;
    phone: string;
  } | null;
  setUser: (user: StoreState['user']) => void;

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
      user: { id: 'user-123', name: 'Usuario Demo', phone: '+56912345678' },
      setUser: (user) => set({ user }),

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
