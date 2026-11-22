import { motion } from 'framer-motion';
import { Bug, ShieldCheck, Database, FlaskConical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';

const icons: LucideIcon[] = [Database, FlaskConical];

export default function QA() {
  return (
    <section id="qa" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 06" title="QA Testing" accent="magenta" />

        <div className="grid gap-6 md:grid-cols-2">
          {DATA.qa.map((q, i) => {
            const Icon = icons[i % icons.length] ?? Bug;
            return (
              <Reveal key={q.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative h-full overflow-hidden rounded-2xl glass shadow-glass transition-colors hover:border-neon-magenta/40"
                >
                  {/* top image banner */}
                  <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-fuchsia-950/50 via-[#12121a] to-cyan-950/50">
                    <img
                      src={q.image}
                      alt={q.title}
                      loading="lazy"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

                    {/* tag pills */}
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      {q.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-md border border-white/15 bg-ink-950/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-zinc-300 backdrop-blur"
                        >
                          <ShieldCheck className="h-3 w-3 text-neon-cyan" />
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* body */}
                  <div className="relative p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-neon-magenta">
                          {q.role}
                        </div>
                        <h3 className="mt-1 font-display text-xl font-black uppercase leading-tight text-white">
                          {q.title}
                        </h3>
                      </div>
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/5 text-neon-magenta backdrop-blur">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                      {q.desc}
                    </p>

                    <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      <Bug className="h-3.5 w-3.5 text-neon-lime" />
                      {q.footer}
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
