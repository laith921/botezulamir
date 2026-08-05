"use client";

import { Music, VolumeX } from "lucide-react";
import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      audio.volume = 0.25;
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        <source src="/music/background.mp3" type="audio/mpeg" />
      </audio>

      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? "Oprește muzica" : "Pornește muzica"}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#5798bd] shadow-[0_12px_35px_rgba(38,55,70,0.16)] backdrop-blur-xl transition hover:-translate-y-1"
      >
        {playing ? <Music size={23} /> : <VolumeX size={23} />}
      </button>
    </>
  );
}