import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28"
      style={{ background: "#0A0A0F" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel label="Testimonials" title="What Clients Say" center />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto relative rounded-[24px] px-14 py-16"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(108,99,255,0.2)",
            boxShadow: "0 0 60px rgba(108,99,255,0.08)",
          }}
        >
          {/* Quote mark */}
          <div
            className="absolute top-6 left-10 select-none pointer-events-none"
            style={{
              fontSize: 120, lineHeight: 1,
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              opacity: 0.3, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            }}
          >
            "
          </div>

          <p
            className="relative z-10 text-center italic"
            style={{
              fontSize: 20, color: "#CBD5E1", lineHeight: 1.8,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Be my first client — your review goes here! 🌟<br />
            Currently offering special introductory pricing for first projects.
          </p>

          <div
            className="my-8"
            style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
          />

          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 30px rgba(108,99,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-7 py-3 rounded-[10px] text-white font-semibold"
              style={{
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                fontSize: 14, fontFamily: "'Inter', sans-serif",
              }}
            >
              🚀 Work With Me at Intro Price →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
