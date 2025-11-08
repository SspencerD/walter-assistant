import type { MerchItem, QueueSlot, SeatOption, UserPreferences, LockerInfo } from '@/types';
import { mockMerchItems, mockSeatOptions } from './fixtures';

const API_BASE = import.meta.env.VITE_API_URL || '/api';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === 'true';

// Simulated delay for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function joinQueue(eventId: string, userId: string): Promise<QueueSlot> {
  if (USE_MOCKS) {
    await delay(800);
    return {
      slot_id: `slot-${Math.random().toString(36).substr(2, 9)}`,
      position: Math.floor(Math.random() * 50) + 1,
      status: 'waiting',
      estimated_time_minutes: Math.floor(Math.random() * 20) + 5,
    };
  }
  
  const res = await fetch(`${API_BASE}/queue/join`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, userId }),
  });
  return res.json();
}

export async function getQueueStatus(slotId: string): Promise<QueueSlot> {
  if (USE_MOCKS) {
    await delay(300);
    const currentPosition = Math.max(1, Math.floor(Math.random() * 10));
    return {
      slot_id: slotId,
      position: currentPosition,
      status: currentPosition <= 3 ? 'notified' : 'waiting',
      estimated_time_minutes: currentPosition * 2,
    };
  }
  
  const res = await fetch(`${API_BASE}/queue/status?slot_id=${slotId}`);
  return res.json();
}

export async function holdTurn(slotId: string): Promise<{ hold_expires_at: string }> {
  if (USE_MOCKS) {
    await delay(400);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    return { hold_expires_at: expiresAt.toISOString() };
  }
  
  const res = await fetch(`${API_BASE}/queue/hold`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slotId }),
  });
  return res.json();
}

export async function getMerchRecs(eventId: string, userId: string): Promise<MerchItem[]> {
  if (USE_MOCKS) {
    await delay(500);
    return mockMerchItems.slice(0, 3);
  }
  
  const res = await fetch(`${API_BASE}/merch/recommendations?eventId=${eventId}&userId=${userId}`);
  return res.json();
}

export async function getSeatAdvice(
  eventId: string,
  prefs: UserPreferences
): Promise<{ top: SeatOption[] }> {
  if (USE_MOCKS) {
    await delay(1000);
    // Filter based on preferences
    let filtered = [...mockSeatOptions];
    
    if (prefs.mobility_reduced) {
      // Prioritize lower sections
      filtered = filtered.sort((a, b) => {
        const aIsLower = a.section_name.toLowerCase().includes('bajo');
        const bIsLower = b.section_name.toLowerCase().includes('bajo');
        if (aIsLower && !bIsLower) return -1;
        if (!aIsLower && bIsLower) return 1;
        return 0;
      });
    }
    
    if (prefs.vision_problems) {
      // Prioritize closer sections
      filtered = filtered.sort((a, b) => b.score - a.score);
    }
    
    return { top: filtered.slice(0, 3) };
  }
  
  const res = await fetch(`${API_BASE}/seats/advice`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ eventId, preferences: prefs }),
  });
  return res.json();
}

export async function assignLocker(orderId: string): Promise<LockerInfo> {
  if (USE_MOCKS) {
    await delay(600);
    const code = `L${Math.floor(Math.random() * 9000) + 1000}`;
    // Generate a simple QR-like data URI (in reality, qrcode.react will handle this)
    return {
      code,
      qr_png_b64: code, // We'll use this code to generate QR with qrcode.react
    };
  }
  
  const res = await fetch(`${API_BASE}/locker/assign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ orderId }),
  });
  return res.json();
}
