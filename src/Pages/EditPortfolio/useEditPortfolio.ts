import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMedia } from "../../context/MediaProvider";
import { useUserInfo } from "../../context/UserInfoContext";
import { DbMediaType, TierKeys } from "../../Types";
import { canUploadFileChecker } from "../../utils/helpers";

const useEditPortfolio = (
  originalMedia: DbMediaType[],
  setSelectedMedia: (media: DbMediaType[]) => void,
  setShowSubscriptionModal: (values: boolean) => void,
  totalUpload: number,
) => {
  const [temporaryMedia, setTemporaryMedia] = useState<DbMediaType[]>([]);
  const { addedImages, setAddedImages, deletedImages, setDeletedImages } =
    useMedia();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserInfo();

  useEffect(() => {
    setTemporaryMedia([...originalMedia]);
    setCurrentIndex(0);
  }, [originalMedia]);

  const handleCancel = () => {
    setTemporaryMedia([...originalMedia]);
    setAddedImages([]);
    setDeletedImages([]);
  };

  const handleTemporaryRemoveMedia = (index: number) => {
    setTemporaryMedia((prev) => {
      const removedMedia = prev[index];
      const newMedia = prev.filter((_, i) => i !== index);

      if (!removedMedia) return prev;

      // If media was originally uploaded, track it for deletion
      if (
        originalMedia.some(
          (media) => media.media_url === removedMedia.media_url,
        )
      ) {
        setDeletedImages((prev) => {
          if (
            !prev.some((media) => media.media_url === removedMedia.media_url)
          ) {
            return [...prev, removedMedia];
          }
          return prev;
        });
      } else {
        // Remove from added images list
        setAddedImages((prev) =>
          prev.filter((media) => media.media_url !== removedMedia.media_url),
        );
      }

      // Update the current index if necessary
      if (currentIndex >= newMedia.length) {
        setCurrentIndex(Math.max(0, newMedia.length - 1));
      }

      return newMedia;
    });
  };

  const handleTemporaryMediaChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files) {
      const newMediaFiles = Array.from(files).map((file) => {
        const fileType = file.type.split("/")[0];
        const maxFileSize =
          fileType === "video" ? 20 * 1024 * 1024 : 10 * 1024 * 1024;

        // Verify if the user can upload
        const canUploadMedia = canUploadFileChecker(
          (userInfo?.tier as TierKeys) || "FREE",
          totalUpload,
          file.size,
        );

        if (!canUploadMedia.canUpload) {
          toast.error(
            "You have reached your media upload limit. Please upgrade your tier.",
          );
          setShowSubscriptionModal(true);
          return null;
        }

        if (file.size > maxFileSize) {
          toast.error("File size exceeds the allowed limit.");
          return null;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<DbMediaType | null>((resolve) => {
          reader.onloadend = () => {
            if (reader.result) {
              resolve({
                media_url: reader.result as string,
                file_name: file.name,
                media_name: "",
                custom_data: [],
                media_desc: "",
                type: fileType,
                size: file.size,
              });
            } else {
              resolve(null);
            }
          };
        });
      });

      Promise.all(newMediaFiles).then((mediaFiles) => {
        const validMedia = mediaFiles.filter(
          (item): item is DbMediaType => item !== null,
        );
        setTemporaryMedia((prev) => [...prev, ...validMedia]);
        setAddedImages((prev) => [...prev, ...validMedia]);
      });
    }

    event.target.value = "";
  };

  return {
    temporaryMedia,
    addedImages,
    deletedImages,
    currentIndex,
    loading,
    handleCancel,
    handleTemporaryRemoveMedia,
    handleTemporaryMediaChange,
    setCurrentIndex,
  };
};

export default useEditPortfolio;
