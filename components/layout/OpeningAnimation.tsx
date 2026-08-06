"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

type Stage =
  | "descending"
  | "arrived"
  | "opening"
  | "card"
  | "done";

export default function OpeningAnimation() {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] =
    useState<Stage>("descending");

  useEffect(() => {
    const timers = [
      window.setTimeout(
        () => setStage("arrived"),
        2200,
      ),
      window.setTimeout(
        () => setStage("opening"),
        3600,
      ),
      window.setTimeout(
        () => setStage("card"),
        5000,
      ),
      window.setTimeout(
        () => setStage("done"),
        6800,
      ),
      window.setTimeout(
        () => setVisible(false),
        8600,
      ),
    ];

    return () => {
      timers.forEach((timer) =>
        window.clearTimeout(timer),
      );
    };
  }, []);

  const showEnvelope = stage !== "descending";

  const showOpenEnvelope =
    stage === "opening" ||
    stage === "card" ||
    stage === "done";

  const showCard =
    stage === "card" || stage === "done";

  const balloonY =
    stage === "descending"
      ? "-34vh"
      : stage === "arrived"
        ? "-12vh"
        : stage === "opening"
          ? "-18vh"
          : "-20vh";

  const balloonScale =
    stage === "card" || stage === "done"
      ? 0.7
      : 1;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#fcfaf6]"
        >
          {/* Fundal pentru telefon */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 1.01 }}
            animate={{
              scale: [1.01, 1.025, 1.01],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 sm:hidden"
          >
            <Image
              src="/images/hero-background-mobile.png"
              alt=""
              fill
              priority
              quality={100}
              sizes="(max-width: 639px) 100vw, 0px"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Fundal pentru desktop */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 1.02 }}
            animate={{
              scale: [1.02, 1.04, 1.02],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 hidden sm:block"
          >
            <Image
              src="/images/hero-background.png"
              alt=""
              fill
              priority
              quality={100}
              sizes="(min-width: 640px) 100vw, 0px"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Strat foarte discret */}
          <motion.div
            aria-hidden="true"
            animate={{
              opacity:
                stage === "done"
                  ? 0
                  : stage === "card"
                    ? 0.015
                    : 0.04,
            }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-10 bg-white"
          />

          {/* Particule */}
          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.15, 0.65, 0.15],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
            }}
            className="absolute left-[12%] top-[18%] z-20 h-2 w-2 rounded-full bg-[#d4b16f]"
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.12, 0.5, 0.12],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              delay: 0.8,
            }}
            className="absolute right-[15%] top-[25%] z-20 h-1.5 w-1.5 rounded-full bg-[#b9cbd4]"
          />

          <motion.div
            aria-hidden="true"
            animate={{
              opacity: [0.12, 0.5, 0.12],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              delay: 1.2,
            }}
            className="absolute bottom-[22%] left-[19%] z-20 h-1.5 w-1.5 rounded-full bg-[#d4b16f]"
          />

          {/* Ursulețul cu balon */}
          <motion.div
            initial={{
              y: "-75vh",
              opacity: 0,
            }}
            animate={{
              y: balloonY,
              opacity: 1,
              scale: balloonScale,
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              y: {
                duration:
                  stage === "descending"
                    ? 2.2
                    : 1.15,
                ease: [0.22, 1, 0.36, 1],
              },
              scale: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.6,
              },
              rotate: {
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute left-1/2 top-[42%] z-40 w-[170px] -translate-x-1/2 sm:top-[40%] sm:w-[230px] md:w-[270px]"
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

          {/* Plic */}
          <motion.div
            initial={{
              opacity: 0,
              y: 140,
              scale: 0.92,
            }}
            animate={{
              opacity: showEnvelope ? 1 : 0,
              y: showEnvelope ? 18 : 140,
              scale: showEnvelope ? 1 : 0.92,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-[38%] z-30 w-[240px] -translate-x-1/2 sm:w-[330px] md:w-[380px]"
          >
            <AnimatePresence mode="wait">
              {!showOpenEnvelope ? (
                <motion.div
                  key="closed-envelope"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.45,
                  }}
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
                  key="open-envelope"
                  initial={{
                    opacity: 0,
                    rotateX: -20,
                    scale: 0.98,
                  }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformPerspective: 1000,
                  }}
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

          {/* Cartonașul invitației */}
          <motion.div
            initial={{
              y: 180,
              opacity: 0,
              scale: 0.94,
            }}
            animate={{
              y: showCard ? -145 : 180,
              opacity: showCard ? 1 : 0,
              scale: showCard ? 1 : 0.94,
            }}
            transition={{
              duration: 1.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-[38%] z-[35] w-[190px] -translate-x-1/2 sm:w-[255px] md:w-[290px]"
          >
            <Image
              src="/opening/invitation-card.png"
              alt="Invitația pentru botezul lui Amir"
              width={800}
              height={1100}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_18px_36px_rgba(73,55,28,0.16)]"
            />
          </motion.div>

          {/* Buton intrare */}
          <motion.button
            type="button"
            onClick={() => setVisible(false)}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity:
                stage === "done" ? 1 : 0,
              y: stage === "done" ? 0 : 10,
              pointerEvents:
                stage === "done"
                  ? "auto"
                  : "none",
            }}
            transition={{
              duration: 0.55,
            }}
            className="absolute bottom-7 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#263746] shadow-[0_12px_35px_rgba(38,55,70,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(201,168,106,0.28)] active:scale-[0.98] sm:bottom-10 sm:text-[11px] sm:tracking-[0.26em] sm:hover:bg-[#dcc18d]"
          >
            Intră în invitație
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}