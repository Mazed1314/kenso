// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Mortgage Calculator
// src/components/calculators/Mortgage.jsx
//
// M = P × [r(1+r)^n] / [(1+r)^n − 1]
//
// Features:
// • Monthly payment, total interest, amortisation schedule
// • Extra payment simulator (slider)
// • Islamic Finance (Murabaha) toggle
// • PMI estimate for <20% down payment
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo, useEffect } from 'react'

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD',
    minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n)

const fmtShort = (n) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`
  return fmt(n)
}

export default function Mortgage({ onResult }) {
  const [homePrice,  setHomePrice]  = useState(350000)
  const [downPct,    setDownPct]    = useState(20)
  const [rate,       setRate]       = useState(7.0)
  const [termYears,  setTermYears]  = useState(30)
  const [extraPmt,   setExtraPmt]   = useState(0)
  const [isIslamic,  setIsIslamic]  = useState(false)
  const [viewMode,   setViewMode]   = useState('summary') // 'summary' | 'amortise'

  // ── Core calculation ───────────────────────────────────────────────────────
  const results = useMemo(() => {
    const downAmt  = homePrice * (downPct / 100)
    const P        = homePrice - downAmt       // loan principal
    const n        = termYears * 12             // total payments
    const hasPMI   = downPct < 20

    if (isIslamic) {
      // Murabaha: fixed cost-plus profit, no interest
      // Simple model: bank buys for P, sells for P × (1 + markup)
      // Markup ≈ equivalent to the conventional rate × term for illustration
      const markup   = rate / 100 * termYears * 0.6  // simplified proxy
      const totalCost = P * (1 + markup)
      const monthly  = totalCost / n

      return {
        P, downAmt, monthly, totalCost,
        totalInterest: totalCost - P,
        n, hasPMI, isIslamic: true,
        payoffMonths: n,
      }
    }

    const r = rate / 100 / 12     // monthly rate

    // Standard amortisation formula
    const monthly = r === 0
      ? P / n
      : P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

    const pmi = hasPMI ? P * 0.0085 / 12 : 0  // ~0.85% annual PMI

    // Calculate payoff with extra payment
    let balance = P
    let months  = 0
    let totalPaid = 0
    const schedule = []

    while (balance > 0.01 && months < n) {
      months++
      const interestThisMonth = balance * r
      const principalThisMonth = Math.min(
        monthly - interestThisMonth + extraPmt,
        balance
      )
      balance -= principalThisMonth
      if (balance < 0) balance = 0
      totalPaid += monthly + extraPmt + pmi

      // Store amortisation row (every 12th month or last)
      if (months % 12 === 0 || balance <= 0.01) {
        schedule.push({
          yr: Math.ceil(months / 12),
          month: months,
          balance,
          totalPaid,
          interest: totalPaid - (P - balance),
        })
      }
    }

    return {
      P, downAmt, monthly, pmi,
      totalInterest: totalPaid - P - (extraPmt * months),
      totalCost: P + (totalPaid - P),
      n, hasPMI, isIslamic: false,
      payoffMonths: months,
      schedule,
    }
  }, [homePrice, downPct, rate, termYears, extraPmt, isIslamic])

  // Notify parent
  useEffect(() => {
    if (!onResult) return
    const savedMonths = termYears * 12 - results.payoffMonths
    const savedYrs    = Math.round(savedMonths / 12)
    onResult({
      result: results.monthly,
      insight: extraPmt > 0
        ? `By paying $${extraPmt} extra per month, you'll pay off this mortgage ${savedYrs > 0 ? savedYrs + ' years' : savedMonths + ' months'} early.`
        : `Over ${termYears} years you'll pay ${fmtShort(results.totalInterest)} in interest — ${Math.round(results.totalInterest / results.P * 100)}% above your loan principal.`,
    })
  }, [results, onResult, extraPmt, termYears])

  return (
    <div className="space-y-7">

      {/* ── Islamic Finance toggle ────────────────────────────────────────── */}
      <div className="flex items-center justify-between p-3.5 bg-gold/5
                      border border-gold/15 rounded-lg">
        <div>
          <p className="text-sm font-medium text-pale">Islamic Finance (Murabaha)</p>
          <p className="text-xs text-dim">Cost-plus financing without interest</p>
        </div>
        <button
          onClick={() => setIsIslamic(s => !s)}
          className={[
            'relative w-11 h-6 rounded-full border transition-all duration-200',
            isIslamic ? 'bg-gold/20 border-gold/40' : 'bg-mist border-rim/40',
          ].join(' ')}
          aria-pressed={isIslamic}
          aria-label="Toggle Islamic finance mode"
        >
          <span className={[
            'absolute top-0.5 w-5 h-5 rounded-full bg-pale transition-all duration-200',
            isIslamic ? 'left-5' : 'left-0.5',
          ].join(' ')} />
        </button>
      </div>

      {/* ── Inputs grid ──────────────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-5">

        <div>
          <label className="obs-label block mb-2">Home Price</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-dim text-sm font-mono pointer-events-none">$</span>
            <input
              type="number" min={0} value={homePrice}
              onChange={e => setHomePrice(+e.target.value)}
              className="obs-input pl-7"
            />
          </div>
        </div>

        <div>
          <label className="obs-label block mb-2">
            Down Payment — {downPct}% ({fmt(homePrice * downPct / 100)})
            {downPct < 20 && (
              <span className="ml-2 text-dawn/60 text-2xs">PMI required</span>
            )}
          </label>
          <input
            type="range" min={0} max={50} step={1}
            value={downPct}
            onChange={e => setDownPct(+e.target.value)}
            className="w-full accent-gold"
          />
        </div>

        {!isIslamic && (
          <div>
            <label className="obs-label block mb-2">Interest Rate</label>
            <div className="flex items-center gap-3">
              <input
                type="range" min={0.5} max={15} step={0.05}
                value={rate}
                onChange={e => setRate(+e.target.value)}
                className="flex-1 accent-gold"
              />
              <span className="font-mono text-gold text-sm w-14 text-right">
                {rate.toFixed(2)}%
              </span>
            </div>
          </div>
        )}

        <div>
          <label className="obs-label block mb-2">Loan Term</label>
          <div className="flex gap-1.5 flex-wrap">
            {[10, 15, 20, 30].map(y => (
              <button
                key={y}
                onClick={() => setTermYears(y)}
                className={[
                  'px-3 py-1.5 rounded text-xs border transition-all duration-150',
                  termYears === y
                    ? 'bg-gold/10 text-gold border-gold/40'
                    : 'text-dim border-rim/40 hover:text-pale',
                ].join(' ')}
              >
                {y} yr
              </button>
            ))}
          </div>
        </div>

        {!isIslamic && (
          <div>
            <label className="obs-label block mb-2">
              Extra Monthly Payment — {fmt(extraPmt)}
            </label>
            <input
              type="range" min={0} max={2000} step={50}
              value={extraPmt}
              onChange={e => setExtraPmt(+e.target.value)}
              className="w-full accent-gold"
            />
          </div>
        )}
      </div>

      {/* ── Results ──────────────────────────────────────────────────────── */}
      <div className="border-t border-rim/30 pt-6">

        {/* Key numbers */}
        <div className="flex flex-wrap gap-6 mb-6">
          <div>
            <p className="obs-label mb-1">Monthly Payment</p>
            <p className="obs-result">{fmt(results.monthly)}</p>
          </div>
          {results.hasPMI && !isIslamic && (
            <div>
              <p className="obs-label mb-1">+ PMI</p>
              <p className="font-display text-2xl text-dawn font-light">
                {fmt(results.pmi)}/mo
              </p>
            </div>
          )}
          <div>
            <p className="obs-label mb-1">Total Interest</p>
            <p className="font-display text-3xl text-pale font-light">
              {fmtShort(results.totalInterest)}
            </p>
          </div>
          <div>
            <p className="obs-label mb-1">Total Cost</p>
            <p className="font-display text-3xl text-pale font-light">
              {fmtShort(results.P + results.totalInterest)}
            </p>
          </div>
          {extraPmt > 0 && !isIslamic && (
            <div>
              <p className="obs-label mb-1">Payoff</p>
              <p className="font-display text-3xl text-gold font-light">
                {Math.ceil(results.payoffMonths / 12)} yr{Math.ceil(results.payoffMonths / 12) > 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>

        {/* Principal breakdown bar */}
        <div className="mb-6">
          <p className="obs-label mb-2">Loan Breakdown</p>
          <div className="flex h-3 rounded-full overflow-hidden gap-px">
            <div
              className="bg-gold/70 transition-all duration-500"
              style={{ width: `${(results.downAmt / homePrice) * 100}%` }}
              title={`Down payment: ${fmt(results.downAmt)}`}
            />
            <div
              className="bg-glow/60 transition-all duration-500"
              style={{ width: `${(results.P / homePrice) * 100}%` }}
              title={`Loan principal: ${fmt(results.P)}`}
            />
          </div>
          <div className="flex gap-5 mt-2">
            <LegendDot color="bg-gold/70" label={`Down (${fmt(results.downAmt)})`} />
            <LegendDot color="bg-glow/60" label={`Loan (${fmt(results.P)})`} />
          </div>
        </div>

        {/* Amortisation summary (view toggle) */}
        {!isIslamic && results.schedule && results.schedule.length > 0 && (
          <>
            <div className="flex gap-1.5 mb-4">
              {['summary', 'amortise'].map(m => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={[
                    'px-3 py-1.5 rounded text-xs border transition-all duration-150',
                    viewMode === m
                      ? 'bg-gold/10 text-gold border-gold/40'
                      : 'text-dim border-rim/40 hover:text-pale',
                  ].join(' ')}
                >
                  {m === 'summary' ? 'Summary' : 'Schedule'}
                </button>
              ))}
            </div>

            {viewMode === 'amortise' && (
              <div className="overflow-x-auto max-h-64 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0 bg-surface">
                    <tr className="text-left border-b border-rim/30">
                      <th className="obs-label pb-2 pr-4">Year</th>
                      <th className="obs-label pb-2 pr-4">Balance</th>
                      <th className="obs-label pb-2 pr-4">Interest Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.schedule.map(r => (
                      <tr key={r.month} className="border-t border-rim/15">
                        <td className="py-1.5 pr-4 font-mono text-dim text-xs">{r.yr}</td>
                        <td className="py-1.5 pr-4 text-pale">{fmtShort(r.balance)}</td>
                        <td className="py-1.5 pr-4 text-dawn">{fmtShort(r.interest)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function LegendDot({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${color}`} />
      <span className="text-xs text-dim">{label}</span>
    </div>
  )
}
