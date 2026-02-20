// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Compound Interest Calculator
// src/components/calculators/CompoundInterest.jsx
//
// A = P(1 + r/n)^(nt)
//
// Features:
// • Real-time calculation as inputs change (no submit button)
// • Inflation-adjusted "real return" toggle
// • Zen mode: animated growth visual
// • Table mode: year-by-year breakdown
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useMemo } from 'react'

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const fmtShort = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`
  return fmt(n)
}

const COMPOUND_OPTIONS = [
  { label: 'Annually',   value: 1 },
  { label: 'Semi-annually', value: 2 },
  { label: 'Quarterly',  value: 4 },
  { label: 'Monthly',    value: 12 },
  { label: 'Daily',      value: 365 },
]

// ── Component ──────────────────────────────────────────────────────────────────
export default function CompoundInterest({ onResult }) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [principal,  setPrincipal]  = useState(10000)
  const [rate,       setRate]       = useState(7)
  const [years,      setYears]      = useState(20)
  const [compound,   setCompound]   = useState(12)       // n: compounding periods
  const [monthly,    setMonthly]    = useState(200)       // extra monthly contribution
  const [inflation,  setInflation]  = useState(2.5)       // for real return
  const [showInflat, setShowInflat] = useState(false)
  const [viewMode,   setViewMode]   = useState('zen')     // 'zen' | 'table'

  // ── Core calculation ───────────────────────────────────────────────────────
  const results = useMemo(() => {
    const r  = rate / 100
    const n  = compound
    const t  = years
    const P  = principal
    const mc = monthly       // monthly contribution

    // Build year-by-year table
    const rows = []
    for (let yr = 1; yr <= t; yr++) {
      // Principal compounded
      const princAmount = P * Math.pow(1 + r / n, n * yr)

      // Monthly contributions compounded (future value of annuity)
      // FV = mc × [(1 + r/12)^(12×yr) − 1] / (r/12)
      const monthlyRate = r / 12
      const monthlyAmount = monthlyRate > 0
        ? mc * (Math.pow(1 + monthlyRate, 12 * yr) - 1) / monthlyRate
        : mc * 12 * yr

      const total    = princAmount + monthlyAmount
      const invested = P + mc * 12 * yr
      const interest = total - invested

      // Real (inflation-adjusted)
      const realTotal = showInflat
        ? total / Math.pow(1 + inflation / 100, yr)
        : total

      rows.push({ yr, total, invested, interest, realTotal })
    }

    const final    = rows[rows.length - 1]
    const invested = P + mc * 12 * t

    return { rows, final, invested }
  }, [principal, rate, years, compound, monthly, inflation, showInflat])

  // Notify parent of result + insight
  useEffect(() => {
    if (!onResult) return
    const doubleYears = Math.round(72 / rate)
    onResult({
      result: results.final.total,
      insight: `At ${rate}% annual return, money roughly doubles every ${doubleYears} years (Rule of 72). ` +
               `By year ${years}, your ${fmt(principal + monthly * 12 * years)} invested ` +
               `will have grown to ${fmtShort(results.final.total)}.`,
    })
  }, [results, rate, years, principal, monthly, onResult])

  return (
    <div className="space-y-7">

      {/* ── Inputs ─────────────────────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-5">

        <InputField
          label="Initial Principal"
          prefix="$"
          type="number"
          min={0}
          value={principal}
          onChange={v => setPrincipal(+v)}
        />
        <InputField
          label="Monthly Contribution"
          prefix="$"
          type="number"
          min={0}
          value={monthly}
          onChange={v => setMonthly(+v)}
        />

        <div>
          <label className="obs-label block mb-2">Annual Return Rate</label>
          <div className="flex items-center gap-3">
            <input
              type="range" min={0} max={30} step={0.1}
              value={rate}
              onChange={e => setRate(+e.target.value)}
              className="flex-1 accent-gold"
            />
            <span className="font-mono text-gold text-sm w-14 text-right">
              {rate.toFixed(1)}%
            </span>
          </div>
        </div>

        <div>
          <label className="obs-label block mb-2">Time Horizon</label>
          <div className="flex items-center gap-3">
            <input
              type="range" min={1} max={50} step={1}
              value={years}
              onChange={e => setYears(+e.target.value)}
              className="flex-1 accent-gold"
            />
            <span className="font-mono text-gold text-sm w-14 text-right">
              {years} yr{years > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div>
          <label className="obs-label block mb-2">Compounding</label>
          <div className="flex flex-wrap gap-1.5">
            {COMPOUND_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setCompound(opt.value)}
                className={[
                  'px-3 py-1.5 rounded text-xs font-body border transition-all duration-150',
                  compound === opt.value
                    ? 'bg-gold/10 text-gold border-gold/40'
                    : 'text-dim border-rim/40 hover:text-pale',
                ].join(' ')}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inflation toggle */}
        <div className="flex items-center justify-between">
          <div>
            <label className="obs-label block mb-0.5">Inflation Adjustment</label>
            <p className="text-xs text-dim">Show real purchasing power</p>
          </div>
          <button
            onClick={() => setShowInflat(s => !s)}
            className={[
              'relative w-11 h-6 rounded-full border transition-all duration-200',
              showInflat ? 'bg-gold/20 border-gold/40' : 'bg-mist border-rim/40',
            ].join(' ')}
            aria-pressed={showInflat}
          >
            <span className={[
              'absolute top-0.5 w-5 h-5 rounded-full bg-pale transition-all duration-200',
              showInflat ? 'left-5' : 'left-0.5',
            ].join(' ')} />
          </button>
        </div>

        {showInflat && (
          <div>
            <label className="obs-label block mb-2">Inflation Rate</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={0} max={10} step={0.1}
                value={inflation}
                onChange={e => setInflation(+e.target.value)}
                className="flex-1 accent-glow"
              />
              <span className="font-mono text-glow text-sm w-14 text-right">
                {inflation.toFixed(1)}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Result display ─────────────────────────────────────────────────── */}
      <div className="border-t border-rim/30 pt-6">
        <div className="flex flex-wrap gap-6 mb-5">
          <div>
            <p className="obs-label mb-1">Final Value</p>
            <p className="obs-result">{fmtShort(results.final.total)}</p>
          </div>
          <div>
            <p className="obs-label mb-1">Total Invested</p>
            <p className="font-display text-3xl text-pale font-light">
              {fmtShort(results.invested)}
            </p>
          </div>
          <div>
            <p className="obs-label mb-1">Interest Earned</p>
            <p className="font-display text-3xl text-gold font-light">
              {fmtShort(results.final.interest)}
            </p>
          </div>
          {showInflat && (
            <div>
              <p className="obs-label mb-1">Real Value (today's $)</p>
              <p className="font-display text-3xl text-glow font-light">
                {fmtShort(results.final.realTotal)}
              </p>
            </div>
          )}
        </div>

        {/* View toggle */}
        <div className="flex gap-1.5 mb-5">
          {['zen', 'table'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={[
                'px-3 py-1.5 rounded text-xs font-body border transition-all duration-150',
                viewMode === mode
                  ? 'bg-gold/10 text-gold border-gold/40'
                  : 'text-dim border-rim/40 hover:text-pale',
              ].join(' ')}
            >
              {mode === 'zen' ? '🌱 Visual' : '📋 Table'}
            </button>
          ))}
        </div>

        {/* Zen growth visual */}
        {viewMode === 'zen' && (
          <GrowthVisual rows={results.rows} showInflat={showInflat} />
        )}

        {/* Year table */}
        {viewMode === 'table' && (
          <GrowthTable rows={results.rows} showInflat={showInflat} />
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Visual growth bar chart (Zen mode)
// ─────────────────────────────────────────────────────────────────────────────
function GrowthVisual({ rows, showInflat }) {
  if (!rows.length) return null
  const max = rows[rows.length - 1].total

  // Show every 5th year or all if ≤10 years
  const display = rows.length <= 10
    ? rows
    : rows.filter(r => r.yr % 5 === 0 || r.yr === rows.length)

  return (
    <div className="space-y-2">
      {display.map(r => {
        const pct      = (r.total / max) * 100
        const iPct     = (r.invested / max) * 100
        const realPct  = showInflat ? (r.realTotal / max) * 100 : null

        return (
          <div key={r.yr} className="flex items-center gap-3">
            <span className="font-mono text-xs text-dim w-12 text-right flex-shrink-0">
              yr {r.yr}
            </span>
            <div className="flex-1 relative h-5 bg-mist/50 rounded-sm overflow-hidden">
              {/* Invested bar */}
              <div
                className="absolute inset-y-0 left-0 bg-rim/80 rounded-sm transition-all duration-500"
                style={{ width: `${iPct}%` }}
              />
              {/* Total bar */}
              <div
                className="absolute inset-y-0 left-0 bg-gold/50 rounded-sm transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
              {/* Real value bar */}
              {realPct !== null && (
                <div
                  className="absolute inset-y-0 left-0 border-r-2 border-glow
                             transition-all duration-500"
                  style={{ width: `${realPct}%` }}
                />
              )}
            </div>
            <span className="font-mono text-xs text-gold flex-shrink-0 w-20 text-right">
              {fmtShort(r.total)}
            </span>
          </div>
        )
      })}
      {/* Legend */}
      <div className="flex items-center gap-5 pt-2">
        <LegendDot color="bg-rim/80" label="Invested" />
        <LegendDot color="bg-gold/50" label="Total (interest)" />
        {showInflat && <LegendDot color="border-r-2 border-glow w-0 h-4" label="Real value" line />}
      </div>
    </div>
  )
}

function LegendDot({ color, label, line }) {
  return (
    <div className="flex items-center gap-1.5">
      {line
        ? <div className="w-4 h-4 border-r-2 border-glow flex-shrink-0" />
        : <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${color}`} />
      }
      <span className="text-xs text-dim">{label}</span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Year-by-year data table
// ─────────────────────────────────────────────────────────────────────────────
function GrowthTable({ rows, showInflat }) {
  // Show every 5th year or all years if ≤ 20
  const display = rows.length <= 20
    ? rows
    : rows.filter(r => r.yr % 5 === 0 || r.yr === rows.length)

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-rim/30">
            <th className="obs-label pb-2 pr-4">Year</th>
            <th className="obs-label pb-2 pr-4">Invested</th>
            <th className="obs-label pb-2 pr-4">Interest</th>
            <th className="obs-label pb-2 pr-4">Total</th>
            {showInflat && <th className="obs-label pb-2">Real Total</th>}
          </tr>
        </thead>
        <tbody>
          {display.map(r => (
            <tr key={r.yr} className="border-t border-rim/15">
              <td className="py-2 pr-4 font-mono text-dim text-xs">{r.yr}</td>
              <td className="py-2 pr-4 text-pale">{fmtShort(r.invested)}</td>
              <td className="py-2 pr-4 text-gold">{fmtShort(r.interest)}</td>
              <td className="py-2 pr-4 font-medium text-light">{fmtShort(r.total)}</td>
              {showInflat && (
                <td className="py-2 text-glow">{fmtShort(r.realTotal)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable input field
// ─────────────────────────────────────────────────────────────────────────────
function InputField({ label, prefix, type = 'text', value, onChange, min, max, step }) {
  return (
    <div>
      <label className="obs-label block mb-2">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dim text-sm
                           font-mono pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={e => onChange(e.target.value)}
          className={`obs-input ${prefix ? 'pl-7' : ''}`}
        />
      </div>
    </div>
  )
}
