import BackgroundEffects from "@/components/layout/BackgroundEffects";
import Header from "@/components/layout/Header";
import OpeningAnimation from "@/components/layout/OpeningAnimation";
import SectionDivider from "@/components/layout/SectionDivider";

import Countdown from "@/components/sections/Countdown";
import Event from "@/components/sections/Event";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import RSVP from "@/components/sections/RSVP";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <OpeningAnimation />
      <BackgroundEffects />
      <Header />

      <div className="relative z-10">
        <Hero />

        <SectionDivider image="/images/divider/divider-cloud.png" />

        <Event />

        <SectionDivider image="/images/divider/divider-star.png" />

        <Countdown />

        <SectionDivider image="/images/divider/divider-bear.png" />

        <RSVP />

        <SectionDivider image="/images/divider/divider-balloon.png" />

        <Footer />
      </div>
    </main>
  );
}