import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gamepad2, Trophy } from 'lucide-react';
import { DATA } from '@/data';
import AchievementsModal from '@/components/AchievementsModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#hero');
  const [achOpen, setAchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = DATA.nav.map((n) => document.querySelector(n.href));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= y) {
          setActive(DATA.nav[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass shadow-glass' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
          <button onClick={() => go('#hero')} className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-neon-cyan to-neon-magenta text-ink-950 shadow-neon">
              <Gamepad2 className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-black uppercase tracking-wider text-white">
              Inu<span className="text-neon-cyan">.</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            <ul className="flex items-center gap-1">
              {DATA.nav.map((n) => (
                <li key={n.href}>
                  <button
                    onClick={() => go(n.href)}
                    className={`rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-widest transition-colors ${
                      active === n.href
                        ? 'text-neon-cyan'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setAchOpen(true)}
              className="ml-2 inline-flex items-center gap-1.5 rounded-lg border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-neon-cyan transition-colors hover:bg-neon-cyan/20"
            >
              <Trophy className="h-3.5 w-3.5" />
              Achievements
            </button>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setAchOpen(true)}
              aria-label="Open achievements"
              className="text-neon-cyan"
            >
              <Trophy className="h-5 w-5" />
            </button>
            <button
              className="text-zinc-200"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-lg font-black uppercase text-white">
                Inu<span className="text-neon-cyan">.</span>
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-zinc-200">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-8 flex flex-col gap-2 px-5">
              {DATA.nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    onClick={() => go(n.href)}
                    className="w-full rounded-lg px-4 py-3 text-left font-display text-2xl font-bold uppercase text-zinc-300 hover:bg-white/5 hover:text-neon-cyan"
                  >
                    {n.label}
                  </button>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: DATA.nav.length * 0.05 }}
              >
                <button
                  onClick={() => { setOpen(false); setAchOpen(true); }}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-display text-2xl font-bold uppercase text-neon-cyan hover:bg-white/5"
                >
                  <Trophy className="h-5 w-5" />
                  Achievements
                </button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AchievementsModal open={achOpen} onClose={() => setAchOpen(false)} />
    </>
  );
}
