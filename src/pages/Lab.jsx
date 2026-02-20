// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Lab Page
// src/pages/Lab.jsx
//
// Purpose: "Controlled Chaos. A workshop with half-finished prototypes."
// Hosts experimental calculators, incomplete ideas, and Rare Gems that
// don't fit the strict utility of the main gallery.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from 'react-router-dom'
import { getLabCalculators, CATEGORIES } from '../data/calculators'

const LAB_TOOLS = getLabCalculators()

// ── Curated "Rare Gems" — special lab experiences ─────────────────────────────
const RARE_GEMS = [
  {
    id: 'drake-equation',
    title: 'Drake Equation',
    tagline: 'How many civilisations share our galaxy?',
    note: 'Input your own values for R*, fp, ne, fl, fi, fc, L and watch the estimate collapse or explode.',
    status: 'Playable',
  },
  {
    id: 'utilitarian-calculus',
    title: 'Utilitarian Calculus',
    tagline: 'The moral dilemma calculator.',
    note: 'Quantify utility in a philosophical thought experiment. Bentham meets a spreadsheet.',
    status: 'Conceptual',
  },
  {
    id: 'family-tree-math',
    title: 'Generational Ancestors',
    tagline: 'How many ancestors do you have back to the year 1000?',
    note: 'Spoiler: more people than existed. This reveals something profound about human interconnection.',
    status: 'Playable',
  },
  {
    id: 'ancient-currency',
    title: 'Ancient Currency',
    tagline: 'What is 1 Roman Denarius worth today?',
    note: 'A conceptual tool tracing purchasing power across 2,000 years of economic history.',
    status: 'Conceptual',
  },
  {
    id: 'ai-skill-obsolescence',
    title: 'AI Skill Half-Life',
    tagline: '"How long until my skills are automated?"',
    note: 'Estimated "half-life" of your professional skills in the era of large language models.',
    status: 'Experimental',
  },
  {
    id: 'echo-chamber',
    title: 'Echo Chamber Score',
    tagline: 'Measure the ideological diversity of your information diet.',
    note: 'A mirror, not a verdict. Score from "highly diverse" to "severe filter bubble."',
    status: 'Experimental',
  },
]

// ── Status badge colour map ───────────────────────────────────────────────────
const STATUS_STYLE = {
  Playable:     'text-gold/70 border-gold/30',
  Conceptual:   'text-glow/70 border-glow/30',
  Experimental: 'text-dawn/70 border-dawn/30',
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function Lab() {
  return (
    <main className="min-h-screen pt-20">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <span className="obs-label text-dawn/60">Controlled chaos</span>
        <h1 className="font-display text-5xl sm:text-6xl text-light mt-3 mb-4">
          The Lab
        </h1>
        <p className="text-pale/60 text-base max-w-2xl">
          Half-finished prototypes. Rare gems. Strange ideas. Tools that don't quite
          fit anywhere else, but deserve to exist. Everything here is clearly labelled —
          some are playable, some are conceptual, some are experiments in progress.
        </p>
      </section>

      {/* ── Warning banner ─────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex items-start gap-3 bg-dawn/5 border border-dawn/20 rounded-lg p-4">
          <span className="text-lg flex-shrink-0" aria-hidden>⚠️</span>
          <p className="text-sm text-pale/70">
            <strong className="text-dawn/80">Lab Notice:</strong> Tools in this section
            may be incomplete, conceptually speculative, or require data sources that
            are not yet connected. They are made available as thought experiments and
            prototypes — not production tools. Use with curiosity.
          </p>
        </div>
      </div>

      {/* ── Rare Gems ──────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <span className="obs-label text-gold/50">Curated</span>
          <h2 className="font-display text-3xl text-light mt-2">Rare Gems</h2>
          <p className="text-dim text-sm mt-2">
            The strangest, most ambitious, most unusual tools in The Observatory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RARE_GEMS.map((gem) => (
            <RareGemCard key={gem.id} gem={gem} />
          ))}
        </div>
      </section>

      {/* ── All lab tools ──────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="mb-8">
          <span className="obs-label text-dawn/50">All experiments</span>
          <h2 className="font-display text-3xl text-light mt-2">
            Everything in the Lab
          </h2>
          <p className="text-dim text-sm mt-2">
            {LAB_TOOLS.length} experimental and speculative tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {LAB_TOOLS.map((calc, i) => {
            const category = CATEGORIES[calc.category]
            return (
              <Link
                key={calc.id}
                to={`/calculators/${calc.id}`}
                className="obs-card p-4 flex flex-col gap-2.5 group animate-fade-in"
                style={{ animationDelay: `${Math.min(i * 40, 500)}ms` }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm" aria-hidden>{category?.icon}</span>
                  <span className="obs-label">{category?.label}</span>
                </div>
                <h3 className="font-display text-lg text-light group-hover:text-dawn
                               transition-colors duration-200">
                  {calc.title}
                </h3>
                <p className="text-dim text-xs leading-relaxed flex-1">{calc.desc}</p>
                {calc.needsApi && (
                  <span className="self-start text-2xs font-mono text-glow/50
                                   border border-glow/25 rounded px-1.5 py-0.5">
                    needs live data
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* ── "Something missing?" CTA ───────────────────────────────────────── */}
        <div className="mt-16 obs-card p-8 text-center max-w-lg mx-auto">
          <span className="text-2xl mb-3 block" aria-hidden>🔬</span>
          <h3 className="font-display text-2xl text-light mb-3">
            Have an idea for the Lab?
          </h3>
          <p className="text-dim text-sm mb-6">
            Imperfect brilliance is still brilliance. If you have a strange,
            speculative, or niche calculation idea, send it to the Observatory.
          </p>
          <a
            href="mailto:lab@observatory.app"
            className="obs-btn-gold text-sm px-6 py-2.5"
          >
            Submit an idea
          </a>
        </div>
      </section>
    </main>
  )
}

// ── Rare gem card ─────────────────────────────────────────────────────────────
function RareGemCard({ gem }) {
  const statusStyle = STATUS_STYLE[gem.status] || STATUS_STYLE.Experimental

  return (
    <Link
      to={`/calculators/${gem.id}`}
      className="obs-card p-6 flex flex-col gap-3 group relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                   pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,111,170,0.06), transparent)',
        }}
      />

      {/* Status badge */}
      <span className={`self-start text-2xs font-mono border rounded px-1.5 py-0.5 ${statusStyle}`}>
        {gem.status}
      </span>

      {/* Title & tagline */}
      <div>
        <h3 className="font-display text-xl text-light mb-1
                       group-hover:text-glow transition-colors duration-200">
          {gem.title}
        </h3>
        <p className="text-gold/60 text-sm italic">{gem.tagline}</p>
      </div>

      {/* Note */}
      <p className="text-dim text-sm leading-relaxed flex-1">{gem.note}</p>

      {/* Arrow */}
      <div className="flex justify-end">
        <svg
          className="text-dim group-hover:text-glow transition-colors duration-200"
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        >
          <line x1="1" y1="7" x2="13" y2="7" />
          <polyline points="9,3 13,7 9,11" />
        </svg>
      </div>
    </Link>
  )
}
