import { motion } from 'framer-motion';
import { Code2, Gamepad2, Bug, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';

const icons: Record<string, LucideIcon> = {
  Code2,
  Gamepad2,
  Bug,
  Globe,
};

export default function Services() {
  return (
    <section id="services" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 04" title="My Services" accent="magenta" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {DATA.services.map((s, i) => {
            const Icon = icons[s.icon] ?? Code2;
            return (
              <Reveal key={s.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative h-full overflow-hidden rounded-2xl glass p-6 shadow-glass transition-colors hover:border-neon-cyan/50"
                >
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon-cyan/10 blur-2xl transition-opacity duration-300 group-hover:bg-neon-magenta/20" />
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 text-neon-cyan transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
                  <div className="mt-4 h-px w-full bg-gradient-to-r from-neon-cyan/40 to-transparent" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
