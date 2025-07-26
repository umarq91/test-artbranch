import { Stripe, loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/UserInfoContext";
import { Tier, TierKeys } from "../../Types";
import { TIERS } from "../../utils/constants";
import SubscriptionRepository from "../../utils/repositories/subscriptionsRepository";

const VALID_TIRES = Object.values(TIERS).map((tier) => tier.name);

const usePayment = () => {
  const [stripe, setStripe] = useState<Promise<Stripe | null> | null>(null);
  const [error, setError] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    const publishableKey = import.meta.env.VITE_APP_STRIPE_PK;
    if (publishableKey) {
      setStripe(loadStripe(publishableKey));
    } else {
      setError("Stripe is not configured properly.");
    }
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tierName = searchParams.get("tier");

    if (
      tierName &&
      VALID_TIRES.map((tier) => tier.toLowerCase()).includes(
        tierName.toLowerCase(),
      )
    ) {
      const matchedTier = Object.values(TIERS).find(
        (tier) =>
          tier.name && tier.name.toLowerCase() === tierName.toLowerCase(),
      );

      if (matchedTier) {
        setSelectedTier(matchedTier);
      } else {
        setError(
          "There was an error setting up the payment for you. Please try again.",
        );
        navigate("/");
      }
    }
    setLoading(false);
  }, [location.search, navigate]);

  const retrievePaymentIntent = async () => {
    try {
      if (!userInfo) throw new Error("User not found");

      const subscriptionsRepository = new SubscriptionRepository();
      const paymentIntent = await subscriptionsRepository.createPaymentIntent(
        userInfo?.id,
        (selectedTier?.name.toUpperCase() as TierKeys) || "BASIC",
      );

      if (!paymentIntent) {
        throw new Error("Failed to create payment intent");
      }
      return paymentIntent;
    } catch (err) {
      setError("An unexpected error occurred.");
      return null;
    }
  };

  return {
    stripe,
    error,
    selectedTier,
    retrievePaymentIntent,
    navigate,
    loading,
  };
};

export default usePayment;
