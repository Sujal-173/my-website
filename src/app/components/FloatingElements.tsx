import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronUp } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export function FloatingElements() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp floating button (minimal) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/918827039565"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center w-12 h-12 rounded-full"
          style={{ background: "#E8C547", color: "#0C0C0A", textDecoration: 'none' }}
        >
          <SiWhatsapp size={18} aria-hidden="true" />
        </a>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{
              background: "transparent",
              border: "1px solid #2E2E2A",
              color: "#8C8984",
            }}
            aria-label="Back to top"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
