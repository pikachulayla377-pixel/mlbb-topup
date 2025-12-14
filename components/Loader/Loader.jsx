import React from "react";

export default function BlueBuffLoader() {
  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-[var(--background)]
        transition-colors duration-300
      "
    >
      <div className="relative w-32 h-32">
        {/* ================= HEX FRAME ================= */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>

            <polygon
              points="50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5"
              fill="none"
              stroke="url(#grad1)"
              strokeWidth="3"
              strokeDasharray="20 10"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* ================= ORBIT PARTICLES ================= */}
        <div className="absolute inset-0">
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <div
              key={i}
              className="absolute inset-0 animate-spin"
              style={{
                animationDuration: `${2 + i * 0.3}s`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div
                className="absolute w-2 h-2 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${deg}deg) translateX(35px) translateY(-50%)`,
                  background:
                    i % 2 === 0
                      ? "var(--accent)"
                      : "var(--foreground)",
                  boxShadow: `0 0 10px var(--accent)`,
                }}
              />
            </div>
          ))}
        </div>

        {/* ================= CENTER SHIELD ================= */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Glow (theme aware) */}
            <div
              className="
                absolute inset-0 rounded-lg blur-xl opacity-50 animate-pulse
              "
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), #22d3ee)",
              }}
            />

            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg viewBox="0 0 64 64" className="w-full h-full">
                <defs>
                  <linearGradient
                    id="shieldGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>

                <path
                  d="M32 4 L8 14 L8 30 Q8 45 32 60 Q56 45 56 30 L56 14 Z"
                  fill="url(#shieldGrad)"
                  className="drop-shadow-lg"
                />
              </svg>

              {/* BB Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-bold text-xl tracking-tighter animate-pulse"
                  style={{
                    color: "var(--foreground)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.6)",
                  }}
                >
                  BB
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ENERGY RINGS ================= */}
        <div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s", animationDirection: "reverse" }}
        >
          <div
            className="
              absolute inset-0 rounded-full opacity-60
              border-2 border-transparent
            "
            style={{
              borderTopColor: "var(--accent)",
              borderRightColor: "#22d3ee",
            }}
          />
        </div>

        <div
          className="absolute inset-2 animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <div
            className="
              absolute inset-0 rounded-full opacity-40
              border-2 border-transparent
            "
            style={{
              borderBottomColor: "#22d3ee",
              borderLeftColor: "var(--accent)",
            }}
          />
        </div>

        {/* ================= CORNER PINGS ================= */}
        {[0, 90, 180, 270].map((angle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              top: "50%",
              left: "50%",
              transform: `rotate(${angle}deg) translateX(50px) translateY(-50%)`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1.5s",
              background: "var(--accent)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
