import { RiCameraLensLine } from "react-icons/ri";
import { MdTimeline } from "react-icons/md";
import { BiDoughnutChart } from "react-icons/bi";
import { TbMathIntegral, TbTopologyStarRing2 } from "react-icons/tb";
import {
  Atom,
  Beaker,
  Calculator,
  ChartBar,
  Circle,
  Clock,
  CloudLightning,
  Coffee,
  Eye,
  Globe,
  Laugh,
  MapPin,
  Microscope,
  Moon,
  Puzzle,
  Sigma,
  Sparkles,
  Stars,
  Wind,
  Infinity,
  Magnet,
  Mountain,
  Leaf,
  Pi,
  Orbit,
  Compass,
  Smile,
  ChartSpline,
  Bot,
  Dna,
  Waves,
  Cat,
  Hexagon,
  WavesLadder,
  Rocket,
  Banana,
  Activity,
  Brain,
  Thermometer,
  ChefHat,
  Cloud,
  Dot,
  Heart,
  Battery,
  Signal,
  Radiation,
  CircuitBoard,
  Clipboard,
  Rainbow,
  Earth,
  Sparkle,
  Sun,
  Laptop,
  Ghost,
  LineSquiggle,
  Telescope,
  Trees,
  RotateCw,
  Sprout,
  Radical,
  Phone,
  SmartphoneCharging,
  Move3d,
  Balloon,
} from "lucide-react";
import {
  GiBlackHoleBolas,
  GiBridge,
  GiButterflyWarning,
  GiClockwiseRotation,
  GiCrystalGrowth,
  GiEnergyArrow,
  GiGalaxy,
  GiMirrorMirror,
  GiShrug,
  GiSpring,
} from "react-icons/gi";
import {
  FaCity,
  FaFlask,
  FaPersonFalling,
  FaVectorSquare,
} from "react-icons/fa6";
import {
  SiClubforce,
  SiDotnet,
  SiMatrix,
  SiPhoton,
  SiSteelseries,
  SiTacobell,
} from "react-icons/si";
import {
  BsEmojiSmileUpsideDown,
  BsLightningCharge,
  BsVirus,
} from "react-icons/bs";
import { CiCalculator2 } from "react-icons/ci";

const wonders = [
  {
    id: 1,
    type: "fact",
    icon: <Stars className="w-6 h-6 text-amber-300" />,
    title: "Stardust",
    content:
      "Every atom in your body heavier than hydrogen was forged in the heart of an exploding star. You are not just in the universe; the universe is in you.",
    bg: "bg-gradient-to-br from-slate-900 to-indigo-950 text-white",
  },
  {
    id: 2,
    type: "breathing",
    icon: <Wind className="w-6 h-6 text-sky-300" />,
    title: "The Pause",
    content: "Don't calculate for a moment. Just watch.",
    action: "breathe",
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 3,
    type: "fact",
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
    title: "The Pale Blue Dot",
    content:
      "From the distance of Saturn, Earth appears as a single pixel of light. All of history lived on that mote of dust suspended in a sunbeam.",
    bg: "bg-slate-950 text-emerald-50",
  },
  {
    id: 4,
    type: "perspective",
    icon: <Circle className="w-6 h-6 text-rose-300" />,
    title: "Golden Ratio",
    content:
      "The same ~1.618 ratio shows up in galaxies, seashells, and sometimes in terrible logo decisions.",
    bg: "bg-gradient-to-br from-rose-950 to-slate-900 text-rose-50",
  },
  {
    id: 5,
    type: "time",
    icon: <Sparkles className="w-6 h-6 text-purple-300" />,
    title: "Light Travel",
    content:
      "Light hitting your eyes left the Sun 8 minutes and 20 seconds earlier. You're always seeing the sun's 8-minute-old selfie.",
    bg: "bg-indigo-950 text-purple-50",
  },
  {
    id: 6,
    type: "math",
    icon: <Calculator className="w-6 h-6 text-yellow-300" />,
    title: "π Is a Party",
    content:
      "Pi (π) is infinite and non-repeating. If you recite digits of π like a song, the song never ends — and it's probably not charting.",
    bg: "bg-gradient-to-br from-yellow-900 to-slate-900 text-yellow-50",
  },
  {
    id: 7,
    type: "physics",
    icon: <Atom className="w-6 h-6 text-rose-400" />,
    title: "Quantum Neighbors",
    content:
      "Two entangled particles behave like drama besties: what happens to one, the other knows instantly, no text required.",
    bg: "bg-gradient-to-br from-purple-950 to-slate-900 text-purple-50",
  },
  {
    id: 8,
    type: "funny",
    icon: <Laugh className="w-6 h-6 text-pink-300" />,
    title: "Probability of Socks",
    content:
      "In any laundry load, the chance of losing one sock approaches 1 as soon as the cycle starts. This is known as Sock Entropy.",
    bg: "bg-gradient-to-br from-pink-900 to-slate-900 text-pink-50",
  },
  {
    id: 9,
    type: "world",
    icon: <MapPin className="w-6 h-6 text-emerald-300" />,
    title: "Deep Ocean Unknowns",
    content:
      "We have mapped more of the Moon's surface than the deep ocean. The oceans are basically Earth's secret menu.",
    bg: "bg-gradient-to-br from-teal-950 to-slate-900 text-teal-50",
  },
  {
    id: 10,
    type: "science",
    icon: <Beaker className="w-6 h-6 text-cyan-300" />,
    title: "DNA Data",
    content:
      "Your genome stores information more densely than any flash drive — but try explaining that to your inbox.",
    bg: "bg-gradient-to-br from-cyan-900 to-slate-900 text-cyan-50",
  },
  {
    id: 11,
    type: "math",
    icon: <Sigma className="w-6 h-6 text-indigo-300" />,
    title: "Factorial Explosion",
    content:
      "10! = 3,628,800. Factorials grow so fast they make your to-do list look optimistic.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 12,
    type: "physics",
    icon: <CloudLightning className="w-6 h-6 text-yellow-400" />,
    title: "Speed Limit",
    content:
      "Nothing with mass can reach the speed of light (299,792,458 m/s). Trying makes physics frown dramatically.",
    bg: "bg-slate-900 text-yellow-50",
  },
  {
    id: 13,
    type: "funny",
    icon: <Puzzle className="w-6 h-6 text-lime-300" />,
    title: "Zero Is Special",
    content:
      "Zero is the only integer that is neither positive nor negative — basically the Switzerland of numbers.",
    bg: "bg-gradient-to-br from-lime-950 to-slate-900 text-lime-50",
  },
  {
    id: 14,
    type: "fact",
    icon: <Moon className="w-6 h-6 text-slate-300" />,
    title: "Moon Dust Memory",
    content:
      "Moon rocks brought back by Apollo missions are older than most mountains on Earth. They’re like ancient space receipts.",
    bg: "bg-gradient-to-br from-slate-800 to-indigo-900 text-white",
  },
  {
    id: 15,
    type: "math",
    icon: <ChartBar className="w-6 h-6 text-emerald-300" />,
    title: "Benford's Law",
    content:
      "In many real datasets, leading digit 1 appears more often than 9. Nature is low-key biased toward 1.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 16,
    type: "perspective",
    icon: <Eye className="w-6 h-6 text-rose-300" />,
    title: "Scale Switch",
    content:
      "A human cell is roughly 10 micrometers; a red blood cell is smaller than a hair, and yet both host entire microscopic cities.",
    bg: "bg-gradient-to-br from-rose-950 to-slate-900 text-rose-50",
  },
  {
    id: 17,
    type: "time",
    icon: <Clock className="w-6 h-6 text-sky-300" />,
    title: "Cosmic Calendar",
    content:
      "If the universe's 13.8 billion years were one year, humans show up in the last few seconds. Party crashers, but dramatic ones.",
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 18,
    type: "science",
    icon: <Microscope className="w-6 h-6 text-green-300" />,
    title: "Microbial Majority",
    content:
      "Microbes outnumber human cells in your body by an order of magnitude — you're more microbe-host than solo you.",
    bg: "bg-gradient-to-br from-green-950 to-slate-900 text-green-50",
  },
  {
    id: 19,
    type: "funny",
    icon: <Coffee className="w-6 h-6 text-amber-400" />,
    title: "Caffeine Math",
    content:
      "A coffee boost is just applied chemistry that convinces your brain to be more optimistic about deadlines.",
    bg: "bg-gradient-to-br from-amber-900 to-slate-900 text-amber-50",
  },
  {
    id: 20,
    type: "math",
    icon: <Infinity className="w-6 h-6 text-violet-300" />,
    title: "Countable Infinity",
    content:
      "Integers are infinite but 'countable' — you can list them all (in theory) but you’ll die before finishing the job.",
    bg: "bg-gradient-to-br from-violet-950 to-slate-900 text-violet-50",
  },
  {
    id: 21,
    type: "physics",
    icon: <Magnet className="w-6 h-6 text-indigo-300" />,
    title: "Magnetic Hide & Seek",
    content:
      "Earth’s magnetic field flips every few hundred thousand years. Magnetic north is basically a game of cosmic musical chairs.",
    bg: "bg-gradient-to-br from-indigo-900 to-slate-900 text-indigo-50",
  },
  {
    id: 22,
    type: "world",
    icon: <Mountain className="w-6 h-6 text-amber-300" />,
    title: "Tallest Perspective",
    content:
      "Mount Everest grows roughly 4 mm per year due to tectonic squeeze. Mountains are slow but legally persistent.",
    bg: "bg-gradient-to-br from-amber-950 to-slate-900 text-amber-50",
  },
  {
    id: 23,
    type: "science",
    icon: <Leaf className="w-6 h-6 text-green-300" />,
    title: "Photosynthesis Efficiency",
    content:
      "Plants convert sunlight to energy at about 1–2% efficiency in nature — still outperforming many solar panels in terms of chill.",
    bg: "bg-green-950 text-green-50",
  },
  {
    id: 24,
    type: "funny",
    icon: <Bot className="w-6 h-6 text-sky-300" />,
    title: "AI vs Nap",
    content:
      "Artificial intelligence can beat humans at chess, but it can't enjoy a nap. For now, naps remain undefeated.",
    bg: "bg-gradient-to-br from-sky-950 to-slate-900 text-sky-50",
  },
  {
    id: 25,
    type: "math",
    icon: <Pi className="w-6 h-6 text-rose-300" />,
    title: "Prime Curiosity",
    content:
      "There are infinitely many primes. Proofs exist that are elegant and make mathematicians whisper 'nice' with reverence.",
    bg: "bg-gradient-to-br from-rose-900 to-slate-900 text-rose-50",
  },
  {
    id: 26,
    type: "physics",
    icon: <Orbit className="w-6 h-6 text-emerald-300" />,
    title: "Earth's Speed",
    content:
      "Earth orbits the Sun at ~29.78 km/s. You're moving fast enough to outrun most Wi-Fi connections in a metaphorical sense.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 27,
    type: "perspective",
    icon: <Compass className="w-6 h-6 text-sky-300" />,
    title: "Historical Scales",
    content:
      "Deep time makes human history look like margins in a massive textbook. Be proud of your little scribbles.",
    bg: "bg-gradient-to-br from-sky-950 to-slate-900 text-sky-50",
  },
  {
    id: 28,
    type: "funny",
    icon: <Smile className="w-6 h-6 text-pink-300" />,
    title: "Thermodynamic Laziness",
    content:
      "Objects prefer disorder; this explains your desk and the universe on the same cold, scientific level.",
    bg: "bg-gradient-to-br from-pink-900 to-slate-900 text-pink-50",
  },
  {
    id: 29,
    type: "math",
    icon: <ChartSpline className="w-6 h-6 text-indigo-300" />,
    title: "Exponential Surprise",
    content:
      "Exponential growth sneaks up on you: 2¹⁰ = 1024, 2²⁰ ≈ 1,048,576. Numbers become unhinged quickly.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 30,
    type: "science",
    icon: <Dna className="w-6 h-6 text-rose-300" />,
    title: "Shared Genes",
    content:
      "You share about 50% of your DNA with bananas. Not enough to make you peelable, sadly.",
    bg: "bg-gradient-to-br from-rose-950 to-slate-900 text-rose-50",
  },
  {
    id: 31,
    type: "physics",
    icon: <Waves className="w-6 h-6 text-cyan-300" />,
    title: "Wave-Particle Mood",
    content:
      "Light sometimes acts like particles, sometimes like waves. It's emotionally complex and scientifically delightful.",
    bg: "bg-gradient-to-br from-cyan-900 to-slate-900 text-cyan-50",
  },
  {
    id: 32,
    type: "funny",
    icon: <Cat className="w-6 h-6 text-amber-300" />,
    title: "Schrödinger's Cat (Simplified)",
    content:
      "Schrödinger's cat is a thought experiment about superposition, not an actual feline influencer.",
    bg: "bg-gradient-to-br from-amber-950 to-slate-900 text-amber-50",
  },
  {
    id: 33,
    type: "math",
    icon: <Hexagon className="w-6 h-6 text-emerald-300" />,
    title: "Hex Numbers",
    content:
      "Hexadecimal is base-16 — programmers' secret handshake. Colors in CSS owe it a lot.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 34,
    type: "world",
    icon: <WavesLadder className="w-6 h-6 text-blue-300" />,
    title: "Volume of Water",
    content:
      "About 71% of Earth's surface is water, but only ~2.5% is freshwater — and most of that is frozen or shy.",
    bg: "bg-gradient-to-br from-blue-900 to-slate-900 text-blue-50",
  },
  {
    id: 35,
    type: "science",
    icon: <Rocket className="w-6 h-6 text-indigo-300" />,
    title: "Escape Velocity",
    content:
      "To leave Earth you need ~11.2 km/s. Rocket fuel is the universe's expensive passport.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 36,
    type: "funny",
    icon: <Banana className="w-6 h-6 text-yellow-300" />,
    title: "Banana Radiation",
    content:
      "Bananas are slightly radioactive due to potassium-40. Don't panic — snack responsibly and scientifically.",
    bg: "bg-gradient-to-br from-yellow-900 to-slate-900 text-yellow-50",
  },
  {
    id: 37,
    type: "math",
    icon: <Activity className="w-6 h-6 text-rose-300" />,
    title: "Fibonacci Everywhere",
    content:
      "Fibonacci numbers pop up in pinecones and sunflowers. Nature low-key loves nice patterns.",
    bg: "bg-gradient-to-br from-rose-900 to-slate-900 text-rose-50",
  },
  {
    id: 38,
    type: "physics",
    icon: <FaPersonFalling className="w-6 h-6 text-slate-300" />,
    title: "Microgravity Mood",
    content:
      "Astronauts float because they are in free-fall around Earth — like the coolest kind of falling with style.",
    bg: "bg-gradient-to-br from-slate-800 to-indigo-900 text-white",
  },
  {
    id: 39,
    type: "world",
    icon: <Clock className="w-6 h-6 text-sky-300" />,
    title: "International Time",
    content:
      "Time zones were standardized for trains — so blame your late grandad's toy train for modern jet lag.",
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 40,
    type: "funny",
    icon: <Brain className="w-6 h-6 text-purple-300" />,
    title: "Your Brain Energy",
    content:
      "Your brain uses ~20% of your body's energy while taking up ~2% of body mass. It's dramatic and very demanding.",
    bg: "bg-gradient-to-br from-purple-950 to-slate-900 text-purple-50",
  },
  {
    id: 41,
    type: "math",
    icon: <LineSquiggle className="w-6 h-6 text-indigo-300" />,
    title: "Euler's Identity Flex",
    content:
      "e^{iπ} + 1 = 0. Five fundamental constants in one neat, stylish equation. Pure math glam.",
    bg: "bg-gradient-to-br from-indigo-900 to-slate-900 text-indigo-50",
  },
  {
    id: 42,
    type: "science",
    icon: <FaFlask className="w-6 h-6 text-green-300" />,
    title: "Periodic Party",
    content:
      "The periodic table organizes elements by properties — chemistry's ultimate sorted playlist.",
    bg: "bg-gradient-to-br from-green-950 to-slate-900 text-green-50",
  },
  {
    id: 43,
    type: "physics",
    icon: <Thermometer className="w-6 h-6 text-red-300" />,
    title: "Absolute Zero",
    content:
      "Absolute zero (-273.15°C) is the theoretical lowest temperature. Molecules hate it and slow to a near-stop.",
    bg: "bg-gradient-to-br from-red-900 to-slate-900 text-red-50",
  },
  {
    id: 44,
    type: "perspective",
    icon: <Telescope className="w-6 h-6 text-sky-300" />,
    title: "Lookback Time",
    content:
      "Starlight takes time. That star you admire might be long gone; astronomy is nostalgia with a telescope.",
    bg: "bg-gradient-to-br from-sky-950 to-slate-900 text-sky-50",
  },
  {
    id: 45,
    type: "funny",
    icon: <ChefHat className="w-6 h-6 text-amber-300" />,
    title: "Cooking Chemistry",
    content:
      "Baking is applied chemistry with a tastier payoff. Flour + heat = edible joy and occasional frustration.",
    bg: "bg-gradient-to-br from-amber-900 to-slate-900 text-amber-50",
  },
  {
    id: 46,
    type: "math",
    icon: <FaVectorSquare className="w-6 h-6 text-emerald-300" />,
    title: "Dimensions",
    content:
      "Vectors have direction and magnitude. Think of them as arrows with better resumes.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 47,
    type: "science",
    icon: <Cloud className="w-6 h-6 text-blue-300" />,
    title: "Water Cycle",
    content:
      "Water cycles through atmosphere, land, and sea endlessly. It's Earth's long-running soap opera.",
    bg: "bg-gradient-to-br from-blue-900 to-slate-900 text-blue-50",
  },
  {
    id: 48,
    type: "physics",
    icon: <SiClubforce className="w-6 h-6 text-slate-300" />,
    title: "g on Earth",
    content:
      "Standard gravity (g) ≈ 9.80665 m/s². Drop something and physics will prove it wrong — repeatedly.",
    bg: "bg-gradient-to-br from-slate-800 to-indigo-900 text-white",
  },
  {
    id: 49,
    type: "funny",
    icon: <BsEmojiSmileUpsideDown className="w-6 h-6 text-pink-300" />,
    title: "Chaos Theory Mood",
    content:
      "A butterfly flaps its wings and your planner gets deleted — chaos theory is just drama in fancy math clothes.",
    bg: "bg-gradient-to-br from-pink-950 to-slate-900 text-pink-50",
  },
  {
    id: 50,
    type: "math",
    icon: <Dot className="w-6 h-6 text-indigo-300" />,
    title: "Zero to Hero",
    content:
      "0⁰ is indeterminate in calculus contexts. Sometimes math refuses to give a straight answer — classy mystery.",
    bg: "bg-gradient-to-br from-indigo-900 to-slate-900 text-indigo-50",
  },
  {
    id: 51,
    type: "world",
    icon: <Trees className="w-6 h-6 text-green-300" />,
    title: "Forest Footprint",
    content:
      "Forests store carbon and memories of climates past. Planting trees is an investment in Earth's retirement plan.",
    bg: "bg-gradient-to-br from-green-900 to-slate-900 text-green-50",
  },
  {
    id: 52,
    type: "science",
    icon: <Heart className="w-6 h-6 text-red-300" />,
    title: "Heartbeat Math",
    content:
      "Average human heart beats ~100,000 times/day. It's a tiny drummer that never misses practice.",
    bg: "bg-gradient-to-br from-red-900 to-slate-900 text-red-50",
  },
  {
    id: 53,
    type: "physics",
    icon: <GiBlackHoleBolas className="w-6 h-6 text-slate-300" />,
    title: "Black Hole Boundary",
    content:
      "Event horizons hide everything that crosses them — information gets weird and physicists get excited.",
    bg: "bg-gradient-to-br from-slate-900 to-indigo-950 text-white",
  },
  {
    id: 54,
    type: "funny",
    icon: <RotateCw className="w-6 h-6 text-amber-300" />,
    title: "Relativity of Deadlines",
    content:
      "To you, the deadline was yesterday; to physics, time dilation might say it's flexible. Work with relativity — politely.",
    bg: "bg-gradient-to-br from-amber-950 to-slate-900 text-amber-50",
  },
  {
    id: 55,
    type: "math",
    icon: <SiMatrix className="w-6 h-6 text-indigo-300" />,
    title: "Matrices Rule",
    content:
      "Matrices rotate, scale, and transform — in computer graphics they're the backstage crew making things look cool.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 56,
    type: "science",
    icon: <Battery className="w-6 h-6 text-emerald-300" />,
    title: "Battery Density",
    content:
      "Battery tech improves slowly; every percent matters. Energy storage is the adulting of the tech world.",
    bg: "bg-gradient-to-br from-emerald-900 to-slate-900 text-emerald-50",
  },
  {
    id: 57,
    type: "physics",
    icon: <SiPhoton className="w-6 h-6 text-yellow-300" />,
    title: "Photon Travel",
    content:
      "Photons from distant galaxies started their journey before mammals existed. Observing them is cosmic archaeology.",
    bg: "bg-gradient-to-br from-yellow-900 to-slate-900 text-yellow-50",
  },
  {
    id: 58,
    type: "funny",
    icon: <CiCalculator2 className="w-6 h-6 text-pink-300" />,
    title: "Math Anxiety",
    content:
      "Math anxiety is real — remember: math is a tool, not a personality test. You and numbers can be friends.",
    bg: "bg-gradient-to-br from-pink-950 to-slate-900 text-pink-50",
  },
  {
    id: 59,
    type: "math",
    icon: <Clock className="w-6 h-6 text-sky-300" />,
    title: "Prime Time",
    content:
      "Mersenne primes are rare giant primes used to test computing power. Finding one is like spotting a unicorn with a TI calculator.",
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 60,
    type: "science",
    icon: <Sprout className="w-6 h-6 text-green-300" />,
    title: "Life's Chemistry",
    content:
      "Carbon's bonding versatility makes it life's building block. Without it we'd be much less dramatic.",
    bg: "bg-gradient-to-br from-green-950 to-slate-900 text-green-50",
  },
  {
    id: 61,
    type: "physics",
    icon: <GiMirrorMirror className="w-6 h-6 text-slate-300" />,
    title: "Symmetry Wins",
    content:
      "Symmetry in physics often signals a conserved quantity. The universe loves rules and nice patterns.",
    bg: "bg-gradient-to-br from-slate-800 to-indigo-900 text-white",
  },
  {
    id: 62,
    type: "funny",
    icon: <SiTacobell className="w-6 h-6 text-amber-300" />,
    title: "Entropy & Snacks",
    content:
      "Leftover snacks evolve toward entropy: they get less organized and more mysterious over time.",
    bg: "bg-gradient-to-br from-amber-900 to-slate-900 text-amber-50",
  },
  {
    id: 63,
    type: "math",
    icon: <Radical className="w-6 h-6 text-rose-300" />,
    title: "Irrational Friends",
    content:
      "√2 is irrational — simple geometry births numbers that refuse to be fraction-friendly.",
    bg: "bg-gradient-to-br from-rose-900 to-slate-900 text-rose-50",
  },
  {
    id: 64,
    type: "world",
    icon: <FaCity className="w-6 h-6 text-indigo-300" />,
    title: "Urban Light",
    content:
      "City lights make stars harder to see. Light pollution is nature's 'do not disturb' sign — noisy and bright.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 65,
    type: "science",
    icon: <BsVirus className="w-6 h-6 text-red-300" />,
    title: "Virus Size",
    content:
      "Viruses are tiny packages of information that hijack cells. Biology's plot twists are short and punchy.",
    bg: "bg-gradient-to-br from-red-900 to-slate-900 text-red-50",
  },
  {
    id: 66,
    type: "physics",
    icon: <GiSpring className="w-6 h-6 text-green-300" />,
    title: "Simple Harmonic",
    content:
      "Pendulums and springs oscillate predictably — physics' way of reminding us life has rhythms.",
    bg: "bg-gradient-to-br from-green-950 to-slate-900 text-green-50",
  },
  {
    id: 67,
    type: "funny",
    icon: <Phone className="w-6 h-6 text-sky-300" />,
    title: "Phone Battery Math",
    content:
      "Your phone at 1% battery has the same dignity as a superhero running out of power mid-lecture.",
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 68,
    type: "math",
    icon: <SiDotnet className="w-6 h-6 text-emerald-300" />,
    title: "Probability Intuition",
    content:
      "People often misjudge rare events. Probability is a mood you learn by failing at bets and puzzles.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 69,
    type: "science",
    icon: <Thermometer className="w-6 h-6 text-red-300" />,
    title: "Climate Numbers",
    content:
      "Small average temperature increases can cause big climate shifts. A little change goes a long way.",
    bg: "bg-gradient-to-br from-red-900 to-slate-900 text-red-50",
  },
  {
    id: 70,
    type: "physics",
    icon: <RiCameraLensLine className="w-6 h-6 text-sky-300" />,
    title: "Refraction Trick",
    content:
      "Refraction bends light and makes a straw in a glass look broken. Optics is visual legerdemain.",
    bg: "bg-gradient-to-br from-sky-950 to-slate-900 text-sky-50",
  },
  {
    id: 71,
    type: "funny",
    icon: <Ghost className="w-6 h-6 text-indigo-300" />,
    title: "Probability of Alien Call",
    content:
      "You might be more likely to get a call from a telemarketer than a friendly alien. Keep your expectations moderated.",
    bg: "bg-gradient-to-br from-indigo-900 to-slate-900 text-indigo-50",
  },
  {
    id: 72,
    type: "math",
    icon: <GiClockwiseRotation className="w-6 h-6 text-rose-300" />,
    title: "Chaos & Predictability",
    content:
      "Deterministic systems can still be unpredictable. Chaos is predictably dramatic.",
    bg: "bg-gradient-to-br from-rose-900 to-slate-900 text-rose-50",
  },
  {
    id: 73,
    type: "world",
    icon: <GiBridge className="w-6 h-6 text-amber-300" />,
    title: "Infrastructure Math",
    content:
      "Bridges and buildings use safety factors — engineers make conservative bets so structures don't ghost us.",
    bg: "bg-gradient-to-br from-amber-950 to-slate-900 text-amber-50",
  },
  {
    id: 74,
    type: "science",
    icon: <SmartphoneCharging className="w-6 h-6 text-green-300" />,
    title: "Cell Factories",
    content:
      "Cells are tiny factories with assembly lines, quality control, and occasional gossip molecules.",
    bg: "bg-gradient-to-br from-green-950 to-slate-900 text-green-50",
  },
  {
    id: 75,
    type: "physics",
    icon: <GiEnergyArrow className="w-6 h-6 text-yellow-300" />,
    title: "Conservation Law",
    content:
      "Energy is conserved. It just changes form — like a shapeshifting, slightly judgmental magician.",
    bg: "bg-gradient-to-br from-yellow-900 to-slate-900 text-yellow-50",
  },
  {
    id: 76,
    type: "funny",
    icon: <GiButterflyWarning className="w-6 h-6 text-orange-300" />,
    title: "Butterfly vs Toast",
    content:
      "If buttered toast and butterflies were in a debate, they'd both argue entropy enthusiastically.",
    bg: "bg-gradient-to-br from-orange-900 to-slate-900 text-orange-50",
  },
  {
    id: 77,
    type: "math",
    icon: <Move3d className="w-6 h-6 text-indigo-300" />,
    title: "Logarithm Ease",
    content:
      "Logarithms turn multiplication into addition — math's version of simplifying your group chat.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 78,
    type: "science",
    icon: <GiCrystalGrowth className="w-6 h-6 text-emerald-300" />,
    title: "Mineral Time Capsules",
    content:
      "Rocks record planetary history. Geology is Earth's memoir written in stone and patience.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 79,
    type: "physics",
    icon: <BsLightningCharge className="w-6 h-6 text-red-300" />,
    title: "Electric Surprise",
    content:
      "Static shocks are micro-lectures in charge imbalance. They teach humility and vaseline avoidance.",
    bg: "bg-gradient-to-br from-red-900 to-slate-900 text-red-50",
  },
  {
    id: 80,
    type: "funny",
    icon: <Laptop className="w-6 h-6 text-sky-300" />,
    title: "Backup Reminder",
    content:
      "Hard drives fail. Backups are emotional insurance for your future self's dignity.",
    bg: "bg-gradient-to-br from-sky-950 to-slate-900 text-sky-50",
  },
  {
    id: 81,
    type: "math",
    icon: <Balloon className="w-6 h-6 text-rose-300" />,
    title: "Birthday Paradox",
    content:
      "In a room of 23 people there's ~50% chance two share a birthday. Human intuition about probability is often on holiday.",
    bg: "bg-gradient-to-br from-rose-900 to-slate-900 text-rose-50",
  },
  {
    id: 82,
    type: "science",
    icon: <Wind className="w-6 h-6 text-cyan-300" />,
    title: "Air Mix",
    content:
      "Air is mostly nitrogen (~78%) and oxygen (~21%). Nitrogen is the quiet roommate of the atmosphere.",
    bg: "bg-gradient-to-br from-cyan-900 to-slate-900 text-cyan-50",
  },
  {
    id: 83,
    type: "physics",
    icon: <MdTimeline className="w-6 h-6 text-indigo-300" />,
    title: "Momentum Matter",
    content:
      "Momentum (mass × velocity) is conserved in collisions — cue the physics-given trust falls.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 84,
    type: "funny",
    icon: <BiDoughnutChart className="w-6 h-6 text-pink-300" />,
    title: "Snack Statistics",
    content:
      "If you hide snacks, they mysteriously become more attractive to everyone. This is snack magnetism.",
    bg: "bg-gradient-to-br from-pink-950 to-slate-900 text-pink-50",
  },
  {
    id: 85,
    type: "math",
    icon: <SiSteelseries className="w-6 h-6 text-emerald-300" />,
    title: "Convergent Calm",
    content:
      "Infinite series can converge to finite numbers — infinity can be very disciplined.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 86,
    type: "science",
    icon: <Sun className="w-6 h-6 text-yellow-300" />,
    title: "Sun's Fuel",
    content:
      "The Sun fuses ~4 million tons of mass into energy every second. It's the ultimate workaholic.",
    bg: "bg-gradient-to-br from-yellow-900 to-slate-900 text-yellow-50",
  },
  {
    id: 87,
    type: "physics",
    icon: <Sparkle className="w-6 h-6 text-violet-300" />,
    title: "Twin Thought",
    content:
      "Relativity says moving clocks tick slower — if your twin travels fast they come back dashing and younger (in theory).",
    bg: "bg-gradient-to-br from-violet-950 to-slate-900 text-violet-50",
  },
  {
    id: 88,
    type: "funny",
    icon: <GiShrug className="w-6 h-6 text-slate-300" />,
    title: "Scientific Names",
    content:
      "Scientists name species in Latin sometimes for clarity, sometimes for secret jokes — taxonomy has an easter egg culture.",
    bg: "bg-gradient-to-br from-slate-800 to-indigo-900 text-white",
  },
  {
    id: 89,
    type: "math",
    icon: <TbMathIntegral className="w-6 h-6 text-indigo-300" />,
    title: "Area Under Curves",
    content:
      "Integrals calculate areas and accumulated quantities. They're basically math's version of summing up receipts.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 90,
    type: "world",
    icon: <Earth className="w-6 h-6 text-emerald-300" />,
    title: "Population Scale",
    content:
      "Human population crossed 8 billion in 2022. Large numbers are real but personal actions still matter.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 91,
    type: "science",
    icon: <Activity className="w-6 h-6 text-purple-300" />,
    title: "Neural Networks",
    content:
      "Biological neurons send spikes of electrical signals — AI neural nets are inspired but not identical cousins.",
    bg: "bg-gradient-to-br from-purple-950 to-slate-900 text-purple-50",
  },
  {
    id: 92,
    type: "physics",
    icon: <Rainbow className="w-6 h-6 text-cyan-300" />,
    title: "Rainbow Math",
    content:
      "White light splits into a spectrum because different wavelengths refract differently. Rainbows: physics with flair.",
    bg: "bg-gradient-to-br from-cyan-900 to-slate-900 text-cyan-50",
  },
  {
    id: 93,
    type: "funny",
    icon: <Clipboard className="w-6 h-6 text-amber-300" />,
    title: "Experimental Error",
    content:
      "Errors in experiments are not failures — they're data points that whisper 'try again, but smarter.'",
    bg: "bg-gradient-to-br from-amber-950 to-slate-900 text-amber-50",
  },
  {
    id: 94,
    type: "math",
    icon: <Sigma className="w-6 h-6 text-rose-300" />,
    title: "Monte Carlo",
    content:
      "Monte Carlo methods use randomness to solve problems — gambling algorithms that grew up responsible.",
    bg: "bg-gradient-to-br from-rose-900 to-slate-900 text-rose-50",
  },
  {
    id: 95,
    type: "science",
    icon: <CircuitBoard className="w-6 h-6 text-indigo-300" />,
    title: "Moore's Law",
    content:
      "Moore's Law predicted transistor doubling roughly every 18–24 months. It's more a trendline than a promise.",
    bg: "bg-gradient-to-br from-indigo-950 to-slate-900 text-indigo-50",
  },
  {
    id: 96,
    type: "physics",
    icon: <Radiation className="w-6 h-6 text-slate-300" />,
    title: "Heat Flow",
    content:
      "Heat flows from hot to cold spontaneously. This is why your coffee cools and your ice cream melts dramatically.",
    bg: "bg-gradient-to-br from-slate-800 to-indigo-900 text-white",
  },
  {
    id: 97,
    type: "funny",
    icon: <Rocket className="w-6 h-6 text-pink-300" />,
    title: "DIY Science",
    content:
      "At-home experiments are fun but read instructions. Safety goggles are cool and absolutely mandatory for dignity.",
    bg: "bg-gradient-to-br from-pink-900 to-slate-900 text-pink-50",
  },
  {
    id: 98,
    type: "math",
    icon: <TbTopologyStarRing2 className="w-6 h-6 text-emerald-300" />,
    title: "Topological Flex",
    content:
      "Topologists joke that a coffee mug and a donut are the same shape. It’s a warm, carb-friendly worldview.",
    bg: "bg-gradient-to-br from-emerald-950 to-slate-900 text-emerald-50",
  },
  {
    id: 99,
    type: "science",
    icon: <Signal className="w-6 h-6 text-sky-300" />,
    title: "Signal vs Noise",
    content:
      "Good measurements maximize signal and minimize noise. It's the science of listening well in a crowded room.",
    bg: "bg-gradient-to-br from-sky-900 to-slate-900 text-sky-50",
  },
  {
    id: 100,
    type: "perspective",
    icon: <GiGalaxy className="w-6 h-6 text-purple-300" />,
    title: "Cosmic Humility",
    content:
      "We’ve detected only a fraction of the universe's galaxies. The cosmos is vast; your curiosity is the right-size telescope.",
    bg: "bg-gradient-to-br from-purple-950 to-slate-900 text-purple-50",
  },
];

export default wonders;
