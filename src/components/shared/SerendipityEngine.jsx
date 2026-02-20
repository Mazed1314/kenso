import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  RefreshCw,
  Wind,
  Circle,
  Globe,
  Stars,
  Atom,
  Beaker,
  Calculator,
  ChartBar,
  Clock,
  CloudLightning,
  Coffee,
  Eye,
  Laugh,
  MapPin,
  Microscope,
  Moon,
  Puzzle,
  Sigma,
  Infinity,
  Magnet,
  Mountain,
  Leaf,
} from "lucide-react";

/* =============================================================================
  1. THE ARCHIVE OF BEAUTIFUL THINGS
  A mix of cosmic facts, breathing tools, and perspective shifts.
  =============================================================================
*/
const wonders = [
  {
    id: 1,
    type: "fact",
    icon: <Stars className="w-6 h-6 text-amber-300" />,
    title: "Stardust",
    content:
      "Every atom in your body heavier than hydrogen was forged in the heart of an exploding star. You are not just in the universe; the universe is in you.",
    bg: "bg-gradient-to-br from-slate-900 to-indigo-950 text-white",
  },
  {
    id: 2,
    type: "breathing",
    icon: <Wind className="w-6 h-6 text-sky-300" />,
    title: "The Pause",
    content: "Don't calculate for a moment. Just watch.",
    action: "breathe", // Triggers the breathing animation
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 3,
    type: "fact",
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
    title: "The Pale Blue Dot",
    content:
      "From the distance of Saturn, Earth appears as a single pixel of light. All of history, every human being who ever lived, lived on that mote of dust suspended in a sunbeam.",
    bg: "bg-slate-950 text-emerald-50",
  },
  {
    id: 4,
    type: "perspective",
    icon: <Circle className="w-6 h-6 text-rose-300" />,
    title: "Golden Ratio",
    content:
      "The same mathematical ratio (1.618) that defines the spiral of a galaxy also defines the arrangement of petals on a rose and the shape of your own ear.",
    bg: "bg-gradient-to-br from-rose-950 to-slate-900 text-rose-50",
  },
  {
    id: 5,
    type: "time",
    icon: <Sparkles className="w-6 h-6 text-purple-300" />,
    title: "Light Travel",
    content:
      "The light hitting your eyes right now left the surface of the Sun 8 minutes and 20 seconds ago. You are always looking into the past.",
    bg: "bg-indigo-950 text-purple-50",
  },
  {
    id: 6,
    type: "math",
    icon: <Calculator className="w-6 h-6 text-yellow-300" />,
    title: "π Is a Party",
    content:
      "Pi (π) is infinite and non-repeating. If you recite digits of π like a song, the song never ends — and it's probably not charting.",
    bg: "bg-gradient-to-br from-yellow-900 to-slate-900 text-yellow-50",
  },
  {
    id: 7,
    type: "physics",
    icon: <Atom className="w-6 h-6 text-rose-400" />,
    title: "Quantum Neighbors",
    content:
      "Two entangled particles behave like drama besties: what happens to one, the other knows instantly, no text required.",
    bg: "bg-gradient-to-br from-purple-950 to-slate-900 text-purple-50",
  },
  {
    id: 8,
    type: "funny",
    icon: <Laugh className="w-6 h-6 text-pink-300" />,
    title: "Probability of Socks",
    content:
      "In any laundry load, the chance of losing one sock approaches 1 as soon as the cycle starts. This is known as Sock Entropy.",
    bg: "bg-gradient-to-br from-pink-900 to-slate-900 text-pink-50",
  },
  {
    id: 9,
    type: "world",
    icon: <MapPin className="w-6 h-6 text-emerald-300" />,
    title: "Deep Ocean Unknowns",
    content:
      "We have mapped more of the Moon's surface than the deep ocean. The oceans are basically Earth's secret menu.",
    bg: "bg-gradient-to-br from-teal-950 to-slate-900 text-teal-50",
  },
  {
    id: 10,
    type: "science",
    icon: <Beaker className="w-6 h-6 text-cyan-300" />,
    title: "DNA Data",
    content:
      "Your genome stores information more densely than any flash drive — but try explaining that to your inbox.",
    bg: "bg-gradient-to-br from-cyan-900 to-slate-900 text-cyan-50",
  },
  {
    id: 11,
    type: "math",
    icon: <Sigma className="w-6 h-6 text-indigo-300" />,
    title: "Factorial Explosion",
    content:
      "10! = 3,628,800. Factorials grow so fast they make your to-do list look optimistic.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 12,
    type: "physics",
    icon: <CloudLightning className="w-6 h-6 text-yellow-400" />,
    title: "Speed Limit",
    content:
      "Nothing with mass can reach the speed of light (299,792,458 m/s). Trying makes physics frown dramatically.",
    bg: "bg-slate-900 text-yellow-50",
  },
  {
    id: 13,
    type: "funny",
    icon: <Puzzle className="w-6 h-6 text-lime-300" />,
    title: "Zero Is Special",
    content:
      "Zero is the only integer that is neither positive nor negative — basically the Switzerland of numbers.",
    bg: "bg-gradient-to-br from-lime-950 to-slate-900 text-lime-50",
  },
  {
    id: 14,
    type: "fact",
    icon: <Moon className="w-6 h-6 text-slate-300" />,
    title: "Moon Dust Memory",
    content:
      "Moon rocks brought back by Apollo missions are older than most mountains on Earth. They’re like ancient space receipts.",
    bg: "bg-gradient-to-br from-slate-800 to-indigo-900 text-white",
  },
  {
    id: 15,
    type: "math",
    icon: <ChartBar className="w-6 h-6 text-emerald-300" />,
    title: "Benford's Law",
    content:
      "In many real datasets, leading digit 1 appears more often than 9. Nature is low-key biased toward 1.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 16,
    type: "perspective",
    icon: <Eye className="w-6 h-6 text-rose-300" />,
    title: "Scale Switch",
    content:
      "A human cell is roughly 10 micrometers; a red blood cell is smaller than a hair, and yet both host entire microscopic cities.",
    bg: "bg-gradient-to-br from-rose-950 to-slate-900 text-rose-50",
  },
  {
    id: 17,
    type: "time",
    icon: <Clock className="w-6 h-6 text-sky-300" />,
    title: "Cosmic Calendar",
    content:
      "If the universe's 13.8 billion years were one year, humans show up in the last few seconds. Party crashers, but dramatic ones.",
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 18,
    type: "science",
    icon: <Microscope className="w-6 h-6 text-green-300" />,
    title: "Microbial Majority",
    content:
      "Microbes outnumber human cells in your body by an order of magnitude — you're more microbe-host than solo you.",
    bg: "bg-gradient-to-br from-green-950 to-slate-900 text-green-50",
  },
  {
    id: 19,
    type: "funny",
    icon: <Coffee className="w-6 h-6 text-amber-400" />,
    title: "Caffeine Math",
    content:
      "A coffee boost is just applied chemistry that convinces your brain to be more optimistic about deadlines.",
    bg: "bg-gradient-to-br from-amber-900 to-slate-900 text-amber-50",
  },
  {
    id: 20,
    type: "math",
    icon: <Infinity className="w-6 h-6 text-violet-300" />,
    title: "Countable Infinity",
    content:
      "Integers are infinite but 'countable' — you can list them all (in theory) but you’ll die before finishing the job.",
    bg: "bg-gradient-to-br from-violet-950 to-slate-900 text-violet-50",
  },
  {
    id: 21,
    type: "physics",
    icon: <Magnet className="w-6 h-6 text-indigo-300" />,
    title: "Magnetic Hide & Seek",
    content:
      "Earth’s magnetic field flips every few hundred thousand years. Magnetic north is basically a game of cosmic musical chairs.",
    bg: "bg-gradient-to-br from-indigo-900 to-slate-900 text-indigo-50",
  },
  {
    id: 22,
    type: "world",
    icon: <Mountain className="w-6 h-6 text-amber-300" />,
    title: "Tallest Perspective",
    content:
      "Mount Everest grows roughly 4 mm per year due to tectonic squeeze. Mountains are slow but legally persistent.",
    bg: "bg-gradient-to-br from-amber-950 to-slate-900 text-amber-50",
  },
  {
    id: 23,
    type: "science",
    icon: <Leaf className="w-6 h-6 text-green-300" />,
    title: "Photosynthesis Efficiency",
    content:
      "Plants convert sunlight to energy at about 1–2% efficiency in nature — still outperforming many solar panels in terms of chill.",
    bg: "bg-green-950 text-green-50",
  },
];

/* =============================================================================
  2. THE COMPONENT
  =============================================================================
*/
const SerendipityEngine = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeWonder, setActiveWonder] = useState(wonders[0]);

  const openEngine = () => {
    // Pick a random wonder that isn't the current one (if possible)
    let nextWonder;
    do {
      nextWonder = wonders[Math.floor(Math.random() * wonders.length)];
    } while (nextWonder.id === activeWonder.id && wonders.length > 1);

    setActiveWonder(nextWonder);
    setIsOpen(true);
  };

  const refreshWonder = () => {
    // Small timeout to allow exit animation if we wanted,
    // but instant swap feels snappier for "Another one"
    let nextWonder;
    do {
      nextWonder = wonders[Math.floor(Math.random() * wonders.length)];
    } while (nextWonder.id === activeWonder.id);
    setActiveWonder(nextWonder);
  };

  return (
    <>
      {/* --- 1. THE FLOATING TRIGGER --- */}
      <motion.button
        layoutId="serendipity-trigger"
        onClick={openEngine}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }} // Load in slowly after the page loads
        className="fixed bottom-8 right-8 z-40 group flex items-center gap-3 bg-gradient-to-br from-indigo-700 via-violet-600 to-pink-500/95 hover:border-indigo-700/40 backdrop-blur-md border border-gold shadow-2xl shadow-gold/70 px-4 py-3 rounded-full hover:bg-gray-200 hover:scale-105 transition-all cursor-pointer"
      >
        <Sparkles className="w-5 h-5 text-white group-hover:rotate-45 transition-transform" />
      </motion.button>

      {/* --- 2. THE OVERLAY (MODAL) --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* The Card */}
            <motion.div
              layoutId="serendipity-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className={`relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl ${activeWonder.bg} border border-white/10`}
            >
              {/* Header Actions */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={refreshWonder}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                  title="Show another"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-8 md:p-12 flex flex-col items-center text-center">
                {/* Icon Halo */}
                <div className="mb-6 p-4 rounded-full bg-white/5 ring-1 ring-white/10 shadow-inner">
                  {activeWonder.icon}
                </div>

                <h3 className="text-2xl font-serif font-medium mb-4 text-white">
                  {activeWonder.title}
                </h3>

                {/* Dynamic Visuals for specific types */}
                {activeWonder.action === "breathe" && (
                  <div className="my-8 relative">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-32 h-32 rounded-full bg-sky-400/20 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-16 h-16 rounded-full border border-sky-200/50 flex items-center justify-center text-xs text-sky-200"
                    >
                      Breathe
                    </motion.div>
                  </div>
                )}

                <p className="text-lg leading-relaxed text-white/90 font-light max-w-sm">
                  {activeWonder.content}
                </p>
              </div>

              {/* Footer Decoration */}
              <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SerendipityEngine;
