"use client";

import GameCardGrid from "./GameCardGrid";

export default function GameGrid({ games, isOutOfStock }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
      {games.map((game, i) => (
        <GameCardGrid
          key={i}
          game={game}
          isOutOfStock={isOutOfStock}
        />
      ))}
    </div>
  );
}
