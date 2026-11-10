import { motion } from 'framer-motion';
import { Activity, Cpu, Bug, Wifi } from 'lucide-react';
import { Reveal, SectionHeading } from '@/components/ui';
import { DATA } from '@/data';

export default function Status() {
  return (
    <section id="status" className="relative px-5 py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Chapter 03" title="Live Status" />

        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-8 shadow-glass md:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-neon-magenta/15 blur-3xl" />

            {/* header row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-lime opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-neon-lime" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon-lime">
                  Live · {DATA.status.mood}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-zinc-400">
                <Activity className="h-3.5 w-3.5 text-neon-cyan" />
                dev build · {DATA.status.progress}%
              </div>
            </div>

            {/* project + task */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  <Cpu className="h-3.5 w-3.5 text-neon-cyan" /> Active Project
                </div>
                <div className="font-display text-2xl font-black text-white">
                  {DATA.status.project}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  <Bug className="h-3.5 w-3.5 text-neon-magenta" /> Current Task
                </div>
                <div className="text-sm leading-relaxed text-zinc-200">
                  {DATA.status.task}
                </div>
              </div>
            </div>

            {/* progress bar */}
            <div className="mt-6">
              <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                <span>Sprint progress</span>
                <span>{DATA.status.progress}%</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${DATA.status.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-neon-lime via-neon-cyan to-neon-magenta"
                />
              </div>
            </div>

            {/* networking chip */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-cyan">
              <Wifi className="h-3.5 w-3.5" />
              Researching Unity Services Multiplayer networking
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
