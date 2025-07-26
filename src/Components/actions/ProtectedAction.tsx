import LoginModal from "Components/modals/LoginModal";
import { useUserInfo } from "context/UserInfoContext";
import React, { useState } from "react";

const ProtectedAction = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useUserInfo();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    if (!userInfo) {
      event.stopPropagation();
      setShowModal(true);
    }
  };

  return (
    <>
      <div onClick={handleClick}>{children}</div>

      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </>
  );
};

export default ProtectedAction;
