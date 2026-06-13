import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { SectionLabel } from "./SectionLabel";

// ── ENV VARS ────────────────────────────────────────────────
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const EMAILJS_AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as string;

// ── TYPES ───────────────────────────────────────────────────
interface FormState {
  name: string;
  business: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const EMPTY_FORM: FormState = {
  name: "",
  business: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

// ── CONTACT METHODS ─────────────────────────────────────────
const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "sujalpatidar173@gmail.com",
    href: "mailto:sujalpatidar173@gmail.com",
    iconColor: "#E8C547",
    bg: "rgba(232,197,71,0.06)",
    border: "rgba(232,197,71,0.18)",
    hoverBorder: "rgba(232,197,71,0.45)",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 8827039565",
    href: "https://wa.me/918827039565",
    iconColor: "#25D366",
    bg: "rgba(37,211,102,0.06)",
    border: "rgba(37,211,102,0.2)",
    hoverBorder: "rgba(37,211,102,0.5)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Indore, Madhya Pradesh",
    href: null,
    iconColor: "#8C8984",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.06)",
    hoverBorder: "rgba(255,255,255,0.12)",
  },
];

// ── VALIDATION ───────────────────────────────────────────────
const PHONE_RE = /^[6-9]\d{9}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form: FormState): string {
  if (!form.name.trim()) return "Full name is required.";
  if (!form.email.trim()) return "Email address is required.";
  if (!EMAIL_RE.test(form.email)) return "Enter a valid email address.";
  if (!form.phone.trim()) return "WhatsApp number is required.";
  if (!PHONE_RE.test(form.phone))
    return "Enter a valid 10-digit Indian mobile number.";
  if (!form.message.trim()) return "Please write a short message.";
  return "";
}

// ── SHARED INPUT STYLE ───────────────────────────────────────
const baseInputStyle: React.CSSProperties = {
  background: "#111110",
  border: "1px solid #232320",
  borderRadius: 6,
  padding: "12px 14px",
  fontSize: 14,
  color: "#F0EDE8",
  width: "100%",
  outline: "none",
  fontFamily: "'DM Sans', sans-serif",
  transition: "border-color 0.15s",
};

function useFocusHandlers() {
  const onFocus = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.target.style.borderColor = "#E8C547";
  };
  const onBlur = (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    e.target.style.borderColor = "#232320";
  };
  return { onFocus, onBlur };
}

// ── COMPONENT ────────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { onFocus, onBlur } = useFocusHandlers();

  // Auto-clear success banner after 5 s (with cleanup)
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(t);
  }, [submitted]);

  // ── SUBMIT ─────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const now = new Date();

      const templateParams = {
        from_name: form.name.trim(),
        business_name: form.business.trim() || "Not specified",

        phone: form.phone.trim(),
        service_type: form.service || "Not specified",

        form_email: form.email.trim(),
        message: form.message.trim(),
        reply_to: form.email.trim(), // FIX: was form.phone
        submission_date: now.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        submission_time: now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // FIX: public key passed as 4th arg — no emailjs.init() needed
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      if (response.status === 200) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_AUTOREPLY_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY,
        );
        setSubmitted(true);
        setForm(EMPTY_FORM);
      } else {
        setError("Something went wrong. Please try WhatsApp directly.");
      }
    } catch (err) {
      // Only log in development — never leak error details to production console
      if (import.meta.env.DEV) {
        console.error("EmailJS error:", err);
      }
      setError("Failed to send. Please reach out via WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  // ── FIELD HELPER ───────────────────────────────────────────
  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
      if (error) setError(""); // clear error on any change
    },
    onFocus,
    onBlur,
  });

  // ── RENDER ─────────────────────────────────────────────────
  return (
    <section id="contact" style={{ background: "#0C0C0A", padding: "100px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: 64 }}>
          <SectionLabel
            label="CONTACT"
            title="Let's build something together."
            center
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 64,
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {/* ── LEFT ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.25, 0, 0, 1] }}
            style={{ flex: "0 0 340px", minWidth: 0 }}
          >
            {/* Sub-headline */}
            <p
              style={{
                fontSize: 15,
                color: "#8C8984",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.75,
                marginBottom: 28,
              }}
            >
              Have a business and need a website? Tell me about it — I'll get
              back to you with a plan and a price within a few hours.
            </p>

            {/* Response badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "5px 12px",
                borderRadius: 50,
                background: "rgba(232,197,71,0.08)",
                border: "1px solid rgba(232,197,71,0.22)",
                fontSize: 12,
                color: "#E8C547",
                fontFamily: "'Geist Mono', monospace",
                marginBottom: 36,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#E8C547",
                  display: "inline-block",
                  animation: "pulse 2.5s ease-in-out infinite",
                }}
              />
              Usually replies within 2 hours
            </div>

            {/* Contact method list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {contactMethods.map((m) => {
                const Icon = m.icon;
                const inner = (
                  <div
                    key={m.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 18px",
                      borderRadius: 8,
                      background: m.bg,
                      border: `1px solid ${m.border}`,
                      transition: "border-color 0.2s, background 0.2s",
                      cursor: m.href ? "pointer" : "default",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        m.hoverBorder;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        m.border;
                    }}
                  >
                    <Icon size={17} color={m.iconColor} />
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#4A4845",
                          fontFamily: "'Geist Mono', monospace",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          marginBottom: 2,
                        }}
                      >
                        {m.label}
                      </div>
                      <div
                        style={{
                          fontSize: 14,
                          color: "#F0EDE8",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {m.value}
                      </div>
                    </div>
                  </div>
                );

                return m.href ? (
                  <a
                    key={m.label}
                    href={m.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={m.label}>{inner}</div>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT — FORM ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.25, 0, 0, 1] }}
            style={{ flex: 1, minWidth: 280 }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                background: "#111110",
                border: "1px solid #232320",
                borderRadius: 10,
                padding: "36px 32px",
              }}
            >
              {/* ── STATUS BANNERS ──────────────────────── */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      marginBottom: 20,
                      padding: "12px 16px",
                      borderRadius: 6,
                      background: "rgba(74,222,128,0.08)",
                      border: "1px solid rgba(74,222,128,0.25)",
                      fontSize: 14,
                      color: "#4ADE80",
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: "center",
                    }}
                  >
                    ✓ Sent. I'll reply within 2 hours.
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -8, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -8, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      marginBottom: 20,
                      padding: "12px 16px",
                      borderRadius: 6,
                      background: "rgba(248,113,113,0.08)",
                      border: "1px solid rgba(248,113,113,0.25)",
                      fontSize: 14,
                      color: "#F87171",
                      fontFamily: "'DM Sans', sans-serif",
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── FIELDS ──────────────────────────────── */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {/* Row 1: Name + Business — collapses to 1-col on small screens */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  <input
                    id="contact-name"
                    type="text"
                    style={baseInputStyle}
                    placeholder="Full Name *"
                    aria-label="Full Name"
                    autoComplete="name"
                    {...field("name")}
                  />
                  <input
                    id="contact-business"
                    type="text"
                    style={baseInputStyle}
                    placeholder="Business Name"
                    aria-label="Business Name"
                    autoComplete="organization"
                    {...field("business")}
                  />
                </div>

                {/* Row 2: Phone + Email — collapses to 1-col on small screens */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 12,
                  }}
                >
                  <input
                    id="contact-phone"
                    type="tel"
                    style={baseInputStyle}
                    placeholder="WhatsApp Number *"
                    aria-label="WhatsApp Number"
                    maxLength={10}
                    autoComplete="tel"
                    inputMode="numeric"
                    {...field("phone")}
                  />
                  <input
                    id="contact-email"
                    type="email"
                    style={baseInputStyle}
                    placeholder="Email Address *"
                    aria-label="Email Address"
                    autoComplete="email"
                    {...field("email")}
                  />
                </div>

                {/* Row 3: Service — full width */}
                <select
                  id="contact-service"
                  aria-label="Service Needed"
                  style={{
                    ...baseInputStyle,
                    color: form.service ? "#F0EDE8" : "#4A4845",
                  }}
                  {...field("service")}
                >
                  <option value="" disabled>
                    Service Needed
                  </option>
                  <option value="new">New Website</option>
                  <option value="redesign">Redesign Old Website</option>
                  <option value="maintenance">Monthly Maintenance</option>
                  <option value="notsure">Not Sure Yet</option>
                </select>

                {/* Row 4: Message */}
                <textarea
                  id="contact-message"
                  aria-label="Message"
                  style={
                    {
                      ...baseInputStyle,
                      resize: "none",
                      height: 110,
                      lineHeight: "1.6",
                    } as React.CSSProperties
                  }
                  placeholder="Tell me about your business and what you need *"
                  {...field("message")}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "13px",
                    borderRadius: 6,
                    border: "none",
                    background: loading ? "#B8962A" : "#E8C547",
                    color: "#0C0C0A",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "'DM Sans', sans-serif",
                    cursor: loading ? "not-allowed" : "pointer",
                    opacity: loading ? 0.75 : 1,
                    transition: "background 0.15s, opacity 0.15s",
                    letterSpacing: "-0.01em",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#F0D060";
                  }}
                  onMouseLeave={(e) => {
                    if (!loading)
                      (e.currentTarget as HTMLButtonElement).style.background =
                        "#E8C547";
                  }}
                >
                  {loading ? "Sending…" : "Send message"}
                </button>
              </div>

              {/* Footer note */}
              <p
                style={{
                  marginTop: 16,
                  textAlign: "center",
                  fontSize: 11,
                  color: "#2E2E2A",
                  fontFamily: "'Geist Mono', monospace",
                }}
              >
                Powered by EmailJS — no backend needed
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Pulse keyframe */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </section>
  );
}
