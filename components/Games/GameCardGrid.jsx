"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function GameCardGrid({ game, isOutOfStock }) {
  const disabled = isOutOfStock(game.gameName);

  return (
    <Link
      href={disabled ? "#" : `/games/${game.gameSlug}`}
      className={`group relative overflow-hidden rounded-2xl border
      bg-[var(--card)] backdrop-blur transition-all duration-300
      ${
        disabled
          ? "opacity-80 pointer-events-none border-[var(--border)]"
          : "hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent)] border-[var(--border)]"
      }`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/10">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="p-4 space-y-2">
        <h3
          className={`text-sm font-semibold truncate transition-colors
          ${
            disabled
              ? "text-[var(--muted)]"
              : "group-hover:text-[var(--accent)]"
          }`}
        >
          {game.gameName}
        </h3>

        <p className="text-xs text-[var(--muted)]">{game.gameFrom}</p>

        {!disabled && game.tagId && (
          <span
            className="inline-block text-[10px] px-2 py-1 rounded-full font-medium"
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
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] flex items-center justify-center">
          <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold">
            Out of Stock
          </span>
        </div>
      )}
    </Link>
  );
}
