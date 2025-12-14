import {
  FaBolt,
  FaShieldAlt,
  FaCreditCard,
  FaHeadset,
  FaUsers,
  FaRobot,
} from "react-icons/fa";

const highlights = [
  {
    title: "24/7",
    subtitle: "Instant Delivery",
    icon: FaBolt,
    accent: "from-yellow-400/20 to-orange-400/20",
    text: "text-yellow-400",
  },
  {
    title: "100%",
    subtitle: "Safe & Legitimate",
    icon: FaShieldAlt,
    accent: "from-green-400/20 to-emerald-400/20",
    text: "text-green-400",
  },
  {
    title: "Easy",
    subtitle: "Secure Payments",
    icon: FaCreditCard,
    accent: "from-blue-400/20 to-cyan-400/20",
    text: "text-blue-400",
  },
  {
    title: "24/7",
    subtitle: "Instant Support",
    icon: FaHeadset,
    accent: "from-purple-400/20 to-pink-400/20",
    text: "text-purple-400",
  },
  {
    title: "Trusted",
    subtitle: "By Thousands",
    icon: FaUsers,
    accent: "from-yellow-300/20 to-amber-400/20",
    text: "text-yellow-300",
  },
  {
    title: "Fast",
    subtitle: "Automated Topups",
    icon: FaRobot,
    accent: "from-cyan-400/20 to-sky-400/20",
    text: "text-cyan-400",
  },
];

export default function TrustHighlights() {
  return (
    <section className="py-16 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {highlights.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="group relative bg-[var(--card)] border border-[var(--border)]
                           rounded-2xl p-6 text-center
                           transition-all duration-300
                           hover:-translate-y-1 hover:shadow-xl
                           hover:border-[var(--accent)]"
              >
                {/* Gradient glow */}
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                              bg-gradient-to-br ${item.accent}
                              blur-xl transition-opacity`}
                />

                <div className="relative z-10 flex flex-col items-center gap-3">
                  <Icon className={`text-2xl ${item.text}`} />

                  <p className={`text-xl font-extrabold ${item.text}`}>
                    {item.title}
                  </p>

                  <p className="text-sm text-[var(--muted)]">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
