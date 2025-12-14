"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiFilter, FiX, FiSearch, FiGrid, FiList } from 'react-icons/fi';

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

  /* ================= GAME CARD - GRID VIEW ================= */
const GameCardGrid = ({ game }) => {
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
      <div className="relative h-40 w-full overflow-hidden">
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

        <p className="text-xs text-[var(--muted)]">
          {game.gameFrom}
        </p>

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
};


  /* ================= GAME CARD - LIST VIEW ================= */
const GameCardList = ({ game }) => {
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

        <p className="text-sm text-[var(--muted)] mb-2">
          {game.gameFrom}
        </p>

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
        <span className="bg-red-500 text-white px-4 py-2 rounded-full text-xs font-bold flex-shrink-0">
          Out of Stock
        </span>
      )}
    </Link>
  );
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {filtered.map((game, index) => (
                  <GameCardGrid key={index} game={game} />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((game, index) => (
                  <GameCardList key={index} game={game} />
                ))}
              </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {processGames(games).map((game, i) => (
              <GameCardGrid key={i} game={game} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {processGames(games).map((game, i) => (
              <GameCardList key={i} game={game} />
            ))}
          </div>
        )}
      </div>

      {/* ================= FILTER MODAL ================= */}
      {showFilter && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center"
          onClick={() => setShowFilter(false)}
        >
          <div
            className="bg-[var(--card)] w-full sm:max-w-md 
                       rounded-t-3xl sm:rounded-3xl p-6 border border-[var(--border)]
                       shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[var(--foreground)]">
                Filter & Sort
              </h3>
              <button 
                onClick={() => setShowFilter(false)}
                className="p-2 rounded-lg hover:bg-[var(--border)]/50 transition-colors"
              >
                <FiX className="text-[var(--muted)]" />
              </button>
            </div>

            {/* Sort Section */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3 text-[var(--foreground)]">Sort By</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSort("az")}
                  className={`py-3 rounded-xl border transition-all duration-300 font-medium ${
                    sort === "az" 
                      ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]" 
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  A → Z
                </button>
                <button
                  onClick={() => setSort("za")}
                  className={`py-3 rounded-xl border transition-all duration-300 font-medium ${
                    sort === "za" 
                      ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]" 
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--muted)] hover:border-[var(--accent)]/50"
                  }`}
                >
                  Z → A
                </button>
              </div>
            </div>

            {/* Options Section */}
            <div className="mb-6 p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={hideOOS}
                    onChange={(e) => setHideOOS(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[var(--border)] rounded-full peer-checked:bg-[var(--accent)] 
                                  transition-all duration-300 shadow-inner"></div>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                                  peer-checked:translate-x-5 transition-transform duration-300 
                                  shadow-lg"></div>
                </div>
                <span className="text-sm font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                  Hide Out-of-Stock Items
                </span>
              </label>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilter(false)}
              className="w-full py-3.5 rounded-xl bg-[var(--accent)] text-white font-bold
                         hover:opacity-90 transition-all duration-300 shadow-lg 
                         hover:shadow-xl hover:-translate-y-0.5"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </section>
  );
}