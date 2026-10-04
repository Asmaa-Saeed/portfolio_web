"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Cycles through words with a slide-up mask. Width is reserved for the longest word. */
export function WordRotator({ words, interval = 2400 }: { words: string[]; interval?: number }) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, words.length, interval]);

  const word = reduced ? words[words.length - 1] : words[index];
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a));

  return (
    <span className="relative inline-grid overflow-hidden whitespace-nowrap pb-[0.08em] align-bottom">
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          className="col-start-1 row-start-1 text-accent-soft"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
