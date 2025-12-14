"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaDiscord,
  FaHeart,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] text-[var(--muted)] mt-16">
      
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Logo + Description */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-2 bg-gradient-to-r from-[var(--accent)] to-purple-500 bg-clip-text text-transparent">
              Blue<span className="text-[var(--foreground)]"> BUFF</span>
            </h2>
            <p className="text-xs leading-relaxed max-w-[220px]">
              MLBB wallpapers, esports updates, hero showcases,  
              and events — everything for Mobile Legends fans ⚡
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[var(--accent)] font-semibold text-xs sm:text-sm mb-1">
              Quick Links
            </h3>

            <Link href="/" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Home
            </Link>

            {/* <Link href="/wallpaper" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Wallpapers
            </Link>

            <Link href="/heroes" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Heroes
            </Link>

            <Link href="/events" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Events
            </Link> */}

            {/* <Link href="/esports" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Esports
            </Link> */}
          </div>

          {/* Support Links */}
          <div className="flex flex-col gap-1.5">
            <h3 className="text-[var(--accent)] font-semibold text-xs sm:text-sm mb-1">
              Support
            </h3>

            <Link href="/about" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              About
            </Link>

            <Link href="/privacy-policy" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Privacy Policy
            </Link>

            <Link href="/terms-and-conditions" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Terms & Conditions
            </Link>

            <Link href="/contact" className="text-xs sm:text-sm hover:text-[var(--accent)] transition">
              Contact Us
            </Link>
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex flex-col gap-1.5">
            <h3 className="text-[var(--accent)] font-semibold text-xs sm:text-sm mb-1">
              Connect With Us
            </h3>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/zynx.v1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com/zynx.v1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:scale-110 transition-all"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)] py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Social Icons - Mobile */}
            <div className="flex md:hidden items-center gap-4">
              <a
                href="https://instagram.com/zynx.v1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com/zynx.v1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:scale-110 transition-all"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--accent)] hover:scale-110 transition-all"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </div>

            {/* Made By */}
            <p className="text-[10px] sm:text-xs text-center sm:text-left order-first sm:order-none">
              Made with{" "}
              <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-0.5 animate-pulse" />{" "}
              by <span className="text-[var(--accent)] font-medium">Blue Buff</span>
            </p>

            {/* Copyright */}
            <p className="text-[10px] sm:text-xs">
              © {new Date().getFullYear()} Blue Buff. All rights reserved.
            </p>

          </div>
        </div>
      </div>

    </footer>
  );
}
