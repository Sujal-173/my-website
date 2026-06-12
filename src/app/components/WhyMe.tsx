import { motion } from "motion/react";
import { DollarSign, Zap, Smartphone, MapPin } from "lucide-react";
import { SectionLabel } from "./SectionLabel";

const cards = [
  {
    icon: DollarSign,
    title: "Affordable Pricing",
    body: "Quality websites starting at ₹5,000. No hidden costs, no surprises.",
    stat: "Starting at ₹5,000",
  },
  {
    icon: Zap,
    title: "Fast Delivery",
    body: "Most websites delivered in 5 to 7 working days. No long waits.",
    stat: "5–7 Day Turnaround",
  },
  {
    icon: Smartphone,
    title: "Mobile First Design",
    body: "Every site is fully optimized for phones — where your customers browse.",
    stat: "100% Responsive",
  },
  {
    icon: MapPin,
    title: "Local & Reachable",
    body: "Based in Indore. Available on WhatsApp. You can always reach me directly.",
    stat: "Indore, MP Based",
  },
];

export function WhyMe() {
  return (
    <section
      id="why"
      className="py-28"
      style={{ background: "#0D0D15" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel label="Why Me" title="Why Businesses Choose Me" center />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="p-9 rounded-[20px] transition-all duration-300 cursor-default group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(108,99,255,0.35)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(108,99,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <motion.div
                  whileHover={{ rotate: 12 }}
                  transition={{ duration: 0.3 }}
                  className="w-[52px] h-[52px] rounded-[12px] flex items-center justify-center mb-6"
                  style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)" }}
                >
                  <Icon size={24} color="white" />
                </motion.div>

                <h3
                  style={{
                    fontSize: 20, fontWeight: 700, color: "#FFFFFF",
                    fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 8,
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.7, fontFamily: "'Inter', sans-serif", marginBottom: 16 }}>
                  {card.body}
                </p>
                <span
                  style={{
                    fontSize: 14, fontWeight: 700,
                    background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {card.stat}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
