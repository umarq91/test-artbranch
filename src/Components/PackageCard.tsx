import React from "react";

type PackageCardProps = {
  tier: {
    name: string;
    price: number;
    description: string[];
    image: string;
    storageLimit: number; // in bytes
    dailyUploadLimit: number;
    customLogo: boolean;
    canMoveWatermark: boolean;
  };
  isCurrent?: boolean;
  onClick?: () => void;
};

function formatStorage(bytes: number): string {
  if (bytes >= 1e9) return `${(bytes / 1e9).toFixed(1)} GB`;
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(1)} MB`;
  return `${(bytes / 1e3).toFixed(1)} KB`;
}

const PackageCard: React.FC<PackageCardProps> = ({
  tier,
  isCurrent,
  onClick,
}) => {
  return (
    <div
      className={`rounded-lg border p-6 ${
        isCurrent ? "border-gray-800" : "border-gray-300"
      } bg-white shadow-sm transition-shadow duration-200 hover:shadow-md`}
    >
      <img
        src={tier.image}
        alt={tier.name}
        className="mx-auto mb-4 h-16 w-auto"
      />
      <h3 className="mb-2 text-center text-lg font-semibold text-gray-800">
        {tier.name}
      </h3>
      <p className="mb-4 text-center text-sm text-gray-600">
        ${tier.price}/month
      </p>
      <ul className="mb-4 space-y-1 text-sm text-gray-600">
        {tier.description.map((desc, index) => (
          <li key={index}>• {desc}</li>
        ))}
      </ul>
      {/* <div className="text-sm text-gray-600 mb-4">
        <p>Storage Limit: {formatStorage(tier.storageLimit)}</p>
        <p>Daily Upload Limit: {tier.dailyUploadLimit} uploads</p>
        <p>
          Custom Logo:{" "}
          {tier.customLogo ? (
            <span className="font-medium">Available</span>
          ) : (
            <span>Not Available</span>
          )}
        </p>
        <p>
          Move Watermark:{" "}
          {tier.canMoveWatermark ? (
            <span className="font-medium">Allowed</span>
          ) : (
            <span>Not Allowed</span>
          )}
        </p>
      </div> */}
      <button
        // onClick={onClick}
        className={`w-full rounded-md px-4 py-2 ${
          isCurrent
            ? "cursor-not-allowed bg-gray-800 text-white"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
        }`}
        disabled={isCurrent}
      >
        {isCurrent ? "Current Plan" : "Choose Plan"}
      </button>
    </div>
  );
};

export default PackageCard;
