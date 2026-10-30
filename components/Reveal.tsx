"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
  /** Vertical travel in pixels. */
  y?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const [settled, setSettled] = useState(false);

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.05 }}
      transition={{
        duration: 0.9,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      onAnimationComplete={() => setSettled(true)}
      style={
        settled
          ? { transform: "none", willChange: "auto" }
          : { willChange: "opacity, transform" }
      }
    >
      {children}
    </motion.div>
  );
}
