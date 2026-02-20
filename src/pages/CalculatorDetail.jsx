// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Calculator Detail Page
// src/pages/CalculatorDetail.jsx
//
// This page is the "frame" that wraps every individual calculator.
// It handles:
// • Breadcrumb navigation
// • Calculator title / description / category
// • The Insight module (shown after first calculation)
// • Link to Mechanics (formula explanation)
// • The calculator widget itself (lazy-loaded per calculator id)
// • "Related" calculators sidebar
//
// ADDING A NEW CALCULATOR:
// 1. Add its entry to src/data/calculators.js
// 2. Create src/components/calculators/<id>.jsx
// 3. Import and register it in the CALC_COMPONENTS map below
// ─────────────────────────────────────────────────────────────────────────────

import { useState, Suspense, lazy } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getById, CALCULATORS, CATEGORIES } from "../data/calculators";

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATOR COMPONENT REGISTRY
// Add each calculator's component here as you build them.
// Using lazy() ensures each calculator is only loaded when needed.
// ─────────────────────────────────────────────────────────────────────────────
const CALC_COMPONENTS = {
  // ── Finance ───────────────────────────────────────────────────────────────
  "compound-interest": lazy(
    () => import("../components/calculators/CompoundInterest"),
  ),
  mortgage: lazy(() => import("../components/calculators/Mortgage")),
  // Add more as you build them:
  // 'bmi':            lazy(() => import('../components/calculators/BMI')),
  // 'tip':            lazy(() => import('../components/calculators/Tip')),
  // 'currency':       lazy(() => import('../components/calculators/Currency')),
};

// ── Component ──────────────────────────────────────────────────────────────────
export default function CalculatorDetail() {
  const { id } = useParams();
  const calc = getById(id);
  const [insight, setInsight] = useState(null); // set by child calculator after result

  // 404 — calculator not found
  if (!calc) return <Navigate to="/calculators" replace />;

  const category = CATEGORIES[calc.category];
  const CalcComponent = CALC_COMPONENTS[id];

  // Find related calculators (same category, different id, live only)
  const related = CALCULATORS.filter(
    (c) => c.category === calc.category && c.id !== id && c.status === "live",
  ).slice(0, 4);

  return (
    <main className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 pt-10 pb-24">
        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-8">
          <Link
            to="/calculators"
            className="obs-label hover:text-pale transition-colors"
          >
            Calculators
          </Link>
          <span className="text-dim/40">›</span>
          <Link
            to={`/calculators?category=${calc.category}`}
            className="obs-label hover:text-pale transition-colors"
          >
            {category?.label}
          </Link>
          <span className="text-dim/40">›</span>
          <span className="obs-label text-pale/80">{calc.title}</span>
        </nav>

        <div className="flex gap-12 items-start">
          {/* ── Main content ───────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Calculator header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl" aria-hidden>
                  {category?.icon}
                </span>
                <span className="obs-label">{category?.label}</span>
                {calc.needsApi && (
                  <span className="text-2xs font-mono text-glow/60 border border-glow/30 rounded px-1.5 py-0.5 ml-1">
                    live data
                  </span>
                )}
                {calc.status === "lab" && (
                  <span
                    className="text-2xs font-mono text-dawn/60 border
                                   border-dawn/30 rounded px-1.5 py-0.5 ml-1"
                  >
                    lab experiment
                  </span>
                )}
              </div>
              <h1 className="font-display text-4xl sm:text-5xl text-light mb-3">
                {calc.title}
              </h1>
              <p className="text-pale/70 text-base">{calc.desc}</p>
            </header>

            {/* ── Calculator widget ─────────────────────────────────────────── */}
            <section
              className="obs-card p-6 sm:p-8 mb-6"
              aria-label={`${calc.title} calculator`}
            >
              {CalcComponent ? (
                <Suspense fallback={<CalcSkeleton />}>
                  {/* onResult: child calls this with { result, insight } after calculating */}
                  <CalcComponent onResult={({ insight: i }) => setInsight(i)} />
                </Suspense>
              ) : (
                <ComingSoon id={id} title={calc.title} />
              )}
            </section>

            {/* ── Insight module ────────────────────────────────────────────── */}
            {(insight || calc.insight) && (
              <section className="mb-6 animate-fade-in" aria-label="Insight">
                <div
                  className="flex items-start gap-3 bg-gold/5 border border-gold/15
                                rounded-lg p-4"
                >
                  <span className="text-gold/60 text-sm mt-0.5 flex-shrink-0">
                    ✦
                  </span>
                  <div>
                    <p className="obs-label text-gold/60 mb-1">Insight</p>
                    <p className="text-pale/70 text-sm leading-relaxed italic">
                      {insight || calc.insight}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ── Mechanics link ────────────────────────────────────────────── */}
            <div className="flex items-center gap-4">
              <Link
                to="/mechanics"
                className="flex items-center gap-2 text-sm text-dim hover:text-glow
                           transition-colors duration-200"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <circle cx="6.5" cy="6.5" r="5" />
                  <line x1="6.5" y1="4" x2="6.5" y2="6.5" />
                  <circle cx="6.5" cy="9" r="0.5" fill="currentColor" />
                </svg>
                How this formula works →
              </Link>
            </div>
          </div>

          {/* ── Related sidebar (desktop) ──────────────────────────────────── */}
          {related.length > 0 && (
            <aside className="hidden xl:block flex-shrink-0 w-60">
              <p className="obs-label mb-4">Related calculators</p>
              <div className="space-y-2">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to={`/calculators/${r.id}`}
                    className="block obs-card p-3.5 group"
                  >
                    <p
                      className="text-sm font-medium text-pale group-hover:text-gold
                                  transition-colors duration-200 leading-snug"
                    >
                      {r.title}
                    </p>
                    <p className="text-xs text-dim mt-1 line-clamp-2">
                      {r.desc}
                    </p>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </div>

        {/* ── Related (mobile) ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="xl:hidden mt-12 border-t border-rim/20 pt-8">
            <p className="obs-label mb-4">Related calculators</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/calculators/${r.id}`}
                  className="obs-card p-4 group"
                >
                  <p
                    className="text-sm font-medium text-pale group-hover:text-gold
                                transition-colors duration-200"
                  >
                    {r.title}
                  </p>
                  <p className="text-xs text-dim mt-1">{r.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helper sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Shown while the calculator component is lazy-loading */
function CalcSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-mist rounded w-1/3" />
      <div className="h-10 bg-mist rounded" />
      <div className="h-4 bg-mist rounded w-1/4" />
      <div className="h-10 bg-mist rounded" />
      <div className="h-12 bg-gold/10 rounded mt-6" />
    </div>
  );
}

/** Shown when a calculator hasn't been built yet */
function ComingSoon({ id, title }) {
  return (
    <div className="text-center py-10">
      <p className="font-display text-3xl text-light/30 mb-3">Coming soon</p>
      <p className="text-dim text-sm mb-6">
        <strong className="text-pale/60">{title}</strong> is in the build queue.
        The formula and logic are documented in Mechanics.
      </p>
      <div className="flex justify-center gap-3 flex-wrap">
        <Link to="/mechanics" className="obs-btn text-sm">
          See the formula →
        </Link>
        <Link to="/calculators" className="obs-btn text-sm">
          Browse others
        </Link>
      </div>
      {/* Dev helper — shows the component path to create */}
      <p className="mt-6 font-mono text-2xs text-dim/40">
        Create: src/components/calculators/{id}.jsx
      </p>
    </div>
  );
}
