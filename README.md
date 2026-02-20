# 🔭 The Observatory

> _Every answer, quietly given._

A sanctuary calculator platform — 265+ tools for finance, health, science, culture, and everything between. No ads. No pop-ups. Built for clarity, not noise.

---

## Stack

| Tool                | Role                                     |
| ------------------- | ---------------------------------------- |
| **React 18**        | UI framework                             |
| **React Router v6** | Client-side routing                      |
| **Tailwind CSS v3** | Design system / styling                  |
| **Vite 5**          | Build tool                               |
| **Vercel**          | Hosting & deployment                     |
| **Firestore**       | Database (user data, saved calculations) |

---

## Fonts (Google Fonts — already in `index.css`)

| Font                   | Role                                |
| ---------------------- | ----------------------------------- |
| **Cormorant Garamond** | Display / headings — serif gravitas |
| **Outfit**             | Body text — clean, modern           |
| **DM Mono**            | Numbers, code, keyboard hints       |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/observatory.git
cd observatory

# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev

# Build for production
npm run build
```

---

## Project Structure

```
observatory/
├── index.html               # HTML entry point
├── vite.config.js           # Vite + code splitting per calculator
├── tailwind.config.js       # Full Observatory design system
├── vercel.json              # SPA routing rewrite
├── postcss.config.js        # PostCSS + autoprefixer
│
└── src/
    ├── main.jsx             # App entry — BrowserRouter
    ├── App.jsx              # Routes + Navbar + SearchModal
    ├── index.css            # Global CSS + Tailwind + Observatory tokens
    │
    ├── data/
    │   └── calculators.js   # ALL 265+ calculators — single source of truth
    │
    ├── pages/
    │   ├── Home.jsx         # Landing page
    │   ├── Calculators.jsx  # Gallery — filter/sort grid
    │   ├── CalculatorDetail.jsx  # Calculator frame + Insight module
    │   ├── Mechanics.jsx    # Formula reference — the "why"
    │   ├── Look.jsx         # Design manifesto
    │   └── Lab.jsx          # Experimental tools
    │
    └── components/
        ├── layout/
        │   └── Navbar.jsx   # Fixed nav + mobile menu
        ├── ui/
        │   └── SearchModal.jsx  # ⌘K global search
        └── calculators/
            ├── CompoundInterest.jsx  ✅ Built
            ├── Mortgage.jsx          ✅ Built
            └── [id].jsx              ← add new calculators here
```

---

## Adding a New Calculator

### 1. It's already in the registry

Every calculator is already defined in `src/data/calculators.js`. Find your calculator's `id`.

### 2. Create the component

```bash
# Create the component file
touch src/components/calculators/YourCalculator.jsx
```

```jsx
// src/components/calculators/YourCalculator.jsx
import { useState, useMemo, useEffect } from "react";

export default function YourCalculator({ onResult }) {
  const [inputA, setInputA] = useState(0);

  const result = useMemo(() => {
    // Your calculation here
    return inputA * 2;
  }, [inputA]);

  // Notify the detail page of results (triggers Insight module)
  useEffect(() => {
    onResult?.({ result, insight: "An interesting fact about this result." });
  }, [result, onResult]);

  return (
    <div className="space-y-5">
      <div>
        <label className="obs-label block mb-2">Input A</label>
        <input
          type="number"
          value={inputA}
          onChange={(e) => setInputA(+e.target.value)}
          className="obs-input"
        />
      </div>
      <div className="border-t border-rim/30 pt-5">
        <p className="obs-label mb-1">Result</p>
        <p className="obs-result">{result}</p>
      </div>
    </div>
  );
}
```

### 3. Register in CalculatorDetail.jsx

```js
// src/pages/CalculatorDetail.jsx — CALC_COMPONENTS map
const CALC_COMPONENTS = {
  "compound-interest": lazy(
    () => import("../components/calculators/CompoundInterest"),
  ),
  mortgage: lazy(() => import("../components/calculators/Mortgage")),
  "your-id": lazy(() => import("../components/calculators/YourCalculator")), // ← add here
};
```

That's it. The page, breadcrumbs, related calculators, and Insight module are all automatic.

---

## Design System — Quick Reference

### Colour tokens (Tailwind class → CSS var)

| Token               | Class        | Use                        |
| ------------------- | ------------ | -------------------------- |
| void (`#08090e`)    | `bg-void`    | Deepest background         |
| dusk (`#101220`)    | `bg-dusk`    | Page background            |
| surface (`#181b2d`) | `bg-surface` | Cards, panels              |
| gold (`#c8924a`)    | `text-gold`  | Primary accent             |
| glow (`#7c6faa`)    | `text-glow`  | Secondary (Mechanics, Lab) |
| dawn (`#c46f60`)    | `text-dawn`  | Lab / experimental         |
| pale (`#c4bcb0`)    | `text-pale`  | Body text                  |
| dim (`#8a8399`)     | `text-dim`   | Placeholder / secondary    |

### Component classes

```jsx
<div className="obs-card">…</div>          // Glass card with hover border
<button className="obs-btn">…</button>     // Standard button
<button className="obs-btn-gold">…</button> // Gold accent button
<input className="obs-input" />            // Observatory input
<p className="obs-label">…</p>             // Uppercase tracking label
<p className="obs-result">…</p>            // Large answer display
<p className="obs-insight">…</p>           // Italic insight with gold left border
```

### Fonts

```jsx
className = "font-display"; // Cormorant Garamond — use for headings
className = "font-body"; // Outfit — use for body text
className = "font-mono"; // DM Mono — use for numbers, code
```

---

## Firestore Schema (planned)

```
users/{uid}/
  preferences: { currency, location, units }
  savedCalculations: [{ calcId, inputs, result, savedAt }]

calculatorMeta/{calcId}/
  viewCount: number
  lastUpdated: timestamp
```

---

## Nav Structure

| Route              | Page                                       |
| ------------------ | ------------------------------------------ |
| `/`                | Home — hero, featured, serendipity         |
| `/calculators`     | Gallery — filter/sort all 265+ calculators |
| `/calculators/:id` | Individual calculator                      |
| `/mechanics`       | Formula reference                          |
| `/look`            | Design manifesto                           |
| `/lab`             | Experimental tools                         |

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

`vercel.json` already handles SPA routing rewrites.

---

## Customise Your Logo & Name

1. Replace the SVG in `src/components/layout/Navbar.jsx → ObservatoryLogo()`
2. Replace the wordmark text `Observatory` in the same component
3. Update `index.html` `<title>` and `<meta description>`
4. Update the footer in `src/App.jsx → Footer()`

---

## Keyboard Shortcuts

| Key             | Action                   |
| --------------- | ------------------------ |
| `⌘K` / `Ctrl+K` | Open global search       |
| `↑ ↓`           | Navigate search results  |
| `Enter`         | Open selected calculator |
| `Esc`           | Close search             |

---

_Built on a principle: clarity before speed, accuracy before beauty, trust before scale._
