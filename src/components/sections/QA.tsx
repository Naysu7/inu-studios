import { motion } from 'framer-motion';
import { Bug, ShieldCheck, Database, FlaskConical } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';

export default function QA() {
  return (
    <section id="qa" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 06" title="QA Testing" accent="magenta" />

        <div className="grid gap-6 lg:grid-cols-2">
          {DATA.qa.map((q, i) => (
            <Reveal key={q.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="group relative h-full overflow-hidden rounded-2xl glass p-7 shadow-glass"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon-magenta/10 blur-2xl" />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-2xl font-black text-white">{q.title}</div>
                    <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-neon-magenta">
                      {q.role}
                    </div>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-neon-magenta">
                    {i === 0 ? <Database className="h-6 w-6" /> : <FlaskConical className="h-6 w-6" />}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300">{q.desc}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {q.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-300"
                    >
                      <ShieldCheck className="h-3 w-3 text-neon-cyan" />
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  <Bug className="h-3.5 w-3.5 text-neon-lime" />
                  Freelance QA · Verified work
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
