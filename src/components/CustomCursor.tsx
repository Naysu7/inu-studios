import { useEffect, useRef } from 'react';

type Particle = {
  el: HTMLDivElement;
  life: number;
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const dot = dotRef.current;
    const cross = crossRef.current;
    if (!dot || !cross) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cross.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      // spawn particle
      if (Math.random() < 0.55) spawnParticle(mouseX, mouseY);
    };

    const spawnParticle = (x: number, y: number) => {
      const el = document.createElement('div');
      el.className = 'cursor-trail';
      const hue = Math.random() > 0.5 ? '#22d3ee' : '#ff2bd6';
      el.style.background = hue;
      el.style.boxShadow = `0 0 8px ${hue}`;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = 'translate(-50%, -50%) scale(1)';
      el.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      document.body.appendChild(el);
      particlesRef.current.push({ el, life: 0 });

      requestAnimationFrame(() => {
        el.style.transform = `translate(-50%, -50%) scale(0)`;
        el.style.opacity = '0';
      });
    };

    const tick = () => {
      // ease dot toward cursor
      const cur = dot.getBoundingClientRect();
      const dx = mouseX - (cur.left + cur.width / 2);
      const dy = mouseY - (cur.top + cur.height / 2);
      const nx = cur.left + dx * 0.22;
      const ny = cur.top + dy * 0.22;
      dot.style.transform = `translate(${nx + cur.width / 2}px, ${ny + cur.height / 2}px)`;

      // cleanup particles
      const next: Particle[] = [];
      for (const p of particlesRef.current) {
        p.life += 1;
        if (p.life < 36) next.push(p);
        else p.el.remove();
      }
      particlesRef.current = next;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onDown = () => dot.classList.add('is-active');
    const onUp = () => dot.classList.remove('is-active');

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a, button, [data-cursor="active"], input, textarea, select')) {
        dot.classList.add('is-active');
      } else {
        dot.classList.remove('is-active');
      }
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseover', onOver);
      particlesRef.current.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, []);

  return (
    <>
      <div ref={crossRef} className="cursor-crosshair" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
