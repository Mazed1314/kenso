// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Mechanics Page
// src/pages/Mechanics.jsx
//
// Purpose: "A quiet physics lab." Explains the underlying principles,
// formulas, and mathematical foundations so the user understands the
// system — not just the result.
//
// Structure:
// • Hero — minimal introduction
// • Formula Library — browse by domain with formula cards
// • "Why it works" deep-dive sections for popular calculators
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Formula groups displayed on this page ─────────────────────────────────────
const FORMULA_GROUPS = [
  {
    id: 'finance',
    icon: '📈',
    label: 'Finance & Economics',
    formulas: [
      {
        name: 'Compound Interest',
        calc: 'compound-interest',
        formula: 'A = P(1 + r/n)^(nt)',
        variables: [
          { sym: 'A', desc: 'Final amount' },
          { sym: 'P', desc: 'Principal (initial deposit)' },
          { sym: 'r', desc: 'Annual interest rate (decimal)' },
          { sym: 'n', desc: 'Compounding periods per year' },
          { sym: 't', desc: 'Time in years' },
        ],
        insight:
          'At n → ∞ (continuous compounding), the formula becomes A = Pe^(rt). ' +
          'This is why e, Euler\'s number, appears so often in finance.',
      },
      {
        name: 'Mortgage Payment',
        calc: 'mortgage',
        formula: 'M = P × [r(1+r)^n] / [(1+r)^n - 1]',
        variables: [
          { sym: 'M', desc: 'Monthly payment' },
          { sym: 'P', desc: 'Loan principal' },
          { sym: 'r', desc: 'Monthly interest rate (annual / 12)' },
          { sym: 'n', desc: 'Total number of payments' },
        ],
        insight:
          'The formula is a geometric series summed to find the constant payment ' +
          'that amortises (zeroes out) the loan exactly at payment n.',
      },
      {
        name: 'Net Present Value',
        calc: 'npv',
        formula: 'NPV = Σ [Cₜ / (1+r)^t] − C₀',
        variables: [
          { sym: 'Cₜ', desc: 'Cash flow at time t' },
          { sym: 'r',  desc: 'Discount rate (WACC or hurdle rate)' },
          { sym: 'C₀', desc: 'Initial investment' },
        ],
        insight:
          'A positive NPV means the investment creates value beyond the cost of capital. ' +
          'IRR is the rate r that makes NPV = 0.',
      },
    ],
  },
  {
    id: 'physics',
    icon: '🔭',
    label: 'Physics & Mechanics',
    formulas: [
      {
        name: 'Newton\'s Second Law',
        calc: 'physics-basics',
        formula: 'F = ma',
        variables: [
          { sym: 'F', desc: 'Net force (Newtons)' },
          { sym: 'm', desc: 'Mass (kg)' },
          { sym: 'a', desc: 'Acceleration (m/s²)' },
        ],
        insight:
          'The simplest deep truth in classical mechanics. Mass is resistance to ' +
          'acceleration; force is what overcomes that resistance.',
      },
      {
        name: 'Tsiolkovsky Rocket Equation',
        calc: 'rocket-equation',
        formula: 'Δv = Isp × g₀ × ln(m₀/mf)',
        variables: [
          { sym: 'Δv',  desc: 'Delta-v (change in velocity)' },
          { sym: 'Isp', desc: 'Specific impulse (seconds)' },
          { sym: 'g₀',  desc: 'Standard gravity (9.81 m/s²)' },
          { sym: 'm₀',  desc: 'Initial mass (with propellant)' },
          { sym: 'mf',  desc: 'Final mass (without propellant)' },
        ],
        insight:
          'The tyranny of the rocket equation: to double your delta-v, you need ' +
          'to square your mass ratio. This is why reaching orbit is so hard.',
      },
      {
        name: 'Orbital Velocity',
        calc: 'orbital-velocity',
        formula: 'v = √(GM/r)',
        variables: [
          { sym: 'v', desc: 'Circular orbital speed (m/s)' },
          { sym: 'G', desc: 'Gravitational constant (6.674×10⁻¹¹ N·m²/kg²)' },
          { sym: 'M', desc: 'Mass of central body (kg)' },
          { sym: 'r', desc: 'Orbital radius from body centre (m)' },
        ],
        insight:
          'At ~400km altitude (ISS orbit), this gives ~7.66 km/s — about 23 times the ' +
          'speed of sound. The ISS completes one orbit every 92 minutes.',
      },
    ],
  },
  {
    id: 'chemistry',
    icon: '🧪',
    label: 'Chemistry & Biology',
    formulas: [
      {
        name: 'Ideal Gas Law',
        calc: 'ideal-gas-law',
        formula: 'PV = nRT',
        variables: [
          { sym: 'P', desc: 'Pressure (Pascals)' },
          { sym: 'V', desc: 'Volume (m³)' },
          { sym: 'n', desc: 'Amount of substance (moles)' },
          { sym: 'R', desc: 'Gas constant (8.314 J/mol·K)' },
          { sym: 'T', desc: 'Temperature (Kelvin)' },
        ],
        insight:
          'Real gases deviate from PV=nRT at high pressure and low temperature. ' +
          'The van der Waals equation corrects for intermolecular forces and molecular volume.',
      },
      {
        name: 'Henderson-Hasselbalch',
        calc: 'henderson-hasselbalch',
        formula: 'pH = pKa + log([A⁻]/[HA])',
        variables: [
          { sym: 'pH',   desc: 'Potential of hydrogen (acidity)' },
          { sym: 'pKa',  desc: 'Acid dissociation constant (log scale)' },
          { sym: '[A⁻]', desc: 'Conjugate base concentration' },
          { sym: '[HA]', desc: 'Acid concentration' },
        ],
        insight:
          'At pH = pKa, the acid and conjugate base are in equal concentrations. ' +
          'This is the ideal buffering point — the system resists pH change most strongly here.',
      },
      {
        name: 'Radioactive Decay',
        calc: 'half-life',
        formula: 'N(t) = N₀ × (1/2)^(t/t½)',
        variables: [
          { sym: 'N(t)', desc: 'Remaining quantity at time t' },
          { sym: 'N₀',   desc: 'Initial quantity' },
          { sym: 't',    desc: 'Elapsed time' },
          { sym: 't½',   desc: 'Half-life of the substance' },
        ],
        insight:
          'After 7 half-lives, only ~0.78% of the original sample remains. ' +
          'Carbon-14 (t½ ≈ 5,730 years) is used to date organic materials up to ~50,000 years old.',
      },
    ],
  },
  {
    id: 'statistics',
    icon: '📊',
    label: 'Statistics & Probability',
    formulas: [
      {
        name: 'Standard Deviation',
        calc: 'standard-deviation',
        formula: 'σ = √[ Σ(xᵢ − μ)² / N ]',
        variables: [
          { sym: 'σ',  desc: 'Population standard deviation' },
          { sym: 'xᵢ', desc: 'Each data point' },
          { sym: 'μ',  desc: 'Population mean' },
          { sym: 'N',  desc: 'Number of data points' },
        ],
        insight:
          'For a sample (not full population), use N−1 in the denominator — this is ' +
          '"Bessel\'s correction," which corrects bias in small samples.',
      },
      {
        name: 'Bayes\' Theorem',
        calc: 'naive-bayes',
        formula: 'P(A|B) = P(B|A) × P(A) / P(B)',
        variables: [
          { sym: 'P(A|B)', desc: 'Posterior: probability of A given B' },
          { sym: 'P(B|A)', desc: 'Likelihood: probability of B given A' },
          { sym: 'P(A)',   desc: 'Prior: initial probability of A' },
          { sym: 'P(B)',   desc: 'Evidence: total probability of B' },
        ],
        insight:
          'Bayes\' theorem is the mathematical foundation for updating beliefs with evidence. ' +
          'It underpins spam filters, medical diagnostics, and modern machine learning.',
      },
    ],
  },
  {
    id: 'health',
    icon: '❤️',
    label: 'Health & Physiology',
    formulas: [
      {
        name: 'BMR (Mifflin-St Jeor)',
        calc: 'bmr',
        formula: 'BMR = 10W + 6.25H − 5A + S',
        variables: [
          { sym: 'W', desc: 'Weight in kg' },
          { sym: 'H', desc: 'Height in cm' },
          { sym: 'A', desc: 'Age in years' },
          { sym: 'S', desc: '+5 (male) or −161 (female)' },
        ],
        insight:
          'BMR is the energy needed to maintain basic life functions at complete rest. ' +
          'Multiply by an activity factor (1.2–1.9) to get your TDEE.',
      },
      {
        name: 'Caffeine Half-Life',
        calc: 'caffeine-half-life',
        formula: 'C(t) = C₀ × (1/2)^(t/5.7)',
        variables: [
          { sym: 'C(t)', desc: 'Caffeine remaining at time t (hours)' },
          { sym: 'C₀',   desc: 'Initial caffeine consumed (mg)' },
          { sym: '5.7',  desc: 'Average half-life of caffeine in adults (hours)' },
        ],
        insight:
          'Half-life varies from 2–12 hours depending on genetics, pregnancy, smoking, ' +
          'and liver enzyme activity. Oral contraceptives can more than double caffeine\'s half-life.',
      },
    ],
  },
]

// ── Component ──────────────────────────────────────────────────────────────────
export default function Mechanics() {
  const [activeGroup, setActiveGroup] = useState('finance')

  const current = FORMULA_GROUPS.find(g => g.id === activeGroup) || FORMULA_GROUPS[0]

  return (
    <main className="min-h-screen pt-20">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-8">
        <span className="obs-label text-glow/60">The lab notebook</span>
        <h1 className="font-display text-5xl sm:text-6xl text-light mt-3 mb-4">
          Mechanics
        </h1>
        <p className="text-pale/60 text-base max-w-2xl">
          Every calculator in The Observatory is built on a principle. Here we expose
          the mathematics, the assumptions, the limits — so the answer becomes
          understanding, not just a number.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex gap-8">

          {/* ── Sidebar ──────────────────────────────────────────────────────── */}
          <aside className="hidden lg:block flex-shrink-0 w-48">
            <ul className="sticky top-28 space-y-0.5" role="list">
              {FORMULA_GROUPS.map(g => (
                <li key={g.id}>
                  <button
                    onClick={() => setActiveGroup(g.id)}
                    className={[
                      'w-full flex items-center gap-2.5 px-3 py-2.5 rounded text-sm',
                      'transition-all duration-150 text-left',
                      activeGroup === g.id
                        ? 'bg-glow/10 text-light border border-glow/20'
                        : 'text-dim hover:text-pale hover:bg-surface',
                    ].join(' ')}
                  >
                    <span aria-hidden>{g.icon}</span>
                    <span className="text-xs">{g.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── Mobile tabs ──────────────────────────────────────────────────── */}
          <div className="lg:hidden mb-6 overflow-x-auto -mx-4 px-4">
            <div className="flex gap-2 min-w-max pb-2">
              {FORMULA_GROUPS.map(g => (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  className={[
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border',
                    'whitespace-nowrap transition-all duration-150',
                    activeGroup === g.id
                      ? 'bg-glow/10 text-light border-glow/30'
                      : 'text-dim border-rim/40 hover:text-pale',
                  ].join(' ')}
                >
                  <span>{g.icon}</span>
                  <span>{g.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Formula cards ─────────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl" aria-hidden>{current.icon}</span>
              <h2 className="font-display text-3xl text-light">{current.label}</h2>
            </div>

            <div className="space-y-6">
              {current.formulas.map((f) => (
                <FormulaCard key={f.name} formula={f} />
              ))}
            </div>

            {/* ── "Use the calculator" CTA ────────────────────────────────────── */}
            <div className="mt-12 obs-card p-6 flex items-center justify-between gap-4">
              <div>
                <p className="obs-label text-glow/60 mb-1">Ready to calculate?</p>
                <p className="text-pale text-sm">
                  Open any calculator to apply these principles with your own numbers.
                </p>
              </div>
              <Link to="/calculators" className="obs-btn flex-shrink-0">
                Open gallery →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// ── Formula card ─────────────────────────────────────────────────────────────
function FormulaCard({ formula: f }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="obs-card overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-4 p-5 text-left group"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          {/* Formula expression */}
          <code className="block font-mono text-gold text-sm sm:text-base mb-2 leading-relaxed">
            {f.formula}
          </code>
          <h3 className="font-display text-xl text-light group-hover:text-gold
                         transition-colors duration-200">
            {f.name}
          </h3>
        </div>

        {/* Expand icon */}
        <svg
          className={[
            'flex-shrink-0 mt-1 text-dim transition-transform duration-200',
            open ? 'rotate-180' : '',
          ].join(' ')}
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        >
          <polyline points="4,6 8,10 12,6" />
        </svg>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="obs-divider mb-4" />

          {/* Variable table */}
          <table className="w-full text-sm mb-5">
            <thead>
              <tr className="text-left">
                <th className="obs-label pb-2 w-16">Symbol</th>
                <th className="obs-label pb-2">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {f.variables.map(({ sym, desc }) => (
                <tr key={sym} className="border-t border-rim/20">
                  <td className="py-2 pr-4 font-mono text-gold text-sm">{sym}</td>
                  <td className="py-2 text-pale/80">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Insight */}
          {f.insight && (
            <p className="obs-insight text-sm">{f.insight}</p>
          )}

          {/* Link to calculator */}
          {f.calc && (
            <Link
              to={`/calculators/${f.calc}`}
              className="inline-flex items-center gap-2 mt-4 text-xs text-gold/70
                         hover:text-gold transition-colors duration-200 font-mono"
            >
              Open calculator →
            </Link>
          )}
        </div>
      )}
    </article>
  )
}
