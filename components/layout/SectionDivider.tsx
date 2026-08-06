"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Props = {
  image?: string;
};

export default function SectionDivider({
  image = "/images/divider/divider-star.png",
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
      className="my-8 flex items-center justify-center sm:my-14"
    >
      <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6bc87]" />

      <Image
        src={image}
        alt=""
        width={44}
        height={44}
        className="mx-5 opacity-90"
      />

      <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6bc87]" />
    </motion.div>
  );
}