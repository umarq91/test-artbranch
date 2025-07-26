import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMedia } from "../../context/MediaProvider";
import { useUserInfo } from "../../context/UserInfoContext";
import { DbMediaType, TierKeys } from "../../Types";
import { totalSizeOfMediaUploaded } from "../../utils/api/Info";
import { canUploadFileChecker } from "../../utils/helpers";

const useUploadImage = () => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { setSelectedMedia, selectedMedia } = useMedia();
  const [loading, setLoading] = useState(false);

  const [totalUploaded, setTotalUploaded] = useState(0);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    const checkUploadPermission = async () => {
      if (userInfo) {
        const totalUploadedMediaResponse = await totalSizeOfMediaUploaded(
          userInfo.id,
        );
        if (totalUploadedMediaResponse) {
          setTotalUploaded(totalUploadedMediaResponse);
        }
      }
    };

    checkUploadPermission();
  }, [userInfo]);

  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg", "video/quicktime"]; 
  
      const newMediaFiles = Array.from(files).map((file) => {
        const fileType = file.type.split("/")[0];
        const isImage = fileType === "image" && allowedImageTypes.includes(file.type);
        const isVideo = fileType === "video" && allowedVideoTypes.includes(file.type);
  
        const maxFileSize = isImage ? 10 * 1024 * 1024 : 20 * 1024 * 1024; // 10MB for images, 20MB for videos
  
        if (!isImage && !isVideo) {
          toast.error("Unsupported file format. Please upload only images or videos.");
          return null;
        }
  
        const canUploadMedia = canUploadFileChecker(
          (userInfo?.tier as TierKeys) || "FREE",
          totalUploaded,
          file.size
        );
  
        if (!canUploadMedia.canUpload) {
          toast.error("You have reached your media upload limit. Please upgrade your tier.");
          setShowSubscriptionModal(true);
          return null;
        }
  
        if (file.size > maxFileSize) {
          toast.error(isImage ? "Image size exceeds the allowed limit of 10MB." : "Video size exceeds the allowed limit of 20MB.");
          return null;
        }
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<DbMediaType | null>((resolve) => {
          reader.onloadend = () => {
            if (reader.result) {
              resolve({
                media_url: reader.result as string,
                type: fileType,
                media_name: "",
                custom_data: [],
                media_desc: "",
                file_name: file.name,
                size: file.size,
              });
            } else {
              resolve(null);
            }
          };
        });
      });
  
      Promise.all(newMediaFiles).then((mediaFiles) => {
        setSelectedMedia((prevMedia) => [
          ...prevMedia,
          ...mediaFiles.filter((item): item is DbMediaType => item !== null),
        ]);
      });
    }
  
    event.target.value = "";
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeMedia = (index: number) => {
    setSelectedMedia((prevMedia) => prevMedia.filter((_, i) => i !== index));
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    handleMediaChange(event as any);
  };

  const handleContinueClick = async () => {
    if (!selectedMedia.length) {
      toast.warn("You must attach an image or video before continuing.", {
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    try {
      // Simulate an async operation before navigating
      // await PortfolioRepository.savePortfolio(title, tags, selectedMedia);
      navigate("/share-work");
    } catch (error) {
      console.error("Failed to save portfolio:", error);
      toast.error("An error occurred while saving your portfolio.");
    }
  };

  const handleCancelClick = () => {
    setSelectedMedia([]);
    navigate("/portfolio");
  };

  const handleNext = () => {
    if (currentIndex < selectedMedia.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // This is for Modal
  const resetState = () => {
    setSelectedMedia([]);
    setCurrentIndex(0);
    setIsDragActive(false);
  };

  return {
    selectedMedia,
    isDragActive,
    handleMediaChange,
    triggerFileInput,
    removeMedia,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleContinueClick,
    handleCancelClick,
    fileInputRef,
    currentIndex,
    resetState,
    handleNext,
    setSelectedMedia,
    loading,
    setCurrentIndex,
    handlePrevious,
    setTitle,
    setTags,
    showSubscriptionModal,
    setShowSubscriptionModal,
    userInfo,
    totalUploaded,
  };
};

export default useUploadImage;
