"use client";

import { useEffect, useState } from "react";

export default function ChristmasPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("christmas_popup_seen");
    if (!seen) {
      setShow(true);
    }
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("christmas_popup_seen", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl animate-fade-in">

        <div className="text-5xl mb-3">🎄</div>

        <h2 className="text-xl font-extrabold mb-2 text-[var(--foreground)]">
          Merry Christmas!
        </h2>

        <p className="text-sm text-[var(--muted)] mb-5">
          Wishing you joy, peace, and epic wins this holiday season ✨
        </p>

        <button
          onClick={closePopup}
          className="px-6 py-2 rounded-full bg-[var(--accent)] text-white font-medium hover:bg-[var(--accent-hover)] transition"
        >
          Let’s Go 🎁
        </button>
      </div>
    </div>
  );
}
