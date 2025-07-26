import Rejected from "Components/RejectPage";
import { useUserInfo } from "context/UserInfoContext";
import { Toast } from "helpers/Toast";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User_STATUS } from "Types";
import { supabase } from "utils/services/supabase";

function ArtistProtectedRoute() {
  const { userInfo } = useUserInfo();
  const [isHandlingDisabled, setIsHandlingDisabled] = useState(false);

  if (!userInfo) {
    return null; // Prevents redirect until userInfo is available
  }

  if (userInfo?.role === "Audience") {
    return <Navigate to="/" />;
  }

  switch (userInfo?.status) {
    case User_STATUS.REJECTED:
      return <Rejected />;

    case User_STATUS.DISABLED:
    case User_STATUS.DELETE_REQUEST:
      if (!isHandlingDisabled) {
        setIsHandlingDisabled(true);
        handleDisabledAccount();
      }
      return null;

    case User_STATUS.PENDING:
    case User_STATUS.ACTIVE:
      return <Outlet />;

    default:
      return <Navigate to="/login" />;
  }
}

const handleDisabledAccount = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("authToken");
  Toast(
    "Your account has been disabled. Please contact customer support.",
    "error",
  );
  setTimeout(() => {
    window.location.href = "/login";
  }, 1000);
};

export default ArtistProtectedRoute;
