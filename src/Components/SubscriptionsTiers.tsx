import { useNavigate } from "react-router-dom";
import { TierKeys } from "Types";
import { getTierDetails, TIERS } from "utils/constants";
import PackageCard from "./PackageCard";

type Props = {
  currentTier?: TierKeys;
};

function SubscriptionsPackages({ currentTier }: Props) {
  const navigate = useNavigate();

  // Get details of the current tier if provided
  const tierDetails = currentTier ? getTierDetails(currentTier) : null;

  return (
    <div className="grid grid-cols-1 place-content-center gap-4 text-center sm:grid-cols-2 md:grid-cols-2 md:text-start lg:grid-cols-4">
      {Object.entries(TIERS).map(([key, tier], index) => (
        <PackageCard
          key={index}
          tier={{
            name: tier.name,
            price: tier.price,
            description: tier.description,
            image: tier.image || "",
            storageLimit: tier.storageLimit,
            dailyUploadLimit: tier.dailyUploadLimit,
            customLogo: tier.customLogo,
            canMoveWatermark: tier.canMoveWatermark,
          }}
          isCurrent={tierDetails?.name === tier.name}
          onClick={() => navigate(`/payment?tier=${tier.name}`)}
        />
      ))}
    </div>
  );
}
export default SubscriptionsPackages;
