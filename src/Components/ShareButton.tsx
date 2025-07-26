import { useUserInfo } from "context/UserInfoContext";
import { motion } from "framer-motion"; // Import framer-motion
import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa"; // Import share icon
import { useLocation } from "react-router-dom";

interface ShareButtonProps {
  setIsShareModalOpen: (value: boolean) => void;
}

const ShareButton: React.FC<ShareButtonProps> = ({ setIsShareModalOpen }) => {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserInfo();
  const location = useLocation();

  // Construct the shareable link
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;

  return (
    <div
      onClick={() => setIsShareModalOpen(true)}
      className="flex cursor-pointer items-center justify-center"
    >
      <motion.div
        className={`flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-300 md:h-14 md:w-14 ${loading ? "opacity-50" : ""}`}
        whileTap={{ scale: 0.9 }}
        animate={{ backgroundColor: loading ? "#e0e0e0" : "#ffffff" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {loading ? (
          <span className="loader"></span>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FaShareAlt className="h-6 w-4 text-black" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ShareButton;
