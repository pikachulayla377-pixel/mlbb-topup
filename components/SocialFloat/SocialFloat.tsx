"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaXTwitter, FaInstagram, FaDiscord, FaYoutube, FaHeart, FaShareNodes } from "react-icons/fa6";

const socialLinks = [
  {
    name: "Twitter",
    icon: FaXTwitter,
    url: "https://www.instagram.com/zynx.v1/",
    color: "hover:bg-black hover:text-white",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/zynx.v1/",
    color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white",
  },

  {
    name: "YouTube",
    icon: FaYoutube,
    url: "https://www.instagram.com/zynx.v1/",
    color: "hover:bg-red-600 hover:text-white",
  },
];

export default function SocialFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Share function
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ZynxAnime",
          text: "Check out ZynxAnime - Free Anime Wallpapers & Live Backgrounds!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Social Icons - Appear when open */}
      <div
        className={`flex flex-col gap-3 transition-all duration-500 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl ${social.color}`}
              style={{
                animationDelay: `${index * 50}ms`,
                animation: isOpen ? "slideIn 0.3s ease-out forwards" : "none",
              }}
              aria-label={social.name}
            >
              <Icon />
            </Link>
          );
        })}

        {/* Divider */}
        <div className="h-px bg-[var(--border)] w-8 self-center" />

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl hover:bg-blue-600 hover:text-white"
          style={{
            animationDelay: `${socialLinks.length * 50}ms`,
            animation: isOpen ? "slideIn 0.3s ease-out forwards" : "none",
          }}
          aria-label="Share"
        >
          <FaShareNodes />
        </button>

        {/* Ko-fi Support Button */}
        <Link
          href="https://ko-fi.com/zynxv1"
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:scale-110 hover:shadow-xl hover:bg-pink-600 hover:text-white"
          style={{
            animationDelay: `${(socialLinks.length + 1) * 50}ms`,
            animation: isOpen ? "slideIn 0.3s ease-out forwards" : "none",
          }}
          aria-label="Support on Ko-fi"
        >
          <FaHeart />
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-purple-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        aria-label="Toggle social menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>

      {/* Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}