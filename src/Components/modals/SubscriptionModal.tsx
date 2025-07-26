import SubscriptionsPackages from "Components/SubscriptionsTiers";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TierName } from "utils/constants";

type SubscriptionProps = {
  tier: TierName;
  setIsOpen: (value: boolean) => void;
  message: string;
  isOpen?: boolean;
};

const SubscriptionModal: React.FC<SubscriptionProps> = ({
  tier,
  setIsOpen,
  message,
  isOpen,
}) => {
  const navigate = useNavigate();
  const isPremium = tier === "PREMIUM";
  const currentVersion = import.meta.env.VITE_APP_CURRENT_VERSION;
  const supportedVersions = JSON.parse(
    import.meta.env.VITE_APP_SUPPORTED_VERSIONS,
  );

  const isVersion1 = currentVersion === String(supportedVersions[0]);

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 will-change-[opacity]"
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`relative ${
            isVersion1 ? "h-auto" : "h-[70vh] max-w-5xl"
          } overflow-y-auto rounded-lg bg-white p-6 shadow-lg will-change-[opacity,transform]`}
        >
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-3 text-gray-500 transition hover:text-gray-800"
            aria-label="Close modal"
          >
            ✕
          </button>

          {/* Modal Header */}
          <h2 className="my-5 text-center text-2xl font-bold text-gray-800">
            {isVersion1
              ? "Storage Capacity Reached"
              : "Upgrade Your Plan to Unlock More Features"}
          </h2>

          {/* Modal Description */}
          <p className="mb-6 text-center text-gray-600">
            {isVersion1
              ? "You’ve maximized the storage limit for your Premium plan. Please manage your storage or contact support for additional options."
              : message || "Select a plan below to enhance your experience!"}
          </p>

          {/* Premium Plan Minimal Section */}
          {isVersion1 ? (
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg border border-gray-300 px-6 py-3 text-gray-600 shadow-md transition hover:border-gray-400"
              >
                Close
              </button>
            </div>
          ) : (
            /* SubscriptionsPackages for Non-Premium Plans */
            <SubscriptionsPackages currentTier={tier} />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SubscriptionModal;
