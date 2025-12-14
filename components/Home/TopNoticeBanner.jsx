"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const STORAGE_KEY = "hide_whatsapp_banner";

export default function TopNoticeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // session-based hide
    const hidden = sessionStorage.getItem(STORAGE_KEY);
    if (!hidden) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        w-full
        bg-gradient-to-r
        from-[var(--accent)]
        via-[var(--accent-secondary)]
        to-[var(--accent)]
        text-[var(--foreground)]
        shadow-md
        border-b border-[var(--border)]
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <div
            className="
              rounded-full p-2
              bg-green-500/90
              text-white
              shadow
            "
          >
            <FaWhatsapp size={18} />
          </div>

          <div className="leading-tight">
            <p className="font-semibold text-sm md:text-base">
              Join our WhatsApp Group
            </p>
            <p className="text-xs md:text-sm text-[var(--muted)]">
              Get instant offers, updates & support
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href="https://chat.whatsapp.com/YOUR_GROUP_LINK"
            target="_blank"
            rel="noopener noreferrer"
            className="
              hidden sm:inline-flex items-center
              bg-white/90 text-black
              px-4 py-1.5 rounded-full
              text-sm font-semibold
              hover:bg-white transition
              shadow-sm
            "
          >
            Join Now
          </a>

          <button
            onClick={() => {
              sessionStorage.setItem(STORAGE_KEY, "true");
              setVisible(false);
            }}
            className="
              rounded-full p-1
              hover:bg-black/10
              transition
            "
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
