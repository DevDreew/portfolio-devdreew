'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor customizado: um ring hairline que segue o mouse com spring e
 * cresce quando passa sobre elementos interativos.
 *
 * Desligado em dispositivos de toque e quando prefers-reduced-motion
 * está ativo — nesses casos o cursor nativo é o comportamento correto.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reduced) return;

    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = e.target as HTMLElement | null;
      setActive(Boolean(el?.closest('a, button, [role="button"], input, textarea')));
    };

    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseleave', leave);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        animate={{
          width: active ? 44 : 22,
          height: active ? 44 : 22,
          opacity: visible ? 1 : 0,
          borderColor: active ? 'var(--c-accent)' : 'var(--c-ink-3)',
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
      />
    </motion.div>
  );
}
