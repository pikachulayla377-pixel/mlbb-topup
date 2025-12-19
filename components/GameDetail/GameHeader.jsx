"use client";

import Image from "next/image";
import logo from "@/public/logo.png";

export default function GameHeader({ game }) {
  return (
    <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4 p-4 rounded-2xl 
                    bg-[var(--card)] border border-[var(--border)]">
      <div className="w-16 h-16 relative rounded-xl overflow-hidden ring-2 ring-[var(--accent)]/20">
        <Image
          src={game.gameImageId?.image || logo}
          alt={game.gameName}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-2xl font-bold">{game.gameName}</h1>
        <p className="text-sm text-[var(--muted)] mt-1">{game.gameFrom}</p>
      </div>
    </div>
  );
}
