import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Facebook, Instagram, Gamepad2, Heart, ArrowUp, Github } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';
import { useKonami } from '@/hooks/useKonami';

export default function Contact() {
  const [konami, setKonami] = useState(false);
  useKonami(() => setKonami(true));

  return (
    <section id="contact" className="relative px-5 pt-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 08" title="Get In Touch" accent="magenta" />

        <Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            <a
              href={`mailto:${DATA.social.email}`}
              className="group rounded-2xl glass p-7 text-center shadow-glass transition-colors hover:border-neon-cyan/50"
            >
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 text-neon-cyan transition-transform group-hover:scale-110">
                <Mail className="h-6 w-6" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Email</div>
              <div className="mt-1 text-sm text-white">{DATA.social.email}</div>
            </a>

            <a
              href={DATA.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl glass p-7 text-center shadow-glass transition-colors hover:border-neon-cyan/50"
            >
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 text-neon-cyan transition-transform group-hover:scale-110">
                <Facebook className="h-6 w-6" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Facebook</div>
              <div className="mt-1 text-sm text-white">@inustudios</div>
            </a>

            <a
              href={DATA.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl glass p-7 text-center shadow-glass transition-colors hover:border-neon-magenta/50"
            >
              <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-magenta/20 to-neon-cyan/20 text-neon-magenta transition-transform group-hover:scale-110">
                <Instagram className="h-6 w-6" />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Instagram</div>
              <div className="mt-1 text-sm text-white">@inustudios</div>
            </a>
          </div>
        </Reveal>
      </div>

      {/* footer */}
      <footer className="relative mt-24 border-t border-white/10 px-5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 text-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 rounded-full glass glass-hover px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-zinc-300"
          >
            <ArrowUp className="h-3.5 w-3.5 text-neon-cyan" />
            Back to top
          </button>

          <div className="flex items-center gap-2 font-display text-lg font-black uppercase tracking-wider text-white">
            <Gamepad2 className="h-5 w-5 text-neon-cyan" />
            {DATA.brand.name}
          </div>

          <p className="max-w-md font-mono text-[11px] leading-relaxed text-zinc-500">
            Built with Unity-grade care · React · Tailwind · Framer Motion.
            <br />
            Try the Konami code:{' '}
            <span className="text-neon-cyan">↑↑↓↓←→←→ B A</span>
          </p>

          <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
            © {new Date().getFullYear()} {DATA.brand.name} · Made with
            <Heart className="h-3 w-3 fill-neon-magenta text-neon-magenta" /> & caffeine
          </p>

          <a
            href={DATA.brand.itchProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-zinc-500 hover:text-neon-cyan"
          >
            <Github className="h-3 w-3" />
            @{DATA.brand.itchUsername} on itch.io
          </a>
        </div>
      </footer>

      {/* Konami easter egg overlay */}
      <AnimatePresence>
        {konami && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-ink-950/80 backdrop-blur-md"
            onClick={() => setKonami(false)}
          >
            <motion.div
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="rounded-3xl glass p-10 text-center shadow-neon"
            >
              <div className="font-display text-4xl font-black uppercase text-white sm:text-6xl">
                <span className="text-neon-cyan">30</span>{' '}
                <span className="glitch text-neon-magenta" data-text="LIVES">LIVES</span>
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-zinc-400">
                Cheat activated · You found the secret
              </p>
              <p className="mt-2 text-sm text-zinc-300">Click anywhere to continue</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
