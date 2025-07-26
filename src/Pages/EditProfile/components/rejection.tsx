import { useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "context/UserInfoContext";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { retryVerification } from "utils/api/verification_api";

interface StatusRejectedProps {
  rejectionReason: string;
  onRetry: () => void;
}

const StatusRejected: React.FC<StatusRejectedProps> = ({
  rejectionReason,
  onRetry,
}) => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();

  const handleRetry = async () => {
    try {
      // TODO: also have to delete images from bucket
      await retryVerification(userInfo?.id!);
      onRetry();
      navigate("/edit/profile?tab=verify");
    } catch (error) {
      console.error("Retry failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-red-50 p-6 text-center">
      <FaTimesCircle className="mb-4 text-6xl text-red-600" />
      <h2 className="text-2xl font-semibold text-red-700">
        Verification Rejected
      </h2>
      <p className="mt-2 text-gray-700">
        Unfortunately, your verification request has been rejected.
      </p>

      {rejectionReason && (
        <p className="mt-2 italic text-gray-500">
          Reason: <strong>{rejectionReason}</strong>
        </p>
      )}

      <button
        className="mt-6 rounded-md bg-red-600 px-4 py-2 font-semibold text-white shadow-sm hover:bg-red-700"
        onClick={handleRetry}
      >
        Retry
      </button>
    </div>
  );
};

export default StatusRejected;
