// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — App.jsx
// src/App.jsx
//
// Root application component. Sets up:
// • React Router v6 routes
// • Global layout (Navbar + Search Modal)
// • Keyboard shortcut for search (⌘K)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// ── Layout ─────────────────────────────────────────────────────────────────────
import Navbar from "./components/layout/Navbar";
import SearchModal from "./components/ui/SearchModal";

// ── Pages ──────────────────────────────────────────────────────────────────────
import Home from "./pages/Home";
import Calculators from "./pages/Calculators";
import CalculatorDetail from "./pages/CalculatorDetail";
import Mechanics from "./pages/Mechanics";
import Look from "./pages/Look";
import Lab from "./pages/Lab";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  // ── Global ⌘K / Ctrl+K keyboard shortcut ────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Persistent navigation ─────────────────────────────────────────── */}
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* ── Global search modal ───────────────────────────────────────────── */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Page routes ───────────────────────────────────────────────────── */}
      <Routes>
        {/* Home — the Observatory landing */}
        <Route
          path="/"
          element={<Home onSearchOpen={() => setSearchOpen(true)} />}
        />

        {/* Calculator gallery */}
        <Route
          path="/calculators"
          element={<Calculators onSearchOpen={() => setSearchOpen(true)} />}
        />

        {/* Individual calculator */}
        <Route path="/calculators/:id" element={<CalculatorDetail />} />

        {/* Mechanics — formula reference */}
        <Route path="/mechanics" element={<Mechanics />} />

        {/* Look — design manifesto */}
        <Route path="/look" element={<Look />} />

        {/* Lab — experimental tools */}
        <Route path="/lab" element={<Lab />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center pt-20">
              <div className="text-center max-w-md px-4">
                <p className="font-display text-8xl text-gold/20 mb-6">404</p>
                <h1 className="font-display text-3xl text-light mb-3">
                  Nothing here
                </h1>
                <p className="text-dim text-sm mb-8">
                  The page you're looking for doesn't exist in The Observatory.
                </p>
                <a href="/" className="obs-btn-gold px-6 py-3 text-sm">
                  Return home
                </a>
              </div>
            </div>
          }
        />
      </Routes>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <Footer />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer — minimal, in keeping with the Observatory aesthetic
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rim/20 py-8 mt-auto">
      <div
        className="max-w-7xl mx-auto px-4 flex flex-wrap items-center
                      justify-between gap-4"
      >
        {/* Wordmark */}
        <div className="flex items-center gap-2">
          {/* Replace with your actual logo SVG */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden
          >
            <circle cx="14" cy="14" r="12" stroke="#c8924a" strokeWidth="1.2" />
            <circle
              cx="14"
              cy="14"
              r="7"
              stroke="#c8924a"
              strokeWidth="0.8"
              opacity="0.6"
            />
            <circle cx="14" cy="14" r="1.5" fill="#c8924a" />
          </svg>
          <span className="font-display text-sm text-dim">
            Observatory — {year}
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center gap-5">
          {[
            { to: "/calculators", label: "Calculators" },
            { to: "/mechanics", label: "Mechanics" },
            { to: "/look", label: "Look" },
            { to: "/lab", label: "Lab" },
          ].map(({ to, label }) => (
            <a
              key={to}
              href={to}
              className="text-dim hover:text-pale transition-colors text-xs"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Philosophy note */}
        <p className="text-dim text-xs italic">
          No ads. No pop-ups. Just answers.
        </p>
      </div>
    </footer>
  );
}
