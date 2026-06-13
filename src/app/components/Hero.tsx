import { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const typewriterWords = ["Restaurant", "Hotel", "Shop", "Business"];

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const word = typewriterWords[wordIndex];
    if (!deleting && displayed.length < word.length) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === word.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(
        () => setDisplayed(displayed.slice(0, -1)),
        50,
      );
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % typewriterWords.length);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [displayed, deleting, wordIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0A0A0F", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Decorative backgrounds removed per design — keep clean warm dark background */}

      <div className="relative max-w-7xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="flex items-center gap-20 lg:gap-24">
          {/* LEFT */}
          <div className="flex-1 min-w-0">
            {/* Top label — editorial plain text per spec */}
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#4A4845",
                letterSpacing: "0.05em",
                marginBottom: 12,
              }}
            >
              Freelance Web Developer · Indore, India
            </div>

            {/* Headline — h1 for SEO heading hierarchy */}
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1.05,
                margin: 0,
                padding: 0,
              }}
            >
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.5,
                  ease: [0.25, 0, 0, 1],
                }}
                style={{
                  display: "block",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  color: "#F0EDE8",
                  letterSpacing: "-0.03em",
                  fontWeight: 700,
                }}
              >
                Websites that bring
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                  ease: [0.25, 0, 0, 1],
                }}
                style={{
                  display: "block",
                  fontSize: "clamp(36px, 5vw, 64px)",
                  color: "#F0EDE8",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}
              >
                customers to your door.
              </motion.span>
            </h1>

            {/* Typewriter */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.45 }}
              style={{
                marginTop: 24,
                marginBottom: 24,
                fontSize: 17,
                color: "#8C8984",
                maxWidth: 520,
              }}
            >
              I build clean, fast websites for local businesses in Indore —
              shops, hotels, restaurants. If you need to get online without the
              complexity, I'm your person.
            </motion.p>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              style={{
                fontSize: 18,
                color: "#94A3B8",
                lineHeight: 1.7,
                maxWidth: 520,
                marginBottom: 36,
              }}
            >
              Freelance Web Developer from Indore — helping local shops, hotels
              &amp; restaurants get online with fast, beautiful, and affordable
              websites.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.45 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-6 py-3 rounded-[6px] font-medium"
                style={{
                  background: "#E8C547",
                  color: "#0C0C0A",
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#F0D060")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    "#E8C547")
                }
              >
                See my work
              </button>
              <a
                href="https://wa.me/918827039565"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-[6px] font-medium"
                style={{
                  border: "1px solid #2E2E2A",
                  color: "#8C8984",
                  fontSize: 14,
                  fontFamily: "'DM Sans', sans-serif",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const target = e.currentTarget as HTMLAnchorElement;
                  target.style.backgroundColor = "rgba(100,220,71,0.8)";
                  target.style.color = "black";
                }}
                onMouseLeave={(e) =>
                  ((
                    e.currentTarget as HTMLAnchorElement
                  ).style.backgroundColor = "rgba(232,197,71,0.1)")
                }
              >
                WhatsApp me ↗
              </a>
            </motion.div>

            {/* Trust row */}
            <div style={{ marginTop: 48 }}>
              <div
                style={{ height: 1, background: "#1C1C1A", marginBottom: 12 }}
              />
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#4A4845",
                }}
              >
                5–7 day delivery &nbsp; · &nbsp; Starting ₹5,000 &nbsp; · &nbsp;
                Mobile-first
              </div>
            </div>
          </div>

          {/* RIGHT — Code card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block flex-shrink-0"
          >
            <div className="relative">
              {/* Behind orb */}
              {/* Decorative behind element removed for clean editorial look */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  width: 380,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  padding: 24,
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 0 60px rgba(108,99,255,0.2)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {/* macOS dots */}
                <div className="flex items-center gap-2 mb-5">
                  {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                    <div
                      key={c}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: c,
                      }}
                    />
                  ))}
                </div>

                {/* Code */}
                <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                  <span style={{ color: "#CBD5E1" }}>const </span>
                  <span style={{ color: "#00D4FF" }}>developer</span>
                  <span style={{ color: "#CBD5E1" }}> = {"{"}</span>
                  <br />
                  <span style={{ color: "#64748B", paddingLeft: 20 }}>
                    {" "}
                    name
                  </span>
                  <span style={{ color: "#CBD5E1" }}>: </span>
                  <span style={{ color: "#F9A875" }}>"Sujal"</span>
                  <span style={{ color: "#64748B" }}>,</span>
                  <br />
                  <span style={{ color: "#64748B", paddingLeft: 20 }}>
                    {" "}
                    location
                  </span>
                  <span style={{ color: "#CBD5E1" }}>: </span>
                  <span style={{ color: "#F9A875" }}>"Indore 🇮🇳"</span>
                  <span style={{ color: "#64748B" }}>,</span>
                  <br />
                  <span style={{ color: "#64748B", paddingLeft: 20 }}>
                    {" "}
                    skills
                  </span>
                  <span style={{ color: "#CBD5E1" }}>: [</span>
                  <br />
                  {["React", "Next.js", "Node.js"].map((s) => (
                    <div key={s} style={{ paddingLeft: 40 }}>
                      <span style={{ color: "#A5F3A5" }}>"{s}"</span>
                      <span style={{ color: "#64748B" }}>,</span>
                    </div>
                  ))}
                  <span style={{ color: "#CBD5E1", paddingLeft: 20 }}> ],</span>
                  <br />
                  <span style={{ color: "#64748B", paddingLeft: 20 }}>
                    {" "}
                    available
                  </span>
                  <span style={{ color: "#CBD5E1" }}>: </span>
                  <span style={{ color: "#6C63FF" }}>true</span>
                  <span style={{ color: "#64748B" }}>,</span>
                  <br />
                  <span style={{ color: "#CBD5E1" }}>{"}"}</span>
                </div>

                {/* Bottom tag */}
                <div
                  className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    fontSize: 12,
                    color: "#8C8984",
                  }}
                >
                  🟢 Open to freelance work
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Duplicate scroll indicator removed — only one below is kept */}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <span style={{ fontSize: 12, color: "#64748B" }}>
            Scroll to explore
          </span>
          <ChevronDown size={16} color="#64748B" />
        </motion.div>
      </div>
    </section>
  );
}
