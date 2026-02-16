import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/shared/Navbar";
import LightRays from "./LightRays";
import PillNav from "@/components/shared/PillNav";
// import UniversalConverter from "./Chatgpt";
import UniversalConverter from "./UniversalConverter";

const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Smoothness of the scroll
      easing: (t) => 1 - Math.pow(1 - t, 3), // Ease-out cubic easing
      smooth: true, // Enable smooth scrolling
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Clean up on component unmount
    };
  }, []);
  const logo = "/kenso-without-bg.png";
  return (
    <div className="">
      {/* <div className="flex justify-center">
        <PillNav
          logo={logo}
          logoAlt="Company Logo"
          items={[
            { label: "Home", href: "/" },
            { label: "FINANCE", href: "/about" },
            { label: "HEALTH", href: "/services" },
            { label: "CONVERT", href: "/contact" },
            { label: "MATH & SCIENCE", href: "/contact" },
            { label: "CULTURE & TIME", href: "/contact" },
            { label: "LIFE", href: "/contact" },
          ]}
          activeHref="/"
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#00000000"
          pillColor="#00000000"
          hoveredPillTextColor="#e94560"
          pillTextColor="#636e72"
          theme="light"
          initialLoadAnimation={false}
        />
      </div> */}
      <div className="">
        <UniversalConverter />
      </div>
    </div>
  );
};

export default Home;
