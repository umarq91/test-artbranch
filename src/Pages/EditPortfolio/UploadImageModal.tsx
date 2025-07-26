import Button from "Components/Button";
import SubscriptionModal from "Components/modals/SubscriptionModal";
import { getMediaUrl } from "helpers/helpers";
import React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaImage,
  FaTimes,
  FaVideo,
} from "react-icons/fa";
import { DbMediaType, TierKeys } from "Types";
import useUploadImage from "../UploadImage/useUploadImage";
import useEditPortfolio from "./useEditPortfolio"; // Import the updated hook

interface WorkInProgressProps {
  isOpen: boolean;
  onClose: () => void;
  setAddedImages: React.Dispatch<React.SetStateAction<DbMediaType[]>>;
  setDeletedImages: React.Dispatch<React.SetStateAction<DbMediaType[]>>;
}

const UploadImageModal: React.FC<WorkInProgressProps> = ({
  isOpen,
  onClose,
  setAddedImages,
  setDeletedImages,
}) => {
  const {
    selectedMedia: originalMedia,
    triggerFileInput,
    fileInputRef,
    setSelectedMedia,
    showSubscriptionModal,
    setShowSubscriptionModal,
    userInfo,
    totalUploaded,
  } = useUploadImage();

  const {
    temporaryMedia,
    addedImages,
    deletedImages,
    currentIndex,
    loading,
    handleCancel,
    handleTemporaryRemoveMedia,
    handleTemporaryMediaChange,
    setCurrentIndex,
  } = useEditPortfolio(
    originalMedia,
    setSelectedMedia,
    setShowSubscriptionModal,
    totalUploaded,
  );

  if (!isOpen) return null;

  const isOnlyOneMedia = temporaryMedia.length === 1;

  const handleNext = () => {
    if (currentIndex < temporaryMedia.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const closeModal = () => {
    handleCancel();
    onClose();
  };

  const handleConfirm = () => {
    setSelectedMedia(temporaryMedia);
    setAddedImages(addedImages);
    setDeletedImages(deletedImages);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[80vh] w-[90%] max-w-screen-lg overflow-y-auto rounded-lg bg-primary-1200 p-4 sm:p-8">
        <button
          className="absolute right-4 top-4 text-white"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>

        <div className="flex justify-between">
          <div className="group inline-block">
            <button
              className="bg-primary-3000 relative overflow-hidden rounded-full px-6 py-2 text-[14px] text-secondary-100"
              onClick={closeModal}
            >
              <span className="relative z-10">Cancel</span>
              <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-secondary-100 transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          </div>
          <Button
            disabled={loading}
            onClick={handleConfirm}
            title="Continue"
            loading={loading}
            withTransition
          ></Button>
        </div>

        <div className="relative mt-4 flex h-[200px] items-center justify-center rounded-[15px] border-2 border-dashed p-4 sm:h-[400px] sm:p-8 lg:h-[500px]">
          {temporaryMedia.length > 0 ? (
            <div className="relative h-full w-full">
              {temporaryMedia[currentIndex]?.type === "image" ? (
                <img
                  src={temporaryMedia[currentIndex]?.media_url}
                  alt="Selected"
                  className="h-full w-full object-cover" // Use object-cover to fill the modal width
                />
              ) : (
                <video
                  src={getMediaUrl(temporaryMedia[currentIndex])}
                  controls
                  className="h-full w-full object-cover"
                />
              )}

              <button
                className={`absolute right-2 top-2 rounded-full bg-secondary-100 p-1 text-primary-500 ${isOnlyOneMedia ? "cursor-not-allowed opacity-50" : ""}`}
                onClick={() =>
                  !isOnlyOneMedia && handleTemporaryRemoveMedia(currentIndex)
                }
                disabled={isOnlyOneMedia}
              >
                <FaTimes />
              </button>

              {currentIndex > 0 && (
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 transform bg-secondary-100 p-2"
                  onClick={handlePrevious}
                >
                  <FaChevronLeft />
                </button>
              )}
              {currentIndex < temporaryMedia.length - 1 && (
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 transform bg-secondary-100 p-2"
                  onClick={handleNext}
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <FaImage className="mx-auto mb-2 text-3xl text-primary-600 sm:text-4xl" />
              <FaVideo className="mx-auto mb-2 text-3xl text-primary-600 sm:text-4xl" />
              <p className="text-sm font-bold text-primary-600 sm:text-lg">
                Drag and drop, or{" "}
                <label className="cursor-pointer underline">Browse</label>
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            className="rounded-full bg-secondary-100 px-4 py-1 text-[12px] text-primary-500 sm:text-[14px] lg:text-[16px]"
            onClick={triggerFileInput}
          >
            Add More Media
          </button>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleTemporaryMediaChange}
          />
        </div>

        {showSubscriptionModal && (
          <SubscriptionModal
            tier={(userInfo?.tier as TierKeys) || "FREE"}
            setIsOpen={setShowSubscriptionModal}
            message="You have reached your media upload limit. Please upgrade your tier."
          />
        )}
        {isOnlyOneMedia && (
          <div className="mt-4 text-center text-gray-500">
            At least one image must be present. You can't remove all the images.
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageModal;
