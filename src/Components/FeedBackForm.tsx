import { useUserInfo } from "context/UserInfoContext";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "utils/services/supabase";

const FeedBackForm = () => {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    const lastSubmitted = localStorage.getItem("lastFeedbackTime");
    if (lastSubmitted) {
      const timeElapsed = Date.now() - parseInt(lastSubmitted, 10);
      if (timeElapsed < 24 * 60 * 60 * 1000) {
        setSubmitted(true);
      }
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!feedback) return;

    localStorage.setItem("lastFeedbackTime", Date.now().toString());
    setSubmitted(true);
    setFeedback("");
    await supabase.from("feedbacks").insert({
      message: feedback,
      user: userInfo?.id,
    });
  };

  if (!userInfo) return null;

  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 right-4 z-50 font-poppins"
        >
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="focus:ring-b[#93916e] flex items-center gap-2 rounded-full bg-[#b9b68a] px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-[#93916e] focus:outline-none focus:ring-2"
          >
            {/* Button Label with Close Icon */}
            <div className="flex items-center gap-2">
              {!isOpen && (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              )}
              <span>
                {isOpen ? "Close" : "We would love to hear from you!"}
              </span>

              {/* Close Button for Feedback Widget */}
              <motion.button
                onClick={() => setIsShowing(false)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="flex-shrink-0 text-white hover:text-red-500"
                aria-label="Close Feedback Widget"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </motion.button>
            </div>
          </motion.button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative mt-4 max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ring-gray-200"
              >
                <h2 className="mb-4 text-center text-xl font-semibold text-[#859766]">
                  Help us grow together!
                </h2>
                <p className="mb-6 text-center text-sm text-gray-600">
                  Let us know your thoughts, suggestions or any message you have
                  for us. Your voice is what will help shape the platform and
                  push us to improve!
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-sm font-medium text-green-700"
                  >
                    Thank you for your feedback! You can submit again after 24
                    hours.
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-4"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <label
                        htmlFor="feedback"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Your Feedback
                      </label>
                      <textarea
                        id="feedback"
                        name="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="mt-2 block w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>

                    <div className="text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Submit Feedback
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedBackForm;
