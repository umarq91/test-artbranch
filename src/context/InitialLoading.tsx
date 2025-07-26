// Loading.tsx
import { motion } from "framer-motion";
import React from "react";

interface LoadingProps {
  logo: string; // URL or import path for the logo image
}

const InitialLoading: React.FC<LoadingProps> = ({ logo }) => {
  // Define the animation variants
  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.img
        src={logo}
        alt="Loading"
        className="h-40 w-40" // Adjust size as needed
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      />
    </div>
  );
};

export default InitialLoading;
