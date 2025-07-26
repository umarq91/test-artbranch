import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Post_Categories } from "Types";

interface CategorySelectorProps {
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  handleCategoryChange,
}) => {
  const [isFirstRowPaused, setFirstRowPaused] = useState(false);
  const [isSecondRowPaused, setSecondRowPaused] = useState(false);
  const firstRowControls = useAnimation();
  const secondRowControls = useAnimation();
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);

  const categories = ["All", ...Object.values(Post_Categories)];
  const firstRowCategories = categories.slice(0, 10);
  const secondRowCategories = categories.slice(10);

  const handleCategoryClick = (category: string, row: "first" | "second") => {
    if (selectedCategory === category) {
      // Deselect
      handleCategoryChange("All");
      if (row === "first") {
        setFirstRowPaused(false); // Restart animation
      } else if (row === "second") {
        setSecondRowPaused(false); // Restart animation
      }
    } else {
      // Select category
      handleCategoryChange(category);

      if (row === "first") {
        setFirstRowPaused(true); // Pause animation for the first row
        firstRowControls.stop();
        // If category selected is from second row, resume the second row animation
        if (selectedCategory !== category && isSecondRowPaused) {
          setSecondRowPaused(false);
        }
      } else if (row === "second") {
        setSecondRowPaused(true); // Pause animation for the second row
        secondRowControls.stop();
        // If category selected is from first row, resume the first row animation
        if (selectedCategory !== category && isFirstRowPaused) {
          setFirstRowPaused(false);
        }
      }
    }
  };

  const resumeAnimationFromCurrentPosition = (
    row: "first" | "second",
    ref: React.RefObject<HTMLDivElement>,
    controls: any,
    duration: number,
  ) => {
    if (ref.current) {
      const transformValue = getComputedStyle(ref.current).transform;
      const matrix = new DOMMatrix(transformValue);
      const currentX = matrix.m41; // Extract the current X translation

      controls.start({
        x: [currentX, -ref.current.offsetWidth],
        transition: {
          repeat: Infinity,
          duration: duration,
          ease: "linear",
        },
      });
    }
  };

  useEffect(() => {
    if (!isFirstRowPaused && firstRowRef.current) {
      resumeAnimationFromCurrentPosition(
        "first",
        firstRowRef,
        firstRowControls,
        60,
      );
    }
  }, [isFirstRowPaused]);

  useEffect(() => {
    if (!isSecondRowPaused && secondRowRef.current) {
      resumeAnimationFromCurrentPosition(
        "second",
        secondRowRef,
        secondRowControls,
        40,
      );
    }
  }, [isSecondRowPaused]);

  useEffect(() => {
    if (!isFirstRowPaused) {
      firstRowControls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 60, ease: "linear" },
      });
    }
  }, [firstRowControls]);

  useEffect(() => {
    if (!isSecondRowPaused) {
      secondRowControls.start({
        x: ["0%", "-100%"],
        transition: { repeat: Infinity, duration: 40, ease: "linear" },
      });
    }
  }, [secondRowControls]);

  return (
    <div className="relative w-full overflow-hidden py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white"></div>

      {/* First Row */}
      <motion.div
        className="mb-4 flex gap-4"
        ref={firstRowRef}
        animate={isFirstRowPaused ? undefined : firstRowControls}
      >
        {[...firstRowCategories, ...firstRowCategories].map(
          (category, index) => (
            <button
              key={`line1-${index}`}
              className={`whitespace-nowrap rounded-3xl px-4 py-1 text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gray-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleCategoryClick(category, "first")}
            >
              {category}
            </button>
          ),
        )}
      </motion.div>

      {/* Second Row */}
      <motion.div
        className="flex gap-4"
        ref={secondRowRef}
        animate={isSecondRowPaused ? undefined : secondRowControls}
      >
        {[...secondRowCategories, ...secondRowCategories].map(
          (category, index) => (
            <button
              key={`line2-${index}`}
              className={`whitespace-nowrap rounded-3xl px-4 py-1 text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gray-600 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handleCategoryClick(category, "second")}
            >
              {category}
            </button>
          ),
        )}
      </motion.div>
    </div>
  );
};

export default CategorySelector;
