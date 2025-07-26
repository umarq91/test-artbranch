import { LoadingLoader } from "Components/LoadingLoader";
import LoginModal from "Components/modals/LoginModal";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const PrivateRoute = () => {
  const { profile, loading } = useAuth();
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!profile) {
      setIsModalOpen(true);
    }
  }, [profile, token]);

  if (loading) {
    return <LoadingLoader />;
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    window.location.reload();
  };

  return (
    <div className="">
      {isModalOpen && <LoginModal onClose={handleCloseModal} />}

      {/* If authenticated, render the child components (Outlet) */}
      {profile || token ? <Outlet /> : null}
    </div>
  );
};

export default PrivateRoute;
