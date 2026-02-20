// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Navbar
// src/components/layout/Navbar.jsx
//
// Responsive navigation with:
// • Desktop: horizontal nav with active indicator
// • Mobile: hamburger menu with slide-down panel
// • Live search bar (opens global search)
// • Observatory logo + wordmark (replace SVG with your actual logo)
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  {
    to: "/",
    label: "Home",
    exact: true,
    hint: "Start here",
  },
  {
    to: "/calculators",
    label: "Calculators",
    hint: "265+ tools",
  },
  {
    to: "/mechanics",
    label: "Mechanics",
    hint: "The physics behind",
  },
  {
    to: "/look",
    label: "Look",
    hint: "Our manifesto",
  },
  {
    to: "/lab",
    label: "Lab",
    hint: "Experimental",
  },
];

// ── Component ──────────────────────────────────────────────────────────────────
export default function Navbar({ onSearchOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Add border-bottom on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-void/50 backdrop-blur-md border-b border-rim/30"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-6">
        {/* ── Logo ─────────────────────────────────────────────────────────── */}
        <Link
          to="/"
          className="flex items-center gap-2.5 flex-shrink-0 group"
          aria-label="The Observatory — Home"
        >
          {/* Replace this SVG with your actual logo */}
          <ObservatoryLogo />
          {/* Wordmark — replace text with your site name */}
          <span
            className="font-display text-lg text-light tracking-tight
                           group-hover:text-gold transition-colors duration-200"
          >
            Kenso
          </span>
        </Link>

        {/* ── Desktop nav links ─────────────────────────────────────────────── */}
        <ul className="hidden md:flex items-center gap-1 flex-1" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) =>
                  [
                    "nav-link px-3 py-1.5 rounded transition-all duration-200",
                    isActive
                      ? "text-gold bg-gold/5"
                      : "hover:text-light hover:bg-surface",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* ── Right side actions ─────────────────────────────────────────────── */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={onSearchOpen}
            className="obs-btn h-8 px-3 gap-2 text-xs hidden sm:inline-flex"
            aria-label="Open search"
          >
            <SearchIcon />
            <span className="text-dim">Search calculators…</span>
            <kbd className="font-mono text-2xs border border-rim/60 rounded px-1 py-0.5 text-dim">
              ⌘K
            </kbd>
          </button>

          {/* Mobile search icon */}
          <button
            onClick={onSearchOpen}
            className="sm:hidden p-2 text-dim hover:text-light transition-colors rounded"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 text-dim hover:text-light transition-colors rounded"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* ── Mobile nav panel ─────────────────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="md:hidden bg-void/98 backdrop-blur-md border-b border-rim/30
                        animate-fade-in"
        >
          <ul
            className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1"
            role="list"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.exact}
                  className={({ isActive }) =>
                    [
                      "flex items-center justify-between px-3 py-3 rounded",
                      "transition-all duration-150",
                      isActive
                        ? "text-gold bg-gold/5 border border-gold/20"
                        : "text-pale hover:text-light hover:bg-surface",
                    ].join(" ")
                  }
                >
                  <span className="font-body font-medium">{item.label}</span>
                  <span className="text-2xs text-dim font-mono">
                    {item.hint}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

// ── Sub-components & icons ─────────────────────────────────────────────────────

/** Observatory logo mark — replace with your SVG */
function ObservatoryLogo() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle — the dome */}
      <circle cx="14" cy="14" r="12" stroke="#c8924a" strokeWidth="1.2" />
      {/* Inner circle — the lens */}
      <circle
        cx="14"
        cy="14"
        r="7"
        stroke="#c8924a"
        strokeWidth="0.8"
        opacity="0.6"
      />
      {/* Crosshair — the reticle */}
      <line x1="14" y1="2" x2="14" y2="6" stroke="#c8924a" strokeWidth="1.2" />
      <line
        x1="14"
        y1="22"
        x2="14"
        y2="26"
        stroke="#c8924a"
        strokeWidth="1.2"
      />
      <line x1="2" y1="14" x2="6" y2="14" stroke="#c8924a" strokeWidth="1.2" />
      <line
        x1="22"
        y1="14"
        x2="26"
        y2="14"
        stroke="#c8924a"
        strokeWidth="1.2"
      />
      {/* Centre dot */}
      <circle cx="14" cy="14" r="1.5" fill="#c8924a" />
    </svg>
  );
}

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

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="2" y1="5" x2="16" y2="5" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="13" x2="16" y2="13" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="3" x2="15" y2="15" />
      <line x1="15" y1="3" x2="3" y2="15" />
    </svg>
  );
}
