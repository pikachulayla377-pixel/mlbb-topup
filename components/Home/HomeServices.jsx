export default function HomeServices() {
  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            We Also Offer 🚀
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
            Want to start your own game topup business?  
            We provide complete reseller & website solutions at the cheapest rates.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {/* Reseller */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">
              Be a Reseller
            </h3>

            <p className="text-[var(--muted)] mb-4">
              Become a reseller and start selling game topups instantly.
              Cheapest rates in the market with high profit margins.
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/30">
                Cheapest
              </span>

              <a
                href="https://wa.me/916372305866"
                target="_blank"
                className="text-[var(--accent)] font-semibold hover:underline"
              >
                Contact on WhatsApp →
              </a>
            </div>
          </div>

          {/* Whitelabel */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">
              Website Whitelabel
            </h3>

            <p className="text-[var(--muted)] mb-4">
              Launch your own branded topup website.
              Cheapest whitelabel solution with full control and support.
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                Available
              </span>

              <a
                href="https://wa.me/916372305866"
                target="_blank"
                className="text-[var(--accent)] font-semibold hover:underline"
              >
                Contact on WhatsApp →
              </a>
            </div>
          </div>

          {/* Custom Website */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">
              Custom Topup Website
            </h3>

            <p className="text-[var(--muted)] mb-4">
              Need a fully custom topup platform with unique features?
              We build scalable and secure solutions tailored to your business.
            </p>

            <div className="flex items-center justify-between">
              <span className="text-sm px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                Available
              </span>

              <a
                href="https://wa.me/916372305866"
                target="_blank"
                className="text-[var(--accent)] font-semibold hover:underline"
              >
                Contact on WhatsApp →
              </a>
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="text-center mt-14">
          <p className="text-[var(--muted)]">
            Interested in any of these services?  
            <span className="text-[var(--accent)] font-medium"> Contact us on WhatsApp</span> and get started today.
          </p>
        </div>

      </div>
    </section>
  );
}
