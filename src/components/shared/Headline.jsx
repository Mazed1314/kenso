import { motion } from "framer-motion";

const Headline = ({ title }) => {
  return (
    <motion.div
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }} // Allows animation every time it scrolls into view
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1
        className="my-4 text-lg md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r 
                   from-white via-white to-teal-400 headline_font"
      >
        {title}
      </h1>
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-16 md:w-24 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-md"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false }} // Replay animation on every scroll
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
};

export default Headline;
