// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Global Search Modal
// src/components/ui/SearchModal.jsx
//
// Features:
// • ⌘K / Ctrl+K keyboard shortcut to open/close
// • Live search through all calculators (title, tags, description)
// • Arrow key navigation, Enter to navigate
// • Escape to close
// • Category colour chips
// • Groups results by category when no query entered
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchCalculators, CALCULATORS, CATEGORIES, getLiveCalculators } from '../../data/calculators'

// Featured calculators shown when the search field is empty
const FEATURED_IDS = [
  'mortgage', 'compound-interest', 'bmi', 'currency', 'zakat',
  'prayer-times', 'caffeine-half-life', 'carbon-footprint',
]

export default function SearchModal({ isOpen, onClose }) {
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState([])
  const [active,  setActive]  = useState(0)   // keyboard cursor index

  const inputRef    = useRef(null)
  const listRef     = useRef(null)
  const navigate    = useNavigate()

  // ── Keyboard shortcut (⌘K / Ctrl+K) ────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        isOpen ? onClose() : /* opened by parent */ null
      }
      if (e.key === 'Escape' && isOpen) onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // ── Focus input when modal opens ────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // ── Search ───────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!query.trim()) {
      // Show featured calculators
      const featured = FEATURED_IDS.map(id =>
        CALCULATORS.find(c => c.id === id)
      ).filter(Boolean)
      setResults(featured)
    } else {
      setResults(searchCalculators(query).slice(0, 20))
    }
    setActive(0)
  }, [query])

  // ── Keyboard navigation ──────────────────────────────────────────────────────
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      navigateTo(results[active])
    }
  }, [results, active])

  // ── Navigate to calculator ────────────────────────────────────────────────
  const navigateTo = (calc) => {
    onClose()
    navigate(`/calculators/${calc.id}`)
  }

  // ── Scroll active item into view ─────────────────────────────────────────────
  useEffect(() => {
    const item = listRef.current?.children[active]
    item?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!isOpen) return null

  const cat = CATEGORIES

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search calculators"
    >
      {/* Backdrop blur */}
      <div className="absolute inset-0 bg-void/80 backdrop-blur-md" />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-xl bg-surface border border-rim/60 rounded-xl
                   shadow-obs-lg overflow-hidden animate-fade-up"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ── Search input ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-rim/40">
          <svg className="text-dim flex-shrink-0" width="16" height="16"
               viewBox="0 0 16 16" fill="none" stroke="currentColor"
               strokeWidth="1.5" strokeLinecap="round">
            <circle cx="6.5" cy="6.5" r="5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search calculators, units, topics…"
            className="flex-1 bg-transparent outline-none text-light placeholder:text-dim
                       font-body text-sm"
            autoComplete="off"
            spellCheck="false"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-dim hover:text-pale transition-colors text-xs font-mono"
            >
              clear
            </button>
          )}
          <kbd className="font-mono text-2xs border border-rim/60 rounded px-1.5 py-0.5
                         text-dim flex-shrink-0">
            esc
          </kbd>
        </div>

        {/* ── Results list ──────────────────────────────────────────────────── */}
        <ul
          ref={listRef}
          className="max-h-80 overflow-y-auto py-2"
          role="listbox"
        >
          {/* Empty state */}
          {results.length === 0 && (
            <li className="px-4 py-8 text-center text-dim text-sm">
              No calculators found for "<span className="text-pale">{query}</span>"
            </li>
          )}

          {/* Section label when no query */}
          {!query.trim() && results.length > 0 && (
            <li className="px-4 pt-1 pb-2">
              <span className="obs-label">Featured</span>
            </li>
          )}

          {results.map((calc, i) => {
            const category = cat[calc.category]
            const isActive = i === active
            return (
              <li
                key={calc.id}
                role="option"
                aria-selected={isActive}
                onClick={() => navigateTo(calc)}
                onMouseEnter={() => setActive(i)}
                className={[
                  'flex items-center gap-3 px-4 py-2.5 cursor-pointer',
                  'transition-colors duration-100',
                  isActive ? 'bg-mist' : 'hover:bg-mist/50',
                ].join(' ')}
              >
                {/* Category icon */}
                <span className="text-base w-6 text-center flex-shrink-0" aria-hidden>
                  {category?.icon}
                </span>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-light truncate">
                    {calc.title}
                  </p>
                  <p className="text-xs text-dim truncate">{calc.desc}</p>
                </div>

                {/* API badge */}
                {calc.needsApi && (
                  <span className="flex-shrink-0 text-2xs font-mono text-glow/60
                                   border border-glow/30 rounded px-1.5 py-0.5">
                    live
                  </span>
                )}

                {/* Lab badge */}
                {calc.status === 'lab' && (
                  <span className="flex-shrink-0 text-2xs font-mono text-dawn/60
                                   border border-dawn/30 rounded px-1.5 py-0.5">
                    lab
                  </span>
                )}

                {/* Arrow indicator on active */}
                {isActive && (
                  <svg className="text-gold flex-shrink-0" width="12" height="12"
                       viewBox="0 0 12 12" fill="none" stroke="currentColor"
                       strokeWidth="1.5" strokeLinecap="round">
                    <line x1="1" y1="6" x2="11" y2="6" />
                    <polyline points="7,2 11,6 7,10" />
                  </svg>
                )}
              </li>
            )
          })}
        </ul>

        {/* ── Footer hint ───────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-rim/30">
          <HintKey label="↑↓" desc="navigate" />
          <HintKey label="↵"  desc="open" />
          <HintKey label="esc" desc="close" />
          <span className="ml-auto obs-label">
            {query ? `${results.length} result${results.length !== 1 ? 's' : ''}` : 'featured'}
          </span>
        </div>
      </div>
    </div>
  )
}

function HintKey({ label, desc }) {
  return (
    <span className="flex items-center gap-1.5 text-2xs text-dim">
      <kbd className="font-mono border border-rim/50 rounded px-1 py-0.5 text-dim/80">
        {label}
      </kbd>
      {desc}
    </span>
  )
}
