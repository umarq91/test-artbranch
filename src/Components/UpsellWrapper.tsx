import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TierName } from "utils/constants";
import SubscriptionsPackages from "./SubscriptionsTiers";

type UpscaleWrapperProps = {
  userId: string;
  tier: TierName;
  children: React.ReactNode;
  actionCallback: () => void;
  isEligible: boolean;
};

const UpsellWrapper: React.FC<UpscaleWrapperProps> = ({
  userId,
  tier,
  children,
  actionCallback,
  isEligible,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isEligible) {
      if (tier === "PREMIUM") {
        setErrorMessage("You are already on the highest tier!");
        setShowModal(true);
        return;
      }
      setErrorMessage("You have reached your limit.");
      setShowModal(true);
    } else {
      actionCallback();
    }
  };

  return (
    <>
      <div onClick={handleClick}>{children}</div>

      <AnimatePresence>
        {showModal && (
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
              className="relative h-[60vh] w-full max-w-5xl rounded bg-white p-6 shadow-lg will-change-[opacity,transform]"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              {/* Modal Content */}
              <h2 className="text-center text-xl font-bold">
                Upgrade Your Plan
              </h2>
              <p className="my-4 mt-4 text-center text-gray-700">
                {errorMessage}
              </p>

              {/* Conditionally show the subscription packages */}
              {tier !== "PREMIUM" && (
                <SubscriptionsPackages currentTier={tier} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UpsellWrapper;
