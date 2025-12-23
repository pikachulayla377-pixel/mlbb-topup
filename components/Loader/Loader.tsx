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
  duration = 1800, // ⬅️ Faster by default
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
      const eased = 1 - Math.pow(1 - t, 4); // smoother easing

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
    }, 600); // ⬅️ quicker exit
  };

  /* ================= COLOR LOGIC ================= */
  const getProgressColor = (pct: number) => {
    if (pct < 25) return "#3b82f6";
    if (pct < 50) return "#22d3ee";
    if (pct < 75) return "#8b5cf6";
    return "#10b981";
  };

  const pulseIntensity = 0.25 + internalProgress / 260;
  const activeParticles = Math.floor(internalProgress / 22); // ⬅️ fewer particles

  if (!isAnimating) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center
                 bg-[radial-gradient(circle_at_center,#0b1220,#020617)]"
    >
      {/* ================= CORE ================= */}
      <div className="relative w-44 h-44">

        {/* ================= HEX RING ================= */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: `${4 - internalProgress / 60}s` }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={getProgressColor(internalProgress)} />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
            </defs>

            <polygon
              points="50,6 88,28 88,72 50,94 12,72 12,28"
              fill="none"
              stroke="url(#hexGrad)"
              strokeWidth="2.5"
              strokeDasharray="18 10"
              opacity="0.7"
            />
          </svg>
        </div>

        {/* ================= ORBIT PARTICLES ================= */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const active = i < activeParticles;
          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                animation: active
                  ? `spin ${2 + i * 0.3}s linear infinite`
                  : "none",
              }}
            >
              <div
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `
                    rotate(${deg}deg)
                    translateX(${32 + internalProgress / 18}px)
                    translateY(-50%)
                  `,
                  background: getProgressColor(internalProgress),
                  opacity: active ? 1 : 0.2,
                  boxShadow: active
                    ? `0 0 10px ${getProgressColor(internalProgress)}`
                    : "none",
                }}
              />
            </div>
          );
        })}

        {/* ================= CENTER CORE ================= */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-20 h-20">

            {/* AURA */}
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{
                background: getProgressColor(internalProgress),
                opacity: pulseIntensity,
                transform: `scale(${1 + internalProgress / 500})`,
              }}
            />

            {/* SHIELD */}
            <svg viewBox="0 0 64 64" className="relative w-full h-full">
              <path
                d="M32 4 L8 14 L8 30 Q8 45 32 60 Q56 45 56 30 L56 14 Z"
                fill={getProgressColor(internalProgress)}
                opacity="0.9"
              />
            </svg>

            {/* TEXT / CHECK */}
            <div className="absolute inset-0 flex items-center justify-center">
              {!isComplete ? (
                <span
                  className="font-bold text-xl"
                  style={{
                    color: "#e5e7eb",
                    textShadow: `0 0 8px ${getProgressColor(internalProgress)}`,
                  }}
                >
                  {Math.round(internalProgress)}%
                </span>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= TEXT ================= */}
      {showText && (
        <div className="mt-8 text-center">
          <p className="text-base font-semibold tracking-wide">
            <span style={{ color: getProgressColor(internalProgress) }}>
              {text}
            </span>
            {!isComplete && <span className="animate-pulse ml-1">…</span>}
          </p>

          <p className="text-xs opacity-70 mt-1">
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
