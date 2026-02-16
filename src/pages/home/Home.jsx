import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import About from "./About";

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

  return (
    <div className="w-11/12 lg:w-10/12 mx-auto">
      <div className="my-20">
        <About />
      </div>
    </div>
  );
};

export default Home;
