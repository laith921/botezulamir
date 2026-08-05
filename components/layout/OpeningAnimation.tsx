"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Stage = "descending" | "arrived" | "opening" | "card" | "done";

export default function OpeningAnimation() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<Stage>("descending");

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setStage("arrived"), 2200),
      window.setTimeout(() => setStage("opening"), 3600),
      window.setTimeout(() => setStage("card"), 5000),
      window.setTimeout(() => setStage("done"), 6800),
      window.setTimeout(() => setVisible(false), 8200),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const showEnvelope = stage !== "descending";
  const showOpenEnvelope =
    stage === "opening" || stage === "card" || stage === "done";
  const showCard = stage === "card" || stage === "done";

  const balloonY =
    stage === "descending"
      ? "-18vh"
      : stage === "arrived"
        ? "-2vh"
        : stage === "opening"
          ? "-18vh"
          : "-31vh";

  const balloonScale =
    stage === "card" || stage === "done" ? 0.72 : 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#f7f1e8]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),transparent_48%),radial-gradient(circle_at_bottom,rgba(211,184,136,0.18),transparent_45%)]" />

          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 3.5, repeat: Infinity }}
            className="absolute left-[12%] top-[18%] h-2 w-2 rounded-full bg-[#d4b16f]"
          />

          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 4.2, repeat: Infinity, delay: 0.8 }}
            className="absolute right-[15%] top-[26%] h-1.5 w-1.5 rounded-full bg-[#b9cbd4]"
          />

          <motion.div
            initial={{ y: "-72vh", opacity: 0 }}
            animate={{
              y: balloonY,
              opacity: 1,
              scale: balloonScale,
              rotate: [0, 1.8, -1.8, 0],
            }}
            transition={{
              y: {
                duration: stage === "descending" ? 2.2 : 1.15,
                ease: [0.22, 1, 0.36, 1],
              },
              scale: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: { duration: 0.6 },
              rotate: {
                duration: 3.6,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute left-1/2 top-1/2 z-40 w-[210px] -translate-x-1/2 sm:w-[260px] md:w-[300px]"
          >
            <Image
              src="/opening/balloon-bear.png"
              alt="Ursuleț ținând balonul"
              width={800}
              height={1100}
              priority
              className="h-auto w-full object-contain"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 190, scale: 0.92 }}
            animate={{
              opacity: showEnvelope ? 1 : 0,
              y: showEnvelope ? 135 : 190,
              scale: showEnvelope ? 1 : 0.92,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-1/2 z-20 w-[300px] -translate-x-1/2 sm:w-[390px] md:w-[440px]"
          >
            <AnimatePresence mode="wait">
              {!showOpenEnvelope ? (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                >
                  <Image
                    src="/opening/envelope-closed.png"
                    alt="Plic închis"
                    width={1000}
                    height={760}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, rotateX: -18 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.75 }}
                  style={{ transformPerspective: 1000 }}
                >
                  <Image
                    src="/opening/envelope-open.png"
                    alt="Plic deschis"
                    width={1000}
                    height={820}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ y: 220, opacity: 0, scale: 0.94 }}
            animate={{
              y: showCard ? -35 : 220,
              opacity: showCard ? 1 : 0,
              scale: showCard ? 1 : 0.94,
            }}
            transition={{
              duration: 1.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-1/2 z-30 w-[230px] -translate-x-1/2 sm:w-[285px] md:w-[320px]"
          >
            <Image
              src="/opening/invitation-card.png"
              alt="Invitația pentru botezul lui Amir"
              width={800}
              height={1100}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_28px_50px_rgba(73,55,28,0.22)]"
            />
          </motion.div>

          <motion.button
            type="button"
            onClick={() => setVisible(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "done" ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#d8c7a4] bg-white/80 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d7852] shadow-sm backdrop-blur"
          >
            Intră în invitație
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}