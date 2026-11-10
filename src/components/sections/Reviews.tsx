import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  ShieldAlert,
  Eye,
  LogOut,
} from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';
import {
  supabase,
  type Review,
  getAdminSession,
  clearAdminSession,
  fetchSuppressedSeeds,
  deleteReview,
  suppressSeed,
  restoreSeed,
} from '@/lib/supabase';
import AdminLoginModal from '@/components/AdminLoginModal';

const TRIPLE_CLICK_MS = 600;

function Stars({
  value,
  onChange,
  size = 18,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
}) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(s)}
          className={`transition-transform ${onChange ? 'hover:scale-110' : 'cursor-default'}`}
          aria-label={`${s} star${s > 1 ? 's' : ''}`}
        >
          <Star
            style={{ width: size, height: size }}
            className={s <= value ? 'fill-neon-amber text-neon-amber' : 'text-zinc-600'}
          />
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPasskey, setAdminPasskey] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [suppressed, setSuppressed] = useState<Set<string>>(new Set());
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [seedActionId, setSeedActionId] = useState<string | null>(null);

  const clickTimes = useRef<number[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, rating, text, created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Restore admin session on mount
  useEffect(() => {
    const session = getAdminSession();
    if (session) {
      setAdminPasskey(session);
      setIsAdmin(true);
    }
  }, []);

  // Load suppressed seeds when admin becomes active
  useEffect(() => {
    if (!isAdmin || !adminPasskey) return;
    fetchSuppressedSeeds(adminPasskey).then(setSuppressed);
  }, [isAdmin, adminPasskey]);

  const handleHeadingClick = () => {
    const now = Date.now();
    clickTimes.current = clickTimes.current.filter((t) => now - t < TRIPLE_CLICK_MS);
    clickTimes.current.push(now);
    if (clickTimes.current.length >= 3) {
      clickTimes.current = [];
      setAdminOpen(true);
    }
  };

  const handleAuthChange = (authed: boolean) => {
    setIsAdmin(authed);
    if (authed) {
      setAdminPasskey(getAdminSession());
    } else {
      setAdminPasskey(null);
      setSuppressed(new Set());
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    handleAuthChange(false);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setSubmitting(true);
    setStatus('idle');
    const { error } = await supabase
      .from('reviews')
      .insert({ name: name.trim(), rating, text: text.trim() });
    setSubmitting(false);
    if (error) {
      setStatus('err');
      return;
    }
    setStatus('ok');
    setName('');
    setText('');
    setRating(5);
    load();
    setTimeout(() => setStatus('idle'), 4000);
  };

  const onDeleteReview = async (id: string) => {
    if (!adminPasskey) return;
    setDeletingId(id);
    const ok = await deleteReview(id, adminPasskey);
    setDeletingId(null);
    if (ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const onToggleSeed = async (seedId: string) => {
    if (!adminPasskey) return;
    setSeedActionId(seedId);
    const isSuppressed = suppressed.has(seedId);
    const ok = isSuppressed
      ? await restoreSeed(seedId, adminPasskey)
      : await suppressSeed(seedId, adminPasskey);
    setSeedActionId(null);
    if (ok) {
      setSuppressed((prev) => {
        const next = new Set(prev);
        if (isSuppressed) next.delete(seedId);
        else next.add(seedId);
        return next;
      });
    }
  };

  const realAvg =
    reviews.length > 0
      ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
      : DATA.reviews.average;
  const total = reviews.length || DATA.reviews.total;

  const seedReviews = DATA.reviews.sample.map((s) => ({
    id: `seed-${s.name}`,
    name: s.name,
    rating: s.rating,
    text: s.text,
    created_at: '',
  })) as Review[];

  const visibleSeeds = isAdmin
    ? seedReviews
    : seedReviews.filter((s) => !suppressed.has(s.id));

  const display = isAdmin
    ? [...reviews, ...seedReviews].slice(0, 8)
    : [...reviews, ...visibleSeeds].slice(0, 8);

  return (
    <section id="reviews" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <div ref={headingRef} onClick={handleHeadingClick} className="select-none">
          <SectionHeading eyebrow="Chapter 07" title="Trust & Feedback" />
        </div>

        {/* admin status bar */}
        <AnimatePresence>
          {isAdmin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3"
            >
              <div className="flex items-center gap-2 text-sm text-red-300">
                <ShieldAlert className="h-4 w-4" />
                <span className="font-mono text-[11px] uppercase tracking-widest">
                  Admin moderation mode active
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-red-300 transition-colors hover:bg-red-500/20"
              >
                <LogOut className="h-3 w-3" />
                Log Out Admin
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* average + list */}
          <Reveal>
            <div className="rounded-3xl glass p-7 shadow-glass">
              <div className="flex items-center gap-4">
                <div className="font-display text-5xl font-black text-white">
                  {realAvg.toFixed(1)}
                </div>
                <div>
                  <Stars value={Math.round(realAvg)} size={20} />
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {total} reviews
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {loading ? (
                  <div className="py-8 text-center font-mono text-xs text-zinc-500">
                    Loading reviews…
                  </div>
                ) : (
                  display.map((r) => {
                    const isSeed = r.id.startsWith('seed-');
                    const isSuppressed = suppressed.has(r.id);
                    const isDeleting = deletingId === r.id;
                    const isSeedActing = seedActionId === r.id;
                    return (
                      <div
                        key={r.id}
                        className={`rounded-xl border p-4 transition-colors ${
                          isSuppressed
                            ? 'border-red-500/20 bg-red-500/[0.04] opacity-60'
                            : 'border-white/10 bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-display text-sm font-bold text-white">
                              {r.name}
                            </span>
                            {isSeed && (
                              <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest text-zinc-500">
                                sample
                              </span>
                            )}
                            {isSuppressed && (
                              <span className="rounded border border-red-500/30 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest text-red-400">
                                hidden
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Stars value={r.rating} size={13} />
                            {isAdmin && (
                              <div className="flex items-center gap-1">
                                {isSeed && (
                                  <button
                                    onClick={() => onToggleSeed(r.id)}
                                    disabled={isSeedActing}
                                    aria-label={isSuppressed ? 'Restore sample review' : 'Hide sample review'}
                                    className="grid h-7 w-7 place-items-center rounded-md border border-white/10 text-zinc-400 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan disabled:opacity-50"
                                  >
                                    {isSeedActing ? (
                                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : isSuppressed ? (
                                      <Eye className="h-3.5 w-3.5" />
                                    ) : (
                                      <Eye className="h-3.5 w-3.5 opacity-40" />
                                    )}
                                  </button>
                                )}
                                <button
                                  onClick={() => onDeleteReview(r.id)}
                                  disabled={isDeleting}
                                  aria-label="Delete review"
                                  className="grid h-7 w-7 place-items-center rounded-md border border-red-500/30 text-red-400 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                                >
                                  {isDeleting ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-3.5 w-3.5" />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                          {r.text}
                        </p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </Reveal>

          {/* form */}
          <Reveal delay={0.12}>
            <form onSubmit={submit} className="rounded-3xl glass p-7 shadow-glass">
              <div className="mb-1 font-display text-xl font-bold uppercase text-white">
                Leave a Review
              </div>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
                Your feedback shapes the next build
              </p>

              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={60}
                placeholder="Your name or handle"
                className="mb-4 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-neon-cyan/60"
              />

              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                Rating
              </label>
              <div className="mb-4">
                <Stars value={rating} onChange={setRating} size={26} />
              </div>

              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                Review
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                maxLength={400}
                rows={4}
                placeholder="What did you think of the games or QA work?"
                className="mb-4 w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-neon-cyan/60"
              />

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-ink-950 shadow-neon transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Submit Review
              </button>

              <AnimatePresence>
                {status === 'ok' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 flex items-center gap-2 rounded-xl border border-neon-lime/30 bg-neon-lime/10 px-4 py-3 text-sm text-neon-lime"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Thanks! Your review is live.
                  </motion.div>
                )}
                {status === 'err' && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>

      <AdminLoginModal
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        onAuthChange={handleAuthChange}
      />
    </section>
  );
}
