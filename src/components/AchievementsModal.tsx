import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trophy,
  Calendar,
  ImageOff,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ZoomIn,
} from 'lucide-react';
import { achievements } from '@/data/achievements';
import type { Achievement } from '@/data/achievements';

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
  const [selected, setSelected] = useState<Achievement | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selected) {
          setSelected(null);
        } else {
          onClose();
        }
      } else if (selected) {
        if (e.key === 'ArrowRight') {
          setActiveImg((i) => (i + 1) % selected.images.length);
        } else if (e.key === 'ArrowLeft') {
          setActiveImg((i) => (i - 1 + selected.images.length) % selected.images.length);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, selected]);

  useEffect(() => {
    if (!open) {
      setSelected(null);
      setActiveImg(0);
      setImgErrors(new Set());
    }
  }, [open]);

  const markError = useCallback((key: string) =>
    setImgErrors((prev) => {
      const next = new Set(prev);
      next.add(key);
      return next;
    }), []);

  const openDetail = (a: Achievement) => {
    setSelected(a);
    setActiveImg(0);
  };

  const closeDetail = () => {
    setSelected(null);
    setActiveImg(0);
  };

  const goPrev = () =>
    selected && setActiveImg((i) => (i - 1 + selected.images.length) % selected.images.length);
  const goNext = () =>
    selected && setActiveImg((i) => (i + 1) % selected.images.length);

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
                    {selected ? selected.title : 'Achievements'}
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    {selected ? `${activeImg + 1} / ${selected.images.length}` : `${achievements.length} unlocked`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {selected && (
                  <button
                    onClick={closeDetail}
                    aria-label="Back to achievements"
                    className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-neon-cyan/50 hover:text-neon-cyan"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close achievements"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-zinc-400 transition-colors hover:border-neon-magenta/50 hover:text-neon-magenta"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* scrollable body */}
            <div className="relative max-h-[calc(88vh-72px)] overflow-y-auto px-5 py-6 sm:px-7">
              <AnimatePresence mode="wait">
                {selected ? (
                  <DetailView
                    key={`detail-${selected.id}`}
                    achievement={selected}
                    activeImg={activeImg}
                    imgErrors={imgErrors}
                    markError={markError}
                    onSelect={setActiveImg}
                    onPrev={goPrev}
                    onNext={goNext}
                  />
                ) : (
                  <GridView
                    key="grid"
                    imgErrors={imgErrors}
                    markError={markError}
                    onOpen={openDetail}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ----------------------------- Grid (list) view ---------------------------- */

function GridView({
  imgErrors,
  markError,
  onOpen,
}: {
  imgErrors: Set<string>;
  markError: (key: string) => void;
  onOpen: (a: Achievement) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25 }}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {achievements.map((a, i) => {
        const coverKey = `${a.id}-0`;
        const errored = imgErrors.has(coverKey);
        return (
          <motion.button
            key={a.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
            onClick={() => onOpen(a)}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition-all duration-300 hover:border-neon-cyan/40 hover:shadow-neon focus:outline-none focus-visible:border-neon-cyan/60"
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
                  src={a.images[0]}
                  alt={a.title}
                  loading="lazy"
                  onError={() => markError(coverKey)}
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
              {/* image count chip */}
              <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md border border-white/15 bg-ink-950/70 px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest text-zinc-300 backdrop-blur">
                {a.images.length} pics
              </span>
              {/* hover zoom hint */}
              <div className="absolute inset-0 grid place-items-center bg-ink-950/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-1.5 rounded-full border border-neon-cyan/50 bg-ink-950/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-neon-cyan backdrop-blur">
                  <ZoomIn className="h-3 w-3" />
                  View gallery
                </div>
              </div>
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
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-zinc-400">
              {a.description}
            </p>
          </motion.button>
        );
      })}
    </motion.div>
  );
}

/* --------------------------- Detail (lightbox) view ------------------------ */

function DetailView({
  achievement,
  activeImg,
  imgErrors,
  markError,
  onSelect,
  onPrev,
  onNext,
}: {
  achievement: Achievement;
  activeImg: number;
  imgErrors: Set<string>;
  markError: (key: string) => void;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const imgKey = `${achievement.id}-${activeImg}`;
  const errored = imgErrors.has(imgKey);
  const hasMultiple = achievement.images.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5 lg:flex-row"
    >
      {/* gallery column */}
      <div className="flex flex-col gap-3 lg:w-[62%]">
        {/* featured image */}
        <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-neon">
          <AnimatePresence mode="wait">
            {errored ? (
              <motion.div
                key={`err-${imgKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid h-full w-full place-items-center text-zinc-600"
              >
                <div className="flex flex-col items-center gap-2">
                  <ImageOff className="h-10 w-10" />
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    Add image
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.img
                key={imgKey}
                src={achievement.images[activeImg]}
                alt={`${achievement.title} — image ${activeImg + 1}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                onError={() => markError(imgKey)}
                className="h-full w-full object-cover"
              />
            )}
          </AnimatePresence>

          {/* gradient + badge */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/50 via-transparent to-transparent" />
          {achievement.badge && (
            <span
              className={`absolute left-3 top-3 rounded-md border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest backdrop-blur ${
                badgeColors[achievement.badge] ?? badgeColors.Milestone
              }`}
            >
              {achievement.badge}
            </span>
          )}

          {/* nav arrows */}
          {hasMultiple && (
            <>
              <button
                onClick={onPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-zinc-200 opacity-0 backdrop-blur transition-all duration-300 hover:border-neon-cyan/60 hover:text-neon-cyan group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={onNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-950/60 text-zinc-200 opacity-0 backdrop-blur transition-all duration-300 hover:border-neon-magenta/60 hover:text-neon-magenta group-hover:opacity-100 focus:opacity-100"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              {/* dots */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                {achievement.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelect(idx)}
                    aria-label={`Go to image ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeImg
                        ? 'w-6 bg-neon-cyan shadow-[0_0_8px_rgba(34,211,238,0.8)]'
                        : 'w-1.5 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* thumbnail strip */}
        {hasMultiple && (
          <div className="flex gap-2.5 overflow-x-auto pb-1.5 [scrollbar-width:thin]">
            {achievement.images.map((src, idx) => {
              const thumbKey = `${achievement.id}-${idx}`;
              const thumbErr = imgErrors.has(thumbKey);
              const isActive = idx === activeImg;
              return (
                <button
                  key={idx}
                  onClick={() => onSelect(idx)}
                  aria-label={`View image ${idx + 1}`}
                  className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border transition-all duration-300 ${
                    isActive
                      ? 'border-neon-cyan shadow-[0_0_12px_rgba(34,211,238,0.5)]'
                      : 'border-white/10 opacity-60 hover:border-white/30 hover:opacity-100'
                  }`}
                >
                  {thumbErr ? (
                    <div className="grid h-full w-full place-items-center bg-ink-850 text-zinc-600">
                      <ImageOff className="h-4 w-4" />
                    </div>
                  ) : (
                    <img
                      src={src}
                      alt={`Thumbnail ${idx + 1}`}
                      loading="lazy"
                      onError={() => markError(thumbKey)}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {isActive && (
                    <div className="absolute inset-0 ring-1 ring-inset ring-neon-cyan/40" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* info column */}
      <div className="flex flex-col gap-4 lg:w-[38%]">
        <div>
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
            <Calendar className="h-3 w-3" />
            {achievement.date}
          </div>
          <h3 className="font-display text-2xl font-black uppercase leading-tight text-white">
            {achievement.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-zinc-400">
          {achievement.description}
        </p>

        <div className="mt-auto rounded-xl border border-white/10 bg-white/[0.02] p-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
            Gallery
          </p>
          <p className="mt-1 text-xs text-zinc-300">
            {achievement.images.length} image{achievement.images.length !== 1 && 's'} attached.
            Use the arrows or thumbnails to browse.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
