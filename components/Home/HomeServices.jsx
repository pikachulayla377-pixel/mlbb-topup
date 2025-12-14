import {
  FaStore,
  FaGlobe,
  FaCogs,
  FaWhatsapp,
} from "react-icons/fa";

const services = [
  {
    title: "Be a Reseller",
    description:
      "Become a reseller and start selling game topups instantly. Cheapest rates in the market with high profit margins.",
    badge: {
      text: "Cheapest",
      className:
        "bg-green-500/10 text-green-400 border-green-500/30",
    },
    icon: FaStore,
  },
  {
    title: "Website Whitelabel",
    description:
      "Launch your own branded topup website. Cheapest whitelabel solution with full control and ongoing support.",
    badge: {
      text: "Available",
      className:
        "bg-blue-500/10 text-blue-400 border-blue-500/30",
    },
    icon: FaGlobe,
  },
  {
    title: "Custom Topup Website",
    description:
      "Need a fully custom topup platform with unique features? We build scalable and secure solutions tailored to your business.",
    badge: {
      text: "Available",
      className:
        "bg-purple-500/10 text-purple-400 border-purple-500/30",
    },
    icon: FaCogs,
  },
];

export default function HomeServices() {
  return (
    <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            We Also Offer
          </h2>
          <p className="text-[var(--muted)] text-lg max-w-2xl mx-auto">
            Want to start your own game topup business?
            We provide complete reseller & website solutions at the cheapest rates.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group relative bg-[var(--card)]
                           border border-[var(--border)]
                           rounded-2xl p-6
                           transition-all duration-300
                           hover:-translate-y-1 hover:shadow-xl
                           hover:border-[var(--accent)]"
              >
                {/* subtle glow */}
                <div
                  className="absolute inset-0 rounded-2xl
                             bg-[var(--accent)]/5
                             opacity-0 group-hover:opacity-100
                             blur-xl transition-opacity"
                />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl
                                  bg-[var(--accent)]/10
                                  flex items-center justify-center mb-4">
                    <Icon className="text-xl text-[var(--accent)]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">
                    {service.title}
                  </h3>

                  <p className="text-[var(--muted)] mb-6 flex-1">
                    {service.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm px-3 py-1 rounded-full border ${service.badge.className}`}
                    >
                      {service.badge.text}
                    </span>

                    <a
                      href="https://wa.me/916372305866"
                      target="_blank"
                      className="flex items-center gap-2
                                 text-[var(--accent)] font-semibold
                                 hover:underline"
                    >
                      <FaWhatsapp />
                      Contact →
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <p className="text-[var(--muted)]">
            Interested in any of these services?
            <span className="text-[var(--accent)] font-medium">
              {" "}Contact us on WhatsApp
            </span>{" "}
            and get started today.
          </p>
        </div>

      </div>
    </section>
  );
}
