"use client";

import { FiX } from "react-icons/fi";
import FilterModal from "@/components/Games/FilterModal";

export default function FilterModal({
  open,
  onClose,
  sort,
  setSort,
  hideOOS,
  setHideOOS,
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm
                 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[var(--card)] w-full sm:max-w-md
                   rounded-t-3xl sm:rounded-3xl p-6
                   border border-[var(--border)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-[var(--foreground)]">
            Filter & Sort
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-[var(--border)]/50 transition-colors"
          >
            <FiX className="text-[var(--muted)]" />
          </button>
        </div>

        {/* Sort */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-3">Sort By</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSort("az")}
              className={`py-3 rounded-xl border font-medium transition-all
                ${
                  sort === "az"
                    ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/50"
                }`}
            >
              A → Z
            </button>

            <button
              onClick={() => setSort("za")}
              className={`py-3 rounded-xl border font-medium transition-all
                ${
                  sort === "za"
                    ? "border-[var(--accent)] bg-[var(--accent)]/20 text-[var(--accent)]"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/50"
                }`}
            >
              Z → A
            </button>
          </div>
        </div>

        {/* Hide OOS */}
        <div className="mb-6 p-4 rounded-xl bg-[var(--background)] border">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={hideOOS}
                onChange={(e) => setHideOOS(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[var(--border)] rounded-full peer-checked:bg-[var(--accent)] transition-all"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-transform shadow"></div>
            </div>
            <span className="text-sm font-medium">
              Hide Out-of-Stock Items
            </span>
          </label>
        </div>

        {/* Apply */}
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-[var(--accent)]
                     text-white font-bold shadow-lg
                     hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
