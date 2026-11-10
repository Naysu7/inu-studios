import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, Calendar, ImageOff } from 'lucide-react';
import { achievements } from '@/data/achievements';

const badgeColors: Record<string, string> = {
  Milestone: 'border-neon-cyan/50 text-neon-cyan bg-neon-cyan/10',
  Technical: 'border-neon-violet/50 text-neon-violet bg-neon-violet/10',
  QA: 'border-neon-lime/50 text-neon-lime bg-neon-lime/10',
  Release: 'border-neon-magenta/50 text-neon-magenta bg-neon-magenta/10',
  Education: 'border-neon-amber/50 text-neon-amber bg-neon-amber/10',
};

export default function AchievementsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const markError = (id: string) =>
    setImgErrors((prev) => new Set(prev).add(id));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-ink-950/80 backdrop-blur-md p-4 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Achievements"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[88vh] overflow-hidden rounded-3xl glass shadow-neon border-neon-cyan/30"
          >
            {/* glow accents */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-neon-cyan/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-neon-magenta/20 blur-3xl" />

            {/* header */}
            <div className="relative flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 text-neon-cyan">
                  <Trophy className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-black uppercase tracking-wide text-white sm:text-xl">
                    Achievements
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {achievements.length} unlocked
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close achievements"
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-neon-magenta/50 hover:text-neon-magenta"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* scrollable grid */}
            <div className="relative max-h-[calc(88vh-72px)] overflow-y-auto px-5 py-6 sm:px-7">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {achievements.map((a, i) => {
                  const errored = imgErrors.has(a.id);
                  return (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-neon-cyan/40"
                    >
                      {/* badge image */}
                      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-xl border border-white/10 bg-ink-900">
                        {errored ? (
                          <div className="grid h-full w-full place-items-center text-zinc-600">
                            <div className="flex flex-col items-center gap-2">
                              <ImageOff className="h-8 w-8" />
                              <span className="font-mono text-[9px] uppercase tracking-widest">
                                Add image
                              </span>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={a.imageUrl}
                            alt={a.title}
                            loading="lazy"
                            onError={() => markError(a.id)}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
                        {a.badge && (
                          <span
                            className={`absolute left-2 top-2 rounded-md border px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest backdrop-blur ${
                              badgeColors[a.badge] ?? badgeColors.Milestone
                            }`}
                          >
                            {a.badge}
                          </span>
                        )}
                      </div>

                      {/* title */}
                      <h3 className="font-display text-sm font-bold uppercase leading-tight text-white">
                        {a.title}
                      </h3>

                      {/* date */}
                      <div className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        <Calendar className="h-3 w-3 text-neon-cyan" />
                        {a.date}
                      </div>

                      {/* description */}
                      <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                        {a.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
