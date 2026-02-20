// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Look Page
// src/pages/Look.jsx
//
// Purpose: "A museum plaque or an architectural manifesto."
// Explains the sanctuary aesthetic — why no ads, why the colours are dim,
// why the site is quiet. Establishes trust through radical transparency.
// ─────────────────────────────────────────────────────────────────────────────

import { Link } from 'react-router-dom'

// ── Design decision cards ──────────────────────────────────────────────────────
const DECISIONS = [
  {
    number: '01',
    title: 'Why there are no advertisements',
    body: `Advertising is a contract between a platform and an attention economy.
    We declined that contract. An ad-funded calculator has a subtle incentive to
    extend your session, complicate your decision, or withhold clarity.
    We have none of those incentives. The Observatory earns nothing by keeping
    you confused.`,
  },
  {
    number: '02',
    title: 'Why the colours are dim',
    body: `Bright, saturated interfaces activate urgency. They are designed — often
    deliberately — to create the feeling that something important is happening right
    now. Nothing urgent is happening here. You came with a question. You deserve
    a quiet room in which to answer it. The palette is twilight, not neon.`,
  },
  {
    number: '03',
    title: 'Why there are no pop-ups',
    body: `A pop-up is a platform telling you that its agenda is more important than
    yours. We disagree. You arrived with a specific need. No overlay, push
    notification, or newsletter prompt will interrupt that. The answer is what matters.`,
  },
  {
    number: '04',
    title: 'Why the typography is serif',
    body: `Serif fonts carry the weight of the printed page — of ledgers, almanacs,
    and scientific journals. They signal: this information is to be read carefully,
    not scanned quickly. When you see a number rendered in Cormorant Garamond,
    you are being asked to consider it, not merely consume it.`,
  },
  {
    number: '05',
    title: 'Why we show the formula',
    body: `A calculator that hides its logic is a black box. Black boxes breed
    mistrust. Every result in The Observatory is traceable to a formula, and
    every formula is available in Mechanics. You should understand why you
    received this answer, not merely that you did.`,
  },
  {
    number: '06',
    title: 'Why there are Insights',
    body: `A number without context is noise. After every calculation, we offer
    one thought — not advice, not optimisation pressure — just a small widening
    of the frame. "Since you were born, the Earth has travelled 48 billion
    kilometres." The calculation becomes an occasion for perspective.`,
  },
  {
    number: '07',
    title: 'Why we built the Lab',
    body: `Some ideas are incomplete. Some tools are strange. Some calculations
    have no obvious audience but deserve to exist anyway. The Lab is where we
    put them — clearly marked, honestly described. "Incomplete brilliance" is
    still brilliance.`,
  },
  {
    number: '08',
    title: 'Why culture is first-class',
    body: `Most calculator platforms are built for one culture, one currency, one
    calendar. The world is not one culture. Zakat calculations, prayer times,
    Hijri dates, South Asian land measurements, and local food prices are not
    "localisation" — they are humanity. They belong here alongside mortgage
    calculators and physics simulations.`,
  },
]

// ── Core principle cards ──────────────────────────────────────────────────────
const PRINCIPLES = [
  { icon: '⚖️',  label: 'Radical Truthfulness', desc: 'Formulas are visible. Assumptions are disclosed. Approximations are acknowledged.' },
  { icon: '🌍', label: 'Global Soul, Local Heart', desc: 'A user in Chattogram, Cairo, or Toronto feels equally understood.' },
  { icon: '🔇', label: 'Silence as Feature', desc: 'White space is a form of respect. The user is never overwhelmed.' },
  { icon: '🌱', label: 'Data to Delight', desc: 'Numbers become trees, paths, and houses — felt and remembered.' },
  { icon: '🎯', label: 'Ethical Restraint', desc: 'There are calculations we choose not to make. Restraint is a design choice.' },
  { icon: '🔬', label: 'Uncertainty Respected', desc: 'Where outcomes branch, we show gradients. Certainty is not always honest.' },
]

// ── Component ──────────────────────────────────────────────────────────────────
export default function Look() {
  return (
    <main className="min-h-screen pt-20">

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-16 text-center">
        <span className="obs-label text-dawn/60">The manifesto</span>
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-light mt-6 mb-8
                        leading-[1.05]">
          Look
        </h1>

        <blockquote className="font-display text-2xl sm:text-3xl text-pale/70 italic
                               leading-relaxed mb-10">
          "We are not building a website.
          <br />
          We are building an experience
          <br />
          designed for thinking humans."
        </blockquote>

        {/* Decorative horizontal rule */}
        <div className="flex items-center gap-4 justify-center">
          <div className="flex-1 max-w-24 h-px bg-gold/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40" />
          <div className="flex-1 max-w-24 h-px bg-gold/20" />
        </div>
      </section>

      {/* ── Mission statement ──────────────────────────────────────────────── */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <div className="space-y-5 text-pale/80 text-base leading-relaxed">
          <p>
            The Observatory is an attempt to restore dignity to calculation.
          </p>
          <p>
            In a world where numbers are used to rush, manipulate, frighten, and extract,
            we chose another path. A place where calculation becomes an act of clarity —
            not anxiety. Where numbers explain rather than command. Where the mind can
            rest without becoming dull.
          </p>
          <p>
            We believe a person seeking an answer is often also seeking reassurance,
            orientation, or meaning. The Observatory respects that inner state as much
            as the question itself.
          </p>
        </div>
      </section>

      {/* ── Core principles grid ───────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="max-w-xl mb-10">
          <span className="obs-label text-gold/50">Seven commitments</span>
          <h2 className="font-display text-4xl text-light mt-3">Core Principles</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map(({ icon, label, desc }) => (
            <div key={label} className="obs-card p-5">
              <span className="text-2xl mb-3 block" aria-hidden>{icon}</span>
              <h3 className="font-display text-xl text-light mb-2">{label}</h3>
              <p className="text-dim text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Design decisions ───────────────────────────────────────────────── */}
      <section
        className="max-w-5xl mx-auto px-4 pb-20"
        aria-label="Design decisions"
      >
        <div className="max-w-xl mb-12">
          <span className="obs-label text-gold/50">Behind every choice</span>
          <h2 className="font-display text-4xl text-light mt-3">
            The Decisions
          </h2>
          <p className="text-pale/60 text-sm mt-3">
            Every design decision in The Observatory was intentional.
            Here is the reasoning — exposed, not hidden.
          </p>
        </div>

        <div className="space-y-0 border border-rim/30 rounded-xl overflow-hidden">
          {DECISIONS.map(({ number, title, body }) => (
            <DesignDecision key={number} number={number} title={title} body={body} />
          ))}
        </div>
      </section>

      {/* ── The Experience Layer ─────────────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="max-w-xl mb-10">
          <span className="obs-label text-gold/50">Beyond the number</span>
          <h2 className="font-display text-4xl text-light mt-3">The Experience Layer</h2>
          <p className="text-pale/60 text-sm mt-3">
            How numbers become memory.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {
              title: 'The Insight Module',
              icon: '💡',
              desc: 'After every calculation, a single observation. Not advice. Not optimisation culture. Just a small widening of perspective.',
              example: '"Since you were born, the Earth has travelled approximately 48 billion kilometres."',
            },
            {
              title: 'The Zen Garden',
              icon: '🌿',
              desc: 'Toggle to a visual meditation. A growing tree instead of a compound interest graph. A house built instead of a debt table.',
              example: '"Sliders move gently. Animations breathe. Nothing flashes, blinks, or demands attention."',
            },
            {
              title: 'The Serendipity Engine',
              icon: '⭐',
              desc: '"Show me something beautiful." Not randomness — curation. Each journey is thematic: Time. Silence. Growth. Orbit. Return.',
              example: '"You might encounter a starlight refraction simulator, or a harmonic chord generator."',
            },
            {
              title: 'The Observatory Clock',
              icon: '🕰️',
              desc: 'Time is always present, but never aggressive. The platform breathes with local dawn and dusk, lunar phases, and seasonal shifts.',
              example: '"A subtle reminder: You are not late. You are inside time."',
            },
          ].map(({ title, icon, desc, example }) => (
            <div key={title} className="obs-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl" aria-hidden>{icon}</span>
                <h3 className="font-display text-xl text-light">{title}</h3>
              </div>
              <p className="text-pale/70 text-sm leading-relaxed mb-4">{desc}</p>
              <p className="obs-insight text-xs">{example}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-rim/20 py-20 text-center">
        <div className="max-w-lg mx-auto px-4">
          <h2 className="font-display text-3xl text-light mb-4">
            This is our starting point.
          </h2>
          <p className="text-pale/60 text-sm mb-8">
            The Observatory is a living document. The design evolves, the principles
            do not. Return here whenever you want to understand why something is the
            way it is.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/calculators" className="obs-btn-gold px-6 py-3 text-sm">
              Open the gallery
            </Link>
            <Link to="/lab" className="obs-btn px-6 py-3 text-sm">
              Visit the Lab
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

// ── Design decision accordion row ─────────────────────────────────────────────
function DesignDecision({ number, title, body }) {
  return (
    <div className="flex gap-5 p-6 border-b border-rim/20 last:border-0
                    hover:bg-surface/50 transition-colors duration-200">
      {/* Number */}
      <span className="font-mono text-xs text-gold/40 mt-1 flex-shrink-0 w-6">
        {number}
      </span>
      <div>
        <h3 className="font-display text-xl text-light mb-3">{title}</h3>
        <p className="text-pale/70 text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  )
}
