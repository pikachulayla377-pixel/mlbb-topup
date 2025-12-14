export default function TrustHighlights() {
  return (
    <section className="py-16 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">

          {/* 1 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-xl font-extrabold text-[var(--accent)]">
              24/7
            </p>
            <p className="text-sm mt-2 text-[var(--muted)]">
              Instant Delivery
            </p>
          </div>

          {/* 2 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-xl font-extrabold text-green-400">
              100%
            </p>
            <p className="text-sm mt-2 text-[var(--muted)]">
              Safe & Legitimate
            </p>
          </div>

          {/* 3 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-xl font-extrabold text-blue-400">
              Easy
            </p>
            <p className="text-sm mt-2 text-[var(--muted)]">
              Secure Payment Methods
            </p>
          </div>

          {/* 4 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-xl font-extrabold text-purple-400">
              24/7
            </p>
            <p className="text-sm mt-2 text-[var(--muted)]">
              Instant Support
            </p>
          </div>

          {/* 5 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-xl font-extrabold text-yellow-400">
              Trusted
            </p>
            <p className="text-sm mt-2 text-[var(--muted)]">
              By Thousands of Users
            </p>
          </div>

          {/* 6 */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
            <p className="text-xl font-extrabold text-cyan-400">
              Fast
            </p>
            <p className="text-sm mt-2 text-[var(--muted)]">
              Automated Topups
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
