"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FiPlus } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

/* ================= CONFIG ================= */
const HEADER_CONFIG = {
  logo: {
    src: "/logoBB.png",
    alt: "Blue Buff",
    width: 140,
    height: 40,
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Region Check", href: "/region" },
    { label: "All Games", href: "/games" },
    { label: "Services", href: "/services" },
  ],

  userMenu: {
    common: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Customer Support", href: "/dashboard" },
      { label: "Account Settings", href: "/dashboard" },
      { label: "My Wallet", href: "/dashboard" },
      { label: "My Orders", href: "/dashboard" },
    ],
    roles: {
      owner: { label: "Admin Panel", href: "/owner-panal" },
      admin: { label: "Reseller Panel", href: "/admin-panal" },
    },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const dropdownRef = useRef(null);
  const logoRef = useRef(null);

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setUser(d.user);
        else localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  /* ================= SCROLL (SYNC LOGO ROTATION) ================= */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);

      if (logoRef.current) {
        // 0.15deg per px = smooth, controlled
        logoRef.current.style.transform = `rotate(${y * 0.15}deg)`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= OUTSIDE CLICK ================= */
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[var(--card)]/80 border-b border-[var(--border)] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* ================= LOGO WITH GLOW + SCROLL ROTATION ================= */}
        <Link href="/" className="">
          <Image
            ref={logoRef}
            src={HEADER_CONFIG.logo.src}
            alt={HEADER_CONFIG.logo.alt}
            width={HEADER_CONFIG.logo.width}
            height={HEADER_CONFIG.logo.height}
            priority
            className="h-10 w-auto transition-transform duration-75 will-change-transform"
          />
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden md:flex gap-6 text-[var(--muted)]">
          {HEADER_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-[var(--foreground)] transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ================= ACTIONS ================= */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          <ThemeToggle />

          {/* USER ICON (STATIC) */}
          <button
            onClick={() => setUserMenuOpen((p) => !p)}
            className="w-10 h-10 rounded-full bg-[var(--accent)] text-white
                       flex items-center justify-center font-bold
                       hover:scale-105 active:scale-95 transition"
          >
            {user ? user.name?.[0]?.toUpperCase() : <FaUser />}
          </button>

          {/* USER DROPDOWN */}
          <div
            className={`absolute right-0 top-14 w-64 bg-[var(--card)]
                        border border-[var(--border)] rounded-xl shadow-lg p-4
                        transition-all duration-200 origin-top-right
                        ${
                          userMenuOpen && !loading
                            ? "opacity-100 scale-100 translate-y-0"
                            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                        }`}
          >
            {!user ? (
              <Link href="/login" onClick={() => setUserMenuOpen(false)}>
                Login / Register
              </Link>
            ) : (
              <>
                <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}>
                  <div className="flex items-center justify-between bg-[var(--background)]
                                  px-3 py-2 rounded-lg border mb-3">
                    <span className="font-semibold text-[var(--accent)]">
                      ₹{user.wallet}
                    </span>
                    <FiPlus />
                  </div>
                </Link>

                {HEADER_CONFIG.userMenu.common.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setUserMenuOpen(false)}
                    className="block py-2 hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                ))}

                {user?.userType &&
                  HEADER_CONFIG.userMenu.roles[user.userType] && (
                    <Link
                      href={HEADER_CONFIG.userMenu.roles[user.userType].href}
                      className="block py-2 hover:text-[var(--accent)]"
                    >
                      {HEADER_CONFIG.userMenu.roles[user.userType].label}
                    </Link>
                  )}

                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="md:hidden text-3xl"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* ================= MOBILE NAV ================= */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        } bg-[var(--card)] border-t border-[var(--border)]`}
      >
        <nav className="flex flex-col px-6 py-4 gap-4 text-[var(--muted)]">
          {HEADER_CONFIG.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
