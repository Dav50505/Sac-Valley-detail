import About from "@/components/About";
import Contact from "@/components/Contact";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HeroFramePreloads from "@/components/HeroFramePreloads";
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import UpcomingSectionsIntro from "@/components/UpcomingSectionsIntro";

export default function Home() {
  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text)]">
      <HeroFramePreloads />
      <Navbar />
      <Hero />
      <div className="overflow-x-hidden">
        <Services />
        <FAQ />
        <UpcomingSectionsIntro />
        <div className="relative border-t border-white/8 bg-[linear-gradient(180deg,#090909_0%,#050505_100%)]">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,107,0,0.7),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,107,0,0.08),transparent_36%)]" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-24 sm:px-10 lg:px-16">
            <About />
            <Testimonials />
            <Contact />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
