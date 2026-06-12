import { SiGithub, SiWhatsapp } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

const navLinks = ["About", "Skills", "Work", "Services", "Contact"];

export function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#080810",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'Inter', sans-serif",
      }}
      className="pt-12 pb-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            <span
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: '#F0EDE8',
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Sujal.
            </span>
            <span style={{ fontSize: 13, color: "#8C8984", fontFamily: "'DM Sans', sans-serif" }}>Freelance Web Developer</span>
          </div>

          <div className="flex items-center gap-5">
            {[
              { Icon: FaLinkedin, href: "https://www.linkedin.com/in/sujal-patidar-093669357/" },
              { Icon: SiGithub, href: "https://github.com" },
              { Icon: SiWhatsapp, href: "https://wa.me/918827039565" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-200"
                style={{ color: "#8C8984" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#F0EDE8";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "#8C8984";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                }}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="transition-colors duration-200"
              style={{ fontSize: 13, color: "#64748B", background: "none", border: "none", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#64748B")}
            >
              {link}
            </button>
          ))}
        </div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ fontSize: 13, color: "#64748B" }}>© 2025 Sujal. All rights reserved.</p>
          <p style={{ fontSize: 13, color: "#64748B" }}>Made with ❤️ in Indore 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
