// app/page.tsx
import HomeSection from "@/components/Home/Home";

export const metadata = {
  title: "ZynxAnime - Free Anime Wallpapers & Live Backgrounds",
  description:
    "Discover high-quality anime wallpapers, live backgrounds, and PFPs from popular anime like Naruto, One Piece, Demon Slayer, and more — all free to download.",
  keywords: [
    "anime wallpapers",
    "live anime backgrounds",
    "anime PFP",
    "ZynxAnime",
    "Naruto wallpaper",
    "One Piece wallpaper",
    "Demon Slayer wallpaper",
    "Attack on Titan wallpaper",
    "anime 4K wallpapers",
  ],
};

export default function Page() {
  return (
    <main>
      <HomeSection />
    </main>
  );
}
