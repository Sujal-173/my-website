import { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  SiHtml5, SiCss, SiJavascript, SiReact, SiNextdotjs,
  SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb,
  SiGit, SiVercel, SiFigma,
} from "react-icons/si";
import { SectionLabel } from "./SectionLabel";

const frontend = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
];

const backend = [
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#FFFFFF" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
];

function SkillPill({ name, icon: Icon, color, delay }: { name: string; icon: React.ElementType; color: string; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center gap-2 px-5 py-[10px] rounded-full cursor-default transition-all duration-300 flex-shrink-0"
      style={{
        background: hovered ? `${color}14` : "rgba(255,255,255,0.05)",
        border: `1px solid ${hovered ? color : "rgba(255,255,255,0.08)"}`,
        boxShadow: hovered ? `0 0 20px ${color}4D` : "none",
        color: hovered ? color : "#CBD5E1",
        fontSize: 14, fontWeight: 500,
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.25s ease",
      }}
    >
      <Icon size={20} color={hovered ? color : "#CBD5E1"} />
      {name}
    </motion.div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-28"
      style={{ background: "#0A0A0F" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel label="Tech Stack" title="Tools I Build With" center />
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <p style={{ fontSize: 12, color: "#64748B", marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
              Frontend
            </p>
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 md:overflow-visible md:pb-0">
              {frontend.map((s, i) => (
                <SkillPill key={s.name} {...s} delay={i * 0.05} />
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 12, color: "#64748B", marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>
              Backend &amp; Tools
            </p>
            <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 md:overflow-visible md:pb-0">
              {backend.map((s, i) => (
                <SkillPill key={s.name} {...s} delay={i * 0.05} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
