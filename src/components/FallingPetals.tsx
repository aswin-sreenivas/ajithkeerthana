import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

export default function FallingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const petalColors = ['#7a0016', '#5e0011', '#94001c', '#40000b', '#8a0a22'];
    const petalCount = Math.min(Math.floor(window.innerWidth / 35), 32); // adaptive density
    const petals: Petal[] = [];

    const createPetal = (initialY = -30): Petal => ({
      x: Math.random() * width,
      y: initialY === -30 ? -30 : Math.random() * height,
      size: Math.random() * 12 + 10,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.01,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      opacity: Math.random() * 0.4 + 0.45,
    });

    for (let i = 0; i < petalCount; i++) {
      petals.push(createPetal(0));
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.sin(p.flip));

      ctx.beginPath();
      // Draw smooth romantic curved rose petal
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.6, p.size * 0.8, p.size * 0.6, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.6, -p.size * 0.8, -p.size * 0.6, 0, -p.size);

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < petals.length; i++) {
          const p = petals[i];
          p.x += p.speedX + Math.sin(p.y * 0.005) * 0.5;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;
          p.flip += p.flipSpeed;

          // Wrap around screen seamlessly
          if (p.y > height + 40) {
            petals[i] = createPetal(-20);
          }
          if (p.x < -40) p.x = width + 30;
          if (p.x > width + 40) p.x = -30;

          drawPetal(p);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="petal-container"
      className="fixed inset-0 pointer-events-none z-[9998] w-full h-full"
      aria-hidden="true"
    />
  );
}

