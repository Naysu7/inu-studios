import { motion } from 'framer-motion';
import { Play, Mail, Download, Gamepad2, Sparkles } from 'lucide-react';
import { DATA } from '@/data';

export default function Hero() {
  const goTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-24"
    >
      {/* animated grid + glow background */}
      <div className="pointer-events-none absolute inset-0 bg-grid bg-grid opacity-[0.5]" />
      <div className="pointer-events-none absolute inset-0 bg-radialGlow" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-neon-cyan/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-neon-magenta/20 blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* left: text + CTAs */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-neon-cyan"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {DATA.brand.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="glitch font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl"
            data-text={DATA.brand.name}
          >
            {DATA.brand.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300"
          >
            {DATA.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <button
              onClick={() => goTo('#games')}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-ink-950 shadow-neon transition-transform hover:scale-[1.03] active:scale-95"
            >
              <Play className="h-4 w-4" />
              Play My Games
            </button>
            <button
              onClick={() => goTo('#contact')}
              className="inline-flex items-center gap-2 rounded-xl glass glass-hover px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-white"
            >
              <Mail className="h-4 w-4 text-neon-cyan" />
              Hire Me
            </button>
            <a
              href={DATA.brand.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-neon-cyan/60 hover:text-white"
            >
              <Download className="h-4 w-4 text-neon-magenta" />
              Download CV
            </a>
          </motion.div>

          {/* mini stat row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex gap-8 font-mono text-xs uppercase tracking-widest text-zinc-500"
          >
            <div>
              <div className="font-display text-2xl font-black text-white">{DATA.stats.gamesReleased}</div>
              <div>Games Released</div>
            </div>
            <div>
              <div className="font-display text-2xl font-black text-white">{DATA.stats.yearsCoding}+</div>
              <div>Years Coding</div>
            </div>
            <div>
              <div className="font-display text-2xl font-black text-white">{DATA.stats.qaProjects}</div>
              <div>QA Projects</div>
            </div>
          </motion.div>
        </div>

        {/* right: batman crossfade portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl glass shadow-glass">
            {/* profile image */}
            <motion.img
              src={DATA.hero.profileImgUrl}
              alt="Developer portrait"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
              initial={false}
              whileHover={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
            {/* batman image */}
            <motion.img
              src={DATA.hero.batmanImgUrl}
              alt="Batman"
              loading="eager"
              className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            />
            {/* scanline overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute inset-x-0 h-px bg-neon-cyan/40 animate-scan" />
            </div>

            {/* hover hint */}
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-cyan opacity-100 transition-opacity duration-300 group-hover:opacity-0">
              Hover to reveal alter ego
            </div>
            <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-magenta opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              I am vengeance
            </div>
          </div>

          {/* floating badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -left-4 top-10 flex items-center gap-2 rounded-xl glass px-3 py-2 shadow-neon"
          >
            <Gamepad2 className="h-4 w-4 text-neon-cyan" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-white">Unity · C#</span>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500"
      >
        Scroll ↓
      </motion.div>
    </section>
  );
}
