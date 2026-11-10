import { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DATA } from '@/data';

export default function MusicPlayer() {
  const tracks = DATA.audio.tracks;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [open, setOpen] = useState(false);

  const track = tracks[index];

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.load();
    if (playing) {
      a.play().catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing]);

  const onTime = () => {
    const a = audioRef.current;
    if (!a) return;
    setProgress(a.currentTime);
    setDuration(a.duration || 0);
  };

  const skip = (dir: number) => {
    setIndex((i) => (i + dir + tracks.length) % tracks.length);
    setPlaying(true);
  };

  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Number(e.target.value);
    setProgress(a.currentTime);
  };

  const fmt = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={onTime}
        onLoadedMetadata={onTime}
        onEnded={() => skip(1)}
      />

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle music player"
        className="fixed bottom-6 right-6 z-[60] grid h-12 w-12 place-items-center rounded-full glass glass-hover shadow-neon text-neon-cyan"
      >
        <Music2 className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed bottom-24 right-6 z-[60] w-[320px] overflow-hidden rounded-2xl glass shadow-glass"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-neon-magenta" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                  Now Playing
                </span>
              </div>
              <span className="rounded-full border border-neon-magenta/40 bg-neon-magenta/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-neon-magenta">
                All-Time Favorites
              </span>
            </div>

            {/* track info */}
            <div className="px-4 pt-4">
              <div className="truncate font-display text-lg font-bold text-white">
                {track.title}
              </div>
              <div className="truncate font-mono text-xs text-zinc-400">{track.artist}</div>
            </div>

            {/* progress */}
            <div className="px-4 pt-3">
              <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-neon-cyan to-neon-magenta"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={seek}
                className="sr-only"
                aria-label="Seek"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-500">
                <span>{fmt(progress)}</span>
                <span>{fmt(duration)}</span>
              </div>
            </div>

            {/* controls */}
            <div className="flex items-center justify-between px-6 py-4">
              <button
                onClick={() => skip(-1)}
                aria-label="Previous track"
                className="text-zinc-300 transition-colors hover:text-neon-cyan"
              >
                <SkipBack className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? 'Pause' : 'Play'}
                className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-magenta text-ink-950 shadow-neon transition-transform active:scale-95"
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
              </button>
              <button
                onClick={() => skip(1)}
                aria-label="Next track"
                className="text-zinc-300 transition-colors hover:text-neon-cyan"
              >
                <SkipForward className="h-5 w-5" />
              </button>
              <button
                onClick={() => {
                  setMuted((m) => !m);
                  if (audioRef.current) audioRef.current.muted = !muted;
                }}
                aria-label={muted ? 'Unmute' : 'Mute'}
                className="text-zinc-300 transition-colors hover:text-neon-magenta"
              >
                {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>

            {/* tracklist */}
            <div className="max-h-40 overflow-y-auto border-t border-white/10 px-2 py-2">
              {tracks.map((t, i) => (
                <button
                  key={t.title}
                  onClick={() => {
                    setIndex(i);
                    setPlaying(true);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                    i === index ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-[10px] text-neon-cyan">{String(i + 1).padStart(2, '0')}</span>
                  <span className="truncate text-sm">{t.title}</span>
                  {i === index && playing && (
                    <span className="ml-auto flex items-end gap-0.5">
                      <span className="h-2 w-0.5 animate-pulse bg-neon-cyan" />
                      <span className="h-3 w-0.5 animate-pulse bg-neon-cyan [animation-delay:150ms]" />
                      <span className="h-1.5 w-0.5 animate-pulse bg-neon-cyan [animation-delay:300ms]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
