import { AnimatePresence, motion } from "framer-motion";
import AustraliaMap from "Pages/Search/components/AustrailianMap";
import { useState } from "react";
import { Link } from "react-router-dom";
import LeafIcon from "../../../../public/icons/541.png";

const items = [
  {
    title: "Engaging Artist platform",
    description:
      "Creative collaboration hub – Connecting artists and communities across the nation",
  },
  {
    title: "Support every art Form",
    description:
      "Artistic services – From visual arts to performing arts, there’s something for every project.",
  },
  {
    title: "Support local",
    description: "Celebrate Aussie talent and empower creators.",
  },
  {
    title: "Simple & accessible",
    description:
      "A user-friendly platform designed to make discovery and collaboration easy.",
  },
];

export default function WhyArtBranch() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="flex flex-col items-center justify-center px-6 py-12 md:px-16 lg:px-32">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-3xl font-bold text-gray-900 md:text-4xl"
      >
        Why Art Branch?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="mt-8 w-full max-w-6xl rounded-2xl p-6 md:flex md:items-center"
      >
        {/* Left: Map */}
        <div className="flex flex-1 items-center justify-center">
          <AustraliaMap selectedState="" setSelectedState={() => {}} />
        </div>

        {/* Right: Dropdown Content */}
        <div className="mt-6 flex-1 md:mt-0 md:pl-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="mb-4 rounded-lg border border-gray-300 p-4"
            >
              {/* Heading with Toggle Button */}
              <button
                onClick={() => toggleDropdown(index)}
                className="flex w-full items-center justify-between text-lg font-semibold text-gray-900"
              >
                {item.title}
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-green-600" // Adding green color to match leaf theme
                >
                  {/* <LeafIcon /> */}
                  <img src={LeafIcon} className="h-12 w-12" />
                </motion.div>
              </button>

              {/* Description Dropdown */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="mt-2 text-gray-700"
                  >
                    {item.description}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}

          {/* Explore Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.7 }}
            className="mt-6 flex justify-center md:justify-start"
          >
            <Link to={"/search"}>
              <button className="rounded-lg bg-[#f0b77e] px-6 py-3 text-white hover:bg-[#e09d60]">
                Explore Art Branch
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
