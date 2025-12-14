"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function HomeContent() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [esportsUpdates, setEsportsUpdates] = useState<any[]>([]);
  const [mlbbEvents, setMlbbEvents] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // ---------------- FETCH HOME DATA ----------------
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/mlbb/home");
        const data = await res.json();

        setStats(data.stats || []);
        setArticles(data.articles || []);
        setEsportsUpdates(data.esportsUpdates || []);
        setMlbbEvents(data.mlbbEvents || []);
        setCategories(data.categories || []);
      } catch (e) {
        console.error("Failed to load home API", e);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading content...
      </div>
    );
  }

  return (
    <section className="bg-[var(--background)] text-[var(--foreground)] relative z-10 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,var(--accent)/10,transparent_60%),radial-gradient(circle_at_bottom_left,var(--accent-light,#00d8ff)/10,transparent_60%)] animate-pulse-slow" />

      {/* ===================== STATS ===================== */}
      <SectionWrapper>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card group text-center py-6 hover:border-[var(--accent)] hover:shadow-[0_0_25px_-8px_var(--accent)]"
            >
              <p className="text-4xl font-extrabold text-[var(--accent)] transition-transform group-hover:scale-110">
                {stat.number}
              </p>
              <h4 className="text-[var(--muted)] font-medium mt-2">{stat.label}</h4>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ===================== ABOUT ===================== */}
      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard icon="🖼️" title="HD MLBB Wallpapers" text="Explore a curated library of 1080p, 2K, and 4K wallpapers updated regularly." />
          <FeatureCard icon="🎮" title="Esports Highlights" text="Stay updated with MPL, MSC, M-Series and tournament insights." />
          <FeatureCard icon="📅" title="MLBB Events & Updates" text="Get details on rewards, skins, patch notes & in-game updates." />
        </div>
      </SectionWrapper>

      {/* ===================== TRENDING ARTICLES ===================== */}
      <SectionWrapper>
        <SectionHeader
          title="Trending Articles 📝"
          subtitle="Latest MLBB guides & analysis"
          link="/blogs"
        />

        <CarouselGrid>
          {articles.map((a) => (
            <Card key={a.id} href={a.slug} title={a.title} text={a.excerpt} image={a.image} />
          ))}
        </CarouselGrid>
      </SectionWrapper>

      {/* ===================== ESPORTS UPDATES ===================== */}
      <SectionWrapper>
        <SectionHeader
          title="Esports Updates 🎮"
          subtitle="Latest MPL & M-Series news"
          link="/esports"
        />

        <CarouselGrid>
          {esportsUpdates.map((item) => (
            <Card key={item.id} href={item.slug} title={item.title} text={item.excerpt} image={item.image} />
          ))}
        </CarouselGrid>
      </SectionWrapper>

      {/* ===================== MLBB EVENTS ===================== */}
      <SectionWrapper borderTop>
        <SectionHeader
          title="Current MLBB Events 📅"
          subtitle="Don’t miss rewards & skin events"
          link="/events"
        />

        <CarouselGrid>
          {mlbbEvents.map((ev) => (
            <Card key={ev.id} title={ev.title} text={ev.excerpt} image={ev.image} />
          ))}
        </CarouselGrid>
      </SectionWrapper>

      {/* ===================== ROLE CATEGORIES ===================== */}
      <SectionWrapper borderTop>
        <div className="text-center mb-14">
          <h4 className="text-2xl font-bold mb-2">Browse Heroes</h4>
          <div className="w-20 h-1 bg-[var(--accent)] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={`/heroes/${cat.name.toLowerCase()}`}
              className="card group p-6 flex flex-col items-center gap-3 hover:border-[var(--accent)] hover:shadow-[0_0_25px_-8px_var(--accent)]"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[var(--background)] group-hover:bg-[var(--accent)] text-[var(--accent)] group-hover:text-white text-2xl transition-all">
                {cat.icon}
              </div>

              <h4 className="text-sm font-medium">{cat.name}</h4>
            </Link>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}

/* ========================================================= */
/* REUSABLE COMPONENTS (unchanged) */
/* ========================================================= */

function SectionWrapper({ children, borderTop = false }: any) {
  return (
    <div className={`max-w-6xl mx-auto px-6 py-10 ${borderTop ? "border-t border-[var(--border)]" : ""}`}>
      {children}
    </div>
  );
}

function SectionHeader({ title, subtitle, link }: any) {
  return (
    <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
      <div>
        <h4 className="text-2xl font-bold">{title}</h4>
        <p className="text-[var(--muted)] text-lg">{subtitle}</p>
      </div>

      {link && (
        <Link
          href={link}
          className="button"
        >
          View All →
        </Link>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, text }: any) {
  return (
    <div className="card p-6 hover:border-[var(--accent)] hover:shadow-[0_0_35px_-10px_var(--accent)] transition-all">
      <div className="text-3xl mb-4 text-[var(--accent)] text-center">{icon}</div>
      <h4 className="text-2xl font-semibold mb-3 text-center">{title}</h4>
      <p className="text-[var(--muted)] text-center text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function Card({ title, text, href = "#", image }: any) {
  return (
    <Link
      href={href}
      className="card group rounded-xl overflow-hidden hover:border-[var(--accent)] hover:shadow-[0_0_25px_-6px_var(--accent)] transition-all min-w-[80%] sm:min-w-0"
    >
      <div className="relative w-full h-44 overflow-hidden">
        <Image
          src={image || logo}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <h4 className="text-lg font-bold text-[var(--accent)] mb-2 truncate">{title}</h4>
        <p className="text-[var(--muted)] text-sm leading-relaxed line-clamp-2">{text}</p>
      </div>
    </Link>
  );
}

function CarouselGrid({ children }: any) {
  return (
    <div
      className="
        flex gap-6 overflow-x-auto snap-x snap-mandatory px-1 pb-4
        sm:grid sm:grid-cols-2 sm:gap-6 sm:px-0 sm:pb-0 sm:overflow-visible
        lg:grid-cols-3
      "
    >
      {children}
    </div>
  );
}
