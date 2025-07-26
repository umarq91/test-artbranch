import PageMeta from "Components/PageMeta";
import SubscriptionModal from "Components/modals/SubscriptionModal";
import { TierKeys } from "Types";
import React from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaImage,
  FaTimes,
  FaVideo,
} from "react-icons/fa";
import useUploadImage from "./useUploadImage";

const WorkInProgress: React.FC = () => {
  const {
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
    handleNext,
    loading,
    handlePrevious,
    showSubscriptionModal,
    setShowSubscriptionModal,
    userInfo,
  } = useUploadImage();

  return (
    <div className="flex min-h-screen flex-col justify-center bg-white p-4 font-poppins sm:justify-start sm:p-12">
      <PageMeta
        title="Upload Media"
        description="Easily upload and showcase your media on Artbranch. Share your artwork, photos, and videos with the creative community."
      />

      <div className="grid grid-cols-1 gap-4 py-8 sm:py-0">
        <div className="flex justify-between">
          <button
            className="rounded-full bg-primary-1000 px-4 py-1 text-secondary-100 lg:text-[14px]"
            onClick={handleCancelClick}
          >
            Discard
          </button>
          <button
            disabled={loading}
            className="rounded-full bg-secondary-100 px-4 py-1 text-primary-500 lg:text-[14px]"
            onClick={handleContinueClick}
          >
            {loading ? "Uploading...." : "Continue"}
          </button>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="flex-grow text-center font-bold text-secondary-100 sm:text-[14px] lg:text-[36px]">
            What you've been working on
          </h1>
          <p className="text-secondary-100">
            Add images of your work to display
          </p>
        </div>
        <div
          className={`relative flex h-[300px] items-center justify-center rounded-[15px] border-2 border-dashed border-primary-500 bg-primary-1500 p-4 sm:h-[500px] sm:p-12 ${
            isDragActive ? "bg-primary-1600" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedMedia.length > 0 && (
            <div className="relative h-full w-full">
              <div className="absolute inset-0 flex items-center justify-center">
                {selectedMedia[currentIndex]?.type === "image" ? (
                  <img
                    src={selectedMedia[currentIndex]?.media_url}
                    alt="Selected"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <video
                    controls
                    className="max-h-full max-w-full object-contain"
                  >
                    <source
                      src={selectedMedia[currentIndex]?.media_url}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}
                <button
                  className="absolute right-2 top-2 rounded-full bg-secondary-100 p-1 text-lg text-primary-500"
                  onClick={() => removeMedia(currentIndex)}
                >
                  <FaTimes />
                </button>
              </div>
              {currentIndex > 0 && (
                <button
                  className="absolute left-20 top-80 -translate-y-1/2 transform rounded-r-md bg-secondary-100 p-2 text-sm text-primary-200 active:bg-primary-300 md:left-0 md:top-1/2"
                  onClick={handlePrevious}
                >
                  <FaChevronLeft />
                </button>
              )}
              {currentIndex < selectedMedia.length - 1 && (
                <button
                  className="absolute right-20 top-80 -translate-y-1/2 transform rounded-l-md bg-secondary-100 p-2 text-sm text-primary-200 active:bg-primary-300 md:right-0 md:top-1/2"
                  onClick={handleNext}
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
          )}
          {selectedMedia.length === 0 && (
            <div className="text-center">
              <FaImage className="mx-auto mb-2 text-4xl text-primary-600" />
              <FaVideo className="mx-auto mb-2 text-4xl text-primary-600" />
              <p className="text-lg font-bold text-primary-600">
                Drag and drop, or{" "}
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer underline"
                >
                  Browse
                </label>
              </p>
              <input
                id="file-upload"
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={handleMediaChange}
              />
              <p className="mt-2 text-sm">
                Minimum 1600px width recommended. Max 10MB for images, 20MB for
                videos.
              </p>
            </div>
          )}
          <button
            className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-100 px-4 py-4 text-[20px] text-primary-500 md:h-auto md:w-auto md:rounded-full md:px-8 md:py-2"
            onClick={triggerFileInput}
          >
            +
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={handleMediaChange}
          />
        </div>
      </div>
      {showSubscriptionModal && (
        <SubscriptionModal
          tier={(userInfo?.tier as TierKeys) || "FREE"}
          setIsOpen={setShowSubscriptionModal}
          message="You have reached your media upload limit. Please upgrade your tier."
        />
      )}
    </div>
  );
};

export default WorkInProgress;
