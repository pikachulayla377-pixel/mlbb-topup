"use client";

import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import logo from "@/public/logo.png";

export default function BuyPanel({
  activeItem,
  redirecting,
  goBuy,
  calculateDiscount,
  buyPanelRef,
}) {
  if (!activeItem) return null;

  // ✅ SAFE IMAGE RESOLUTION (fixes missing image)
  const itemImage =
    activeItem?.itemImageId?.image ||
    activeItem?.image ||
    logo;

    console.log("BuyPanel activeItem:", itemImage);
  const discount = calculateDiscount(
    activeItem.sellingPrice,
    activeItem.dummyPrice
  );

  return (
    <div
      ref={buyPanelRef}
      className="max-w-6xl mx-auto bg-[var(--card)] border border-[var(--border)]
                 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
        {/* IMAGE */}
<div className="w-[120px] h-[120px] rounded-2xl overflow-hidden
                ring-2 ring-[var(--accent)]/20 flex-shrink-0">

     <Image
  src={itemImage}
  alt={activeItem.itemName}
  width={120}
  height={120}
  unoptimized
  className="object-cover rounded-2xl"
/>


        </div>

        {/* DETAILS */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold mb-2">
            💎 {activeItem.itemName}
          </h2>

          <div className="flex items-baseline gap-3 flex-wrap">
            <p className="text-3xl font-bold text-[var(--accent)]">
              ₹{activeItem.sellingPrice}
            </p>

            {activeItem.dummyPrice && (
              <>
                <p className="text-lg line-through text-[var(--muted)]">
                  ₹{activeItem.dummyPrice}
                </p>

                {discount && (
                  <span className="bg-green-500 text-white text-sm font-bold
                                   px-2 py-1 rounded-lg">
                    {discount}% OFF
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* BUY BUTTON */}
      <button
        onClick={() => goBuy(activeItem)}
        disabled={redirecting}
        className={`w-full py-4 rounded-xl font-bold text-base
                   flex items-center justify-center gap-2 transition-all duration-300
          ${
            redirecting
              ? "bg-[var(--border)] text-[var(--muted)] cursor-not-allowed"
              : "bg-[var(--accent)] text-white hover:shadow-lg hover:shadow-[var(--accent)]/50 hover:-translate-y-0.5"
          }`}
      >
        {redirecting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Redirecting…</span>
          </>
        ) : (
          <>
            <span>Buy Now</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </div>
  );
}
