import Header from "@/components/layout/Header";
import OpeningAnimation from "@/components/layout/OpeningAnimation";

import Countdown from "@/components/sections/Countdown";
import Event from "@/components/sections/Event";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import RSVP from "@/components/sections/RSVP";

export default function Home() {
  return (
    <main>
      <OpeningAnimation />
      <Header />

      <Hero />
      <Event />
      <Countdown />
      <RSVP />
      <Footer />
    </main>
  );
}