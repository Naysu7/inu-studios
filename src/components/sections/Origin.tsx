import { motion } from 'framer-motion';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';

export default function Origin() {
  return (
    <section id="origin" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 01" title="Origin Story" />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* overlapping masonry images */}
          <Reveal>
            <div className="relative h-[460px]">
              <motion.div
                initial={{ opacity: 0, x: -30, rotate: -4 }}
                whileInView={{ opacity: 1, x: 0, rotate: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="absolute left-0 top-0 w-[62%] overflow-hidden rounded-2xl glass p-1.5 shadow-glass"
              >
                <img
                  src={DATA.origin.workspaceImg}
                  alt="Workspace"
                  className="h-72 w-full rounded-xl object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30, rotate: 4 }}
                whileInView={{ opacity: 1, x: 0, rotate: 3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="absolute bottom-0 right-0 w-[62%] overflow-hidden rounded-2xl glass p-1.5 shadow-neon"
              >
                <img
                  src={DATA.origin.devSetupImg}
                  alt="Dev setup"
                  className="h-72 w-full rounded-xl object-cover"
                />
              </motion.div>
              {/* decorative node */}
              <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-cyan/40 bg-ink-900/80 backdrop-blur grid place-items-center">
                <span className="font-display text-xs font-black text-neon-cyan">BSEMC</span>
              </div>
            </div>
          </Reveal>

          {/* text */}
          <Reveal delay={0.15}>
            <p className="text-xl leading-relaxed text-zinc-200">
              {DATA.origin.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {['Unity', 'C#', '2D / 3D', 'Game Design', 'BISCAST'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
