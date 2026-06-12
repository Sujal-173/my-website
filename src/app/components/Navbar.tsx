import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = ["About", "Skills", "Work", "Services", "Contact"];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(10,10,15,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[60px] md:h-[72px]">
          {/* Logo */}
          <motion.button
            whileHover={{ color: '#E8C547' }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              color: "#F0EDE8",
              fontSize: "20px",
              fontStyle: "italic",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Sujal.
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="relative group text-sm font-medium transition-colors duration-200"
                style={{ color: "#8C8984", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#F0EDE8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8C8984")}
              >
                {link}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: "#E8C547" }}
                />
              </button>
            ))}
          </div>

          {/* Hire Me */}
          <button
            onClick={() => scrollTo("Contact")}
            className="hidden md:block px-[18px] py-[8px] rounded-[6px] text-sm font-medium transition-all duration-150"
            style={{
              background: "#E8C547",
              color: "#0C0C0A",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#F0D060'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#E8C547'; }}
          >
            Let's Talk
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 flex flex-col p-8"
              style={{
                background: "#0D0D15",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end text-white mb-8"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col gap-6">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => scrollTo(link)}
                    className="text-left text-white transition-colors duration-200"
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F0EDE8')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    style={{ fontSize: "20px", fontWeight: 500 }}
                  >
                    {link}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.06 }}
                  onClick={() => scrollTo("Contact")}
                  className="mt-4 px-6 py-3 rounded-[8px] font-semibold text-[#0C0C0A]"
                  style={{ background: "#E8C547" }}
                >
                  Hire Me
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
