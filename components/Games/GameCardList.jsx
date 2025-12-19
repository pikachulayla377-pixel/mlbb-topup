"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function GameCardList({ game, isOutOfStock }) {
  const disabled = isOutOfStock(game.gameName);

  return (
    <Link
      href={disabled ? "#" : `/games/${game.gameSlug}`}
      className={`group flex items-center gap-4 p-4 rounded-2xl border
      bg-[var(--card)] backdrop-blur transition-all duration-300
      ${
        disabled
          ? "opacity-80 pointer-events-none border-[var(--border)]"
          : "hover:shadow-lg hover:border-[var(--accent)] border-[var(--border)]"
      }`}
    >
      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
        <Image
          src={game.gameImageId?.image || logo}
          alt={game.gameName}
          fill
          className={`object-cover transition-all duration-300
            ${
              disabled
                ? "grayscale blur-[1.5px] scale-105"
                : "group-hover:scale-110"
            }`}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`text-base font-semibold truncate mb-1 transition-colors
          ${
            disabled
              ? "text-[var(--muted)]"
              : "group-hover:text-[var(--accent)]"
          }`}
        >
          {game.gameName}
        </h3>

        <p className="text-sm text-[var(--muted)] mb-2">{game.gameFrom}</p>

        {!disabled && game.tagId && (
          <span
            className="inline-block text-xs px-3 py-1 rounded-full font-medium"
            style={{
              background: game.tagId.tagBackground,
              color: game.tagId.tagColor,
            }}
          >
            {game.tagId.tagName}
          </span>
        )}
      </div>

      {disabled && (
        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold">
          Out of Stock
        </span>
      )}
    </Link>
  );
}
