"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [secondsRemaining, setSecondsRemaining] = useState(120);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsRemaining((s) => {
        return s - 1;
      });
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  const minuteDisplay = Math.floor(secondsRemaining / 60)
    .toString()
    .padStart(2, "0")
    .split("");

  const secondDisplay = (secondsRemaining % 60)
    .toString()
    .padStart(2, "0")
    .split("");

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="text-3xl">
        <AnimatePresence mode="popLayout">
          {minuteDisplay.map((n, i) => (
            <motion.span
              className="inline-block tabular-nums"
              key={n + i}
              initial={{ y: 12, filter: "blur(12px)", opacity: 0 }}
              animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              exit={{ y: -12, filter: "blur(12px)", opacity: 0 }}
              transition={{ type: "spring", bounce: 0.35 }}
            >
              {n}
            </motion.span>
          ))}
        </AnimatePresence>
        <span>:</span>
        <AnimatePresence mode="popLayout">
          {secondDisplay.map((n, i) => (
            <motion.span
              className="inline-block tabular-nums"
              key={n + i}
              initial={{ y: 12, filter: "blur(12px)", opacity: 0 }}
              animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
              exit={{ y: -12, filter: "blur(12px)", opacity: 0 }}
              transition={{ type: "spring", bounce: 0.35 }}
            >
              {n}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
