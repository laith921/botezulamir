import Countdown from "./components/sections/Countdown";
import Event from "./components/sections/Event";
import Hero from "./components/sections/Hero";
import Story from "./components/sections/Story";

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <Event />
      <Countdown />
    </main>
  );
}