import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TIERS } from "../../utils/constants";
const useSubscriptionTier = () => {
  const navigate = useNavigate();
  const packageSectionRef = useRef<HTMLDivElement>(null);

  const handlePackageSelect = (tierName: string) => {
    navigate(`/payment?tier=${tierName}`);
  };

  const handleSubscribeClick = () => {
    if (packageSectionRef.current) {
      packageSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    packageSectionRef,
    handlePackageSelect,
    handleSubscribeClick,
    TIERS,
    navigate,
  };
};

export default useSubscriptionTier;
