import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';
import { supabase, type Review } from '@/lib/supabase';

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

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('id, name, rating, text, created_at')
      .order('created_at', { ascending: false })
      .limit(20);
    if (!error && data) setReviews(data as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

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

  const realAvg =
    reviews.length > 0
      ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length
      : DATA.reviews.average;
  const total = reviews.length || DATA.reviews.total;
  const display = [...reviews, ...DATA.reviews.sample.map((s) => ({
    id: `seed-${s.name}`,
    name: s.name,
    rating: s.rating,
    text: s.text,
    created_at: '',
  })) as Review[]].slice(0, 8);

  return (
    <section id="reviews" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 07" title="Trust & Feedback" />

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
                  display.map((r) => (
                    <div
                      key={r.id}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display text-sm font-bold text-white">{r.name}</span>
                        <Stars value={r.rating} size={13} />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">{r.text}</p>
                    </div>
                  ))
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
    </section>
  );
}
