import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0A0A0F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Helmet>
        <title>404 — Page Not Found | Sujal Patidar</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          maxWidth: 520,
          textAlign: "center",
        }}
      >
        {/* Big 404 */}
        <div
          style={{
            fontSize: "clamp(80px, 15vw, 140px)",
            fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1,
            background: "linear-gradient(135deg, #E8C547, #F0D060)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: 16,
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 700,
            color: "#F0EDE8",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            marginBottom: 14,
          }}
        >
          Page not found
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#8C8984",
            lineHeight: 1.75,
            marginBottom: 40,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "12px 28px",
              borderRadius: 8,
              background: "#E8C547",
              color: "#0C0C0A",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Back to Home
          </Link>
          <Link
            to="/blog"
            style={{
              padding: "12px 28px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#8C8984",
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Visit Blog
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
