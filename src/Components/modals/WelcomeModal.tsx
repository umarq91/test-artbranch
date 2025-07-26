import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WelcomeModal = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isFirstTime = localStorage.getItem("isFirstTimeUser");

    if (isFirstTime) {
      setShowModal(true);
      localStorage.removeItem("isFirstTimeUser");
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative mx-4 w-full max-w-2xl rounded-2xl bg-gradient-to-br from-[#f9f9f9] to-[#eaeaea] p-8 shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <motion.button
              onClick={handleClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <motion.div
              className="text-center"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="mb-6 text-5xl font-bold text-gray-800">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-[#babaa0] to-[#8a8a6a] bg-clip-text text-transparent">
                  Artbranch
                </span>
                !
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                We’re excited to have you here as we launch the first phase of
                Art Branch! As we’re in beta, you may notice ongoing
                improvements—this is all part of building a platform that truly
                serves artists. Your early presence helps shape the future of Art
                Branch, and we’re committed to making this the best creative
                space possible. If you have feedback, we’d love to hear it!
                Thank you for being part of something big. Let’s grow together 🌿
              </p>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button
                onClick={handleClose}
                className="transform rounded-xl bg-gradient-to-r from-[#babaa0] to-[#8a8a6a] px-8 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:opacity-90"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;