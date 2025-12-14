"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import Loader from "@/components/Loader/Loader";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickedIndex, setClickedIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    fetch("/api/game-banners")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
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

  useEffect(() => {
    if (!banners?.length) return;

    const interval = setInterval(() => {
      const randomChance = Math.random();
      if (randomChance < 0.4) {
        setCurrent((prev) => (prev + 1) % banners.length);
      } else {
        setCurrent(Math.floor(Math.random() * banners.length));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [banners]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleThumbnailClick = (index) => {
    setCurrent(index);
    setClickedIndex(index);
    setTimeout(() => setClickedIndex(null), 300);
  };

  const goNext = () => banners.length && setCurrent((prev) => (prev + 1) % banners.length);
  const goPrev = () => banners.length && setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  if (loading) return <Loader />;
  if (!banners?.length) return null;

  return (
    <div className="relative w-full max-w-7xl mx-auto mt-12 px-4 select-none">
      {/* Floating Orbs Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent,#a855f7)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent-secondary,#ec4899)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 dark:opacity-10"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-[var(--accent-tertiary,#3b82f6)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 dark:opacity-10"></div>
      </div>

      {/* Main Container with Bento-style Layout */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative z-10"
        style={{
          perspective: "2000px",
        }}
      >
        {/* Main Banner - Rotates based on mouse */}
        <div
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: `rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 3}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Holographic Border Effect */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-[var(--accent,#a855f7)] via-[var(--accent-secondary,#ec4899)] via-[var(--accent-tertiary,#06b6d4)] to-[var(--accent,#a855f7)] rounded-[32px] opacity-75 blur-sm animate-gradient-shift"></div>
          
          {/* Main Carousel Card */}
          <div className="relative bg-[var(--background,#000)] rounded-[30px] overflow-hidden h-[240px] md:h-[380px] shadow-2xl border border-[var(--border,rgba(255,255,255,0.05))]">
            
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-40 opacity-10">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent animate-scan"></div>
            </div>

            {/* Banners */}
            {banners.map((banner, i) => {
              const isActive = i === current;
              const isPrev = i === (current - 1 + banners.length) % banners.length;
              const isNext = i === (current + 1) % banners.length;

              return (
                <Link
                  key={i}
                  href={"/"}
                  className={`absolute inset-0 transition-all duration-1000 ease-out ${
                    isActive
                      ? "opacity-100 scale-100 z-30"
                      : isPrev
                      ? "opacity-30 scale-90 -translate-x-12 z-20"
                      : isNext
                      ? "opacity-30 scale-90 translate-x-12 z-20"
                      : "opacity-0 scale-75 z-10 pointer-events-none"
                  }`}
                  style={{
                    filter: isActive ? "none" : "blur(4px)",
                  }}
                >
                  <Image
                    src={banner.bannerImage || logo}
                    alt={banner.bannerTitle}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Vignette Effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
                  
                  {/* Content Overlay */}
                  {isActive && (
                    <div className="absolute inset-0 flex flex-col justify-end p-8 z-40">
                      <div className="transform transition-all duration-700 animate-slideUp">
                        {/* Category Badge */}
                        <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full px-4 py-1.5 mb-3">
                          <span className="w-2 h-2 bg-[var(--accent,#10b981)] rounded-full animate-pulse"></span>
                          <span className="text-xs font-semibold text-white uppercase tracking-wider">Featured</span>
                        </div>
                        
                        {/* Title with Glitch Effect */}
                        <h2 className="text-3xl md:text-5xl font-black text-[var(--foreground,#fff)] mb-2 tracking-tight drop-shadow-2xl relative">
                          {banner.bannerTitle}
                          <span className="absolute inset-0 text-[var(--accent-tertiary,#06b6d4)] opacity-50 animate-glitch" style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}>
                            {banner.bannerTitle}
                          </span>
                        </h2>
                        
                        {/* Description */}
                        <p className="text-[var(--foreground-secondary,#d1d5db)] text-sm md:text-base max-w-2xl mb-4 drop-shadow-lg">
                          {banner.bannerDescription || "Discover amazing gaming experiences"}
                        </p>
                        
                        {/* CTA Button */}
                        <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[var(--accent,#a855f7)] to-[var(--accent-secondary,#ec4899)] hover:from-[var(--accent,#9333ea)] hover:to-[var(--accent-secondary,#db2777)] text-white font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--accent,#a855f7)]/50">
                          <span>Buy Now</span>
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </Link>
              );
            })}

            {/* Magnetic Navigation Buttons */}
       <button
  onClick={goPrev}
  className="absolute left-3 top-1/2 -translate-y-1/2 z-50 group w-10 h-10"
>
  <div className="absolute inset-0 bg-white/3 backdrop-blur-md border border-white/10 rounded-full group-hover:bg-white/6 transition-all duration-200 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent,#a855f7)]/10 to-[var(--accent-secondary,#ec4899)]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
  <svg
    className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--foreground,#fff)] group-hover:-translate-x-[55%] transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
  </svg>
</button>

<button
  onClick={goNext}
  className="absolute right-3 top-1/2 -translate-y-1/2 z-50 group w-10 h-10"
>
  <div className="absolute inset-0 bg-white/3 backdrop-blur-md border border-white/10 rounded-full group-hover:bg-white/6 transition-all duration-200 group-hover:scale-105" />
  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent,#a855f7)]/10 to-[var(--accent-secondary,#ec4899)]/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
  <svg
    className="w-4 h-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--foreground,#fff)] group-hover:translate-x-[55%] transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
  </svg>
</button>

          </div>
        </div>

        {/* Thumbnail Strip Below */}
        <div className="flex gap-3 mt-6 justify-center items-center overflow-x-auto pb-2 scrollbar-hide">
          {banners.map((banner, i) => (
            <button
              key={i}
              onClick={() => handleThumbnailClick(i)}
              className={`relative flex-shrink-0 group transition-all duration-500 ${
                current === i ? "scale-100" : "scale-75 opacity-50 hover:opacity-80 hover:scale-85"
              } ${clickedIndex === i ? "translate-y-2" : ""}`}
            >
              {/* Active Indicator Ring */}
              {current === i && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent,#a855f7)] to-[var(--accent-secondary,#ec4899)] rounded-2xl blur-md animate-pulse"></div>
              )}
              
              <div className={`relative w-24 h-16 md:w-32 md:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                current === i ? "border-[var(--foreground,#fff)] shadow-xl shadow-[var(--accent,#a855f7)]/50" : "border-[var(--border,rgba(255,255,255,0.2))]"
              }`}>
                <Image
                  src={banner.bannerImage || logo}
                  alt={banner.bannerTitle}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-[var(--background,#000)] transition-opacity ${current === i ? "opacity-0" : "opacity-40"}`}></div>
                
                {/* Index Badge */}
                <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {i + 1}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Animated Progress Ring */}
        <div className="flex justify-center mt-6">
          <svg className="w-16 h-16 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="var(--muted, rgba(255,255,255,0.1))"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#gradient)"
              strokeWidth="4"
              fill="none"
              strokeDasharray="176"
              strokeDashoffset="0"
              className="animate-progress"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--accent, #a855f7)" />
                <stop offset="100%" stopColor="var(--accent-secondary, #ec4899)" />
              </linearGradient>
            </defs>
            <text
              x="32"
              y="38"
              textAnchor="middle"
              className="text-xs font-bold fill-[var(--foreground,#fff)]"
              transform="rotate(90 32 32)"
            >
              {current + 1}/{banners.length}
            </text>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          33% { transform: translate(-2px, 2px); }
          66% { transform: translate(2px, -2px); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes progress {
          from { stroke-dashoffset: 176; }
          to { stroke-dashoffset: 0; }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-scan {
          animation: scan 8s linear infinite;
        }
        
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
        
        .animate-progress {
          animation: progress 5s linear infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}