"use client";

import { useEffect, useState } from "react";

const themes = [
  { id: "light", icon: "☀️", label: "Light" },
  { id: "dark", icon: "🌙", label: "Dark" },
  { id: "sakura", icon: "🌸", label: "Sakura" },
  { id: "violet", icon: "💜", label: "Violet" },
  { id: "ember", icon: "🔥", label: "Ember" },
  { id: "midnight", icon: "🌪️", label: "Midnight" },
  { id: "ocean", icon: "🌊", label: "Ocean" },
  { id: "forest", icon: "🍃", label: "Forest" },
  { id: "crimson", icon: "🩸", label: "Crimson" },
  { id: "galaxy", icon: "🌌", label: "Galaxy" },
  { id: "sunset", icon: "🌅", label: "Sunset" },
  { id: "ice", icon: "❄️", label: "Ice" },
  { id: "monochrome", icon: "🎭", label: "Monochrome" },
  { id: "tropical", icon: "🌺", label: "Tropical" },
  { id: "retro", icon: "👾", label: "Retro" },
    { id: "cyber", icon: "💠", label: "Cyber" },

];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("dark");
  const [open, setOpen] = useState(false);

  // Load stored theme on mount
  useEffect(() => {
    const stored = localStorage.getItem("theme") || "dark";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);
  }, []);

  // Change theme handler
  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".theme-toggle-container")) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open]);

  const currentTheme = themes.find((t) => t.id === theme);

  return (
    <div className="relative inline-block text-left theme-toggle-container">
      {/* 🎨 Current Theme Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1 border border-[var(--border)] rounded-full bg-[var(--card)] hover:bg-[var(--accent)] hover:text-white text-xs font-medium transition-all shadow-md hover:shadow-lg"
        aria-label="Select Theme"
      >
        <span className="text-base inline-block animate-sway">
          {currentTheme?.icon || "🎨"}
        </span>
        <span>{currentTheme?.label || "Theme"}</span>
      </button>

      {/* 🪄 Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden z-50 backdrop-blur-md max-h-56 overflow-y-auto">
          <div className="py-1">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-xs transition-all ${
                  theme === t.id
                    ? "bg-[var(--accent)] text-white font-semibold"
                    : "hover:bg-[var(--accent)] hover:text-white text-[var(--foreground)]"
                }`}
              >
                <span className="text-base emoji-icon">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 💫 Animations */}
      <style jsx>{`
        /* Gentle 45° sway animation */
        @keyframes sway {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(15deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }

        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }

        .emoji-icon {
          transition: transform 0.4s ease;
        }

        .emoji-icon:hover {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
}
