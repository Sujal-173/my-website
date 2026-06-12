import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { WhyMe } from "./components/WhyMe";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { FloatingElements } from "./components/FloatingElements";

export default function App() {
  return (
    <div
      style={{
        background: "#0A0A0F",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />
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
    </div>
  );
}
