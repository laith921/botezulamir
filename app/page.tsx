import Countdown from "@/components/sections/Countdown";
import Event from "@/components/sections/Event";
import Family from "@/components/sections/Family";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Locations from "@/components/sections/Locations";
import RSVP from "@/components/sections/RSVP";
import Story from "@/components/sections/Story";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Event />
      <Countdown />
      <Gallery />
      <Locations />
      <Family />
      <RSVP />
      <Footer />
    </main>
  );
}