"use client";

import { useState } from "react";
import ids from "../../data/idsOnSell.json";
import IdCard from "@/components/IdsOnSell/IdCard";
import { FiFilter, FiX } from "react-icons/fi";
import IdsFilterModal from "@/components/IdsOnSell/IdsFilterModal";

export default function IdsOnSellPage() {
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // filters (basic for now)
  const [rentOnly, setRentOnly] = useState(false);
  const [globalOnly, setGlobalOnly] = useState(false);

  /* ================= FILTER LOGIC ================= */
  const filteredIds = ids.filter((item: any) => {
    const matchSearch =
      item.title.toLowerCase().includes(search.toLowerCase());

    const matchRent =
      !rentOnly || item.rent?.available === true;

    const matchGlobal =
      !globalOnly || item.heroTitles?.global?.length > 0;

    return matchSearch && matchRent && matchGlobal;
  });

  return (
    <main className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3">
        {/* SEARCH */}
        <div className="relative flex-1 min-w-0">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search MLBB IDs..."
            className="w-full rounded-xl border bg-[var(--card)]
              px-4 py-2 text-sm outline-none
              focus:border-[var(--accent)]
              placeholder:text-[var(--muted)]"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2
                text-[var(--muted)] hover:text-red-500"
            >
              <FiX />
            </button>
          )}
        </div>

        {/* FILTER BUTTON */}
        <button
          onClick={() => setShowFilter(true)}
          className="shrink-0 flex items-center gap-2
            px-4 py-2 rounded-xl border bg-[var(--card)]
            hover:border-[var(--accent)]"
        >
          <FiFilter />
          <span className="hidden sm:inline">Filter</span>
        </button>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredIds.length > 0 ? (
          filteredIds.map((item: any) => (
            <IdCard key={item.id} item={item} />
          ))
        ) : (
          <p className="text-sm text-[var(--muted)]">
            No IDs found
          </p>
        )}
      </div>

      {/* ================= FILTER MODAL ================= */}
      {showFilter && (
        <IdsFilterModal
          open={showFilter}
          onClose={() => setShowFilter(false)}
          rentOnly={rentOnly}
          setRentOnly={setRentOnly}
          globalOnly={globalOnly}
          setGlobalOnly={setGlobalOnly}
        />
      )}
    </main>
  );
}
