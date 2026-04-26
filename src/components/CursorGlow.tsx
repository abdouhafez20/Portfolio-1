import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const isTouch = useRef(window.matchMedia('(hover: none)').matches);

  useEffect(() => {
    // Disable on touch devices
    if (isTouch.current) return;

    // Disable on small screens
    if (window.innerWidth < 1024) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (glowRef.current && !isTouch.current) {
        // Use transform3d for GPU acceleration
        glowRef.current.style.transform = `translate3d(${pos.current.x - 150}px, ${pos.current.y - 150}px, 0)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-[9999] hidden lg:block will-change-transform"
      style={{
        background: 'radial-gradient(circle, rgba(42, 88, 64, 0.05) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }}
      aria-hidden="true"
    />
  );
}
