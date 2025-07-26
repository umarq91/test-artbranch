import { useUserInfo } from "context/UserInfoContext";
import { FC, useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { verification_status } from "Types";
import { checkForUserStatus } from "utils/api/verification_api";
import StatusPending from "../components/pending";
import StatusRejected from "../components/rejection";
import VerifyAccountTab from "./Verify_account";

const VerifyWrapper: FC = () => {
  const { userInfo } = useUserInfo();
  const [status, setStatus] = useState<string>("not_applied");
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [retry, setRetry] = useState(false); // Track retry
  const navigate = useNavigate();

  const checkVerificationStatus = useCallback(async () => {
    setLoading(true);
    try {
      const data = await checkForUserStatus(userInfo?.id!);
      if (data) {
        setStatus(data.req_status);
        setRejectionReason(data.reason || "");
      } else {
        setStatus("not_applied");
      }
    } catch (error) {
      console.error("Failed to check verification status:", error);
      setStatus("not_applied");
    } finally {
      setLoading(false);
    }
  }, [userInfo?.id]);

  // Call checkVerificationStatus when userInfo.id or retry changes
  useEffect(() => {
    if (userInfo?.id) {
      checkVerificationStatus();
    }
  }, [userInfo?.id, retry, checkVerificationStatus]);

  useEffect(() => {
    if (status === verification_status.verified) {
      navigate("/edit/profile?tab=general");
    }
  }, [status, navigate]);

  const handleRetry = () => {
    setRetry((prev) => !prev); // Trigger retry by toggling the state
  };

  if (loading) return <Skeleton />;

  const renderStatusComponent = () => {
    switch (status) {
      case verification_status.not_applied:
        return (
          <VerifyAccountTab checkVerificationStatus={checkVerificationStatus} />
        );
      case verification_status.pending:
        return <StatusPending />;
      case verification_status.rejected:
        return (
          <StatusRejected
            rejectionReason={rejectionReason}
            onRetry={handleRetry}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderStatusComponent()}</>;
};

export default VerifyWrapper;
