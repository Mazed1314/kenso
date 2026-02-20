// ─────────────────────────────────────────────────────────────────────────────
// THE OBSERVATORY — Calculators Gallery Page
// src/pages/Calculators.jsx
//
// Features:
// • Filter by category (synced to URL param ?category=finance)
// • Sort: popular (by tier) | A–Z
// • Pagination — PAGE_SIZE cards per page, resets on filter/sort change
// • Responsive: mobile pill-strip → tablet 2-col → desktop sidebar + 3-col grid
// • Scroll-to-top on page change
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CATEGORIES, getLiveCalculators } from "../data/calculators";

// ── Constants ─────────────────────────────────────────────────────────────────
const LIVE = getLiveCalculators();
const PAGE_SIZE = 24; // divisible by 1, 2, and 3 — fits all grid col counts

// Pre-compute category counts once at module level (never stale)
const COUNTS = LIVE.reduce((acc, c) => {
  acc[c.category] = (acc[c.category] || 0) + 1;
  return acc;
}, {});

const CATEGORY_ENTRIES = Object.entries(CATEGORIES);

const SORT_OPTIONS = [
  { key: "popular", label: "Popular" },
  { key: "alpha", label: "A–Z" },
];

// ── Tiny util ─────────────────────────────────────────────────────────────────
const clsx = (...parts) => parts.filter(Boolean).join(" ");

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function Calculators({ onSearchOpen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState("popular"); // 'popular' | 'alpha'
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const activeCategory = searchParams.get("category") || "all";

  // ── Filtered + sorted list ────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const base =
      activeCategory === "all"
        ? LIVE
        : LIVE.filter((c) => c.category === activeCategory);

    return sort === "alpha"
      ? [...base].sort((a, b) => a.title.localeCompare(b.title))
      : [...base].sort((a, b) => a.tier - b.tier);
  }, [activeCategory, sort]);

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages); // guards stale page
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // ── Handlers — each resets to page 1 ──────────────────────────────────────
  const setCategory = useCallback(
    (key) => {
      setSearchParams(key === "all" ? {} : { category: key });
      setPage(1);
    },
    [setSearchParams],
  );

  const handleSort = useCallback((key) => {
    setSort(key);
    setPage(1);
  }, []);

  const changePage = useCallback((next) => {
    setPage(next);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  // ── ⌘K shortcut ──────────────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearchOpen?.();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onSearchOpen]);

  const activeCatLabel = CATEGORIES[activeCategory]?.label;

  return (
    <main className="min-h-screen pt-20">
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <span className="obs-label text-gold/60">The gallery</span>
        <h1 className="font-display text-5xl sm:text-6xl text-light mt-2 mb-3">
          Calculators
        </h1>
        <p className="text-pale/60 text-sm sm:text-base max-w-xl">
          {LIVE.length} tools for finance, health, science, culture, and
          everything between. No clutter. No ads. Just answers.
        </p>
      </header>

      {/* ── Sticky toolbar ────────────────────────────────────────────────── */}
      <div
        className="sticky top-14 z-30 bg-dusk/95 backdrop-blur-md
                      border-b border-rim/20"
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5
                        flex items-center gap-2 sm:gap-3"
        >
          {/* Search trigger */}
          <button
            onClick={onSearchOpen}
            aria-label="Open search"
            className="flex items-center gap-2 flex-1 min-w-0 max-w-xs
                       bg-surface border border-rim/50 rounded px-3 py-2
                       text-sm text-dim hover:border-gold/40
                       transition-colors duration-200"
          >
            <IconSearch />
            <span className="truncate hidden xs:inline sm:inline">
              Search {LIVE.length} calculators…
            </span>
            <span className="truncate xs:hidden">Search…</span>
            <kbd
              className="ml-auto font-mono text-2xs border border-rim/50
                            rounded px-1 py-0.5 text-dim/70 hidden sm:inline"
            >
              ⌘K
            </kbd>
          </button>

          {/* Sort toggle */}
          <div
            className="flex items-center gap-px bg-surface border border-rim/40
                          rounded overflow-hidden flex-shrink-0"
          >
            {SORT_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                aria-pressed={sort === key}
                className={clsx(
                  "px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                  sort === key
                    ? "bg-gold/10 text-gold"
                    : "text-dim hover:text-pale",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet category pill strip ───────────────────────────── */}
      <div
        className="lg:hidden border-b border-rim/15 overflow-x-auto
                      [-webkit-overflow-scrolling:touch]"
      >
        <div className="flex gap-1.5 px-4 sm:px-6 py-2.5 min-w-max">
          <PillButton
            active={activeCategory === "all"}
            onClick={() => setCategory("all")}
          >
            All <CountBadge n={LIVE.length} />
          </PillButton>

          {CATEGORY_ENTRIES.map(([key, cat]) => (
            <PillButton
              key={key}
              active={activeCategory === key}
              onClick={() => setCategory(key)}
            >
              <span aria-hidden>{cat.icon}</span>
              {/* Show shortened label on very small screens */}
              <span className="hidden sm:inline">{cat.label}</span>
              <span className="sm:hidden">{cat.label.split(" ")[0]}</span>
              <CountBadge n={COUNTS[key] || 0} />
            </PillButton>
          ))}
        </div>
      </div>

      {/* ── Body: desktop sidebar + grid ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        <div className="flex gap-6 xl:gap-8 mt-6 sm:mt-8">
          {/* ── Desktop sidebar ─────────────────────────────────────────── */}
          <aside
            className="hidden lg:block flex-shrink-0 w-48 xl:w-52"
            aria-label="Filter by category"
          >
            <nav className="sticky top-32">
              <ul className="space-y-0.5" role="list">
                <SidebarItem
                  active={activeCategory === "all"}
                  onClick={() => setCategory("all")}
                  count={LIVE.length}
                >
                  All calculators
                </SidebarItem>

                {CATEGORY_ENTRIES.map(([key, cat]) => (
                  <SidebarItem
                    key={key}
                    active={activeCategory === key}
                    onClick={() => setCategory(key)}
                    count={COUNTS[key] || 0}
                  >
                    <span aria-hidden className="flex-shrink-0">
                      {cat.icon}
                    </span>
                    <span className="truncate">{cat.label}</span>
                  </SidebarItem>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ── Grid area ──────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Result meta row */}
            <div
              ref={gridRef}
              className="flex items-baseline justify-between gap-4 mb-4 sm:mb-5
                         scroll-mt-32"
            >
              <p className="obs-label">
                {filtered.length} calculator{filtered.length !== 1 ? "s" : ""}
                {activeCatLabel && (
                  <span className="text-pale/35"> · {activeCatLabel}</span>
                )}
              </p>
              {totalPages > 1 && (
                <p className="obs-label tabular-nums">
                  {safePage} / {totalPages}
                </p>
              )}
            </div>

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-24">
                <p className="font-display text-4xl text-light/20 mb-3">
                  Nothing here
                </p>
                <p className="text-dim text-sm">
                  Try a different category or{" "}
                  <button
                    onClick={onSearchOpen}
                    className="text-gold underline underline-offset-2"
                  >
                    use search
                  </button>
                  .
                </p>
              </div>
            )}

            {/* Card grid
                – 1 col  on mobile  (<640px)
                – 2 cols on sm+     (≥640px)
                – 3 cols on xl+     (≥1280px) — only when sidebar is present   */}
            {pageItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {pageItems.map((calc, i) => (
                  <CalcCard key={calc.id} calc={calc} index={i} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                page={safePage}
                totalPages={totalPages}
                onChange={changePage}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CalcCard — individual calculator tile
// ─────────────────────────────────────────────────────────────────────────────
function CalcCard({ calc, index }) {
  const category = CATEGORIES[calc.category];

  return (
    <Link
      to={`/calculators/${calc.id}`}
      className="obs-card p-4 sm:p-5 flex flex-col gap-2.5 group
                 focus-visible:outline-none focus-visible:ring-2
                 focus-visible:ring-gold/40 animate-fade-in"
      style={{ animationDelay: `${Math.min(index * 25, 350)}ms` }}
    >
      {/* Category row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm flex-shrink-0" aria-hidden>
            {category?.icon}
          </span>
          <span className="obs-label truncate">{category?.label}</span>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          {calc.needsApi && <Badge color="glow">live</Badge>}
          {calc.tier <= 2 && <Badge color="gold">popular</Badge>}
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-display text-lg sm:text-xl text-light leading-snug
                     group-hover:text-gold transition-colors duration-200"
      >
        {calc.title}
      </h3>

      {/* Description */}
      <p className="text-dim text-sm leading-relaxed flex-1 line-clamp-2">
        {calc.desc}
      </p>

      {/* Insight */}
      {calc.insight && (
        <p
          className="text-xs text-dim/55 italic border-l border-gold/25
                      pl-2.5 line-clamp-2"
        >
          {calc.insight}
        </p>
      )}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onChange }) {
  const pages = buildPageRange(page, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center flex-wrap gap-1 sm:gap-1.5
                 mt-10 pt-8 border-t border-rim/20"
    >
      {/* Previous */}
      <NavBtn
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <IconChevronLeft />
      </NavBtn>

      {/* Page numbers + ellipsis */}
      {pages.map((p, i) =>
        p === "…" ? (
          <span
            key={`gap-${i}`}
            className="w-8 text-center text-dim text-sm select-none"
            aria-hidden
          >
            …
          </span>
        ) : (
          <NavBtn
            key={p}
            onClick={() => onChange(p)}
            active={p === page}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </NavBtn>
        ),
      )}

      {/* Next */}
      <NavBtn
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <IconChevronRight />
      </NavBtn>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Reusable primitives
// ─────────────────────────────────────────────────────────────────────────────

function SidebarItem({ active, onClick, count, children }) {
  return (
    <li>
      <button
        onClick={onClick}
        aria-pressed={active}
        className={clsx(
          "w-full flex items-center justify-between gap-2 px-3 py-2 rounded",
          "text-left text-xs transition-colors duration-150",
          active
            ? "bg-gold/10 text-gold border border-gold/20"
            : "text-dim hover:text-pale hover:bg-surface",
        )}
      >
        <span className="flex items-center gap-2 min-w-0">{children}</span>
        <span className="font-mono opacity-50 flex-shrink-0">{count}</span>
      </button>
    </li>
  );
}

function PillButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={clsx(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full",
        "text-xs whitespace-nowrap border transition-colors duration-150",
        active
          ? "bg-gold/10 text-gold border-gold/30"
          : "text-dim border-rim/40 hover:text-pale hover:border-rim/60",
      )}
    >
      {children}
    </button>
  );
}

function CountBadge({ n }) {
  return <span className="font-mono text-2xs opacity-45">{n}</span>;
}

function Badge({ color, children }) {
  return (
    <span
      className={clsx(
        "text-2xs font-mono border rounded px-1.5 py-0.5",
        color === "gold" && "text-gold/50 border-gold/25",
        color === "glow" && "text-glow/50 border-glow/25",
      )}
    >
      {children}
    </span>
  );
}

function NavBtn({ onClick, disabled, active, children, ...rest }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded",
        "text-xs sm:text-sm font-mono transition-all duration-150",
        "disabled:opacity-25 disabled:cursor-not-allowed",
        active && "bg-gold/15 text-gold border border-gold/30",
        !active &&
          !disabled && [
            "text-dim hover:text-pale hover:bg-surface",
            "border border-transparent hover:border-rim/40",
          ],
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// buildPageRange
// Returns an array of page numbers with '…' where gaps exist.
// Always shows: first page, last page, current ± 1 neighbours.
//
// Examples:
//   (1, 5)  → [1, 2, 3, 4, 5]
//   (7, 15) → [1, '…', 6, 7, 8, '…', 15]
//   (2, 15) → [1, 2, 3, '…', 15]
// ─────────────────────────────────────────────────────────────────────────────
function buildPageRange(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const show = new Set(
    [1, total, current, current - 1, current + 1].filter(
      (p) => p >= 1 && p <= total,
    ),
  );
  const sorted = [...show].sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) result.push("…");
    result.push(sorted[i]);
  }
  return result;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
function IconSearch() {
  return (
    <svg
      className="flex-shrink-0"
      width="13"
      height="13"
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

function IconChevronLeft() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <polyline points="9,2 5,7 9,12" />
    </svg>
  );
}

function IconChevronRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <polyline points="5,2 9,7 5,12" />
    </svg>
  );
}
