import { motion } from "framer-motion";

const AnimatedBook = () => {
  // Format message with proper spacing
  const message = `To my amazing friend who lights up every room with her smile,\n\nThank you for being the incredible person you are. Your friendship means the world to me, and I'm so grateful for all the moments we've shared together.\n\nYou're not just a friend; you're family.\n\nHere's to many more years of laughter, adventures, and creating beautiful memories together! 💖`;

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    },
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto my-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Book SVG */}
      <motion.div
        initial={{ rotateX: -90 }}
        whileInView={{ rotateX: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="relative w-full aspect-[4/3] perspective-1000"
      >
        <svg viewBox="0 0 800 600" className="w-full h-full">
          {/* Book pages with shadow effect */}
          <defs>
            <filter id="paper-shadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3" />
            </filter>
            <pattern
              id="paper-texture"
              patternUnits="userSpaceOnUse"
              width="50"
              height="50"
            >
              <rect width="50" height="50" fill="#fff" />
              <path
                d="M0 0h50v50H0z"
                fill="none"
                stroke="#f0f0f0"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>

          {/* Book binding */}
          <motion.path
            d="M100 100 C150 95, 650 95, 700 100 C700 400, 700 400, 700 500 C650 505, 150 505, 100 500 C100 400, 100 400, 100 100"
            fill="#8b5cf6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          />

          {/* Book pages */}
          <motion.path
            d="M120 120 C160 115, 640 115, 680 120 C680 380, 680 380, 680 480 C640 485, 160 485, 120 480 C120 380, 120 380, 120 120"
            fill="url(#paper-texture)"
            filter="url(#paper-shadow)"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Animated pen */}
          <motion.g
            initial={{ opacity: 0, x: -50, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.path
              d="M680 120 L700 100 L690 90 L670 110 Z"
              fill="#4a5568"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={draw}
            />
          </motion.g>
        </svg>

        {/* Animated text container */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1 }}
        >
          <div className="w-[80%] h-[70%] flex items-center justify-center overflow-hidden">
            <motion.div
              className="text-purple-800 leading-relaxed text-lg font-handwriting relative whitespace-pre-line"
              style={{ maxWidth: "90%" }}
            >
              {message.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 0.1,
                    delay: 1.2 + index * 0.03,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="inline-block"
                  style={{
                    whiteSpace: char === "\n" ? "pre-line" : "pre",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-12 h-12 text-4xl"
        initial={{ rotate: -180, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 2 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute -bottom-4 -left-4 w-12 h-12 text-4xl"
        initial={{ rotate: 180, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 2.2 }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

export default AnimatedBook;
