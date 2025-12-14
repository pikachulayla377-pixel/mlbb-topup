"use client";

import { useEffect, useState } from "react";
import { getVerifiedPlayers } from "@/utils/storage/verifiedPlayerStorage";

export default function RecentVerifiedPlayers({
  onSelect,
  limit = 10,
}) {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(getVerifiedPlayers(limit));
  }, [limit]);

  if (!players.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-400 font-medium">
        Your recent IDs
      </p>

      <div className="space-y-2">
        {players.map((p, index) => (
          <button
            key={`${p.playerId}-${p.zoneId}-${index}`}
            onClick={() => onSelect(p)}
            className="w-full flex items-center justify-between
                       p-3 rounded-lg bg-black/30
                       border border-gray-700
                       hover:border-[var(--accent)]
                       hover:bg-black/40 transition"
          >
            <div className="text-left">
              <p className="font-medium text-sm">
                {p.username}
              </p>
              <p className="text-xs text-gray-400">
                ID: {p.playerId} · Zone: {p.zoneId}
              </p>
            </div>

            <span className="text-xs text-gray-500">
              {p.region}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
