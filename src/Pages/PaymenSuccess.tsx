import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tierName, setTierName] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tier = searchParams.get("tier");
    if (tier) {
      setTierName(tier);
    }

    const timeout = setTimeout(() => {
      navigate("/portfolio");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [location.search, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex min-h-screen flex-col items-center justify-center bg-green-50"
    >
      <div className="max-w-md rounded-lg bg-white p-10 text-center shadow-lg">
        <h1 className="text-3xl font-semibold text-green-500">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          {tierName &&
            `You have successfully subscribed to the ${tierName} plan.`}
        </p>
        <div className="mt-6 text-sm text-gray-500">
          You will be redirected shortly or you can manually go back to the
          dashboard.
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
