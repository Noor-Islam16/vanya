import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface BirthdayLandingProps {
  onAccessGrant: () => void;
}

const messages = [
  "✨ It's Your Special Day, My Dear Friend! ✨",
  "Today is all about celebrating the amazing person you are",
  "Want to see something special just for you?",
];

const BirthdayLanding: React.FC<BirthdayLandingProps> = ({ onAccessGrant }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentMessageIndex < messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex((prev) => prev + 1);
      }, 3000);
      return () => clearTimeout(timer);
    } else if (currentMessageIndex === messages.length - 1) {
      setShowButtons(true);
    }
  }, [currentMessageIndex]);

  const handleAccess = () => {
    onAccessGrant();
    navigate("/wishes");
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 flex items-center justify-center overflow-hidden relative">
      {/* Floating bubbles animation in background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/30 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight,
              ],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMessageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white/80 backdrop-blur-md rounded-lg shadow-xl p-8 max-w-md mx-auto text-center"
          >
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              {messages[currentMessageIndex]}
            </h2>

            {showButtons && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center gap-4 mt-6"
              >
                <button
                  onClick={handleAccess}
                  className="px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transform hover:scale-105 transition-all"
                >
                  Yes!
                </button>
                <button
                  onClick={handleAccess}
                  className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transform hover:scale-105 transition-all"
                >
                  Of Course!
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BirthdayLanding;
