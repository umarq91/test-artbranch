import { motion } from "framer-motion";
import { AiOutlineWarning } from "react-icons/ai";

const Rejected = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 font-poppins">
      {/* Container for the rejected message */}
      <motion.div
        className="max-w-lg rounded-xl bg-white p-8 text-center shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Icon */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <AiOutlineWarning className="h-16 w-16 text-red-500" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="mb-4 text-4xl font-bold text-red-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Application Rejected
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mb-6 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Unfortunately, your application has been rejected. If you believe this
          was a mistake, feel free to reach out to our support team for further
          assistance.
        </motion.p>

        {/* Optional SVG decoration */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>

        {/* Contact Support Button */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block rounded-full bg-red-600 px-8 py-3 font-semibold text-white shadow-md transition-transform duration-300 hover:bg-red-700"
        >
          Contact Support
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Rejected;
