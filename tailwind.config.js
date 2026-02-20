/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Tailwind Design System
// Palette: twilight navy + warm amber + muted lavender + dawn coral
// Typography: Cormorant Garamond (display) + Outfit (body) + DM Mono (mono)
// ─────────────────────────────────────────────────────────────────────────────

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ── Colour tokens ──────────────────────────────────────────────────────
      colors: {
        void: "#08090e", // deepest background — near-black
        dusk: "#101220", // primary background
        surface: "#181b2d", // card / panel base
        mist: "#242842", // card hover / borders
        rim: "#343858", // dividers, input borders
        dim: "#8a8399", // placeholder / secondary text
        pale: "#c4bcb0", // body text (soft warm-white)
        light: "#e8e2d6", // primary text
        gold: "#c8924a", // primary accent — warm amber
        glow: "#7c6faa", // secondary accent — muted lavender
        dawn: "#c46f60", // tertiary accent — dusty coral
        gleam: "#d4b483", // lighter gold for hover states
      },

      // ── Typography ─────────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Outfit"', "sans-serif"],
        mono: ['"DM Mono"', "monospace"],
      },
      fontSize: {
        "2xs": ["0.65rem", { lineHeight: "1rem" }],
        xs: ["0.75rem", { lineHeight: "1.1rem" }],
        sm: ["0.875rem", { lineHeight: "1.4rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.125rem", { lineHeight: "1.7rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "3.25rem" }],
        "6xl": ["3.75rem", { lineHeight: "4rem" }],
        "7xl": ["4.5rem", { lineHeight: "4.75rem" }],
        "8xl": ["6rem", { lineHeight: "1" }],
      },

      // ── Spacing ─────────────────────────────────────────────────────────────
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        88: "22rem",
        120: "30rem",
      },

      // ── Border radius ───────────────────────────────────────────────────────
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },

      // ── Shadows ─────────────────────────────────────────────────────────────
      boxShadow: {
        "obs-sm": "0 1px 4px rgba(0,0,0,0.4)",
        obs: "0 4px 24px rgba(0,0,0,0.5)",
        "obs-lg": "0 12px 48px rgba(0,0,0,0.6)",
        gold: "0 0 20px rgba(200, 146, 74, 0.15)",
        glow: "0 0 20px rgba(124, 111, 170, 0.15)",
      },

      // ── Transitions ──────────────────────────────────────────────────────────
      transitionTimingFunction: {
        obs: "cubic-bezier(0.4, 0, 0.2, 1)",
        soft: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
        slow: "400ms",
        slower: "600ms",
      },

      // ── Animation keyframes ──────────────────────────────────────────────────
      keyframes: {
        "fade-in": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "fade-up": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(200,146,74,0)" },
          "50%": { boxShadow: "0 0 0 6px rgba(200,146,74,0.15)" },
        },
        breathe: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        "star-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out both",
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
        breathe: "breathe 3s ease-in-out infinite",
        "star-float": "star-float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
