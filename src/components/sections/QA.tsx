import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bug, ShieldCheck, Database, FlaskConical } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';

const icons: LucideIcon[] = [Database, FlaskConical];

function QaImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-neon-magenta/15 via-ink-900 to-neon-cyan/10 transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
  );
}

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
                  className="group relative h-full overflow-hidden rounded-2xl glass shadow-glass"
                >
                  {/* full-bleed background image */}
                  <div className="absolute inset-0">
                    <QaImage src={q.image} alt={q.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-[#0a0a0f]/40" />
                  </div>

                  {/* content */}
                  <div className="relative flex h-full flex-col p-7">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-display text-2xl font-black text-white">
                          {q.title}
                        </div>
                        <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-neon-magenta">
                          {q.role}
                        </div>
                      </div>
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/5 text-neon-magenta backdrop-blur">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                      {q.desc}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {q.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-300 backdrop-blur"
                        >
                          <ShieldCheck className="h-3 w-3 text-neon-cyan" />
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      <Bug className="h-3.5 w-3.5 text-neon-lime" />
                      {q.footer}
                    </div>
                  </div>

                  {/* hover glow accent */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon-magenta/10 blur-2xl transition-colors duration-300 group-hover:bg-neon-magenta/20" />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
