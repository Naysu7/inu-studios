import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  created_at: string;
};

const EDGE_URL = `${url}/functions/v1/admin-moderate`;
const ADMIN_SESSION_KEY = 'inu_admin_session';

function adminHeaders(passkey: string): HeadersInit {
  return {
    Authorization: `Bearer ${passkey}`,
    apikey: anonKey,
  };
}

export async function verifyAdminPasskey(passkey: string): Promise<boolean> {
  try {
    const res = await fetch(`${EDGE_URL}/suppressed`, {
      headers: adminHeaders(passkey),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchSuppressedSeeds(passkey: string): Promise<Set<string>> {
  try {
    const res = await fetch(`${EDGE_URL}/suppressed`, {
      headers: adminHeaders(passkey),
    });
    if (!res.ok) return new Set();
    const data = await res.json();
    return new Set((data.ids as string[]) ?? []);
  } catch {
    return new Set();
  }
}

export async function deleteReview(id: string, passkey: string): Promise<boolean> {
  try {
    const res = await fetch(`${EDGE_URL}/delete-review`, {
      method: 'POST',
      headers: { ...adminHeaders(passkey), 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function suppressSeed(id: string, passkey: string): Promise<boolean> {
  try {
    const res = await fetch(`${EDGE_URL}/suppress-seed`, {
      method: 'POST',
      headers: { ...adminHeaders(passkey), 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function restoreSeed(id: string, passkey: string): Promise<boolean> {
  try {
    const res = await fetch(`${EDGE_URL}/restore-seed`, {
      method: 'POST',
      headers: { ...adminHeaders(passkey), 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function saveAdminSession(passkey: string) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, passkey);
}

export function getAdminSession(): string | null {
  return sessionStorage.getItem(ADMIN_SESSION_KEY);
}

export function clearAdminSession() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
