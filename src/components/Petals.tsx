import React, { useEffect, useRef } from 'react';

interface PetalParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  color: string;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
}

const PETAL_COLORS = ['#7a0016', '#5e0011', '#94001c', '#38000a', '#e2c092'];

export const Petals: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Limit particles on mobile devices for battery and CPU savings
    const isMobile = width < 768;
    const maxPetals = isMobile ? 12 : 22;

    const createPetal = (initialY = false): PetalParticle => {
      const size = Math.random() * (isMobile ? 8 : 12) + (isMobile ? 8 : 10);
      return {
        x: Math.random() * width,
        y: initialY ? Math.random() * height : -size - Math.random() * 40,
        size,
        speedY: Math.random() * 0.8 + 0.6,
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.35,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        swayAmplitude: Math.random() * 20 + 10,
        swayFrequency: Math.random() * 0.002 + 0.001,
        swayOffset: Math.random() * Math.PI * 2,
      };
    };

    const petals: PetalParticle[] = [];
    for (let i = 0; i < maxPetals; i++) {
      petals.push(createPetal(true));
    }

    // Draw single petal path
    const drawPetal = (p: PetalParticle, time: number) => {
      ctx.save();
      const currentX = p.x + Math.sin(time * p.swayFrequency + p.swayOffset) * p.swayAmplitude;
      ctx.translate(currentX, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      // Organic petal curve
      const s = p.size;
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.8, -s * 0.4, s * 0.9, s * 0.5, 0, s);
      ctx.bezierCurveTo(-s * 0.9, s * 0.5, -s * 0.8, -s * 0.4, 0, -s);
      ctx.fill();

      ctx.restore();
    };

    let lastTime = performance.now();
    let isTabVisible = true;

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };

    const render = (currentTime: number) => {
      if (!isTabVisible) return;

      const delta = Math.min(currentTime - lastTime, 64); // Cap delta to prevent jump
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY * (delta / 16);
        p.x += p.speedX * (delta / 16);
        p.rotation += p.rotSpeed * (delta / 16);

        drawPetal(p, currentTime);

        // Reset when fell below screen
        if (p.y > height + p.size * 2) {
          petals[i] = createPetal(false);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petal-canvas"
      className="fixed inset-0 pointer-events-none z-[9998] w-full h-full"
      aria-hidden="true"
    />
  );
};

export default Petals;
