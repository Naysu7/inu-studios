import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Tag } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';
import type { Game } from '@/data';

const ring: Record<string, string> = {
  'neon-cyan': 'text-neon-cyan border-neon-cyan/50 shadow-neon',
  'neon-magenta': 'text-neon-magenta border-neon-magenta/50 shadow-neonMag',
  'neon-lime': 'text-neon-lime border-neon-lime/50',
  'neon-amber': 'text-neon-amber border-neon-amber/50',
  'neon-violet': 'text-neon-violet border-neon-violet/50',
};

function GameCard({ game, i }: { game: Game; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hover, setHover] = useState(false);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
    setHover(false);
    if (videoRef.current) videoRef.current.pause();
  };
  const onEnter = () => {
    setHover(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };

  return (
    <Reveal delay={(i % 3) * 0.08}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        style={{ transition: 'transform 0.2s ease-out', transformStyle: 'preserve-3d' }}
        className="group relative h-full overflow-hidden rounded-2xl glass shadow-glass"
      >
        {/* media */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.poster}
            alt={game.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <video
            ref={videoRef}
            src={game.video}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
              hover ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />

          {/* tag chips */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {game.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/15 bg-ink-950/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-300 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* body */}
        <div className="p-5">
          <div className={`mb-1 font-mono text-[10px] uppercase tracking-widest ${ring[game.color]?.split(' ')[0]}`}>
            {game.tagline}
          </div>
          <h3 className="font-display text-xl font-black uppercase leading-tight text-white">
            {game.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{game.desc}</p>

          <div className="mt-5 flex items-center gap-3">
            <a
              href={game.itch}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.03] ${ring[game.color]}`}
            >
              <Tag className="h-3.5 w-3.5" />
              Play on itch.io
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* tilt glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.12), transparent 50%)',
          }}
        />
      </div>
    </Reveal>
  );
}

export default function Games() {
  return (
    <section id="games" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 05" title="Game Portfolio" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DATA.games.map((g, i) => (
            <GameCard key={g.title} game={g} i={i} />
          ))}

          {/* itch profile card */}
          <Reveal delay={0.16}>
            <a
              href={DATA.brand.itchProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-[320px] flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-neon-cyan/30 p-8 text-center transition-colors hover:border-neon-cyan/70"
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-magenta text-ink-950 shadow-neon transition-transform group-hover:scale-110">
                <ExternalLink className="h-7 w-7" />
              </div>
              <div>
                <div className="font-display text-xl font-black uppercase text-white">
                  See everything
                </div>
                <div className="mt-1 font-mono text-xs uppercase tracking-widest text-neon-cyan">
                  @{DATA.brand.itchUsername} · itch.io
                </div>
              </div>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
