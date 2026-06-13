import { motion } from "motion/react";
import { useVisible } from "../../hooks/useVisible";

interface SectionLabelProps {
  label: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionLabel({ label, title, subtitle, center = false }: SectionLabelProps) {
  const { ref, visible } = useVisible(0.2);

  return (
    <div ref={ref} className={center ? "text-center" : ""}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: 12, fontWeight: 700, letterSpacing: "3px",
          color: "#E8C547", textTransform: "uppercase",
          fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12,
        }}
      >
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 700, color: "#FFFFFF",
          fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.2, marginBottom: subtitle ? 12 : 0,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontSize: 16, color: "#64748B", fontFamily: "'Inter', sans-serif" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
