"use client";

export default function ShareButton({
  text,
  url,
}: {
  text: string;
  url: string;
}) {
  const handleShare = () => {
    const fullText = `${text}\n\n${url}`;
    const encodedText = encodeURIComponent(fullText);

    const waUrl = `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, "_blank");
  };

  return (
    <button
      onClick={handleShare}
      title="Share on WhatsApp"
      aria-label="Share on WhatsApp"
      className="
        inline-flex items-center gap-2
        px-3 py-2 rounded-lg
        text-sm font-medium
        text-[var(--muted)]
        hover:text-[var(--foreground)]
        hover:bg-white/5
        transition
      "
    >
      {/* WhatsApp Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="w-4 h-4 fill-current text-emerald-400"
      >
        <path d="M16.003 3.2c-7.05 0-12.8 5.75-12.8 12.8 0 2.256.587 4.453 1.707 6.395L3.2 28.8l6.57-1.723A12.71 12.71 0 0 0 16.003 28.8c7.05 0 12.8-5.75 12.8-12.8 0-7.05-5.75-12.8-12.8-12.8z" />
      </svg>

      <span>Share</span>
    </button>
  );
}
