import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const useNav = () => {
  const { handleLogout, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handlePortfolioClick = () => {
    if (profile.role === "Artist") {
      navigate("/portfolio");
    } else {
      navigate("/become-creator");
    }
  };

  return {
    isOpen,
    setIsOpen,
    handleSignupClick,
    handleLoginClick,
    handlePortfolioClick,
    handleLogout,
    profile,
  };
};

export default useNav;
