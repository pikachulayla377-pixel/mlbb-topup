"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { FiGrid, FiSliders, FiArrowRight, FiChevronLeft } from "react-icons/fi";
import logo from "@/public/logo.png";
import MLBBPurchaseGuide from "../../../components/HelpImage/MLBBPurchaseGuide";

import Loader from "@/components/Loader/Loader";

export default function GameDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const sliderRef = useRef<HTMLDivElement | null>(null);
  const buyPanelRef = useRef<HTMLDivElement | null>(null);

  const [game, setGame] = useState<any>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [viewMode, setViewMode] = useState<"slider" | "grid">("grid");

  /* ================= FETCH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`/api/games/${slug}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then(res => res.json())
      .then(data => {
        const allItems = [...data.data.itemId].sort(
          (a, b) => a.sellingPrice - b.sellingPrice
        );

        setGame({
          ...data.data,
          allItems,
        });

        setActiveItem(allItems[0]);
      });
  }, [slug]);

  if (!game || !activeItem) {
    return <Loader />;
  }

  /* ================= PRICE LEVELS ================= */
  const items = game.allItems;
  const len = items.length;

  const priceLevelsRaw = [
    items[0],
    items[Math.floor(len * 0.3)],
    items[Math.floor(len * 0.6)],
    items[len - 1],
  ].filter(Boolean);

  const priceLevels = Array.from(
    new Map(priceLevelsRaw.map(i => [i.itemSlug, i])).values()
  );

  /* ================= HELPERS ================= */
  const scrollToItem = (item: any) => {
    setActiveItem(item);

    const index = items.findIndex(
      (i: any) => i.itemSlug === item.itemSlug
    );

    const el = sliderRef.current?.children[index] as HTMLElement;
    el?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });

    buyPanelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const goBuy = (item: any) => {
    if (redirecting) return;
    setRedirecting(true);

    const query = new URLSearchParams({
      name: item.itemName,
      price: item.sellingPrice.toString(),
      dummy: item.dummyPrice?.toString() || "",
      image: item.itemImageId?.image || "",
    });

    router.push(
      `/games/${slug}/buy/${item.itemSlug}?${query.toString()}`
    );
  };

  const calculateDiscount = (selling: number, dummy: number) => {
    if (!dummy || dummy <= selling) return null;
    return Math.round(((dummy - selling) / dummy) * 100);
  };

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-6">

      {/* ================= BACK BUTTON ================= */}
      {/* <div className="max-w-6xl mx-auto mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)]
                     bg-[var(--card)] hover:border-[var(--accent)] transition-all duration-300 group"
        >
          <FiChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div> */}

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4 p-4 rounded-2xl 
                      bg-[var(--card)] border border-[var(--border)]">
        <div className="w-16 h-16 relative rounded-xl overflow-hidden ring-2 ring-[var(--accent)]/20">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{game.gameName}</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{game.gameFrom}</p>
        </div>
      </div>

      {/* ================= VIEW TOGGLE ================= */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Select Package</h2>
          <p className="text-sm text-[var(--muted)]">{items.length} options available</p>
        </div>
        
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--card)] border border-[var(--border)]">
          <button
            onClick={() => setViewMode("slider")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              viewMode === "slider"
                ? "bg-[var(--accent)] text-white shadow-lg"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <FiSliders className="text-sm" />
            <span className="text-sm font-medium hidden sm:inline">Slider</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-[var(--accent)] text-white shadow-lg"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <FiGrid className="text-sm" />
            <span className="text-sm font-medium hidden sm:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* ================= SLIDER VIEW ================= */}
      {viewMode === "slider" && (
        <div className="max-w-6xl mx-auto mb-6 mt-5 pt-3">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          >
            {items.map((item: any) => {
              const discount = calculateDiscount(item.sellingPrice, item.dummyPrice);
              const isActive = activeItem.itemSlug === item.itemSlug;
              
              return (
                <div
                  key={item.itemSlug}
                  onClick={() => scrollToItem(item)}
                  className={`snap-center min-w-[160px] rounded-2xl border p-4 cursor-pointer 
                             transition-all duration-300 relative ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--card)] shadow-lg scale-95"
                      : "border-[var(--border)] bg-[var(--card)]/50 opacity-70 hover:opacity-100 hover:border-[var(--accent)]/50 scale-90"
                  }`}
                >
                  {discount && (
                    <span className="absolute -top-1 -right-2 bg-green-500 text-white text-xs 
                                   font-bold px-2 py-1 rounded-full shadow-lg">
                      -{discount}%
                    </span>
                  )}
                  
                  <p className="text-sm font-semibold truncate mb-2">
                    {item.itemName}
                  </p>

                  <div className="space-y-1">
                    <p className="text-xl font-bold text-[var(--accent)]">
                      ₹{item.sellingPrice}
                    </p>

                    {item.dummyPrice && (
                      <p className="text-xs line-through text-[var(--muted)]">
                        ₹{item.dummyPrice}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRICE NAVIGATION */}
          <div className="max-w-md mx-auto mt-6 space-y-3">
            <div className="flex justify-between items-center">
              {priceLevels.map((level, idx) => (
                <button
                  key={level.itemSlug}
                  onClick={() => scrollToItem(level)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeItem.itemSlug === level.itemSlug
                      ? "bg-[var(--accent)] scale-125 shadow-lg shadow-[var(--accent)]/50"
                      : "bg-[var(--border)] group-hover:bg-[var(--accent)]/50"
                  }`} />
                  <span className={`text-xs transition-colors ${
                    activeItem.itemSlug === level.itemSlug
                      ? "text-[var(--accent)] font-semibold"
                      : "text-[var(--muted)]"
                  }`}>
                    ₹{level.sellingPrice}
                  </span>
                </button>
              ))}
            </div>
            <div className="h-1 bg-[var(--border)] rounded-full" />
          </div>
        </div>
      )}

      {/* ================= GRID VIEW ================= */}
      {viewMode === "grid" && (
        <div className="max-w-6xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item: any) => {
            const discount = calculateDiscount(item.sellingPrice, item.dummyPrice);
            const isActive = activeItem.itemSlug === item.itemSlug;
            
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
                className={`rounded-2xl border p-4 cursor-pointer transition-all duration-300 relative
                           hover:-translate-y-1 hover:shadow-lg ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--card)] shadow-lg shadow-[var(--accent)]/20"
                    : "border-[var(--border)] bg-[var(--card)]/50 hover:border-[var(--accent)]"
                }`}
              >
                {discount && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs 
                               font-bold px-2 py-1 rounded-full shadow-lg">
                    -{discount}%
                  </span>
                )}
                
                <p className="text-sm font-semibold truncate mb-2">
                  {item.itemName}
                </p>

                <div className="space-y-1">
                  <p className="text-lg font-bold text-[var(--accent)]">
                    ₹{item.sellingPrice}
                  </p>

                  {item.dummyPrice && (
                    <p className="text-xs line-through text-[var(--muted)]">
                      ₹{item.dummyPrice}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ================= BUY PANEL ================= */}
      <div
        ref={buyPanelRef}
        className="max-w-6xl mx-auto bg-[var(--card)] border border-[var(--border)]
                   rounded-2xl p-6 shadow-xl"
      >
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
          <div className="relative w-[120px] h-[120px] rounded-2xl overflow-hidden 
                         ring-2 ring-[var(--accent)]/20 flex-shrink-0">
            <Image
              src={activeItem.itemImageId?.image || logo}
              alt={activeItem.itemName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold mb-2">
              {activeItem.itemName}
            </h2>

            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-bold text-[var(--accent)]">
                ₹{activeItem.sellingPrice}
              </p>
              {activeItem.dummyPrice && (
                <>
                  <p className="text-lg line-through text-[var(--muted)]">
                    ₹{activeItem.dummyPrice}
                  </p>
                  {calculateDiscount(activeItem.sellingPrice, activeItem.dummyPrice) && (
                    <span className="bg-green-500 text-white text-sm font-bold px-2 py-1 rounded-lg">
                      Save {calculateDiscount(activeItem.sellingPrice, activeItem.dummyPrice)}%
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => goBuy(activeItem)}
          disabled={redirecting}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-300
                     flex items-center justify-center gap-2 group ${
            redirecting
              ? "bg-[var(--border)] text-[var(--muted)] cursor-not-allowed"
              : "bg-[var(--accent)] text-white hover:shadow-lg hover:shadow-[var(--accent)]/50 hover:-translate-y-0.5"
          }`}
        >
          {redirecting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Redirecting...</span>
            </>
          ) : (
            <>
              <span>Buy Now</span>
              <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
            </>
          )}
        </button>
      </div>

      {/* ================= PURCHASE GUIDE ================= */}
      <div className="max-w-6xl mx-auto mt-6">
        <MLBBPurchaseGuide />
      </div>
    </section>
  );
}