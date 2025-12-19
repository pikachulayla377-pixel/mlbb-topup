import React, { useState, useEffect, useRef } from "react";

interface BlueBuffLoaderProps {
  progress?: number;
  duration?: number;
  onComplete?: () => void;
  showText?: boolean;
  text?: string;
}

export default function BlueBuffLoader({
  progress = 0,
  duration = 3000,
  onComplete,
  showText = true,
  text = "Summoning Blue Buff",
}: BlueBuffLoaderProps) {
  const [internalProgress, setInternalProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  /* ================= PROGRESS ENGINE ================= */
  useEffect(() => {
    if (progress > 0) {
      setInternalProgress(progress);
      if (progress >= 100) finish();
      return;
    }

    const animate = (time: number) => {
      if (!startRef.current) startRef.current = time;
      const elapsed = time - startRef.current;

      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      setInternalProgress(eased * 100);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        finish();
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress, duration]);

  const finish = () => {
    setInternalProgress(100);
    setIsComplete(true);
    setTimeout(() => {
      setIsAnimating(false);
      onComplete?.();
    }, 800);
  };

  /* ================= COLOR LOGIC ================= */
  const getProgressColor = (pct: number) => {
    if (pct < 25) return "#3b82f6"; // mana blue
    if (pct < 50) return "#22d3ee"; // cyan
    if (pct < 75) return "#8b5cf6"; // violet
    return "#10b981"; // emerald
  };

  const pulseIntensity = 0.35 + internalProgress / 200;
  const activeParticles = Math.floor(internalProgress / 16);

  if (!isAnimating) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-[var(--background)]"
      style={{
        animation: "hueRotate 18s linear infinite",
      }}
    >
      {/* ================= CORE ================= */}
      <div className="relative w-48 h-48">

        {/* ================= HEX RING ================= */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: `${5 - internalProgress / 45}s` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={getProgressColor(internalProgress)} />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>

              <filter id="glow">
                <feGaussianBlur stdDeviation="2.2" />
              </filter>
            </defs>

            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="url(#hexGrad)"
              strokeWidth="3"
              strokeDasharray="22 12"
              filter="url(#glow)"
              opacity="0.65"
            />
          </svg>
        </div>

        {/* ================= ORBIT PARTICLES ================= */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const active = i < activeParticles;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                animation: active
                  ? `spin ${2.2 + i * 0.25}s linear infinite`
                  : "none",
              }}
            >
              <div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `
                    rotate(${deg}deg)
                    translateX(${36 + internalProgress / 14}px)
                    translateY(-50%)
                    scale(${active ? 1 + internalProgress / 300 : 0.6})
                  `,
                  background: getProgressColor(internalProgress),
                  opacity: active ? 1 : 0.15,
                  animation: active
                    ? "pulse 1.6s ease-in-out infinite"
                    : "none",
                  boxShadow: active
                    ? `0 0 ${14 + internalProgress / 8}px ${getProgressColor(
                        internalProgress
                      )}`
                    : "none",
                }}
              />
            </div>
          );
        })}

        {/* ================= CENTER SHIELD ================= */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-24 h-24">

            {/* ENERGY WAVE */}
            {internalProgress > 5 && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `2px solid ${getProgressColor(internalProgress)}`,
                  animation: "energyWave 2.5s ease-out infinite",
                }}
              />
            )}

            {/* AURA */}
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{
                background: getProgressColor(internalProgress),
                opacity: pulseIntensity,
                transform: `scale(${1 + internalProgress / 420})`,
                animation: "pulse 2.4s ease-in-out infinite",
              }}
            />

            {/* SHIELD OUTLINE */}
            <svg viewBox="0 0 64 64" className="relative w-full h-full">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getProgressColor(internalProgress)} />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>

              <path
                d="M32 4 L8 14 L8 30 Q8 45 32 60 Q56 45 56 30 L56 14 Z"
                fill="none"
                stroke="url(#shieldGrad)"
                strokeWidth="2.5"
              />
            </svg>

            {/* SHIELD FILL + SHIMMER */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `inset(${100 - internalProgress}% 0 0 0)`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `
                    linear-gradient(
                      120deg,
                      transparent 30%,
                      rgba(255,255,255,0.35),
                      transparent 70%
                    )
                  `,
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s linear infinite",
                }}
              />
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <path
                  d="M32 4 L8 14 L8 30 Q8 45 32 60 Q56 45 56 30 L56 14 Z"
                  fill={getProgressColor(internalProgress)}
                  opacity="0.85"
                />
              </svg>
            </div>

            {/* % / CHECK */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isComplete ? (
                <span
                  className="font-bold text-2xl"
                  style={{
                    color: "var(--foreground)",
                    textShadow: `0 0 ${10 + internalProgress / 10}px ${getProgressColor(
                      internalProgress
                    )}`,
                  }}
                >
                  {Math.round(internalProgress)}%
                </span>
              ) : (
                <>
                  <svg width="28" height="28" viewBox="0 0 24 24">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* LIGHTNING BURST */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: "2px solid #10b981",
                      animation: "lightning 0.6s ease-out",
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= TEXT ================= */}
      {showText && (
        <div className="mt-10 text-center">
          <p className="text-lg font-semibold">
            <span style={{ color: getProgressColor(internalProgress) }}>
              {text}
            </span>
            {!isComplete && <span className="animate-pulse ml-2">…</span>}
          </p>

          <p className="text-sm opacity-60 mt-1">
            {internalProgress < 30 && "Initializing mana core"}
            {internalProgress >= 30 && internalProgress < 60 && "Empowering buff"}
            {internalProgress >= 60 && internalProgress < 90 && "Almost ready"}
            {internalProgress >= 90 && !isComplete && "Finalizing"}
            {isComplete && "Blue Buff Ready"}
          </p>
        </div>
      )}
    </div>
  );
}
