import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

const stats = [
  { icon: "🚀", number: "MERN Stack", label: "Full-Stack Dev" },
  { icon: "⚡", number: "5-7 Days", label: "Delivery Time" },
  { icon: "💰", number: "₹5,000+", label: "Starting Price" },
];

function useVisible(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export function About() {
  const { ref, visible } = useVisible();

  return (
    <section
      id="about"
      ref={ref}
      className="py-28"
      style={{ background: "#0D0D15", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          {/* LEFT — Photo card */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 w-full lg:w-[40%] max-w-sm relative"
          >
            <div
              className="relative rounded-[20px] overflow-hidden group cursor-pointer transition-all duration-300"
              style={{
                border: "1px solid rgba(255,255,255,0.04)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.6)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(232,197,71,0.12)";
                e.currentTarget.style.boxShadow = "0 12px 26px rgba(0,0,0,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.04)";
                e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.6)";
              }}
            >
              <img
                src="https://res.cloudinary.com/dbkrxzzv1/image/upload/Generated_Image_June_12_2026_-_5_13PM_bhcvgp"
                alt="Sujal — Freelance Web Developer"
                className="w-full object-cover"
                style={{ aspectRatio: "4/5", display: "block" }}
              />
              {/* overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(10,10,15,0) 60%, rgba(10,10,15,0.9) 100%)",
                }}
              />
              {/* Bottom strip */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3"
                style={{ background: "rgba(10,10,15,0.9)", fontSize: 13, color: "#CBD5E1" }}
              >
                📍 Indore, Madhya Pradesh
              </div>
            </div>

            {/* Floating badge */}
              <div
                className="absolute top-1 right-2 px-3 py-1.5 rounded-[8px]"
                style={{
                  background: "rgba(13,13,21,0.5)",
                  border: "1px solid rgba(232,197,71,0.18)",
                  fontSize: 12, color: "#E8C547", fontWeight: 700,
                }}
              >
                B.Tech CS 🎓
              </div>
          </motion.div>

          {/* RIGHT — Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 min-w-0"
          >
            <SectionLabel
              label="About Me"
              title="Turning Business Ideas Into Digital Reality"
            />

            <div className="mt-8 flex flex-col gap-4">
              {[
                "I'm a B.Tech Computer Science student and freelance web developer based in Indore.",
                "I specialize in building websites for local businesses — hotels, restaurants, and shops. Every site I build is fast, mobile-friendly, and built to convert visitors into customers.",
                "I understand what local business owners need: an affordable website that looks great and actually brings in customers.",
              ].map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.8 }}
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Stat cards */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.number}
                  initial={{ opacity: 0, y: 20 }}
                  animate={visible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4, borderColor: "rgba(232,197,71,0.18)" }}
                  className="p-4 rounded-[12px] transition-all duration-300 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div
                    style={{
                      fontSize: 16, fontWeight: 700,
                      color: '#E8C547',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {s.number}
                  </div>
                  <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
