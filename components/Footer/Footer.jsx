"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaHeart,
} from "react-icons/fa6";

const BRAND = process.env.NEXT_PUBLIC_BRAND_NAME || "Meow Ji";

/* ===================== CONFIG ===================== */

const FOOTER_LINKS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Games", href: "/games" },
      { label: "Services", href: "/services" },
      { label: "Region", href: "/region" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/zynx.v1",
    icon: FaInstagram,
  },
  {
    label: "Twitter",
    href: "https://x.com/tk_dev_",
    icon: FaXTwitter,
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: FaYoutube,
  },
];

/* ===================== COMPONENT ===================== */

export default function Footer() {
  return (
    <footer className="mt-16 bg-[var(--card)] text-[var(--muted)] border-t border-[var(--border)]">
      
      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-extrabold mb-2 bg-gradient-to-r from-[var(--accent)] to-purple-500 bg-clip-text text-transparent">
              {BRAND}
            </h2>

            <p className="text-xs leading-relaxed max-w-[240px] opacity-80">
              Instant game top-ups, secure payments, and automated delivery —
              available 24×7 for gamers ⚡
            </p>
          </div>

          {/* Navigation Blocks */}
          {FOOTER_LINKS.map((section) => (
            <div key={section.title} className="flex flex-col gap-2">
              <h3 className="text-[var(--accent)] font-semibold text-xs sm:text-sm mb-1">
                {section.title}
              </h3>

              {section.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs sm:text-sm opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          {/* Socials (Desktop) */}
          <div className="hidden md:flex flex-col gap-2">
            <h3 className="text-[var(--accent)] font-semibold text-xs sm:text-sm mb-1">
              Connect With Us
            </h3>

            <div className="flex items-center gap-4">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-[var(--accent)] hover:scale-110 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-[var(--border)] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

            {/* Socials (Mobile) */}
            <div className="flex md:hidden gap-4">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="hover:text-[var(--accent)] hover:scale-110 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Made With */}
            <p className="text-[10px] sm:text-xs text-center">
              Made with{" "}
              <FaHeart className="inline w-3 h-3 text-[var(--accent)] mx-0.5 animate-pulse" />{" "}
              by{" "}
              <span className="text-[var(--accent)] font-medium">
                {BRAND}
              </span>
            </p>

            {/* Copyright */}
            <p className="text-[10px] sm:text-xs opacity-70">
              © {new Date().getFullYear()} {BRAND}. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
