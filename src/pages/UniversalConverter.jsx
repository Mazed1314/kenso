import React, { useState, useEffect } from "react";
import {
  ArrowRightLeft,
  Droplet,
  Ruler,
  Thermometer,
  Zap,
  Scale,
  Clock,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* =============================================================================
  1. THE DATA BRAIN
  =============================================================================
*/
const conversionData = {
  length: {
    name: "Length",
    icon: <Ruler className="w-5 h-5" />,
    base: "m",
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
    name: "Mass",
    icon: <Scale className="w-5 h-5" />,
    base: "kg",
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
    type: "function",
    units: ["Celsius", "Fahrenheit", "Kelvin"],
  },
  volume: {
    name: "Volume",
    icon: <Droplet className="w-5 h-5" />,
    base: "l",
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
    base: "s",
    units: {
      s: 1,
      ms: 0.001,
      min: 60,
      h: 3600,
      d: 86400,
      wk: 604800,
      mo: 2628000,
      y: 31536000,
    },
  },
  speed: {
    name: "Speed",
    icon: <Zap className="w-5 h-5" />,
    base: "mps",
    units: { mps: 1, kph: 0.277778, mph: 0.44704, knots: 0.514444 },
  },
  pressure: {
    name: "Pressure",
    icon: <Zap className="w-5 h-5" />,
    base: "pa",
    units: { pa: 1, bar: 100000, psi: 6894.76, atm: 101325 },
  },
  energy: {
    name: "Energy",
    base: "j",
    units: { j: 1, kj: 1000, cal: 4.184, kcal: 4184, wh: 3600, kwh: 3600000 },
  },
  digital: {
    name: "Digital",
    base: "b",
    units: { b: 1, kb: 1024, mb: 1048576, gb: 1073741824, tb: 1099511627776 },
  },
  cooking: {
    name: "Cooking",
    type: "density",
    base: "g",
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
  const [category, setCategory] = useState("length");
  const [amount, setAmount] = useState(1);
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [ingredient, setIngredient] = useState("Flour (All Purpose)");
  const [showMechanics, setShowMechanics] = useState(false);

  // Initialize units when category changes
  useEffect(() => {
    const catData = conversionData[category];
    if (category === "cooking") {
      setFromUnit("cup");
      setToUnit("g");
    } else if (catData.units && !Array.isArray(catData.units)) {
      const keys = Object.keys(catData.units);
      setFromUnit(keys[0]);
      setToUnit(keys[1] || keys[0]);
    } else if (Array.isArray(catData.units)) {
      setFromUnit(catData.units[0]);
      setToUnit(catData.units[1]);
    }
  }, [category]);

  // Calculate Result
  const calculateResult = () => {
    const data = conversionData[category];
    if (!data || !fromUnit || !toUnit) return 0;

    if (data.type === "function") {
      let celsius;
      if (fromUnit === "Celsius") celsius = amount;
      if (fromUnit === "Fahrenheit") celsius = ((amount - 32) * 5) / 9;
      if (fromUnit === "Kelvin") celsius = amount - 273.15;

      if (toUnit === "Celsius") return celsius;
      if (toUnit === "Fahrenheit") return (celsius * 9) / 5 + 32;
      if (toUnit === "Kelvin") return celsius + 273.15;
    }

    if (data.type === "density") {
      const density = data.ingredients[ingredient];
      let cups = amount;
      if (fromUnit === "tbsp") cups = amount / 16;
      if (fromUnit === "tsp") cups = amount / 48;
      if (fromUnit === "ml") cups = amount / 237;
      const grams = cups * density;

      if (toUnit === "g") return grams;
      if (toUnit === "kg") return grams / 1000;
      if (toUnit === "oz") return grams * 0.035274;
      return grams;
    }

    const baseValue = amount * data.units[fromUnit];
    return baseValue / data.units[toUnit];
  };

  const result = calculateResult();

  const formatNumber = (num) => {
    if (num === 0) return 0;
    if (Math.abs(num) < 0.0001 || Math.abs(num) > 1000000)
      return num.toExponential(4);
    return parseFloat(num.toFixed(4));
  };

  // Safe helper to count units for the Mechanics formula
  const getUnitCount = () => {
    const units = conversionData[category].units;
    if (!units) return 0;
    return Array.isArray(units) ? units.length : Object.keys(units).length;
  };

  const unitCount = getUnitCount();

  return (
    // Wrapper uses "void" background
    <div className="w-full min-h-screen bg-[#08090e] p-4 md:p-8 font-sans flex flex-col items-center">
      {/* HEADER */}
      <div className="mb-10 text-center max-w-2xl w-full pt-8">
        <h2 className="text-3xl md:text-4xl font-serif text-[#e8e2d6] mb-3">
          The Universal Converter
        </h2>
        <p className="text-[#8a8399] italic">
          "Measure what is measurable, and make measurable what is not."
        </p>
      </div>

      {/* MAIN CARD: "surface" background */}
      <div className="w-full max-w-4xl bg-[#181b2d] rounded-2xl border border-[#343858] shadow-2xl overflow-hidden">
        {/* Category Navigation */}
        <div className="bg-[#101220] border-b border-[#343858] overflow-x-auto custom-scrollbar">
          <div className="flex p-2 space-x-1 min-w-max">
            {Object.keys(conversionData).map((key) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  category === key
                    ? "bg-[#242842] text-[#c8924a] ring-1 ring-[#c8924a]/30" // mist bg, gold text
                    : "text-[#8a8399] hover:bg-[#242842] hover:text-[#c4bcb0]" // dim text, hover mist
                }`}
              >
                {conversionData[key].icon || <Zap className="w-4 h-4" />}
                {conversionData[key].name}
              </button>
            ))}
          </div>
        </div>

        {/* Input/Output Section */}
        <div className="p-6 md:p-12 flex flex-col items-center w-full">
          {/* Cooking Ingredient Dropdown */}
          {category === "cooking" && (
            <div className="mb-8 w-full max-w-xs">
              <label className="block text-xs uppercase tracking-wider text-[#8a8399] mb-2 text-center">
                Ingredient
              </label>
              <select
                value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
                className="w-full p-3 bg-[#101220] rounded-lg text-center font-medium text-[#c4bcb0] border border-[#343858] focus:ring-1 focus:ring-[#c8924a] focus:outline-none appearance-none"
              >
                {Object.keys(conversionData.cooking.ingredients).map((ing) => (
                  <option
                    key={ing}
                    value={ing}
                    className="bg-[#101220] text-[#c4bcb0]"
                  >
                    {ing}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full max-w-3xl">
            {/* FROM SIDE */}
            <div className="flex flex-col w-full md:w-[45%] gap-2">
              <label className="text-xs uppercase tracking-wider text-[#8a8399] font-bold">
                From
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="text-4xl md:text-5xl font-mono bg-transparent border-b-2 border-[#343858] focus:border-[#c8924a] focus:outline-none transition-colors py-2 text-[#e8e2d6] w-full"
              />
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="mt-2 p-3 bg-[#101220] rounded-lg text-[#c4bcb0] border border-[#343858] focus:ring-1 focus:ring-[#c8924a] focus:outline-none w-full appearance-none"
              >
                {conversionData[category].type === "function" ||
                conversionData[category].type === "density"
                  ? conversionData[category].units.map((u) => (
                      <option key={u} value={u} className="bg-[#101220]">
                        {u}
                      </option>
                    ))
                  : Object.keys(conversionData[category].units).map((u) => (
                      <option key={u} value={u} className="bg-[#101220]">
                        {u}
                      </option>
                    ))}
              </select>
            </div>

            {/* SEPARATOR */}
            <div className="text-[#343858] transform rotate-90 md:rotate-0 flex-shrink-0">
              <ArrowRightLeft className="w-8 h-8" />
            </div>

            {/* TO SIDE */}
            <div className="flex flex-col w-full md:w-[45%] gap-2">
              <label className="text-xs uppercase tracking-wider text-[#8a8399] font-bold">
                To
              </label>
              <div className="text-4xl md:text-5xl font-mono text-[#c8924a] border-b-2 border-transparent py-2 truncate w-full">
                {formatNumber(result)}
              </div>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="mt-2 p-3 bg-[#101220] rounded-lg text-[#c4bcb0] border border-[#343858] focus:ring-1 focus:ring-[#c8924a] focus:outline-none w-full appearance-none"
              >
                {category === "cooking"
                  ? ["g", "kg", "oz"].map((u) => (
                      <option key={u} value={u} className="bg-[#101220]">
                        {u}
                      </option>
                    ))
                  : conversionData[category].type === "function"
                    ? conversionData[category].units.map((u) => (
                        <option key={u} value={u} className="bg-[#101220]">
                          {u}
                        </option>
                      ))
                    : Object.keys(conversionData[category].units).map((u) => (
                        <option key={u} value={u} className="bg-[#101220]">
                          {u}
                        </option>
                      ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= 
          THE MECHANICS (Explainer Toggle)
      ========================================================= */}
      <div className="w-full max-w-4xl flex flex-col items-center mt-8">
        <button
          onClick={() => setShowMechanics(!showMechanics)}
          className="group flex items-center space-x-2 text-[#8a8399] hover:text-[#d4b483] transition-colors text-sm font-sans tracking-widest uppercase mb-4"
        >
          <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>{showMechanics ? "Hide Mechanics" : "See the Mechanics"}</span>
        </button>

        <AnimatePresence>
          {showMechanics && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden w-full max-w-2xl bg-[#101220] rounded-xl border border-[#343858]"
            >
              <div className="p-6 md:p-8 text-[#c4bcb0] space-y-4">
                <h3 className="font-serif text-xl text-[#e8e2d6]">
                  How this works
                </h3>
                <p className="leading-relaxed">
                  We use the{" "}
                  <strong className="text-[#c8924a] font-normal">
                    Base Unit Method
                  </strong>
                  . Instead of creating a conversion formula for every possible
                  pair (which would require{" "}
                  <span className="text-[#e8e2d6]">
                    {unitCount * (unitCount - 1)}
                  </span>{" "}
                  formulas), we convert your input to a single base unit first.
                </p>
                <div className="bg-[#08090e] p-4 rounded-lg font-mono text-xs md:text-sm text-[#8a8399] border border-[#242842] flex flex-wrap gap-2 items-center justify-center text-center">
                  <span className="text-[#e8e2d6]">
                    {amount} {fromUnit}
                  </span>
                  <span className="text-[#343858]">→</span>
                  <span className="text-[#7c6faa]">
                    [
                    {conversionData[category].base
                      ? `Base: ${conversionData[category].base}`
                      : "Logic Engine"}
                    ]
                  </span>
                  <span className="text-[#343858]">→</span>
                  <span className="text-[#c8924a]">
                    {formatNumber(result)} {toUnit}
                  </span>
                </div>
                <p className="text-sm text-[#8a8399]">
                  This reduces complexity and ensures mathematical consistency
                  across the entire Observatory.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UniversalConverter;
