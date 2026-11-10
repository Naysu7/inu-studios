import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Loader2, ShieldCheck, AlertCircle, LogOut } from 'lucide-react';
import {
  verifyAdminPasskey,
  saveAdminSession,
  clearAdminSession,
} from '@/lib/supabase';

export default function AdminLoginModal({
  open,
  onClose,
  onAuthChange,
}: {
  open: boolean;
  onClose: () => void;
  onAuthChange: (isAdmin: boolean) => void;
}) {
  const [passkey, setPasskey] = useState('');
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (open) {
      setPasskey('');
      setError(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passkey.trim()) return;
    setChecking(true);
    setError(false);
    const ok = await verifyAdminPasskey(passkey.trim());
    setChecking(false);
    if (ok) {
      saveAdminSession(passkey.trim());
      onAuthChange(true);
      onClose();
    } else {
      setError(true);
    }
  };

  const logout = () => {
    clearAdminSession();
    onAuthChange(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] grid place-items-center bg-ink-950/85 backdrop-blur-md p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Admin login"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-2xl glass shadow-neonMag border border-neon-magenta/30"
          >
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-neon-magenta/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-neon-cyan/15 blur-3xl" />

            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-neon-magenta/20 to-neon-cyan/20 text-neon-magenta">
                  <Lock className="h-4 w-4" />
                </div>
                <h2 className="font-display text-base font-black uppercase tracking-wide text-white">
                  Admin Access
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close admin login"
                className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-zinc-400 transition-colors hover:border-neon-magenta/50 hover:text-neon-magenta"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative px-5 py-6">
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                    Admin Passkey
                  </label>
                  <input
                    type="password"
                    value={passkey}
                    onChange={(e) => {
                      setPasskey(e.target.value);
                      setError(false);
                    }}
                    autoFocus
                    placeholder="Enter owner passkey"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-neon-magenta/60"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300"
                    >
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      Invalid passkey. Try again.
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={checking}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-magenta to-neon-cyan px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink-950 shadow-neonMag transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                >
                  {checking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ShieldCheck className="h-4 w-4" />
                  )}
                  Authenticate
                </button>
              </form>

              <button
                onClick={logout}
                className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500 transition-colors hover:border-neon-magenta/40 hover:text-neon-magenta"
              >
                <LogOut className="h-3 w-3" />
                Log Out Admin
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
