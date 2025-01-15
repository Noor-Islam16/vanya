import { motion } from "framer-motion";

const AnimatedBook = () => {
  const message = `Happy Birthday!  Humko pata hai re tmhra life ke abhi tough  phase se guzar rahi hoo, aur shayad sab kuch thoda overwhelming lag raha ho. Lekin tum jitni strong ho, tmse behtar koi nahi handle kar sakta.\n\n Tmhra naam hi teri identity ko define karta hai – Muskan. Tmhra hasi sabse khoobsurat cheez hai. \n\nAaj ke din tum bas apni life ka stress bhool kar apna din enjoy karo. 

Happy Birthday once again, Muskan!  
 `;

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
      className="relative w-full max-w-4xl mx-auto my-4 md:my-12 px-2 md:px-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div
        initial={{ rotateX: -90 }}
        whileInView={{ rotateX: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1.5, type: "spring" }}
        className="relative w-full h-[600px] md:h-auto md:aspect-[4/3] perspective-1000"
      >
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
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

          {/* Book binding - Adjusted for taller mobile view */}
          <motion.path
            d="M100 150 C150 145, 650 145, 700 150 C700 500, 700 500, 700 650 C650 655, 150 655, 100 650 C100 500, 100 500, 100 150"
            fill="#8b5cf6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          />

          {/* Book pages - Adjusted for taller mobile view */}
          <motion.path
            d="M120 170 C160 165, 640 165, 680 170 C680 480, 680 480, 680 630 C640 635, 160 635, 120 630 C120 480, 120 480, 120 170"
            fill="url(#paper-texture)"
            filter="url(#paper-shadow)"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Animated pen - Adjusted position */}
          <motion.g
            initial={{ opacity: 0, x: -50, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.path
              d="M680 170 L700 150 L690 140 L670 160 Z"
              fill="#4a5568"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false }}
              variants={draw}
            />
          </motion.g>
        </svg>

        {/* Text Container with increased size for mobile */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1 }}
        >
          <svg
            viewBox="0 0 800 800"
            className="w-full h-full absolute inset-0"
            preserveAspectRatio="xMidYMid meet"
          >
            <foreignObject
              width="520"
              height="420"
              x="140"
              y="190"
              className="overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center">
                <motion.div className="text-purple-800 leading-relaxed text-2xl md:text-xl font-handwriting p-8 md:p-8">
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
            </foreignObject>
          </svg>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-8 md:w-12 h-8 md:h-12 text-2xl md:text-4xl"
        initial={{ rotate: -180, opacity: 0 }}
        whileInView={{ rotate: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 2 }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute -bottom-4 -left-4 w-8 md:w-12 h-8 md:h-12 text-2xl md:text-4xl"
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
