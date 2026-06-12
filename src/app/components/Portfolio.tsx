import { motion } from "motion/react";
import { SectionLabel } from "./SectionLabel";

const projects = [
  {
    title: "Hotel Narmada Residency",
    type: "Hotel Website",
    desc: "A stunning hotel website with room booking, gallery, and local attractions.",
    tech: ["Next.js", "Tailwind", "Vercel"],
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop&auto=format",
    large: true,
  },
  {
    title: "Yashraj Palace",
    type: "Hotel Website",
    desc: "Modern hotel website with room details, booking form, and local attractions.",
    tech: ["React", "CSS", "Typescript"],
    img: "https://res.cloudinary.com/dbkrxzzv1/image/upload/q_auto/f_auto/v1781277054/yashraj_palace_tw1hej.webp",
    large: false,
    website: "https://yashrajpalace.netlify.app/",
  },
  {
    title: "Demo Shop Website",
    type: "Demo Project",
    desc: "Local shop e-commerce with product catalog and WhatsApp order flow.",
    tech: ["HTML", "CSS", "JS"],
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop&auto=format",
    large: false,
  },
];

function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[20px] overflow-hidden group cursor-pointer"
      style={{
        border: "1px solid rgba(255,255,255,0.08)",
        height: project.large ? 420 : 200,
      }}
    >
      <img
        src={project.img}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Default overlay */}
      <div
        className="absolute inset-0 transition-all duration-400"
        style={{ background: "rgba(10,10,15,0.3)" }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6"
        style={{ background: "rgba(10,10,15,0.85)" }}
      >
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#FFFFFF",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: 6,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontSize: 14,
            color: "#CBD5E1",
            lineHeight: 1.6,
            marginBottom: 12,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded"
              style={{
                fontSize: 12,
                color: "#CBD5E1",
                background: "rgba(108,99,255,0.2)",
                border: "1px solid rgba(108,99,255,0.3)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <a href={project.website} target="_blank" rel="noopener noreferrer"
          className="self-start px-[18px] py-2 rounded-[8px] text-white font-semibold"
          style={{
            background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
            fontSize: 13,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          View Live ↗
        </a>
      </div>

      {/* Type badge — always visible */}
      <div
        className="absolute top-4 left-4 px-3 py-1 rounded-lg"
        style={{
          background: "rgba(10,10,15,0.8)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: 11,
          color: "#CBD5E1",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {project.type}
      </div>
    </motion.div>
  );
}

export function Portfolio() {
  return (
    <section id="work" className="py-28" style={{ background: "#0A0A0F" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <SectionLabel
            label="My Work"
            title="Projects That Speak For Themselves"
            subtitle="More projects being added soon — currently building demo sites."
            center
          />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Large card */}
          <div className="lg:col-span-3">
            <ProjectCard project={projects[0]} delay={0} />
          </div>
          {/* Small cards */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <ProjectCard project={projects[1]} delay={0.1} />
            <ProjectCard project={projects[2]} delay={0.2} />
          </div>
        </div>

        {/* Coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-4 rounded-[20px] flex items-center justify-center py-16"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <span
            style={{
              fontSize: 16,
              color: "#64748B",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            🚧 More Coming Soon
          </span>
        </motion.div>
      </div>
    </section>
  );
}
