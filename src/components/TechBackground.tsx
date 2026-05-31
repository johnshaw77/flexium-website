import { useEffect, useRef, useState } from "react";

interface TechBackgroundProps {
  /** Render the looping mp4 backdrop. When false, only the canvas neural mesh + glow show. */
  showVideo?: boolean;
  /** Source path for the looping backdrop video. */
  videoSrc?: string;
}

export default function TechBackground({
  showVideo = true,
  videoSrc = "/robot.mp4",
}: TechBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Video Autoplay and fallback logic
  useEffect(() => {
    if (!showVideo) return;
    const videoObj = videoRef.current;
    if (!videoObj) return;

    // Force autoplay parameters via DOM properties to guarantee compatibility with all browsers
    videoObj.defaultMuted = true;
    videoObj.muted = true;
    videoObj.playsInline = true;

    const playPromise = videoObj.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsVideoPlaying(true);
        })
        .catch((err) => {
          console.log(
            "Video autoplay blocked or resource failed, falling back to Canvas interactive neural grid:",
            err,
          );
          setIsVideoPlaying(false);
        });
    }
  }, [showVideo]);

  // HTML5 Canvas animated neural mesh grid rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    // Scale particle count with screen dimensions
    const particleCount = Math.min(65, Math.floor((width * height) / 18000));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1,
      });
    }

    // Resize Observer for robust dimensional scaling
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw standard clean cyber background mesh grid
      ctx.strokeStyle = "rgba(28, 124, 255, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 65;

      // Vertical Grid lines
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      // Horizontal Grid lines
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & Draw nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Clamp positions to stay inside bounds
        p.x = Math.max(0, Math.min(width, p.x));
        p.y = Math.max(0, Math.min(height, p.y));

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(28, 124, 255, 0.45)";
        ctx.fill();

        // Connect particles with distance lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Render link if close
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Calculate fading alpha gradient
            const alpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = `rgba(0, 112, 243, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-black">
      {/* 1. Underlying custom video backdrop loop with high-fidelity output */}
      {showVideo && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoPlaying ? "opacity-60" : "opacity-0"
          }`}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* 2. Interactive high-tech Neural Canvas mesh overlay on top of the video */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block bg-transparent"
      />

      {/* 3. Sleek subtle radial glow that adds brand context without masking the background video */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(28,124,255,0.06),transparent_70%)]" />
    </div>
  );
}
