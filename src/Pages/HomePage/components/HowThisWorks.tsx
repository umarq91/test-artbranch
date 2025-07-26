import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const dropdownVariants = {
  hidden: { opacity: 0, height: 0, overflow: "hidden" },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const HowItWorks = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown: any) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="mt-4 px-4 py-8 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-5xl text-center">
        <motion.h2
          className="mb-4 text-2xl font-semibold text-gray-800 lg:text-4xl"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How Does It Work?
        </motion.h2>

        <div className="space-y-4">
          {/* Artists Dropdown */}
          <div
            className="cursor-pointer rounded-lg bg-[#bac6c5] p-4 shadow-md"
            onClick={() => toggleDropdown("artists")}
          >
            <h3 className="flex justify-between text-xl font-semibold text-white">
              For Artists
              <span>{openDropdown === "artists" ? "▲" : "▼"}</span>
            </h3>
            <AnimatePresence>
              {openDropdown === "artists" && (
                <motion.ul
                  className="mt-3 space-y-2 text-left text-white"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <li>
                    <strong>1. Sign Up:</strong> Create your free artist profile
                    in minutes.
                  </li>
                  <li>
                    <strong>2. Get Verified:</strong> Become a listed artist.
                  </li>
                  <li>
                    <strong>3. Upload Portfolio:</strong> Share your work
                    easily.
                  </li>
                  <li>
                    <strong>4. Branch Out:</strong> Post content to be
                    discovered.
                  </li>
                  <li>
                    <strong>5. Collaborate & Grow:</strong> Connect with clients
                    and organizers.
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Audience Dropdown */}
          <div
            className="cursor-pointer rounded-lg bg-[#bac6c5] p-4 text-white shadow-md"
            onClick={() => toggleDropdown("audience")}
          >
            <h3 className="flex justify-between text-xl font-semibold">
              For Audience / Communities
              <span>{openDropdown === "audience" ? "▲" : "▼"}</span>
            </h3>
            <AnimatePresence>
              {openDropdown === "audience" && (
                <motion.ul
                  className="mt-3 space-y-2 text-left text-white"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <li>
                    <strong>1. Search for Talent:</strong> Find artists by
                    location or skill.
                  </li>
                  <li>
                    <strong>2. View Portfolios:</strong> Explore artists’ work.
                  </li>
                  <li>
                    <strong>3. Make Contact:</strong> Reach out for
                    collaborations.
                  </li>
                  <li>
                    <strong>4. Bring Your Vision to Life:</strong> Work with
                    creatives.
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
