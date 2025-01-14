import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ref, push, serverTimestamp } from "firebase/database";
import { db } from "../firebase/config";
import AnimatedBook from "./AnimatedBook";
import Birthday1 from "../assets/Birthday1.png";
import Birthday2 from "../assets/Birthday2.png";
import Birthday3 from "../assets/Birthday3.jpg";
import Birthday4 from "../assets/Birthday4.jpg";
import Birthday5 from "../assets/Birthday5.jpg";
import Birthday6 from "../assets/Birthday6.jpg";

const birthdayImages = [
  Birthday1,
  Birthday2,
  Birthday3,
  Birthday4,
  Birthday5,
  Birthday6,
];

const BirthdayWishes = () => {
  const [showMeetingQuestion, setShowMeetingQuestion] = useState(false);
  const [showLocationQuestion, setShowLocationQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [, setSelectedLocation] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMeetingQuestion(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  // Container variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Define type for custom direction
  interface DirectionType {
    x: number;
    y: number;
  }

  // Item variants for images
  const itemVariants = {
    hidden: (custom: DirectionType) => ({
      x: custom.x,
      y: custom.y,
      rotate: 360,
      opacity: 0,
      scale: 0,
    }),
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 1.2,
        stiffness: 70,
        damping: 20,
      },
    },
  };

  // Custom entrance directions for each image
  const entranceDirections = [
    { x: -1000, y: 0 },
    { x: 1000, y: 0 },
    { x: 0, y: -1000 },
    { x: 0, y: 1000 },
    { x: -1000, y: -1000 },
    { x: 1000, y: -1000 },
  ];

  const saveResponse = async (responseType: string, response: string) => {
    try {
      setIsSubmitting(true);
      const responsesRef = ref(db, "birthday-responses");

      const responseData = {
        questionType: responseType,
        response: response,
        timestamp: serverTimestamp(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        deviceInfo: {
          userAgent: navigator.userAgent,
          screenSize: `${window.innerWidth}x${window.innerHeight}`,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      };

      await push(responsesRef, responseData);
    } catch (error) {
      console.error("Error saving response:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle meeting question response
  const handleMeetingResponse = async (response: string) => {
    setAnswer(response);
    setShowLocationQuestion(true);
    setShowMeetingQuestion(false);
    await saveResponse("meeting", response);
  };

  // Handle location question response
  const handleLocationResponse = async (location: string) => {
    setSelectedLocation(location);
    setIsAnswered(true);
    setShowLocationQuestion(false);
    await saveResponse("location", location);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 overflow-x-hidden">
      {/* Header Section with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center py-8 px-4"
      >
        <motion.h1
          className="text-4xl font-bold text-purple-800 mb-4"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Happy Birthday, My Dearest Friend! 🎉
        </motion.h1>
        <motion.p
          className="text-lg text-purple-600"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Every moment with you is a blessing ✨
          <br />
          We don't have any pictures together yet, but we will soon!
        </motion.p>
      </motion.div>

      {/* Photo Gallery with improved animation flow */}
      <motion.div
        className="max-w-6xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {birthdayImages.map((image, index) => (
            <motion.div
              key={index}
              custom={entranceDirections[index]}
              variants={itemVariants}
              whileHover={{ scale: 1.05, zIndex: 1 }}
              className="relative group"
            >
              <div
                className="relative overflow-hidden rounded-xl shadow-xl bg-white/20 backdrop-blur-sm 
                            aspect-square transition-all duration-500 group-hover:shadow-2xl"
              >
                {/* Success Animation */}
                <AnimatePresence>
                  <motion.div
                    key={`flash-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: [1, 1.2, 0],
                      opacity: [0.5, 0.8, 0],
                    }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-white/30 rounded-xl z-10"
                  />
                </AnimatePresence>

                {/* Main Image */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  <img
                    src={image}
                    alt={`Birthday Memory ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Enhanced Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/40 to-transparent
                              opacity-0 group-hover:opacity-100 transition-all duration-300
                              flex flex-col justify-end p-6"
                  >
                    <motion.h3
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="text-white text-xl font-bold"
                    >
                      Memory #{index + 1}
                    </motion.h3>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-white/90 mt-2"
                    >
                      A special moment we shared together ✨
                    </motion.p>
                  </motion.div>
                </motion.div>

                {/* Enhanced Sparkle Effects */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                      x: [0, i % 2 ? 20 : -20],
                      y: [0, i < 2 ? -20 : 20],
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.5 + i * 0.1,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                    style={{
                      left: `${25 + (i % 2) * 50}%`,
                      top: `${25 + Math.floor(i / 2) * 50}%`,
                    }}
                  />
                ))}

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -top-2 -right-2 w-12 h-12 bg-pink-400 rounded-full opacity-0 group-hover:opacity-75"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-400 rounded-full opacity-0 group-hover:opacity-75"
                  whileHover={{ scale: 1.2, rotate: -180 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Animated Book Section */}
      <AnimatedBook />

      {/* Enhanced Special Wishes Section */}
      <motion.div
        className="max-w-2xl mx-auto px-4 py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-2xl p-8 shadow-xl backdrop-blur-sm"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-2xl font-bold text-purple-800 mb-6 text-center"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: false }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            ✨ Your Birthday Wishes to be Fulfilled ✨
          </motion.h2>

          <motion.ul
            className="space-y-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {[
              { text: "Namrata Voice AI Assistant", icon: "🎙️" },
              { text: "Samsung S24 Ultra", icon: "📱" },
              { text: "Spider Man Costume and Mask", icon: "🦸‍♂️" },
              { text: "Your Cute Miniature", icon: "🎎" },
              { text: "And much more...", icon: "✨" },
            ].map((wish, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 bg-white/40 rounded-lg p-4 shadow-sm"
                variants={{
                  hidden: { x: -50, opacity: 0 },
                  visible: {
                    x: 0,
                    opacity: 1,
                    transition: { delay: index * 0.2 },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.6)",
                }}
              >
                <motion.span
                  className="text-2xl"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {wish.icon}
                </motion.span>
                <span className="text-purple-900 font-medium">{wish.text}</span>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-8 p-6 bg-white/60 rounded-xl shadow-inner"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="text-lg text-purple-900 leading-relaxed text-center italic"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              "Don't worry about anything as long as I'm here. No tension about
              how things will work out - I'll take care of everything for you.
              Just stay stress-free, I'll handle all the stuff. Just trust me on
              this one, yaar! 🤗"
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Modal System */}
      {/* Meeting and Location Question Modals */}
      <AnimatePresence>
        {/* Meeting Question Modal */}
        {showMeetingQuestion && !isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <motion.h3
                className="text-xl font-bold text-purple-800 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                One More Thing... 💝
              </motion.h3>
              <motion.p
                className="text-gray-700 mb-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Can we meet today after your office? I'll be waiting outside...
                🌟
              </motion.p>
              <motion.div
                className="flex flex-col gap-3 justify-center mt-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  onClick={() => handleMeetingResponse("Yes")}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 
                     transition-all transform hover:scale-105 hover:shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? "Saving..." : "Yes"}
                </motion.button>
                <motion.button
                  onClick={() => handleMeetingResponse("No")}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 
                     transition-all transform hover:scale-105 hover:shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? "Saving..." : "No"}
                </motion.button>
                <motion.button
                  onClick={() => handleMeetingResponse("Bakchodi")}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                     transition-all transform hover:scale-105 hover:shadow-lg
                     disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting
                    ? "Saving..."
                    : "Bakchodi Mat Kar phir se start hogya tera"}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Location Question Modal */}
        {showLocationQuestion && !isAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <motion.div
                className="text-lg font-medium text-purple-600 mb-6 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {answer === "Yes" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    Ahh humko laga nhi tha Yes bologi tum but Waweeeee! 🎉
                  </motion.span>
                )}
                {answer === "No" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    Hum to office ke bahar hi rhege aaj! 😊
                  </motion.span>
                )}
                {answer === "Bakchodi" && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    Start ky hoga re aaj tmhra day h re issko awesome bnana tha
                    mereko re smjho tum! 🌟
                  </motion.span>
                )}
              </motion.div>

              <motion.h3
                className="text-xl font-bold text-purple-800 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Where You want to go? ✨
              </motion.h3>

              <motion.div
                className="grid grid-cols-1 gap-3 mt-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  "Mani Casadona 🏰",
                  "MBA Chai Wala ☕",
                  "Burger King 👑",
                  "Dominos 🍕",
                  "City Center 🌆",
                  "Aaya to dekh lene tu bol de rhe hum 😉",
                ].map((location, index) => (
                  <motion.button
                    key={location}
                    onClick={() => handleLocationResponse(location)}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg 
                       hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-md
                       disabled:opacity-50 disabled:cursor-not-allowed"
                    variants={{
                      hidden: { opacity: 0, x: -50 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: { delay: index * 0.1 },
                      },
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubmitting ? "Saving..." : location}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Thank You Message */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 
                     text-white p-4 rounded-lg shadow-lg"
          >
            <motion.p
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 3 }}
            >
              Thank you for answering! 💖
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <div className="text-pink-300 opacity-30 text-2xl">✨</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayWishes;
