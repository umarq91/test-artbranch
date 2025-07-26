import Button from "Components/Button";
import DeleteConfirmationModal from "Components/modals/DeleteConfirmationModal";
import PageMeta from "Components/PageMeta";
import { useUserInfo } from "context/UserInfoContext";
import { useEffect } from "react";
import { User_STATUS } from "Types";
import { UserRepository } from "utils/repositories/userRepository";
import Dropdown from "./components/Dropdown";
import Header from "./components/Header";
import GeneralTab from "./Tabs/GeneralTab";
import PasswordTab from "./Tabs/PasswordTab";
import SocialProfilesTab from "./Tabs/SocialProfilesTab";
import VerifyWrapper from "./Tabs/VerifyWrapper";
import { useEditProfile } from "./useEditProfile";
import { toast } from "react-toastify";

function EditProfilePage() {
  const {
    activeTab,
    handleTabChange,
    showDropdown,
    setShowDropdown,
    isModalOpen,
    setIsModalOpen,
    loading,
    handleSave,
    userTabs,
    isVerifyTab,
    temporaryUserInfo,
    isDeleting,
    setIsDeleting
  } = useEditProfile();

  const { userInfo, resetTemporaryUserInfo, setTemporaryUserInfo } =
    useUserInfo();

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab />;
      case "password":
        return <PasswordTab />;
      case "socials":
        return <SocialProfilesTab />;
      case "verify":
        return <VerifyWrapper />;
      default:
        return <GeneralTab />;
    }
  };
  useEffect(() => {
    resetTemporaryUserInfo(userInfo);
  }, []);

  const handleConfirmAccountDelete = async () => {
    setIsDeleting(true);
    try {
      if (userInfo?.id) {
        await UserRepository.updateUserProfile(userInfo?.id, {
          status: User_STATUS.DISABLED,
        });
      }
      toast.success("Account deleted successfully");

      window.location.href="/"  
    } catch (error) {
      toast.error("Error deleting account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 p-8 font-syne md:gap-16 md:p-12">
      <PageMeta
        title="Edit Your Profile"
        description="Edit your profile on Artbranch to update your portfolio, bio, and personal details. Keep your artist profile fresh and engaging."
      />

      <Header activeTab={activeTab} />

      {/* Mobile Dropdown */}
      <Dropdown
        activeTab={activeTab}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        setActiveTab={handleTabChange}
        tabs={userTabs}
      />

      {/* Large Screens Navigation */}
      <div className="flex flex-col gap-8 md:flex-row">
        <nav className="hidden w-1/4 flex-col gap-4 md:flex">
          {userTabs.map((tab) => (
            <button
              key={tab}
              className={`rounded-lg px-4 py-2 text-left font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "scale-105 transform text-lg text-black"
                  : "text-base text-gray-400"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab.charAt(0).toUpperCase() +
                tab.slice(1).replace(/([A-Z])/g, " $1")}
            </button>
          ))}
          <hr />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-left font-semibold text-red-500"
          >
            Delete Account
          </button>
        </nav>

        {/* Tab Content */}
        <div className="tab-content flex flex-1 flex-col">
          <div className="flex-1">{renderTabContent()}</div>
          {/* Hide Save Button in "verify_your_account" tab */}
          {!isVerifyTab && (
            <div className="flex justify-end py-4">
              <Button
                title={loading ? "Saving..." : "Save"}
                className="w-[200px] rounded-lg bg-[#131114] p-[10px_30px] font-syne text-[20px] font-bold leading-[24px] text-[#F5F3EE] hover:bg-gray-800"
                loading={loading}
                onClick={handleSave}
                withTransition={true}
              />
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          itemTitle="I accept"
          isLoading={isDeleting}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmAccountDelete}
        />
      </div>
    </div>
  );
}

export default EditProfilePage;

