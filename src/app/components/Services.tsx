import { motion } from "motion/react";
import { Monitor, Zap, Wrench } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const cards = [
  {
    icon: Monitor,
    title: "Business Website",
    description: "A professional website for your shop, hotel or restaurant. Fast, mobile-first, and built to impress your customers.",
    price: "Starting ₹5,000",
    featured: false,
  },
  {
    icon: Zap,
    title: "Fast & SEO Ready",
    description: "Sites built to load fast and rank on Google so local customers can discover your business.",
    price: "Starting ₹10,000",
    featured: true,
    badge: "Most Popular",
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    description: "Monthly plans to keep your site updated, secure, and running without any issues.",
    price: "₹500 / month",
    featured: false,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="py-28"
      style={{ background: "#0D0D15" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel label="Services" title="What I Can Build For You" center />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: card.featured ? 1.02 : 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                whileHover={{ y: -8 }}
                className="relative rounded-[20px] p-9 flex flex-col gap-5 cursor-default transition-all duration-300 group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: card.featured ? "1px solid rgba(108,99,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  boxShadow: card.featured ? "0 0 40px rgba(108,99,255,0.15)" : "none",
                  borderTop: `2px solid`,
                  borderTopColor: card.featured ? "#6C63FF" : "rgba(255,255,255,0.12)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(108,99,255,0.4)";
                  e.currentTarget.style.boxShadow = "0 20px 60px rgba(108,99,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = card.featured ? "rgba(108,99,255,0.4)" : "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = card.featured ? "0 0 40px rgba(108,99,255,0.15)" : "none";
                }}
              >
                {card.badge && (
                  <span
                    className="absolute top-5 right-5 px-3 py-1 rounded-full text-white"
                    style={{
                      background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                      fontSize: 11, fontWeight: 700,
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {card.badge}
                  </span>
                )}

                {/* Icon box */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="w-14 h-14 rounded-[14px] flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)" }}
                >
                  <Icon size={26} color="white" />
                </motion.div>

                <div>
                  <h3
                    style={{
                      fontSize: 22, fontWeight: 600, color: "#FFFFFF",
                      fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8,
                    }}
                  >
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
                    {card.description}
                  </p>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <span
                    style={{
                      fontSize: 14, fontWeight: 700,
                      background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                    }}
                  >
                    {card.price}
                  </span>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-sm font-semibold transition-all duration-200 hover:underline"
                    style={{ color: "#6C63FF", fontFamily: "'Inter', sans-serif" }}
                  >
                    Get Started →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
