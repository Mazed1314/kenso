import React, { useMemo, useState } from "react";

/**
 * UniversalConverter.jsx
 * Single-file React + Tailwind component
 * - Responsive, accessible, documented
 * - Minimal dependencies (React + Tailwind)
 * - Designed to be dropped into a Next.js / Vite app
 *
 * How it works (short):
 * - category -> units map with conversion to a canonical base unit
 * - conversions go: value -> base -> target
 * - temperature uses custom formula functions (not linear factors)
 * - cooking uses density table for volume⇄weight
 *
 * Notes:
 * - Data storage uses binary units (KiB = 1024) for clarity (common in dev tools)
 * - This file keeps UI and conversion logic together for clarity on small projects
 */

// ---------- Unit data ----------
const UNITS = {
  // Fundamentals (daily life)
  length: {
    label: "Length / Distance",
    base: "m",
    units: {
      m: { label: "Meters", toBase: 1 },
      cm: { label: "Centimeters", toBase: 0.01 },
      mm: { label: "Millimeters", toBase: 0.001 },
      km: { label: "Kilometers", toBase: 1000 },
      in: { label: "Inches", toBase: 0.0254 },
      ft: { label: "Feet", toBase: 0.3048 },
      yd: { label: "Yards", toBase: 0.9144 },
      mi: { label: "Miles", toBase: 1609.344 },
    },
  },
  mass: {
    label: "Mass / Weight",
    base: "kg",
    units: {
      kg: { label: "Kilograms", toBase: 1 },
      g: { label: "Grams", toBase: 0.001 },
      mg: { label: "Milligrams", toBase: 1e-6 },
      lb: { label: "Pounds (lb)", toBase: 0.45359237 },
      oz: { label: "Ounces", toBase: 0.028349523125 },
      stone: { label: "Stone", toBase: 6.35029318 },
    },
  },
  temperature: {
    label: "Temperature",
    units: {
      c: { label: "°C" },
      f: { label: "°F" },
      k: { label: "K" },
    },
  },
  volume: {
    label: "Volume",
    base: "L",
    units: {
      L: { label: "Liters", toBase: 1 },
      mL: { label: "Milliliters", toBase: 0.001 },
      cup: { label: "Cups", toBase: 0.236588 },
      floz: { label: "Fluid Ounces", toBase: 0.0295735 },
      gal: { label: "Gallons (US)", toBase: 3.785411784 },
    },
  },
  area: {
    label: "Area",
    base: "m2",
    units: {
      m2: { label: "Square meters", toBase: 1 },
      cm2: { label: "Square centimeters", toBase: 0.0001 },
      ft2: { label: "Square feet", toBase: 0.09290304 },
      acre: { label: "Acres", toBase: 4046.8564224 },
      ha: { label: "Hectares", toBase: 10000 },
    },
  },
  time: {
    label: "Time",
    base: "s",
    units: {
      ms: { label: "Milliseconds", toBase: 0.001 },
      s: { label: "Seconds", toBase: 1 },
      min: { label: "Minutes", toBase: 60 },
      h: { label: "Hours", toBase: 3600 },
      day: { label: "Days", toBase: 86400 },
      year: { label: "Years", toBase: 31557600 }, // average Gregorian year in seconds
      century: { label: "Centuries", toBase: 3155760000 },
    },
  },
  // Physics Engine
  speed: {
    label: "Speed / Velocity",
    base: "m/s",
    units: {
      "m/s": { label: "m/s", toBase: 1 },
      kmh: { label: "km/h", toBase: 1000 / 3600 },
      mph: { label: "mph", toBase: 1609.344 / 3600 },
      knot: { label: "Knots", toBase: 1852 / 3600 },
    },
  },
  pressure: {
    label: "Pressure",
    base: "Pa",
    units: {
      Pa: { label: "Pascals", toBase: 1 },
      kPa: { label: "kPa", toBase: 1000 },
      bar: { label: "Bar", toBase: 100000 },
      psi: { label: "PSI", toBase: 6894.757293168 },
    },
  },
  energy: {
    label: "Energy",
    base: "J",
    units: {
      J: { label: "Joules", toBase: 1 },
      cal: { label: "Calories (cal)", toBase: 4.184 },
      kWh: { label: "kWh", toBase: 3.6e6 },
    },
  },
  power: {
    label: "Power",
    base: "W",
    units: {
      W: { label: "Watts", toBase: 1 },
      kW: { label: "Kilowatts", toBase: 1000 },
      hp: { label: "Horsepower (hp)", toBase: 745.699872 },
    },
  },
  force: {
    label: "Force",
    base: "N",
    units: {
      N: { label: "Newtons", toBase: 1 },
      dyn: { label: "Dyne", toBase: 1e-5 },
      lbf: { label: "Pound-force", toBase: 4.4482216152605 },
    },
  },
  torque: {
    label: "Torque",
    base: "N·m",
    units: {
      "N·m": { label: "Newton-meters", toBase: 1 },
      "ft·lbf": { label: "Foot-pounds", toBase: 1.3558179483314004 },
    },
  },
  angle: {
    label: "Angle",
    base: "rad",
    units: {
      deg: { label: "Degrees", toBase: Math.PI / 180 },
      rad: { label: "Radians", toBase: 1 },
    },
  },
  // Invisible world
  data: {
    label: "Data Storage",
    note: "Uses binary prefixes (KiB = 1024)",
    base: "B",
    units: {
      bit: { label: "Bits", toBase: 1 / 8 },
      B: { label: "Bytes", toBase: 1 },
      KiB: { label: "KiB (1024 B)", toBase: 1024 },
      MiB: { label: "MiB", toBase: 1024 ** 2 },
      GiB: { label: "GiB", toBase: 1024 ** 3 },
      TiB: { label: "TiB", toBase: 1024 ** 4 },
    },
  },
  bandwidth: {
    label: "Data Transfer Rate",
    base: "B/s",
    units: {
      Bps: { label: "B/s", toBase: 1 },
      KBps: { label: "kB/s (1000)", toBase: 1000 },
      MBps: { label: "MB/s (1000)", toBase: 1000 ** 2 },
      Mbps: { label: "Mbps (megabits/s)", toBase: (1 / 8) * 1e6 },
      Gbps: { label: "Gbps", toBase: (1 / 8) * 1e9 },
    },
  },
  frequency: {
    label: "Frequency",
    base: "Hz",
    units: {
      Hz: { label: "Hertz", toBase: 1 },
      kHz: { label: "kHz", toBase: 1e3 },
      MHz: { label: "MHz", toBase: 1e6 },
      GHz: { label: "GHz", toBase: 1e9 },
    },
  },
  illumination: {
    label: "Luminance / Illumination",
    base: "lx",
    units: {
      lx: { label: "Lux", toBase: 1 },
      fc: { label: "Foot-candles", toBase: 10.76391041671 },
    },
  },
  radiation: {
    label: "Radiation",
    base: "Sv",
    units: {
      Sv: { label: "Sieverts", toBase: 1 },
      rem: { label: "Rem", toBase: 0.01 },
    },
  },
  viscosity: {
    label: "Viscosity",
    base: "Pa·s",
    units: {
      Pa_s: { label: "Pascal-second (Pa·s)", toBase: 1 },
      P: { label: "Poise (P)", toBase: 0.1 },
    },
  },
  // Human context
  cooking: {
    label: "Cooking (Volume ↔ Weight)",
    note: "Uses small density table (g/ml). Volumes use liters/mL base",
    base: "g",
    // density in g/ml for a cup-based mapping
    ingredients: {
      "all-purpose flour": { cup_g: 120, g_per_ml: 120 / 236.588 },
      sugar: { cup_g: 200, g_per_ml: 200 / 236.588 },
      butter: { cup_g: 227, g_per_ml: 227 / 236.588 },
      water: { cup_g: 236.588, g_per_ml: 1 },
      milk: { cup_g: 240, g_per_ml: 240 / 236.588 },
    },
  },
  clothing: {
    label: "Clothing & Shoes (basic)",
    note: "Small sample mapping for shoe sizes (approx)",
    shoes: [
      { us: 7, uk: 6, eu: 40, jp: 25 },
      { us: 8, uk: 7, eu: 41, jp: 26 },
      { us: 9, uk: 8, eu: 42, jp: 27 },
      { us: 10, uk: 9, eu: 43, jp: 28 },
      { us: 11, uk: 10, eu: 44, jp: 29 },
    ],
  },
  fuel: {
    label: "Fuel Consumption",
    note: "MPG (US) ↔ L/100km",
  },
};

// ---------- Conversion helpers ----------
function roundSmart(v, digits = 6) {
  if (Math.abs(v) >= 1000 || Math.abs(v) < 0.0001)
    return Number(v.toPrecision(6));
  return Number(Number(v).toFixed(digits));
}

// Temperature conversions
function tempToC(value, unit) {
  switch (unit) {
    case "c":
      return value;
    case "f":
      return ((value - 32) * 5) / 9;
    case "k":
      return value - 273.15;
    default:
      return NaN;
  }
}
function cToTemp(c, unit) {
  switch (unit) {
    case "c":
      return c;
    case "f":
      return (c * 9) / 5 + 32;
    case "k":
      return c + 273.15;
    default:
      return NaN;
  }
}

// Generic converter via base unit
function convertGeneric(category, from, to, value) {
  if (!UNITS[category]) return NaN;
  const cat = UNITS[category];
  const fromDef = cat.units[from];
  const toDef = cat.units[to];
  if (!fromDef || !toDef) return NaN;
  const baseValue = value * fromDef.toBase; // to base
  return baseValue / toDef.toBase;
}

// Cooking converter using density table
function convertCooking(ingredientKey, fromUnit, toUnit, value) {
  const ing = UNITS.cooking.ingredients[ingredientKey];
  if (!ing) return NaN;
  // units: cup, g, mL, L
  // canonical: grams
  if (fromUnit === "g") {
    if (toUnit === "cup") return value / ing.cup_g;
    if (toUnit === "mL") return value / ing.g_per_ml;
    return value;
  }
  if (fromUnit === "cup") {
    const grams = value * ing.cup_g;
    if (toUnit === "g") return grams;
    if (toUnit === "mL") return grams / ing.g_per_ml;
    return grams;
  }
  if (fromUnit === "mL") {
    const grams = value * ing.g_per_ml;
    if (toUnit === "g") return grams;
    if (toUnit === "cup") return grams / ing.cup_g;
    return grams;
  }
  return NaN;
}

// Fuel MPG ↔ L/100km (US mpg)
function mpgToL100km(mpg) {
  if (mpg === 0) return Infinity;
  return 235.214583 / mpg;
}
function L100kmToMpg(l100) {
  if (l100 === 0) return Infinity;
  return 235.214583 / l100;
}

// ---------- Small UI components ----------
const Select = ({ value, onChange, options, id }) => (
  <select
    id={id}
    className="w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

// Main converter card for a general category
function ConverterCard({ categoryKey }) {
  const cat = UNITS[categoryKey];
  const unitKeys = cat.units ? Object.keys(cat.units) : [];

  // Special handling for cooking & clothing & fuel
  const isCooking = categoryKey === "cooking";
  const isClothing = categoryKey === "clothing";
  const isFuel = categoryKey === "fuel";
  const isTemperature = categoryKey === "temperature";

  const defaultFrom = isCooking ? "cup" : isTemperature ? "c" : unitKeys[0];
  const defaultTo = isCooking
    ? "g"
    : isTemperature
      ? "f"
      : unitKeys[1] || unitKeys[0];

  const [fromUnit, setFromUnit] = useState(defaultFrom);
  const [toUnit, setToUnit] = useState(defaultTo);
  const [value, setValue] = useState(1);
  const [ingredient, setIngredient] = useState(
    Object.keys(UNITS.cooking.ingredients)[0],
  );

  const result = useMemo(() => {
    const num = Number(value);
    if (Number.isNaN(num)) return "—";
    if (isTemperature) {
      const c = tempToC(num, fromUnit);
      const out = cToTemp(c, toUnit);
      return roundSmart(out, 4);
    }
    if (isCooking) {
      const out = convertCooking(ingredient, fromUnit, toUnit, num);
      return roundSmart(out, 4);
    }
    if (isClothing) {
      // shoes mapping: find closest by US value
      if (fromUnit === "shoe" && toUnit === "shoe") return value;
      return "see table";
    }
    if (isFuel) {
      if (fromUnit === "mpg" && toUnit === "lpk")
        return roundSmart(mpgToL100km(num), 4);
      if (fromUnit === "lpk" && toUnit === "mpg")
        return roundSmart(L100kmToMpg(num), 4);
      return "—";
    }
    return roundSmart(convertGeneric(categoryKey, fromUnit, toUnit, num), 6);
  }, [value, fromUnit, toUnit, ingredient, categoryKey]);

  // build options
  const options = isCooking
    ? [
        { value: "cup", label: "Cups" },
        { value: "mL", label: "Milliliters" },
        { value: "g", label: "Grams" },
      ]
    : isTemperature
      ? [
          { value: "c", label: "°C" },
          { value: "f", label: "°F" },
          { value: "k", label: "K" },
        ]
      : isClothing
        ? [{ value: "shoe", label: "Shoe size (see table)" }]
        : isFuel
          ? [
              { value: "mpg", label: "MPG (US)" },
              { value: "lpk", label: "L/100km" },
            ]
          : unitKeys.map((k) => ({ value: k, label: cat.units[k].label }));

  return (
    <div className="bg-white dark:bg-slate-900 shadow-md rounded-2xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{cat.label}</h3>
          {cat.note && <p className="text-sm text-slate-500">{cat.note}</p>}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <label className="block text-xs text-slate-500 mb-1">From</label>
          <Select
            id={`${categoryKey}-from`}
            value={fromUnit}
            onChange={setFromUnit}
            options={options}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs text-slate-500 mb-1">To</label>
          <Select
            id={`${categoryKey}-to`}
            value={toUnit}
            onChange={setToUnit}
            options={options}
          />
        </div>

        <div className="sm:col-span-1">
          <label className="block text-xs text-slate-500 mb-1">Value</label>
          <input
            type="number"
            className="w-full rounded-md border px-3 py-2 bg-white dark:bg-slate-800"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        {isCooking && (
          <div className="sm:col-span-3 mt-2">
            <label className="block text-xs text-slate-500 mb-1">
              Ingredient
            </label>
            <Select
              id={`${categoryKey}-ingredient`}
              value={ingredient}
              onChange={setIngredient}
              options={Object.keys(UNITS.cooking.ingredients).map((k) => ({
                value: k,
                label: k,
              }))}
            />
          </div>
        )}
      </div>

      <div className="mt-4 border-t pt-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-500">Result</div>
          <div className="font-mono font-semibold text-right">
            {String(result)}
          </div>
        </div>
      </div>
    </div>
  );
}

// Category navigation list
function CategoryNav({ categories, active, onSelect }) {
  return (
    <nav className="space-y-2">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
            active === c.key
              ? "bg-slate-100 dark:bg-slate-800 font-semibold"
              : "hover:bg-slate-50 dark:hover:bg-slate-850"
          }`}
        >
          <div className="text-sm">{c.label}</div>
        </button>
      ))}
    </nav>
  );
}

// ---------- Main Component ----------
export default function UniversalConverter() {
  const categoryKeys = Object.keys(UNITS).filter((k) => !!UNITS[k].label);
  const categories = categoryKeys.map((k) => ({
    key: k,
    label: UNITS[k].label,
  }));
  const [active, setActive] = useState("length");

  return (
    <div className="min-h-screen p-4 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="mb-4">
              <h1 className="text-2xl font-bold">Universal Converter</h1>
              <p className="text-sm text-slate-500">
                One place for daily, physics, tech & lifestyle conversions.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-sm">
              <CategoryNav
                categories={categories}
                active={active}
                onSelect={setActive}
              />
            </div>

            <div className="mt-4 text-xs text-slate-500">
              Tip: pick a category, enter a value, switch units — sliders and
              visual controls coming in Lab.
            </div>
          </div>
        </aside>

        {/* Content area */}
        <main className="lg:col-span-3">
          <div className="grid grid-cols-1 gap-4">
            <ConverterCard categoryKey={active} />

            {/* Quick grid: show a few related categories compactly */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Show first two other categories as mini cards */}
              {categories
                .filter((c) => c.key !== active)
                .slice(0, 2)
                .map((c) => (
                  <div
                    key={c.key}
                    className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm"
                  >
                    <h4 className="font-semibold">{c.label}</h4>
                    <p className="text-sm text-slate-500">
                      Open from sidebar to convert.
                    </p>
                  </div>
                ))}
            </div>

            <div className="mt-2 text-xs text-slate-500">
              Built with React + Tailwind — drop into a Next.js page. Responsive
              & accessible.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
