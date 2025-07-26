import { motion } from "framer-motion";
import { AiOutlineClockCircle } from "react-icons/ai"; // Importing an icon for better design
import { useNavigate } from "react-router-dom";

function RequestPending() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-poppins">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }} // Start slightly smaller and transparent
        animate={{ opacity: 1, scale: 1 }} // Scale to full size and fade in
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="max-w-lg transform rounded-xl p-10 text-center shadow-lg transition-transform hover:scale-105"
      >
        {/* SVG illustration or an icon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <AiOutlineClockCircle className="h-16 w-16 text-blue-600" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-4xl font-bold text-gray-900"
        >
          Verification Pending
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 text-lg text-gray-700"
        >
          Your request to become an artist is currently under review. We
          appreciate your patience while we verify your application.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 text-sm text-gray-500"
        >
          If you have any questions, please reach out to our support team.
        </motion.p>

        {/* SVG decoration (Optional) */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        ></motion.div>

        <motion.button
          onClick={handleGoBack}
          whileHover={{ scale: 1.05 }} // Subtle hover effect
          whileTap={{ scale: 0.95 }} // Tap animation
          className="transform rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-700"
        >
          Go Back
        </motion.button>
      </motion.div>
    </div>
  );
}

export default RequestPending;
