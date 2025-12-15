"use client";

import { useEffect, useState } from "react";

export default function PricingTab({
  pricingType,
  setPricingType,

  slabs,
  setSlabs,

  overrides,
  setOverrides,

  savingPricing,
  onSave,
}) {
  const canSave =
    (slabs.length > 0 || overrides.length > 0) && !savingPricing;

  /* ================= SLAB HELPERS ================= */
  const updateSlab = (index, key, value) => {
    const next = [...slabs];
    next[index][key] = Number(value);
    setSlabs(next);
  };

  const deleteSlab = (index) => {
    const next = slabs.filter((_, i) => i !== index);
    setSlabs(next.length ? next : [{ min: 0, max: 0, percent: 0 }]);
  };

  /* ================= OVERRIDE HELPERS ================= */
  const updateOverride = (index, key, value) => {
    const next = [...overrides];
    next[index][key] = key === "fixedPrice" ? Number(value) : value;
    setOverrides(next);
  };

  const addOverride = () => {
    setOverrides([
      ...overrides,
      {
        gameSlug: "",
        itemSlug: "",
        fixedPrice: 0,
      },
    ]);
  };

  const deleteOverride = (index) => {
    const next = overrides.filter((_, i) => i !== index);
    setOverrides(next);
  };

  return (
    <div className="max-w-5xl space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-xl font-bold">Pricing Rules</h2>
        <p className="text-sm text-[var(--muted)]">
          Slab-based markup and fixed pricing for selected items
        </p>
      </div>

      {/* ================= PRICING TYPE ================= */}
      <div className="flex items-center gap-3">
        <label className="text-sm font-semibold">Pricing For</label>
        <select
          value={pricingType}
          onChange={(e) => setPricingType(e.target.value)}
          className="bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm"
        >
          <option value="admin">Admin Users</option>
          <option value="user">Normal Users</option>
        </select>
      </div>

      {/* =================================================
          SLAB PRICING
         ================================================= */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Slab Pricing</h3>

        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/20">
              <tr>
                <th className="px-4 py-3 text-left">Min Price</th>
                <th className="px-4 py-3 text-left">Max Price</th>
                <th className="px-4 py-3 text-left">Markup %</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {slabs.map((s, i) => (
                <tr
                  key={i}
                  className="border-t border-[var(--border)]"
                >
                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={s.min}
                      onChange={(e) =>
                        updateSlab(i, "min", e.target.value)
                      }
                      className="w-full bg-transparent border border-[var(--border)] rounded-md px-2 py-1"
                    />
                  </td>

                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={s.max}
                      onChange={(e) =>
                        updateSlab(i, "max", e.target.value)
                      }
                      className="w-full bg-transparent border border-[var(--border)] rounded-md px-2 py-1"
                    />
                  </td>

                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={s.percent}
                      onChange={(e) =>
                        updateSlab(i, "percent", e.target.value)
                      }
                      className="w-full bg-transparent border border-[var(--border)] rounded-md px-2 py-1"
                    />
                  </td>

                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => deleteSlab(i)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() =>
            setSlabs([...slabs, { min: 0, max: 0, percent: 0 }])
          }
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          + Add Price Slab
        </button>
      </div>

      {/* =================================================
          FIXED ITEM PRICING
         ================================================= */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Fixed Item Pricing (Overrides)
        </h3>

        <p className="text-sm text-[var(--muted)]">
          These prices completely bypass slab pricing.
        </p>

        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-black/20">
              <tr>
                <th className="px-4 py-3 text-left">Game Slug</th>
                <th className="px-4 py-3 text-left">Item Slug</th>
                <th className="px-4 py-3 text-left">Fixed Price</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {overrides.map((o, i) => (
                <tr
                  key={i}
                  className="border-t border-[var(--border)]"
                >
                  <td className="px-4 py-2">
                    <input
                      value={o.gameSlug}
                      onChange={(e) =>
                        updateOverride(i, "gameSlug", e.target.value)
                      }
                      placeholder="game-slug"
                      className="w-full bg-transparent border border-[var(--border)] rounded-md px-2 py-1"
                    />
                  </td>

                  <td className="px-4 py-2">
                    <input
                      value={o.itemSlug}
                      onChange={(e) =>
                        updateOverride(i, "itemSlug", e.target.value)
                      }
                      placeholder="item-slug"
                      className="w-full bg-transparent border border-[var(--border)] rounded-md px-2 py-1"
                    />
                  </td>

                  <td className="px-4 py-2">
                    <input
                      type="number"
                      value={o.fixedPrice}
                      onChange={(e) =>
                        updateOverride(i, "fixedPrice", e.target.value)
                      }
                      className="w-full bg-transparent border border-[var(--border)] rounded-md px-2 py-1"
                    />
                  </td>

                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => deleteOverride(i)}
                      className="text-xs text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {!overrides.length && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-4 text-center text-[var(--muted)]"
                  >
                    No fixed price overrides
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={addOverride}
          className="text-sm font-semibold text-[var(--accent)] hover:underline"
        >
          + Add Fixed Price
        </button>
      </div>

      {/* ================= ACTIONS ================= */}
      <div className="flex justify-end">
        <button
          onClick={onSave}
          disabled={!canSave}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            canSave
              ? "bg-[var(--accent)] text-black hover:opacity-90"
              : "bg-gray-500/40 text-gray-400 cursor-not-allowed"
          }`}
        >
          {savingPricing ? "Saving..." : "Save Pricing"}
        </button>
      </div>
    </div>
  );
}
