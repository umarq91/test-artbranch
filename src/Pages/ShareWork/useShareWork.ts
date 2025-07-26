import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMedia } from "../../context/MediaProvider";
import { useUserInfo } from "../../context/UserInfoContext";
import { User_STATUS } from "../../Types";
import PortfolioRepository from "../../utils/repositories/portfolioRepository";

interface CanPostDailyBranchState {
  status: boolean;
  nextAllowedPostTime: string;
}

interface CanPostResponse {
  canPost: boolean;
  nextAllowedPostTime: any;
}

const useShareWork = () => {
  const navigate = useNavigate();
  const { selectedMedia, setSelectedMedia, addedImages } = useMedia();
  const [isStory, setIsStory] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const [isPublicPost, setIsPublicPost] = useState(true);

  const [customFields, setCustomFields] = useState(
    selectedMedia[currentIndex]?.custom_data || [{ key: "", value: "" }],
  );
  const [canPostDailyBranch, setCanPostDailyBranch] =
    useState<CanPostDailyBranchState>({
      status: false,
      nextAllowedPostTime: "",
    });

  const [isLoading, setIsLoading] = useState(false);
  const { userInfo } = useUserInfo();
  const [isUserVerified, setIsUserVerified] = useState(
    userInfo?.status === User_STATUS.ACTIVE,
  );

  const [isCropping, setIsCropping] = useState(false);

  useEffect(() => {
    const fetchCanPostDailyBranch = async () => {
      try {
        if (!userInfo) return;
        setIsLoading(true);
        const response = (await PortfolioRepository.canPostStory(
          userInfo.id,
          userInfo.tier || "FREE",
        )) as CanPostResponse;

        setCanPostDailyBranch({
          status: response.canPost,
          nextAllowedPostTime: response.nextAllowedPostTime,
        });
      } catch (error) {
        console.error("Error fetching canPostDailyBranch:", error);
        setCanPostDailyBranch({
          status: false,
          nextAllowedPostTime: "Unable to fetch the allowed time.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (userInfo?.id) {
      fetchCanPostDailyBranch();
    }
  }, [userInfo?.id]);

  const handleMediaChange = useCallback(
    (field: string, value: string) => {
      const updatedMedia = [...selectedMedia];
      updatedMedia[currentIndex] = {
        ...updatedMedia[currentIndex],
        [field]: value,
      };
      setSelectedMedia(updatedMedia);
    },
    [selectedMedia, currentIndex, setSelectedMedia],
  );

  const updateMediaCustomFields = useCallback(
    (updatedFields: Array<{ key: string; value: string }>) => {
      const updatedMedia = [...selectedMedia];
      updatedMedia[currentIndex] = {
        ...updatedMedia[currentIndex],
        custom_data: updatedFields,
      };
      setSelectedMedia(updatedMedia);
    },
    [selectedMedia, currentIndex, setSelectedMedia],
  );

  const handleRemoveCustomField = useCallback(
    (index: number) => {
      const updatedFields = customFields.filter((_, i) => i !== index);
      setCustomFields(updatedFields);
      updateMediaCustomFields(updatedFields);
    },
    [customFields, updateMediaCustomFields],
  );

  const handleAddCustomField = useCallback(() => {
    const updatedFields = [...customFields, { key: "", value: "" }];
    setCustomFields(updatedFields);
    updateMediaCustomFields(updatedFields);
  }, [customFields, updateMediaCustomFields]);

  const handleCustomFieldChange = useCallback(
    (index: number, field: string, value: string) => {
      const updatedFields = [...customFields];
      updatedFields[index][field] = value;
      setCustomFields(updatedFields);
      updateMediaCustomFields(updatedFields);
    },
    [customFields, updateMediaCustomFields],
  );

  const handleNext = useCallback(() => {
    if (selectedMedia && currentIndex < selectedMedia.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCustomFields(
        selectedMedia[nextIndex]?.custom_data || [{ key: "", value: "" }],
      );
    }
  }, [selectedMedia, currentIndex]);

  const handlePrevious = useCallback(() => {
    if (selectedMedia && currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCustomFields(
        selectedMedia[prevIndex]?.custom_data || [{ key: "", value: "" }],
      );
    }
  }, [selectedMedia, currentIndex]);

  const handleAddTag = useCallback(() => {
    setTags([...tags, tagInput]);
    setTagInput("");
  }, [tags, tagInput]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission if inside a form
        handleAddTag();
      }
    },
    [handleAddTag],
  );

  const handleCancelClick = useCallback(
    () => navigate("/upload-image"),
    [navigate],
  );

  const handleContinueClick = useCallback(() => setIsModalOpen(true), []);

  // Memoized handleCloseModal
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  return {
    name,
    setName,
    description,
    tags,
    setTags,
    tagInput,
    setTagInput,
    setDescription,
    isModalOpen,
    handleMediaChange,
    handleCancelClick,
    handleContinueClick,
    handleKeyDown,
    handleAddTag,
    handleCloseModal,
    isStory,
    setIsStory,
    currentIndex,
    handleNext,
    handleRemoveCustomField,
    handlePrevious,
    customFields,
    handleAddCustomField,
    handleCustomFieldChange,
    setCustomFields,
    selectedMedia,
    canPostDailyBranch,
    isLoading,
    userInfo,
    isPublicPost,
    setIsPublicPost,
    isUserVerified,
    setIsUserVerified,
    isCropping,
    setIsCropping,
  };
};

export default useShareWork;
