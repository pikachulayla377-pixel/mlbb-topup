"use client";

import { FiGrid, FiSliders } from "react-icons/fi";

export default function PackageSelector({
  items,
  activeItem,
  setActiveItem,
  viewMode,
  setViewMode,
  sliderRef,
  buyPanelRef,
  calculateDiscount,
  scrollToItem,
}) {
  return (
    <>
      {/* ================= VIEW TOGGLE ================= */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Select Package</h2>
          <p className="text-sm text-[var(--muted)]">
            {items.length} options available
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <button
            onClick={() => setViewMode("slider")}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === "slider"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <FiSliders />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-[var(--accent)] text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <FiGrid />
          </button>
        </div>
      </div>

      {/* ================= GRID VIEW ================= */}
      {viewMode === "grid" && (
        <div className="max-w-6xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => {
            const discount = calculateDiscount(
              item.sellingPrice,
              item.dummyPrice
            );

            return (
              <div
                key={item.itemSlug}
                onClick={() => {
                  setActiveItem(item);
                  buyPanelRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className={`relative rounded-2xl border p-4 cursor-pointer transition-all duration-300
                ${
                  activeItem.itemSlug === item.itemSlug
                    ? "border-[var(--accent)] bg-[var(--card)] shadow-lg"
                    : "border-[var(--border)] bg-[var(--card)]/50 hover:border-[var(--accent)]"
                }`}
              >
                {/* DISCOUNT BADGE */}
                {discount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white
                                   text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    -{discount}%
                  </span>
                )}

                <p className="text-sm font-semibold mb-2 truncate">
                  💎 {item.itemName}
                </p>

                <p className="text-lg font-bold text-[var(--accent)]">
                  ₹{item.sellingPrice}
                </p>

                {item.dummyPrice && (
                  <p className="text-xs line-through text-[var(--muted)]">
                    ₹{item.dummyPrice}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= SLIDER VIEW ================= */}
      {viewMode === "slider" && (
        <div className="max-w-6xl mx-auto mb-6 mt-5 pt-3">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          >
            {items.map((item) => {
              const discount = calculateDiscount(
                item.sellingPrice,
                item.dummyPrice
              );
              const isActive = activeItem.itemSlug === item.itemSlug;

              return (
                <div
                  key={item.itemSlug}
                  onClick={() => scrollToItem(item)}
                  className={`relative snap-center min-w-[160px] rounded-2xl border p-4 cursor-pointer transition-all duration-300
                  ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--card)] shadow-lg scale-95"
                      : "border-[var(--border)] bg-[var(--card)]/50 opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* DISCOUNT BADGE */}
                  {discount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-green-500 text-white
                                     text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      -{discount}%
                    </span>
                  )}

                  <p className="text-sm font-semibold mb-2 truncate">
                    💎 {item.itemName}
                  </p>

                  <p className="text-xl font-bold text-[var(--accent)]">
                    ₹{item.sellingPrice}
                  </p>

                  {item.dummyPrice && (
                    <p className="text-xs line-through text-[var(--muted)]">
                      ₹{item.dummyPrice}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
