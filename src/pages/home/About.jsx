import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="space-y-8 text-md text-gray-400">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {" "}
        <p className="leading-relaxed">
          I’m a web developer with a passion for crafting seamless and
          user-friendly digital experiences. My expertise lies in blending
          innovative design with robust engineering to build accessible,
          performant, and visually striking applications.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="leading-relaxed">
          I have mastered modern web technologies like{" "}
          <span className="text-gray-200">React.js</span> ,{" "}
          <span className="text-gray-200">Node.js</span>,
          <span className="text-gray-200"> Tailwind CSS</span>, and{" "}
          <span className="text-gray-200">MongoDB</span>, with a focus on
          creating
          <span className="text-gray-200"> dynamic</span>,{" "}
          <span className="text-gray-200"> full-stack applications</span>. My
          journey has been fueled by a commitment to continuous learning and
          hands-on project development, enabling me to deliver solutions that
          prioritize both functionality and design.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="leading-relaxed">
          Beyond coding, I enjoy exploring new tools, learning cutting-edge
          technologies, and collaborating on projects that make a meaningful
          impact. Whether{" "}
          <span className="text-gray-200">
            building pixel-perfect user interfaces
          </span>
          , <span className="text-gray-200">architecting backend systems</span>,
          or{" "}
          <span className="text-gray-200">
            developing scalable web applications
          </span>
          , I bring creativity and precision to everything I do.
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className="leading-relaxed">
          In my spare time, you’ll find me traveling to new places, swimming,
          enjoying music, or immersing myself in movies and theater dramas. I’m
          always eager to explore creative ideas and envision innovative
          solutions to real-world challenges. Let’s connect and create something
          remarkable together!
        </p>
      </motion.div>
    </div>
  );
};

export default About;
