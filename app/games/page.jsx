"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiFilter, FiX } from "react-icons/fi";
import logo from "@/public/logo.png";

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);

  /* ================= FILTER STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az"); // az | za
  const [hideOOS, setHideOOS] = useState(false);

  /* ================= CONFIG ================= */
  const SPECIAL_MLBB_GAME = "MLBB SMALL/PHP";

  const outOfStockGames = [
    "PUBG Mobile",
    "Genshin Impact",
    "Honor Of Kings",
    "TEST 1",
  ];

  const isOutOfStock = (name) => outOfStockGames.includes(name);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data?.category || []);
        setGames(data?.data?.games || []);
      });
  }, []);

  /* ================= ACTIVE FILTER COUNT ================= */
  const activeFilterCount =
    (sort !== "az" ? 1 : 0) +
    (hideOOS ? 1 : 0);

  /* ================= FILTER + SORT ================= */
  const processGames = (list) => {
    let filtered = [...list];

    if (hideOOS) {
      filtered = filtered.filter(
        (g) => !isOutOfStock(g.gameName)
      );
    }

    if (sort === "az") {
      filtered.sort((a, b) =>
        a.gameName.localeCompare(b.gameName)
      );
    }

    if (sort === "za") {
      filtered.sort((a, b) =>
        b.gameName.localeCompare(a.gameName)
      );
    }

    return filtered;
  };

  /* ================= PIN MLBB GAME ================= */
  const injectSpecialGame = (cat) => {
    if (
      !cat.categoryTitle
        ?.toLowerCase()
        .includes("mobile legends")
    ) {
      return cat.gameId;
    }

    const specialGame = games.find(
      (g) => g.gameName === SPECIAL_MLBB_GAME
    );

    if (!specialGame) return cat.gameId;

    const withoutDuplicate = cat.gameId.filter(
      (g) => g.gameName !== SPECIAL_MLBB_GAME
    );

    return [specialGame, ...withoutDuplicate];
  };

  /* ================= GAME CARD ================= */
  const GameCard = ({ game }) => {
    const disabled = isOutOfStock(game.gameName);

    return (
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative overflow-hidden rounded-2xl border 
        bg-[var(--card)] backdrop-blur transition-all duration-300
        ${
          disabled
            ? "opacity-40 pointer-events-none"
            : "hover:-translate-y-1 hover:shadow-xl hover:border-[var(--accent)]"
        }`}
      >
        <div className="relative h-32 w-full overflow-hidden">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className={`object-cover transition-transform duration-300
            ${disabled ? "grayscale" : "group-hover:scale-110"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="p-3 space-y-1">
          <h3 className="text-sm font-semibold truncate">
            {game.gameName}
          </h3>
          <p className="text-xs text-[var(--muted)]">
            {game.gameFrom}
          </p>

          {!disabled && game.tagId && (
            <span
              className="inline-block mt-2 text-[10px] px-2 py-0.5 rounded-full"
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
          <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-red-600 text-white">
            Out of Stock
          </span>
        )}
      </Link>
    );
  };

  return (
    <section className="min-h-screen px-4 py-10 bg-[var(--background)] text-[var(--foreground)]">

      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto flex justify-end items-center gap-3 mb-4 relative z-40">

        {activeFilterCount > 0 && (
          <button
            onClick={() => {
              setSort("az");
              setHideOOS(false);
            }}
            className="flex items-center gap-1 px-3 py-2 rounded-xl border
            bg-[var(--card)] text-sm hover:border-red-500 hover:text-red-500"
          >
            <FiX />
            Clear
          </button>
        )}

        <button
          onClick={() => setShowFilter(true)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl border
          bg-[var(--card)] hover:border-[var(--accent)]"
        >
          <FiFilter />
          Filter
          {activeFilterCount > 0 && (
            <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px]
            flex items-center justify-center text-[10px]
            rounded-full bg-[var(--accent)] text-black font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* ================= CATEGORY LIST ================= */}
      {category.map((cat, i) => {
        const merged = injectSpecialGame(cat);
        const filtered = processGames(merged);
        if (!filtered.length) return null;

        return (
          <div key={i} className="max-w-7xl mx-auto mb-12">
            <h2 className="text-xl font-bold mb-4 px-1">
              {cat.categoryTitle}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {filtered.map((game, index) => (
                <GameCard key={index} game={game} />
              ))}
            </div>
          </div>
        );
      })}

      {/* ================= ALL GAMES ================= */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-bold mb-4 px-1">
          All Games
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {processGames(games).map((game, i) => (
            <GameCard key={i} game={game} />
          ))}
        </div>
      </div>

      {/* ================= FILTER MODAL ================= */}
      {showFilter && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="bg-[var(--card)] w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-4">
              Filter & Sort
            </h3>

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Sort By</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setSort("az")}
                  className={`flex-1 py-2 rounded-xl border ${
                    sort === "az" ? "border-[var(--accent)]" : ""
                  }`}
                >
                  A – Z
                </button>
                <button
                  onClick={() => setSort("za")}
                  className={`flex-1 py-2 rounded-xl border ${
                    sort === "za" ? "border-[var(--accent)]" : ""
                  }`}
                >
                  Z – A
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm mb-6">
              <input
                type="checkbox"
                checked={hideOOS}
                onChange={(e) => setHideOOS(e.target.checked)}
              />
              Hide Out-of-Stock
            </label>

            <button
              onClick={() => setShowFilter(false)}
              className="w-full py-3 rounded-xl bg-[var(--accent)] text-black font-semibold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
