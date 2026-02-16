// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, Info, BookOpen, ChevronDown } from "lucide-react";

// // --- The Physics Engine (Logic) ---
// const CATEGORIES = {
//   length: {
//     units: ["meters", "feet", "kilometers", "miles"],
//     rates: { meters: 1, feet: 3.28084, kilometers: 0.001, miles: 0.000621371 },
//   },
//   weight: {
//     units: ["kilograms", "pounds", "grams", "ounces"],
//     rates: { kilograms: 1, pounds: 2.20462, grams: 1000, ounces: 35.274 },
//   },
//   temperature: {
//     units: ["Celsius", "Fahrenheit", "Kelvin"],
//     // Temp requires formulas, handled separately
//   },
// };

// const INSIGHTS = {
//   length:
//     "You've just calculated a distance that light travels in a fraction of a millisecond.",
//   weight: "Mass is a measure of an object's resistance to acceleration.",
//   temperature: "Temperature is simply the average kinetic energy of particles.",
// };

// export default function UniversalConverter() {
//   const [category, setCategory] = useState("length");
//   const [amount, setAmount] = useState(1);
//   const [fromUnit, setFromUnit] = useState(CATEGORIES.length.units[0]);
//   const [toUnit, setToUnit] = useState(CATEGORIES.length.units[1]);
//   const [result, setResult] = useState(null);
//   const [showMechanics, setShowMechanics] = useState(false);

//   // --- The Brain (Calculation Effect) ---
//   useEffect(() => {
//     // Reset units when category changes
//     if (!CATEGORIES[category].units.includes(fromUnit)) {
//       setFromUnit(CATEGORIES[category].units[0]);
//       setToUnit(CATEGORIES[category].units[1]);
//       return;
//     }

//     let calculated = 0;

//     if (category === "temperature") {
//       // Temp Logic
//       if (fromUnit === "Celsius" && toUnit === "Fahrenheit")
//         calculated = (amount * 9) / 5 + 32;
//       else if (fromUnit === "Fahrenheit" && toUnit === "Celsius")
//         calculated = ((amount - 32) * 5) / 9;
//       else if (fromUnit === toUnit) calculated = amount;
//       else calculated = amount; // Add Kelvin logic here
//     } else {
//       // Standard Linear Logic
//       const base = amount / CATEGORIES[category].rates[fromUnit];
//       calculated = base * CATEGORIES[category].rates[toUnit];
//     }

//     // Format: "1,234.56"
//     setResult(calculated.toLocaleString("en-US", { maximumFractionDigits: 4 }));
//   }, [amount, fromUnit, toUnit, category]);

//   return (
//     <div className="min-h-screen bg-stone-50 text-stone-800 font-serif flex flex-col items-center justify-center p-6 selection:bg-orange-100">
//       {/* 1. The Category Tabs (Minimal) */}
//       <nav className="mb-16 flex space-x-8 text-sm tracking-widest uppercase font-sans text-stone-400">
//         {Object.keys(CATEGORIES).map((cat) => (
//           <button
//             key={cat}
//             onClick={() => setCategory(cat)}
//             className={`transition-colors duration-300 hover:text-stone-800 ${
//               category === cat
//                 ? "text-stone-800 font-semibold border-b border-stone-800"
//                 : ""
//             }`}
//           >
//             {cat}
//           </button>
//         ))}
//       </nav>

//       {/* 2. The Altar (Main Input) */}
//       <motion.div
//         layout
//         className="max-w-4xl w-full flex flex-col items-center space-y-12"
//       >
//         <div className="text-3xl md:text-5xl leading-relaxed text-center flex flex-wrap items-baseline justify-center gap-x-4 gap-y-6">
//           <span className="text-stone-400">I want to turn</span>

//           {/* Amount Input */}
//           <div className="relative group">
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
//               className="w-32 bg-transparent border-b-2 border-stone-300 text-center font-mono focus:outline-none focus:border-orange-500 transition-colors text-stone-900"
//             />
//           </div>

//           {/* From Unit Select */}
//           <div className="relative">
//             <select
//               value={fromUnit}
//               onChange={(e) => setFromUnit(e.target.value)}
//               className="appearance-none bg-transparent border-b-2 border-stone-300 pb-1 pr-8 text-center font-serif cursor-pointer hover:border-stone-500 focus:outline-none"
//             >
//               {CATEGORIES[category].units.map((u) => (
//                 <option key={u} value={u}>
//                   {u}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400" />
//           </div>

//           <span className="text-stone-400 italic">into</span>

//           {/* To Unit Select */}
//           <div className="relative">
//             <select
//               value={toUnit}
//               onChange={(e) => setToUnit(e.target.value)}
//               className="appearance-none bg-transparent border-b-2 border-stone-300 pb-1 pr-8 text-center font-serif cursor-pointer hover:border-stone-500 focus:outline-none"
//             >
//               {CATEGORIES[category].units.map((u) => (
//                 <option key={u} value={u}>
//                   {u}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400" />
//           </div>
//         </div>

//         {/* 3. The Revelation (Result) */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={result + toUnit}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.4 }}
//             className="text-center"
//           >
//             <div className="text-6xl md:text-8xl font-mono text-stone-900 font-light tracking-tight">
//               {result}
//             </div>
//             <div className="text-stone-500 mt-4 text-lg font-sans">
//               {toUnit}
//             </div>
//           </motion.div>
//         </AnimatePresence>

//         {/* 4. The Insight (Retention Hook) */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5 }}
//           className="mt-8 p-6 bg-white/50 backdrop-blur-sm rounded-lg border border-stone-100 max-w-lg text-center"
//         >
//           <p className="text-stone-600 italic font-serif leading-relaxed">
//             "{INSIGHTS[category]}"
//           </p>
//         </motion.div>

//         {/* 5. The Mechanics (Explainer Toggle) */}
//         <button
//           onClick={() => setShowMechanics(!showMechanics)}
//           className="group flex items-center space-x-2 text-stone-400 hover:text-orange-600 transition-colors mt-12 text-sm font-sans tracking-wide uppercase"
//         >
//           <BookOpen className="w-4 h-4" />
//           <span>{showMechanics ? "Hide Mechanics" : "See the Mechanics"}</span>
//         </button>

//         <AnimatePresence>
//           {showMechanics && (
//             <motion.div
//               initial={{ height: 0, opacity: 0 }}
//               animate={{ height: "auto", opacity: 1 }}
//               exit={{ height: 0, opacity: 0 }}
//               className="overflow-hidden w-full max-w-2xl bg-stone-100 rounded-xl"
//             >
//               <div className="p-8 text-stone-700 space-y-4">
//                 <h3 className="font-serif text-xl text-stone-900">
//                   How this works
//                 </h3>
//                 <p className="leading-relaxed">
//                   We use the <strong>Base Unit Method</strong>. Instead of
//                   creating a conversion formula for every possible pair (which
//                   would require{" "}
//                   {CATEGORIES[category].units.length *
//                     (CATEGORIES[category].units.length - 1)}{" "}
//                   formulas), we convert your input to a single base unit first.
//                 </p>
//                 <div className="bg-white p-4 rounded font-mono text-xs md:text-sm text-stone-600 border border-stone-200">
//                   {amount} {fromUnit} → [Base Unit] → {result} {toUnit}
//                 </div>
//                 <p className="text-sm text-stone-500">
//                   This reduces complexity and ensures mathematical consistency
//                   across the entire Observatory.
//                 </p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Footer Element */}
//       <div className="fixed bottom-8 text-stone-300 text-xs tracking-widest uppercase">
//         The Observatory
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  ArrowRightLeft,
  Info,
  Droplet,
  Ruler,
  Thermometer,
  Zap,
  Scale,
  Clock,
  Globe,
} from "lucide-react";

/* =============================================================================
  1. THE DATA BRAIN
  We define a "base" unit for each category (e.g., meters for length).
  All conversions go: Input -> Base -> Output.
  =============================================================================
*/
const conversionData = {
  // --- 1. The Fundamentals ---
  length: {
    name: "Length",
    icon: <Ruler className="w-5 h-5" />,
    base: "m", // Base unit: Meter
    units: {
      m: 1,
      cm: 0.01,
      mm: 0.001,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
    },
  },
  mass: {
    name: "Mass & Weight",
    icon: <Scale className="w-5 h-5" />,
    base: "kg", // Base unit: Kilogram
    units: {
      kg: 1,
      g: 0.001,
      mg: 0.000001,
      lb: 0.453592,
      oz: 0.0283495,
      st: 6.35029,
      t: 1000,
    },
  },
  temperature: {
    name: "Temperature",
    icon: <Thermometer className="w-5 h-5" />,
    type: "function", // Special handling for Temp
    units: ["Celsius", "Fahrenheit", "Kelvin"],
  },
  volume: {
    name: "Volume",
    icon: <Droplet className="w-5 h-5" />,
    base: "l", // Base unit: Liter
    units: {
      l: 1,
      ml: 0.001,
      gal: 3.78541,
      qt: 0.946353,
      pt: 0.473176,
      cup: 0.236588,
      fl_oz: 0.0295735,
    },
  },
  time: {
    name: "Time",
    icon: <Clock className="w-5 h-5" />,
    base: "s", // Base unit: Second
    units: {
      s: 1,
      ms: 0.001,
      min: 60,
      h: 3600,
      d: 86400,
      wk: 604800,
      mo: 2628000, // Approx
      y: 31536000,
    },
  },

  // --- 2. The Physics Engine ---
  speed: {
    name: "Speed",
    icon: <Zap className="w-5 h-5" />,
    base: "mps", // Meters per second
    units: {
      mps: 1,
      kph: 0.277778,
      mph: 0.44704,
      knots: 0.514444,
    },
  },
  pressure: {
    name: "Pressure",
    icon: <Zap className="w-5 h-5" />, // Reusing icon for brevity
    base: "pa", // Pascal
    units: {
      pa: 1,
      bar: 100000,
      psi: 6894.76,
      atm: 101325,
    },
  },
  energy: {
    name: "Energy",
    base: "j", // Joule
    units: {
      j: 1,
      kj: 1000,
      cal: 4.184,
      kcal: 4184,
      wh: 3600,
      kwh: 3600000,
    },
  },

  // --- 4. The Invisible World ---
  digital: {
    name: "Digital Storage",
    base: "b", // Byte
    units: {
      b: 1,
      kb: 1024,
      mb: 1048576,
      gb: 1073741824,
      tb: 1099511627776,
    },
  },

  // --- 5. Human Context (Special Logic) ---
  cooking: {
    name: "Cooking (Density)",
    type: "density",
    base: "g", // Grams
    // Density = grams per cup (approx)
    ingredients: {
      Water: 237,
      "Flour (All Purpose)": 120,
      "Sugar (Granulated)": 200,
      "Rice (Uncooked)": 185,
      Butter: 227,
      Honey: 340,
    },
    units: ["cup", "tbsp", "tsp", "ml"],
  },
};

/* =============================================================================
  2. THE COMPONENT
  =============================================================================
*/
const UniversalConverter = () => {
  // --- State Management ---
  const [category, setCategory] = useState("length");
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [ingredient, setIngredient] = useState("Flour (All Purpose)"); // Only for cooking

  // Initialize units when category changes
  useEffect(() => {
    const catData = conversionData[category];
    if (category === "cooking") {
      setFromUnit("cup");
      setToUnit("g"); // Default to weight
    } else if (catData.units && !Array.isArray(catData.units)) {
      // For standard objects
      const keys = Object.keys(catData.units);
      setFromUnit(keys[0]);
      setToUnit(keys[1] || keys[0]);
    } else if (Array.isArray(catData.units)) {
      // For Temperature arrays
      setFromUnit(catData.units[0]);
      setToUnit(catData.units[1]);
    }
  }, [category]);

  // --- The Engine: Calculate Result ---
  const calculateResult = () => {
    const data = conversionData[category];
    if (!data || !fromUnit || !toUnit) return 0;

    // 1. Temperature Logic (Formula based)
    if (data.type === "function") {
      let celsius;
      // Convert TO Celsius first
      if (fromUnit === "Celsius") celsius = amount;
      if (fromUnit === "Fahrenheit") celsius = ((amount - 32) * 5) / 9;
      if (fromUnit === "Kelvin") celsius = amount - 273.15;

      // Convert FROM Celsius to Target
      if (toUnit === "Celsius") return celsius;
      if (toUnit === "Fahrenheit") return (celsius * 9) / 5 + 32;
      if (toUnit === "Kelvin") return celsius + 273.15;
    }

    // 2. Cooking Logic (Density based)
    if (data.type === "density") {
      // Simple logic: Volume -> Weight only for demo
      // 1 cup of ingredient = X grams
      const density = data.ingredients[ingredient]; // grams per 1 cup

      // Convert input volume to cups first
      let cups = amount;
      if (fromUnit === "tbsp") cups = amount / 16;
      if (fromUnit === "tsp") cups = amount / 48;
      if (fromUnit === "ml") cups = amount / 237;

      // Convert cups to grams
      const grams = cups * density;

      // Output logic
      if (toUnit === "g") return grams;
      if (toUnit === "kg") return grams / 1000;
      if (toUnit === "oz") return grams * 0.035274;
      return grams; // default
    }

    // 3. Standard Logic (Linear Multiplier)
    const baseValue = amount * data.units[fromUnit]; // Convert to Base
    const result = baseValue / data.units[toUnit]; // Convert to Target
    return result;
  };

  const result = calculateResult();

  // --- Helper: Format Numbers Nicely ---
  const formatNumber = (num) => {
    if (num === 0) return 0;
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1000000) {
      return num.toExponential(4);
    }
    return parseFloat(num.toFixed(4));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 font-sans text-slate-800">
      {/* --- HEADER --- */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">
          The Universal Converter
        </h2>
        <p className="text-slate-500 italic">
          "Measure what is measurable, and make measurable what is not."
        </p>
      </div>

      {/* --- MAIN CARD --- */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* 1. Category Navigation (Scrollable on mobile) */}
        <div className="bg-slate-50 border-b border-slate-200 overflow-x-auto">
          <div className="flex p-2 space-x-1 min-w-max">
            {Object.keys(conversionData).map((key) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-full text-sm font-medium transition-all ${
                  category === key
                    ? "bg-white shadow-sm text-indigo-600 ring-1 ring-indigo-100"
                    : "text-slate-500 hover:bg-slate-100"
                }`}
              >
                {conversionData[key].icon || <Zap className="w-4 h-4" />}
                {conversionData[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* 2. The Altar (Input Section) */}
        <div className="p-8 md:p-12 flex flex-col items-center">
          {/* Cooking Special: Ingredient Selector */}
          {category === "cooking" && (
            <div className="mb-6 w-full max-w-xs">
              <label className="block text-xs uppercase tracking-wide text-slate-400 mb-1 text-center">
                Ingredient
              </label>
              <select
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="w-full p-2 bg-slate-50 rounded-lg text-center font-medium text-slate-700 border-none focus:ring-2 focus:ring-indigo-100"
              >
                {Object.keys(conversionData.cooking.ingredients).map((ing) => (
                  <option key={ing} value={ing}>
                    {ing}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full justify-center">
            {/* Input Side */}
            <div className="flex flex-col w-full md:w-1/3 gap-3">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold ml-1">
                From
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="text-4xl md:text-5xl font-mono bg-transparent border-b-2 border-slate-200 focus:border-indigo-500 focus:outline-none transition-colors py-2 text-slate-900 w-full"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="p-2 bg-slate-50 rounded-lg text-slate-600 border-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
              >
                {/* Dynamically Populate Units */}
                {conversionData[category].type === "function" ||
                conversionData[category].type === "density"
                  ? conversionData[category].units.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))
                  : Object.keys(conversionData[category].units).map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
              </select>
            </div>

            {/* Icon Separator */}
            <div className="text-slate-300 transform rotate-90 md:rotate-0">
              <ArrowRightLeft className="w-8 h-8" />
            </div>

            {/* Output Side */}
            <div className="flex flex-col w-full md:w-1/3 gap-3">
              <label className="text-xs uppercase tracking-wider text-slate-400 font-bold ml-1">
                To
              </label>
              <div className="text-4xl md:text-5xl font-mono text-indigo-600 border-b-2 border-transparent py-2 truncate">
                {formatNumber(result)}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="p-2 bg-slate-50 rounded-lg text-slate-600 border-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
              >
                {category === "cooking"
                  ? ["g", "kg", "oz"].map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))
                  : conversionData[category].type === "function"
                    ? conversionData[category].units.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))
                    : Object.keys(conversionData[category].units).map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
              </select>
            </div>
          </div>
        </div>

        {/* 3. The Insight Module (Footer) */}
        <div className="bg-indigo-50/50 p-6 flex items-start gap-4 border-t border-indigo-50">
          <Info className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-serif font-bold text-indigo-900">
              Mechanics of this conversion
            </h4>
            <p className="text-sm text-indigo-800/80 mt-1">
              {category === "temperature"
                ? "Temperature scales are offsets, not just multiples. Celsius and Kelvin share the same magnitude, but start at different zeros."
                : category === "cooking"
                  ? `Density matters here. We assume ${ingredient} has a specific weight per volume, but packing density (how tight you scoop) can vary this by 20%.`
                  : `This calculation uses a linear base-unit conversion. We convert your input to ${conversionData[category].base}, then divide by the target unit's ratio.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversalConverter;
