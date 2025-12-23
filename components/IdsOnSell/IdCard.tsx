import Link from "next/link";
import Image from "next/image";

interface IdCardProps {
  item: any;
}

export default function IdCard({ item }: IdCardProps) {
  const totalHeroes = item.heroes?.total ?? item.heroes;
  const totalSkins = item.skins?.total ?? item.skins;
  const diamonds = item.diamonds?.doubleDiamondAvailable || [];
  const coa = item.currencies?.coa ?? 0;
  const hasGlobal = item.heroTitles?.global?.length > 0;

  const rentAvailable = item.rent?.available;
  const rentPrice = item.rent?.price;
  const rentDuration = item.rent?.durationHours;

  return (
    <Link
      href={`/idsonsell/${item.slug}`}
      className="group relative rounded-2xl overflow-hidden
                 bg-[var(--card)] border border-white/10
                 transition-all duration-300
                 hover:-translate-y-1
                 hover:border-[var(--accent)]
                 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
    >
      {/* IMAGE */}
      <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={item.media?.images?.[0] || "/logo.png"}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500
                     group-hover:scale-110"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* RENT BADGE */}
        {rentAvailable && (
          <span className="absolute top-3 right-3
            px-2.5 py-1 rounded-full text-xs font-semibold
            bg-emerald-500/90 text-black shadow">
            Rent ₹{rentPrice} / {rentDuration}h
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2 text-sm text-[var(--foreground)]">
        {/* TITLE */}
        <h2 className="font-semibold text-base leading-snug line-clamp-2">
          {item.title}
        </h2>

        {/* HERO / SKIN */}
        <div className="flex justify-between text-[var(--muted)]">
          <span>🎭 {totalHeroes}+ Heroes</span>
          <span>🎨 {totalSkins}+ Skins</span>
        </div>

        {/* PRICE */}
        <div className="flex items-end justify-between mt-1">
          <div className="text-xl font-bold text-[var(--accent)]">
            ₹{item.price}
          </div>

          {rentAvailable && (
            <div className="text-xs text-emerald-400 font-semibold">
              Rent ₹{rentPrice}/day
            </div>
          )}
        </div>

        {/* COA & DIAMONDS */}
        <div className="text-xs text-[var(--muted)] space-y-1">
          <div>💎 COA: <b>{coa}+</b></div>
          <div>
            💠 Double Diamonds:{" "}
            <b>
              {diamonds.length > 0
                ? diamonds.join(", ")
                : "Not Available"}
            </b>
          </div>
        </div>

        {/* GLOBAL TAG */}
        {hasGlobal && (
          <div className="inline-flex items-center gap-1 mt-2
            px-2 py-1 rounded-md text-xs
            bg-blue-500/10 text-blue-400">
            🌍 Global Hero Available
          </div>
        )}
      </div>

      {/* HOVER GLOW */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100
        pointer-events-none rounded-2xl
        ring-1 ring-[var(--accent)]/30 transition" />
    </Link>
  );
}
