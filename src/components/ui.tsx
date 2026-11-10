import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import type { ReactNode } from 'react';

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent = 'cyan',
}: {
  eyebrow: string;
  title: string;
  accent?: 'cyan' | 'magenta';
}) {
  const accentClass = accent === 'cyan' ? 'text-neon-cyan' : 'text-neon-magenta';
  return (
    <Reveal className="mb-10">
      <div className={`mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] ${accentClass}`}>
        <span className="h-px w-8 bg-current" />
        {eyebrow}
      </div>
      <h2
        className="glitch font-display text-4xl font-black uppercase tracking-tight text-white sm:text-5xl md:text-6xl"
        data-text={title}
      >
        {title}
      </h2>
    </Reveal>
  );
}
