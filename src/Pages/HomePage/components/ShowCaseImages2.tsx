"use client";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ShowCaseImages2() {
  const navigate = useNavigate();

  const images = [
    "/images/abstract.png",
    "/images/dance.png",
    "/images/film.png",
    "/images/florist.png",
    "/images/mural.png",
  ];

  return (
    <div className="flex flex-col items-center justify-center space-y-6 px-5 py-8 md:space-y-8 lg:space-y-10">
      {/* Header Section */}
      <div className="flex flex-col items-center space-y-4 text-center md:flex-row md:space-x-6 md:space-y-0">
        <img
          src="/logoc.png"
          className="h-24 w-24 rounded-full object-cover shadow-lg md:h-48 md:w-48 lg:h-40 lg:w-40"
          alt="Logo"
        />
        <h3 className="text-xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
          Join now & explore Australia’s fun and engaging directory for Aussie
          artists
        </h3>
      </div>

      {/* Scrollable Images Showcase */}
      <motion.div
        className="w-full items-center overflow-hidden"
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div
          className="flex items-center justify-center space-x-4"
          drag="x"
          dragConstraints={{ left: -500, right: 0 }}
        >
          {images.map((src, index) => (
            <motion.img
              key={index}
              src={src}
              className="h-40 w-40 cursor-pointer rounded-lg object-cover shadow-md md:h-48 md:w-48 lg:h-56 lg:w-56"
              alt={`Showcase ${index + 1}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/search")}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ShowCaseImages2;
