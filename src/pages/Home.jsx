// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Home Page
// src/pages/Home.jsx
//
// Sections:
// 1. Hero         — headline, subline, search CTA, star reticle
// 2. Stats bar    — calculator count, categories, users
// 3. Featured     — 8 highlighted calculators in a grid
// 4. Categories   — all category pills for quick access
// 5. Serendipity  — "Show me something beautiful" button (Lab)
// 6. Observatory  — short manifesto teaser → /look
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES, CALCULATORS, TOTAL_LIVE } from "../data/calculators";
import SerendipityEngine from "@/components/shared/SerendipityEngine";
import UniversalConverter from "./UniversalConverter";

// Calculators to feature on the homepage
const FEATURED_IDS = [
  "mortgage",
  "compound-interest",
  "zakat",
  "prayer-times",
  "carbon-footprint",
  "caffeine-half-life",
  "breathing-pacer",
  "currency",
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function Home({ onSearchOpen }) {
  const navigate = useNavigate();

  const featured = FEATURED_IDS.map((id) =>
    CALCULATORS.find((c) => c.id === id),
  ).filter(Boolean);

  const categoryList = Object.entries(CATEGORIES);

  // Serendipity — random lab tool
  const handleSerendipity = () => {
    const labTools = CALCULATORS.filter((c) => c.status === "lab");
    const pick = labTools[Math.floor(Math.random() * labTools.length)];
    if (pick) navigate(`/calculators/${pick.id}`);
  };

  return (
    <main className="relative min-h-screen">
      {/* ── Starfield background ─────────────────────────────────────────────── */}
      <div className="obs-starfield" aria-hidden="true" />

      {/* ── Radial gradient glow behind hero ──────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(200,146,74,0.06) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 pt-36 pb-24 px-4 text-center"
        aria-label="Welcome to The Observatory"
      >
        {/* Small eyebrow */}
        <div className="animate-fade-in">
          <span className="obs-label text-gold/70 tracking-[0.3em]">
            A sanctuary for the curious mind
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                     text-light mt-6 mb-6 leading-[1.05] tracking-tight animate-fade-up"
          style={{ animationDelay: "100ms" }}
        >
          Every answer,
          <br />
          <span className="obs-gradient-text italic">quietly given.</span>
        </h1>

        {/* Subline */}
        <p
          className="text-pale/70 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed
                     animate-fade-up"
          style={{ animationDelay: "200ms" }}
        >
          {TOTAL_LIVE}+ calculators — from the universal to the profound. Built
          for clarity, not noise.
        </p>

        {/* CTAs */}
        {/* <div
          className="flex flex-wrap items-center justify-center gap-3 mt-10 animate-fade-up"
          style={{ animationDelay: '300ms' }}
        >
          <button onClick={onSearchOpen} className="obs-btn-gold px-6 py-3 text-sm">
            <SearchIcon />
            Search calculators
          </button>
          <Link to="/calculators" className="obs-btn px-6 py-3 text-sm">
            Browse all
            <ArrowIcon />
          </Link>
        </div> */}

        {/* Decorative reticle */}
        <ReticleDecoration />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. STATS BAR
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 border-y border-rim/20 py-5"
        aria-label="Platform statistics"
      >
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center gap-10">
          {[
            { value: `${TOTAL_LIVE}+`, label: "Calculators" },
            {
              value: Object.keys(CATEGORIES).length.toString(),
              label: "Categories",
            },
            { value: "0", label: "Ads or pop-ups" },
            { value: "∞", label: "Curiosity supported" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-3xl text-gold font-light">
                {value}
              </p>
              <p className="obs-label mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>
      <UniversalConverter />
      {/* ═══════════════════════════════════════════════════════════════════════
          3. FEATURED CALCULATORS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 max-w-7xl mx-auto px-4 py-20"
        aria-label="Featured calculators"
      >
        <SectionHeading
          label="Most visited"
          title="Start somewhere"
          desc="Eight tools that span every corner of human life."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
          {featured.map((calc, i) => (
            <FeaturedCard key={calc.id} calc={calc} delay={i * 60} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. CATEGORIES GRID
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 max-w-7xl mx-auto px-4 pb-20"
        aria-label="Calculator categories"
      >
        <SectionHeading
          label="Explore by area"
          title="Every domain of life"
          desc="From quantum chemistry to wedding budgets."
        />

        <div className="flex flex-wrap gap-2.5 mt-8">
          {categoryList.map(([key, cat]) => (
            <Link
              key={key}
              to={`/calculators?category=${key}`}
              className="flex items-center gap-2 px-4 py-2 bg-surface border
                         border-rim/40 rounded-full text-sm text-pale
                         hover:border-gold/50 hover:text-light
                         transition-all duration-200 group"
            >
              <span aria-hidden>{cat.icon}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          5. SERENDIPITY ENGINE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 py-24 text-center"
        aria-label="Serendipity engine"
      >
        {/* Subtle horizontal lines */}
        <div className="absolute inset-y-0 left-0 right-0 obs-divider top-0" />
        <div className="absolute inset-y-0 left-0 right-0 obs-divider bottom-0" />

        <div className="max-w-lg mx-auto px-4">
          <span className="obs-label text-glow/60">The Serendipity Engine</span>
          <h2 className="font-display text-4xl sm:text-5xl text-light mt-4 mb-5">
            Show me something
            <br />
            <em className="text-glow">beautiful.</em>
          </h2>
          <p className="text-pale/60 text-sm leading-relaxed mb-8">
            Not a random calculator — a curated journey into a corner of
            mathematics, science, or culture you may have never visited before.
          </p>
          <button
            onClick={handleSerendipity}
            className="obs-btn-gold px-8 py-3.5 text-sm animate-breathe"
          >
            <StarIcon />
            Take me there
          </button>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          6. MANIFESTO TEASER
      ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative z-10 max-w-2xl mx-auto px-4 py-24 text-center"
        aria-label="About The Observatory"
      >
        <span className="obs-label text-gold/50">Our philosophy</span>
        <blockquote
          className="font-display text-2xl sm:text-3xl text-pale/80
                               mt-6 mb-6 leading-relaxed italic"
        >
          "We are not building a website.
          <br />
          We are building an experience
          <br />
          designed for thinking humans."
        </blockquote>
        <Link
          to="/look"
          className="obs-label text-gold hover:text-gleam transition-colors
                     tracking-[0.2em] underline underline-offset-4"
        >
          Read the manifesto →
        </Link>
      </section>
      <SerendipityEngine />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Featured calculator card */
function FeaturedCard({ calc, delay }) {
  const category = CATEGORIES[calc.category];
  return (
    <Link
      to={`/calculators/${calc.id}`}
      className="obs-card p-5 flex flex-col gap-3 group animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Category icon + label */}
      <div className="flex items-center gap-2">
        <span className="text-lg" aria-hidden>
          {category?.icon}
        </span>
        <span className="obs-label">{category?.label}</span>
        {calc.needsApi && (
          <span className="ml-auto text-2xs font-mono text-glow/50">live</span>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl text-light leading-snug
                     group-hover:text-gold transition-colors duration-200"
      >
        {calc.title}
      </h3>

      {/* Description */}
      <p className="text-dim text-sm leading-relaxed flex-1">{calc.desc}</p>

      {/* Insight (if available) */}
      {calc.insight && <p className="obs-insight text-xs">{calc.insight}</p>}

      {/* Arrow */}
      <div className="flex justify-end mt-1">
        <svg
          className="text-dim group-hover:text-gold group-hover:translate-x-0.5
                     transition-all duration-200"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <line x1="1" y1="7" x2="13" y2="7" />
          <polyline points="9,3 13,7 9,11" />
        </svg>
      </div>
    </Link>
  );
}

/** Section heading with label + title + description */
function SectionHeading({ label, title, desc }) {
  return (
    <div className="max-w-xl">
      <span className="obs-label text-gold/60">{label}</span>
      <h2 className="font-display text-4xl sm:text-5xl text-light mt-3 mb-3">
        {title}
      </h2>
      <p className="text-pale/60 text-base">{desc}</p>
    </div>
  );
}

/** Decorative telescope reticle SVG */
function ReticleDecoration() {
  return (
    <div
      className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2
                 opacity-[0.04] -z-10"
      aria-hidden="true"
      style={{
        width: 600,
        height: 600,
        top: "50%",
        transform: "translate(-50%, -60%)",
      }}
    >
      <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="300" r="280" stroke="#c8924a" strokeWidth="1" />
        <circle cx="300" cy="300" r="180" stroke="#c8924a" strokeWidth="0.6" />
        <circle cx="300" cy="300" r="80" stroke="#c8924a" strokeWidth="0.4" />
        <line
          x1="300"
          y1="0"
          x2="300"
          y2="600"
          stroke="#c8924a"
          strokeWidth="0.5"
        />
        <line
          x1="0"
          y1="300"
          x2="600"
          y2="300"
          stroke="#c8924a"
          strokeWidth="0.5"
        />
        <circle cx="300" cy="300" r="5" fill="#c8924a" />
      </svg>
    </div>
  );
}

// ── Icon helpers ─────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="6.5" cy="6.5" r="5" />
      <line x1="10.5" y1="10.5" x2="14" y2="14" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="1" y1="6.5" x2="12" y2="6.5" />
      <polyline points="8,2.5 12,6.5 8,10.5" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <polygon points="8,1 10,6 15,6 11,9.5 12.5,14.5 8,11.5 3.5,14.5 5,9.5 1,6 6,6" />
    </svg>
  );
}
