import HeroSection from "@/src/components/home/HeroSection";
import PhilosophySection from "@/src/components/home/PhilosophySection";
import MenuHighlights from "@/src/components/home/MenuHighlights";
import EventsSection from "@/src/components/home/EventsSection";

export default function Home() {
  return (
    <main className="w-full bg-[#f4f3e7]">
      <HeroSection />
      <PhilosophySection />
      <MenuHighlights />
      <EventsSection />
    </main>
  );
}
