import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import uploadProfileImage from "../../Components/UploadProfileImage";
import { UserProfileType } from "../../Types";
import { useMedia } from "../../context/MediaProvider";
import { useUserInfo } from "../../context/UserInfoContext";
import {
  deleteImagesFromSupabase,
  uploadImagesToSupabase,
} from "../../helpers/uploadImagesToSupabase";
import { UserRepository } from "../../utils/repositories/userRepository";

export const useEditProfile = () => {
  const { userInfo, setUserInfo, temporaryUserInfo, setTemporaryUserInfo } =
    useUserInfo();
  const {
    addedCoverImages,
    deletedCoverImages,
    setAddedCoverImages,
    setDeletedCoverImages,
    setTemporaryImages,
  } = useMedia();

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("general");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const tabs = ["general", "password", "socials"];
  const userTabs = [
    ...tabs,
    userInfo?.is_verified === false ? "verify" : null,
  ].filter(Boolean) as string[];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab") || "general";
    setActiveTab(tab);
  }, [location.search]);

  const handleChange = useCallback(
    (field: keyof UserProfileType, value: string) => {
      setTemporaryUserInfo((prevProfile: UserProfileType | any) => ({
        ...prevProfile,
        [field]: value,
      }));
    },
    [setTemporaryUserInfo],
  );

  const handleChangeSocialProfiles = useCallback(
    (platform: string, value: string) => {
      setTemporaryUserInfo((prevProfile: UserProfileType | any) => ({
        ...prevProfile,
        social_profiles: {
          ...prevProfile.social_profiles,
          [platform]: value,
        },
      }));
    },
    [setTemporaryUserInfo],
  );

  // Handle saving profile updates
  const handleSave = async () => {
    setLoading(true);

    try {
      if (!userInfo) return;
      let updatedProfileUrl = userInfo?.profile;

      const profileImageChanged =
        userInfo?.profile != temporaryUserInfo?.profile;

      // Upload new profile image if changed
      if (profileImageChanged) {
        const profileImage = await uploadProfileImage(
          userInfo.id ?? "",
          temporaryUserInfo?.profile!,
        );

        if (!profileImage.success) {
          toast.error("Failed to update profile image. Please try again.");
          return;
        }

        updatedProfileUrl = profileImage.imageUrl!;
      }

      // Handle uploading new images
      const uploadedImageUrls: string[] =
        addedCoverImages.length > 0
          ? await uploadImagesToSupabase(addedCoverImages, "images")
          : [];

      // Check for deleted images
      if (deletedCoverImages.length > 0) {
        await deleteImagesFromSupabase(deletedCoverImages as string[]);
      }

      // Prepare the updated profile data
      const updatedProfileData = {
        ...temporaryUserInfo,
        profile: updatedProfileUrl,
        images: [...(userInfo?.images ?? []), ...uploadedImageUrls],
      };

      const { tier, ...rest } = updatedProfileData;
      // Update user profile in the repository
      await UserRepository.updateUserProfile(userInfo?.id, rest);

      // Update context with new user info
      setUserInfo((prev: UserProfileType | any) => ({
        ...prev,
        ...temporaryUserInfo,
        profile: updatedProfileUrl,
        images: [...(prev.images ?? []), ...uploadedImageUrls],
      }));

      // Update temporary images and show success message
      setTemporaryImages([...(userInfo?.images ?? []), ...uploadedImageUrls]);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      // Reset cover images and loading state
      setAddedCoverImages([]);
      setDeletedCoverImages([]);
      setLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    if (tab !== activeTab) setActiveTab(tab);
    navigate("?tab=" + tab, { replace: true });
  };

  // Function to add a tag
  const handleAddTag = useCallback(
    (tag: string) => {
      setTemporaryUserInfo((prevProfile: UserProfileType | any) => {
        const updatedTags = [...(prevProfile.tags || []), tag];
        return {
          ...prevProfile,
          tags: updatedTags,
        };
      });
    },
    [setTemporaryUserInfo],
  );

  // Function to remove a tag
  const handleRemoveTag = useCallback(
    (tag: string) => {
      setTemporaryUserInfo((prevProfile: UserProfileType | any) => {
        const updatedTags = (prevProfile.tags || []).filter(
          (t: string) => t !== tag,
        );
        return {
          ...prevProfile,
          tags: updatedTags,
        };
      });
    },
    [setTemporaryUserInfo],
  );

  // Function to add a category
  const handleAddCategory = useCallback(
    (category: string) => {
      setTemporaryUserInfo((prevProfile: UserProfileType | any) => {
        const updatedCategories = [...(prevProfile.categories || []), category];
        return {
          ...prevProfile,
          categories: updatedCategories,
        };
      });
    },
    [setTemporaryUserInfo],
  );

  // Function to remove a category
  const handleRemoveCategory = useCallback(
    (category: string) => {
      setTemporaryUserInfo((prevProfile: UserProfileType | any) => {
        const updatedCategories = (prevProfile.categories || []).filter(
          (c: string) => c !== category,
        );
        return {
          ...prevProfile,
          categories: updatedCategories,
        };
      });
    },
    [setTemporaryUserInfo],
  );

  return {
    activeTab,
    handleTabChange,
    showDropdown,
    setShowDropdown,
    isModalOpen,
    setIsModalOpen,
    loading,
    handleChange,
    handleChangeSocialProfiles,
    handleSave,
    userTabs,
    isVerifyTab: activeTab === "verify",
    temporaryUserInfo,
    handleAddTag,
    handleRemoveTag,
    handleAddCategory,
    handleRemoveCategory,
    isDeleting,
    setIsDeleting,
  };
};
