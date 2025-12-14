"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch("/api/game-banners")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;

        // API returns data: []
        const items = data?.data ?? [];
        setBanners(items);
      })
      .catch(() => {
        if (mounted) setBanners([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  // Auto slide
  useEffect(() => {
    if (!banners?.length) return;

    const interval = setInterval(() => {
      const randomChance = Math.random();

      if (randomChance < 0.4) {
        setCurrent((prev) => (prev + 1) % banners.length);
      } else {
        setCurrent(Math.floor(Math.random() * banners.length));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  const goNext = () =>
    banners.length && setCurrent((prev) => (prev + 1) % banners.length);

  const goPrev = () =>
    banners.length &&
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  if (loading)
    return (
    <Loader/>
    );

  if (!banners?.length) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 select-none">
      <div className="overflow-hidden rounded-2xl shadow-lg h-[180px] md:h-[260px] relative">

        {banners.map((banner, i) => (
          <Link
            key={i}
            // href={banner.bannerLink || "/"}
                        href={ "/"}

            className={`absolute inset-0 transition-all duration-700 ease-out ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={banner.bannerImage || logo}
              alt={banner.bannerTitle}
              fill
              className="object-cover"
            />
          </Link>
        ))}

        {/* LEFT ARROW */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition"
        >
          ◀
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition"
        >
          ▶
        </button>
      </div>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              current === i
                ? "bg-[var(--accent)] w-5"
                : "bg-[var(--muted)] w-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
