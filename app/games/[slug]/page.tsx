"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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
    return (
   <Loader/>
    );
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

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-4 flex items-center gap-4">
        <div className="w-14 h-14 relative rounded-lg overflow-hidden">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">{game.gameName}</h1>
          <p className="text-xs text-[var(--muted)]">{game.gameFrom}</p>
        </div>
      </div>

      {/* ================= VIEW TOGGLE ================= */}
      <div className="max-w-6xl mx-auto mb-4 flex justify-end">
        <div className="flex border border-[var(--border)] rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode("slider")}
            className={`px-4 py-2 text-sm font-semibold transition
              ${
                viewMode === "slider"
                  ? "bg-[var(--accent)] text-black"
                  : "bg-[var(--card)] text-[var(--muted)]"
              }`}
          >
            Slider
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 text-sm font-semibold transition
              ${
                viewMode === "grid"
                  ? "bg-[var(--accent)] text-black"
                  : "bg-[var(--card)] text-[var(--muted)]"
              }`}
          >
            Grid
          </button>
        </div>
      </div>

      {/* ================= SLIDER VIEW ================= */}
      {viewMode === "slider" && (
        <div className="max-w-6xl mx-auto mb-4">
          <div
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide"
          >
            {items.map((item: any) => (
              <div
                key={item.itemSlug}
                onClick={() => scrollToItem(item)}
                className={`snap-center min-w-[150px] rounded-xl border p-3 cursor-pointer transition
                  ${
                    activeItem.itemSlug === item.itemSlug
                      ? "border-[var(--accent)] bg-[var(--card)]"
                      : "border-[var(--border)] opacity-70 hover:opacity-100"
                  }`}
              >
                <p className="text-sm font-semibold truncate">
                  {item.itemName}
                </p>

                <p className="mt-1 text-lg font-bold text-[var(--accent)]">
                  ₹{item.sellingPrice}
                </p>

                {item.dummyPrice && (
                  <p className="text-xs line-through text-[var(--muted)]">
                    ₹{item.dummyPrice}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* PRICE DOTS */}
          <div className="flex justify-between max-w-xs mx-auto mt-3">
            {priceLevels.map(level => (
              <button
                key={level.itemSlug}
                onClick={() => scrollToItem(level)}
                className={`w-3 h-3 rounded-full transition
                  ${
                    activeItem.itemSlug === level.itemSlug
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--border)]"
                  }`}
              />
            ))}
          </div>

          {/* PRICE LABELS */}
          <div className="flex justify-between max-w-xs mx-auto mt-1 text-[10px] text-[var(--muted)]">
            {priceLevels.map(level => (
              <span key={level.itemSlug}>
                ₹{level.sellingPrice}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ================= GRID VIEW ================= */}
      {viewMode === "grid" && (
        <div className="max-w-6xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item: any) => (
            <div
              key={item.itemSlug}
              onClick={() => {
                setActiveItem(item);
                buyPanelRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
              className={`rounded-xl border p-4 cursor-pointer transition
                ${
                  activeItem.itemSlug === item.itemSlug
                    ? "border-[var(--accent)] bg-[var(--card)]"
                    : "border-[var(--border)] hover:border-[var(--accent)]"
                }`}
            >
              <p className="text-sm font-semibold truncate">
                {item.itemName}
              </p>

              <p className="mt-1 text-lg font-bold text-[var(--accent)]">
                ₹{item.sellingPrice}
              </p>

              {item.dummyPrice && (
                <p className="text-xs line-through text-[var(--muted)]">
                  ₹{item.dummyPrice}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ================= BUY PANEL ================= */}
      <div
        ref={buyPanelRef}
        className="max-w-6xl mx-auto bg-[var(--card)] border border-[var(--border)]
        rounded-xl p-4 flex flex-col gap-4"
      >
        <div className="flex gap-4 items-center">
          <div className="relative w-[110px] h-[110px] rounded-xl overflow-hidden">
            <Image
              src={activeItem.itemImageId?.image || logo}
              alt={activeItem.itemName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold">
              {activeItem.itemName}
            </h2>

            <div className="flex items-center gap-2 mt-1.5">
              <p className="text-2xl font-extrabold text-[var(--accent)]">
                ₹{activeItem.sellingPrice}
              </p>
              {activeItem.dummyPrice && (
                <p className="text-xs line-through text-[var(--muted)]">
                  ₹{activeItem.dummyPrice}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => goBuy(activeItem)}
          disabled={redirecting}
          className={`w-full py-3 rounded-xl font-bold text-base transition
            ${
              redirecting
                ? "bg-[var(--border)] text-[var(--muted)] cursor-not-allowed"
                : "bg-[var(--accent)] text-black hover:opacity-90"
            }`}
        >
          {redirecting ? "Redirecting…" : "Buy Now →"}
        </button>
      </div>

      <div className="max-w-6xl mx-auto mt-6">
        <MLBBPurchaseGuide />
      </div>
    </section>
  );
}
