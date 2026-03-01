import { motion } from "framer-motion";

const name = "Hui Siu Hin Ivan";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function TypewriterName() {
  return (
    <div
      className="text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.5]"
      style={{ fontFamily: "'Gloock', serif", fontWeight: 400 }}
    >
      <motion.span
        variants={container}
        initial="hidden"
        animate="visible"
        className="inline-flex"
      >
        {name.split("").map((char, index) => (
          <motion.span key={index} variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: name.length * 0.06 + 0.8, duration: 0.4 }}
        className="inline-block w-3 ml-1 bg-slate-100 align-middle"
      >
        &nbsp;
      </motion.span>
    </div>
  );
}

