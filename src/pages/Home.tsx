import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { About } from "../app/components/About";
import { Contact } from "../app/components/Contact";
import { FloatingElements } from "../app/components/FloatingElements";
import { Footer } from "../app/components/Footer";
import { Hero } from "../app/components/Hero";
import { Portfolio } from "../app/components/Portfolio";
import { Services } from "../app/components/Services";
import { Skills } from "../app/components/Skills";
import { Testimonials } from "../app/components/Testimonials";
import { WhyMe } from "../app/components/WhyMe";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (!state?.scrollTo) return;

    const target = document.getElementById(state.scrollTo);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }

    navigate(location.pathname, { replace: true, state: undefined });
  }, [location, navigate]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Portfolio />
      <WhyMe />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingElements />
    </>
  );
}
