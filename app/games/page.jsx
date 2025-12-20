"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiFilter, FiX, FiSearch, FiGrid, FiList } from 'react-icons/fi';
import GameGrid from "@/components/Games/GameGrid";
import GameList from "@/components/Games/GameList";

import logo from "@/public/logo.png";

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);

  /* ================= FILTER STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az");
  const [hideOOS, setHideOOS] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= CONFIG ================= */
  const SPECIAL_MLBB_GAME = "MLBB SMALL";

  const outOfStockGames = [
    // "PUBG Mobile",
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
      const fetchedCategories = data?.data?.category || [];
      let fetchedGames = data?.data?.games || [];

      // 🔵 FIND PUBG MOBILE
      const pubgGame = fetchedGames.find(
        (g) => g.gameName === "PUBG Mobile"
      );

      // 🔵 CLONE AS BGMI
      if (pubgGame) {
        const bgmiGame = {
          ...pubgGame,
          gameName: "BGMI",
        };

        // Prevent duplicates on re-render
        const alreadyExists = fetchedGames.some(
          (g) => g.gameSlug === "bgmi"
        );

        if (!alreadyExists) {
          fetchedGames = [...fetchedGames, bgmiGame];
        }
      }

      setCategory(fetchedCategories);
      setGames(fetchedGames);
    });
}, []);


  /* ================= ACTIVE FILTER COUNT ================= */
  const activeFilterCount =
    (sort !== "az" ? 1 : 0) +
    (hideOOS ? 1 : 0);

  /* ================= FILTER + SORT + SEARCH ================= */
  const processGames = (list) => {
    let filtered = [...list];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((g) =>
        g.gameName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Out of stock filter
    if (hideOOS) {
      filtered = filtered.filter((g) => !isOutOfStock(g.gameName));
    }

    // Sorting
    if (sort === "az") {
      filtered.sort((a, b) => a.gameName.localeCompare(b.gameName));
    }

    if (sort === "za") {
      filtered.sort((a, b) => b.gameName.localeCompare(a.gameName));
    }

    return filtered;
  };

  /* ================= PIN MLBB GAME ================= */
  const injectSpecialGame = (cat) => {
    if (!cat.categoryTitle?.toLowerCase().includes("mobile legends")) {
      return cat.gameId;
    }

    const specialGame = games.find((g) => g.gameName === SPECIAL_MLBB_GAME);

    if (!specialGame) return cat.gameId;

    const withoutDuplicate = cat.gameId.filter(
      (g) => g.gameName !== SPECIAL_MLBB_GAME
    );

    return [specialGame, ...withoutDuplicate];
  };

  return (
    <section className="min-h-screen px-4 py-10 bg-[var(--background)] text-[var(--foreground)]">
      
      {/* ================= TOP BAR ================= */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative flex-1 w-full sm:max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--card)] border border-[var(--border)]
                         text-[var(--foreground)] placeholder-[var(--muted)] outline-none
                         focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20
                         transition-all duration-300"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid" 
                    ? "bg-[var(--accent)] text-white" 
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list" 
                    ? "bg-[var(--accent)] text-white" 
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <FiList />
              </button>
            </div>

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setSort("az");
                  setHideOOS(false);
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/50
                           bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:border-red-500
                           transition-all duration-300 backdrop-blur-sm group"
              >
                <FiX className="group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}

            {/* Filter Button */}
            <button
              onClick={() => setShowFilter(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border)]
                         bg-[var(--card)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10
                         transition-all duration-300 backdrop-blur-sm group"
            >
              <FiFilter className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline">Filter</span>
              {activeFilterCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px]
                               flex items-center justify-center text-xs
                               rounded-full bg-[var(--accent)] text-white font-bold
                               shadow-lg shadow-[var(--accent)]/50 animate-pulse">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ================= CATEGORY LIST ================= */}
      {category.map((cat, i) => {
        const merged = injectSpecialGame(cat);
        const filtered = processGames(merged);
        if (!filtered.length) return null;

        return (
          <div key={i} className="max-w-7xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                {cat.categoryTitle}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
            </div>
{viewMode === "grid" ? (
  <GameGrid games={filtered} isOutOfStock={isOutOfStock} />
) : (
  <GameList games={filtered} isOutOfStock={isOutOfStock} />
)}

          </div>
        );
      })}

      {/* ================= ALL GAMES ================= */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            All Games
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
          <span className="text-sm text-[var(--muted)]">
            {processGames(games).length} games
          </span>
        </div>

       {viewMode === "grid" ? (
  <GameGrid games={processGames(games)} isOutOfStock={isOutOfStock} />
) : (
  <GameList games={processGames(games)} isOutOfStock={isOutOfStock} />
)}

      </div>

      {/* ================= FILTER MODAL ================= */}
      {showFilter && (
 <FilterModal
  open={showFilter}
  onClose={() => setShowFilter(false)}
  sort={sort}
  setSort={setSort}
  hideOOS={hideOOS}
  setHideOOS={setHideOOS}
/>
      )}
    </section>
  );
}