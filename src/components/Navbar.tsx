import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { DATA } from '@/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#hero');

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

          <ul className="hidden items-center gap-1 lg:flex">
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
            className="text-zinc-200 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
