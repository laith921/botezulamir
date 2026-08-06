"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
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

  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timers = [
      window.setTimeout(
        () => setStage("arrived"),
        reduceMotion ? 350 : 1800,
      ),
      window.setTimeout(
        () => setStage("opening"),
        reduceMotion ? 700 : 3050,
      ),
      window.setTimeout(
        () => setStage("card"),
        reduceMotion ? 1050 : 4300,
      ),
      window.setTimeout(
        () => setStage("done"),
        reduceMotion ? 1350 : 5700,
      ),
      window.setTimeout(
        () => setVisible(false),
        reduceMotion ? 2200 : 7600,
      ),
    ];

    return () => {
      timers.forEach((timer) =>
        window.clearTimeout(timer),
      );
    };
  }, [reduceMotion]);

  const showEnvelope = stage !== "descending";

  const showOpenEnvelope =
    stage === "opening" ||
    stage === "card" ||
    stage === "done";

  const showCard =
    stage === "card" || stage === "done";

  const balloonY =
    stage === "descending"
      ? "-30vh"
      : stage === "arrived"
        ? "-9vh"
        : stage === "opening"
          ? "-18vh"
          : "-21vh";

  const balloonScale =
    stage === "card" || stage === "done"
      ? 0.62
      : stage === "opening"
        ? 0.82
        : 1;

  const envelopeY =
    stage === "arrived"
      ? 22
      : stage === "opening"
        ? 18
        : stage === "card" || stage === "done"
          ? 28
          : 145;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75 }}
          className="fixed inset-0 z-[100] overflow-hidden bg-[#fcfaf6]"
        >
          {/* Fundal pentru telefon */}
          <motion.div
            aria-hidden="true"
            initial={{ scale: 1.005 }}
            animate={{
              scale: reduceMotion
                ? 1.005
                : [1.005, 1.018, 1.005],
            }}
            transition={{
              duration: 20,
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
            initial={{ scale: 1.01 }}
            animate={{
              scale: reduceMotion
                ? 1.01
                : [1.01, 1.025, 1.01],
            }}
            transition={{
              duration: 20,
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

          {/* Strat luminos foarte discret */}
          <motion.div
            aria-hidden="true"
            animate={{
              opacity:
                stage === "done"
                  ? 0
                  : stage === "card"
                    ? 0.012
                    : 0.035,
            }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 z-10 bg-white"
          />

          {/* Sclipiri discrete */}
          {[
            {
              left: "12%",
              top: "18%",
              delay: 0,
              color: "#d4b16f",
            },
            {
              left: "84%",
              top: "24%",
              delay: 0.9,
              color: "#b9cbd4",
            },
            {
              left: "20%",
              top: "73%",
              delay: 1.3,
              color: "#d4b16f",
            },
            {
              left: "76%",
              top: "68%",
              delay: 0.5,
              color: "#d9c395",
            },
          ].map((particle, index) => (
            <motion.span
              key={index}
              aria-hidden="true"
              animate={
                reduceMotion
                  ? { opacity: 0.22 }
                  : {
                      opacity: [0.1, 0.45, 0.1],
                      scale: [0.85, 1.2, 0.85],
                    }
              }
              transition={{
                duration: 4.2 + index * 0.5,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut",
              }}
              className="absolute z-20 h-1.5 w-1.5 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                backgroundColor: particle.color,
                boxShadow: `0 0 10px ${particle.color}66`,
              }}
            />
          ))}

          {/* Ursulețul cu balon */}
          <motion.div
            initial={{
              y: "-68vh",
              opacity: 0,
              scale: 0.96,
            }}
            animate={{
              y: balloonY,
              opacity: 1,
              scale: balloonScale,
              rotate: reduceMotion
                ? 0
                : [0, 0.8, -0.8, 0],
            }}
            transition={{
              y: {
                duration:
                  stage === "descending"
                    ? 1.8
                    : 1,
                ease: [0.22, 1, 0.36, 1],
              },
              scale: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.55,
              },
              rotate: {
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute left-1/2 top-[36%] z-40 w-[158px] -translate-x-1/2 sm:top-[37%] sm:w-[220px] md:w-[255px]"
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

          {/* Cartonașul invitației */}
          <motion.div
            initial={{
              y: 155,
              opacity: 0,
              scale: 0.94,
              rotateZ: -1.5,
            }}
            animate={{
              y: showCard ? -122 : 155,
              opacity: showCard ? 1 : 0,
              scale: showCard ? 1 : 0.94,
              rotateZ: showCard ? 0 : -1.5,
            }}
            transition={{
              y: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              },
              opacity: {
                duration: 0.7,
              },
              scale: {
                duration: 1.15,
                ease: [0.16, 1, 0.3, 1],
              },
              rotateZ: {
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
            className="absolute left-1/2 top-[39%] z-[34] w-[184px] -translate-x-1/2 sm:top-[38%] sm:w-[248px] md:w-[280px]"
          >
            <Image
              src="/opening/invitation-card.png"
              alt="Invitația pentru botezul lui Amir"
              width={800}
              height={1100}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_20px_38px_rgba(73,55,28,0.18)]"
            />
          </motion.div>

          {/* Plic */}
          <motion.div
            initial={{
              opacity: 0,
              y: 145,
              scale: 0.93,
              rotateZ: -1,
            }}
            animate={{
              opacity: showEnvelope ? 1 : 0,
              y: envelopeY,
              scale: showEnvelope ? 1 : 0.93,
              rotateZ:
                stage === "arrived"
                  ? 0
                  : stage === "opening"
                    ? 0.6
                    : 0,
            }}
            transition={{
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute left-1/2 top-[39%] z-35 w-[230px] -translate-x-1/2 sm:top-[38%] sm:w-[320px] md:w-[365px]"
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
                    scale: [0.96, 1.015, 1],
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.985,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Image
                    src="/opening/envelope-closed.png"
                    alt="Plic închis"
                    width={1000}
                    height={760}
                    priority
                    className="h-auto w-full object-contain drop-shadow-[0_16px_34px_rgba(73,55,28,0.12)]"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="open-envelope"
                  initial={{
                    opacity: 0,
                    rotateX: -28,
                    scale: 0.98,
                    y: -4,
                  }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.72,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    transformPerspective: 1200,
                    transformOrigin: "50% 35%",
                  }}
                >
                  <Image
                    src="/opening/envelope-open.png"
                    alt="Plic deschis"
                    width={1000}
                    height={820}
                    priority
                    className="h-auto w-full object-contain drop-shadow-[0_18px_36px_rgba(73,55,28,0.14)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
              duration: 0.5,
            }}
            className="absolute bottom-[max(24px,env(safe-area-inset-bottom))] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#263746] shadow-[0_12px_35px_rgba(38,55,70,0.12)] transition duration-300 active:scale-[0.98] sm:bottom-10 sm:text-[11px] sm:tracking-[0.26em] sm:hover:-translate-y-1 sm:hover:bg-[#dcc18d]"
          >
            Intră în invitație
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}