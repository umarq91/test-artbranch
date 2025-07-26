import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Rectangle() {
  const [showMore, setShowMore] = useState(false);

  return (
    <div
      className="mx-4 my-10 h-auto rounded-3xl border-4 border-[#93916e] bg-[#babaa0] px-4 py-12 md:mx-10 md:my-20"
      style={{ fontFamily: "Syne, sans-serif" }}
    >
      <div className="flex flex-col items-center">
        {/* Main Content Container */}
        <div className="flex w-full max-w-5xl flex-col items-center space-y-8">
          {/* Heading Section */}
          <div className="space-y-6 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Discover & Connect with Australia's Creative Talent
            </h1>

            <div className="space-y-4">
              <p className="text-xl md:text-2xl">
                From photographers to performers, filmmakers to illustrators.
              </p>
              <p className="text-xl md:text-2xl">
                Explore, engage, and collaborate.
              </p>
            </div>
          </div>

          {/* Button Section */}
          <div className="mt-8">
            <button
              className="rounded-lg bg-white px-12 py-3 text-lg font-semibold uppercase tracking-wide text-[#93916e] hover:bg-gray-50"
              onClick={() => setShowMore((prev) => !prev)}
            >
              {showMore ? "SHOW LESS" : "LEARN MORE"}
            </button>
          </div>
        </div>

        {/* Expandable Content */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: showMore ? 1 : 0,
            height: showMore ? "auto" : 0,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="mt-8 w-full max-w-5xl overflow-hidden"
        >
          {showMore && (
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-[#93916e]">
                Join Art Branch
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Showcase your creative work and connect with a vibrant art
                  community.
                </p>
                <p>
                  Whether you're an artist, musician, or writer, Art Branch
                  helps you reach a wider audience.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-4 md:flex-row">
                <Link to="/signup">
                  <button className="bg-[#93916e] px-8 py-3 text-white hover:bg-[#45a049]">
                    Join as Artist{" "}
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    title="Find Artists"
                    className="bg-[#93916e] px-8 py-3 text-white hover:bg-[#45a049]"
                  >
                    Find Artists
                  </button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
