import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';
import { Gamepad2, Code2, Cpu, Layers } from 'lucide-react';

const colorMap: Record<string, string> = {
  'neon-cyan': 'from-neon-cyan to-cyan-400',
  'neon-magenta': 'from-neon-magenta to-pink-400',
  'neon-lime': 'from-neon-lime to-lime-400',
  'neon-amber': 'from-neon-amber to-amber-400',
  'neon-violet': 'from-neon-violet to-violet-400',
};

function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="font-display text-4xl font-black text-white sm:text-5xl">
      {n}
      {suffix}
    </span>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 02" title="Tech Stack & Stats" accent="magenta" />

        {/* counters */}
        <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Games Released', to: DATA.stats.gamesReleased, icon: Gamepad2 },
            { label: 'Years Coding', to: DATA.stats.yearsCoding, suffix: '+', icon: Cpu },
            { label: 'Bugs Squashed', to: DATA.stats.bugsSquashed, icon: Code2 },
            { label: 'QA Projects', to: DATA.stats.qaProjects, icon: Layers },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="rounded-2xl glass p-5 text-center shadow-glass">
                <s.icon className="mx-auto mb-3 h-6 w-6 text-neon-cyan" />
                <Counter to={s.to} suffix={s.suffix} />
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* main engine highlight */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-3xl glass p-8 shadow-neon">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-neon-cyan/20 blur-3xl" />
              <div className="mb-2 font-mono text-xs uppercase tracking-widest text-neon-cyan">
                Main Game Engine
              </div>
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-magenta text-ink-950">
                  <Gamepad2 className="h-8 w-8" />
                </div>
                <div>
                  <div className="font-display text-3xl font-black text-white">Unity</div>
                  <div className="font-display text-xl font-bold text-neon-cyan">C#</div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-zinc-300">
                Primary engine for all shipped titles — gameplay scripting, physics, UI, multiplayer
                netcode, and build pipelines across desktop & mobile.
              </p>
            </div>
          </Reveal>

          {/* skill bars */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl glass p-6 shadow-glass">
              <div className="mb-5 font-mono text-xs uppercase tracking-widest text-zinc-400">
                Languages & Tools
              </div>
              <div className="space-y-4">
                {DATA.stats.techStack.map((s, i) => (
                  <div key={s.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-zinc-200">{s.name}</span>
                      <span className="font-mono text-xs text-zinc-500">{s.level}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${colorMap[s.color]}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
