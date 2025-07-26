import PageMeta from "Components/PageMeta";
import Tooltip from "Components/Tooltip";
import { getMediaUrl } from "helpers/helpers";
import { useCallback, useState } from "react";
import {
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
} from "react-icons/fa";
import FinalTouchesModal from "../../Components/modals/FinalTouchModal";
import ThumbnailSelection from "./components/ThumbnailSelection";
import useShareWork from "./useShareWork";

const ShareWork = () => {
  const {
    name,
    description,
    isModalOpen,
    setName,
    setDescription,
    handleMediaChange,
    handleCancelClick,
    handleContinueClick,
    handleCloseModal,
    currentIndex,
    handleNext,
    handlePrevious,
    customFields,
    handleAddCustomField,
    handleCustomFieldChange,
    handleRemoveCustomField,
    isStory,
    setIsStory,
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
  } = useShareWork();

  const [postType, setPostType] = useState("portfolio");
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const handleToggleChange = useCallback(
    (event: any) => {
      const selectedType = event.target.value;
      setPostType(selectedType);

      if (selectedType === "dailyBranch") {
        setIsStory(true);
      } else {
        setIsStory(false);
      }
    },
    [setIsStory],
  );

  const handleSelectThumbnail = useCallback((image: string) => {
    setThumbnail(image);
  }, []);

  const handleOpenCropping = useCallback(
    () => setIsCropping(true),
    [setIsCropping],
  );

  return (
    <div className="min-h-screen bg-primary-300 p-3 font-poppins md:p-12">
      <PageMeta
        title="Share Your Work – Showcase Your Creativity on Artbranch"
        description="Share your artwork on Artbranch and connect with a community of creatives. Gain exposure, inspire others, and grow your artistic presence."
      />

      <div className="grid grid-cols-1 space-y-4 lg:grid-cols-3 lg:gap-8">
        <div className="col-span-2 space-y-8">
          <div className="flex justify-between">
            <button
              className="rounded-full bg-primary-1000 px-6 py-2 text-[14px] text-secondary-100"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="rounded-full bg-secondary-100 px-6 py-2 text-[14px] text-primary-300"
              onClick={handleContinueClick}
            >
              Continue
            </button>
          </div>

          <div className="space-y-8">
            {/* Portfolio Title */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Post Title"
                className="mt-4 w-full rounded-lg border border-gray-300 bg-white p-2 px-4 text-[20px] text-secondary-200 focus:outline-none"
              />
            </div>

            {/* Portfolio Description */}
            <div className="flex justify-center">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-[57px] w-[517px] w-full rounded-[11px] border bg-transparent bg-white p-[10px_20px] font-syne text-[16px] leading-[19.2px] text-secondary-200 focus:outline-none"
                placeholder="Write what went into this art or add any details you’d like to mention"
              />
            </div>

            {/* Story Toggle */}

            {isLoading ? (
              <p className="text-gray-500">
                Checking your daily branch eligibility...
              </p>
            ) : (
              <div className="mt-6 flex flex-col items-center p-3">
                <h3 className="mb-2 text-lg font-semibold">
                  Select Post Type:
                </h3>
                <div className="flex items-center space-x-4">
                  {/* Option: Portfolio */}
                  <label className="inline-flex cursor-pointer items-center">
                    <input
                      type="radio"
                      className="peer sr-only"
                      name="postType"
                      value="portfolio"
                      checked={postType === "portfolio"}
                      onChange={handleToggleChange}
                    />

                    <div
                      className={`relative flex h-10 w-32 items-center justify-center rounded-lg border transition-colors duration-200 ${
                        postType === "portfolio"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      Portfolio
                    </div>
                  </label>

                  {/* Option: Daily Branch */}
                  <label className={`inline-flex cursor-pointer items-center`}>
                    <Tooltip
                      content={
                        !canPostDailyBranch.status
                          ? `You're not allowed to post a daily branch until ${canPostDailyBranch.nextAllowedPostTime}.`
                          : !isUserVerified
                            ? `You cannot post a daily branch until your account is verified`
                            : null
                      }
                    >
                      <input
                        type="radio"
                        className="peer sr-only"
                        name="postType"
                        value="dailyBranch"
                        disabled={!canPostDailyBranch.status || !isUserVerified}
                        checked={postType === "dailyBranch"}
                        onChange={handleToggleChange}
                      />
                      <div
                        className={`relative flex h-10 w-32 items-center justify-center rounded-lg transition-colors duration-200 ${
                          postType === "dailyBranch"
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-black"
                        } ${!canPostDailyBranch.status || !isUserVerified ? "opacity-50" : ""}`}
                      >
                        Daily Branch
                      </div>
                    </Tooltip>
                  </label>

                  {/* Option: Both */}
                  {canPostDailyBranch.status && isUserVerified && (
                    <label className="inline-flex cursor-pointer items-center">
                      <Tooltip
                        content={
                          !canPostDailyBranch.status
                            ? `You're not allowed to post a daily branch until ${canPostDailyBranch.nextAllowedPostTime}.`
                            : !isUserVerified
                              ? `You cannot post a daily branch until your account is verified`
                              : null
                        }
                      >
                        <input
                          type="radio"
                          className="peer sr-only"
                          name="postType"
                          value="both"
                          checked={postType === "both"}
                          onChange={handleToggleChange}
                        />
                        <div
                          className={`relative flex h-10 w-32 items-center justify-center rounded-lg border transition-colors duration-200 ${
                            postType === "both"
                              ? "bg-purple-600 text-white"
                              : "bg-gray-200 text-black"
                          }`}
                        >
                          Both
                        </div>
                      </Tooltip>
                    </label>
                  )}
                </div>

                <div className="mt-4">
                  {postType === "portfolio" && (
                    <p className="text-blue-600">
                      Adds to your portfolio, visible only to your profile
                    </p>
                  )}
                  {postType === "dailyBranch" && (
                    <p className="text-green-600">
                      Share one post daily to appear on explore feeds or more
                      visibility.
                    </p>
                  )}
                  {postType === "both" && (
                    <p className="text-purple-600">
                      upload to your portfolio and be seen on explore!
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Media Section */}
            <div className="relative max-h-[800px] min-h-[600px] w-full overflow-hidden rounded-lg">
              <div className="relative flex h-full w-full items-center justify-center">
                {selectedMedia.length > 0 ? (
                  selectedMedia[currentIndex]?.type === "image" ? (
                    <img
                      src={selectedMedia[currentIndex]?.media_url}
                      alt={`Selected Media ${currentIndex + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <video
                      controls
                      src={getMediaUrl(selectedMedia[currentIndex])}
                      className="h-full max-h-[700px] w-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p>No media selected.</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                {selectedMedia.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevious}
                      className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-secondary-100 p-2 text-sm text-primary-200"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-md bg-secondary-100 p-2 text-sm text-primary-200"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Selection */}
            {selectedMedia.some((media) => media.type.startsWith("image")) && (
              <div className="mt-4 flex items-center space-x-4">
                <p className="text-lg font-semibold">Select a thumbnail:</p>
                {selectedMedia
                  .filter((media) => media.type.startsWith("image"))
                  .map((media, index) => (
                    <div
                      key={index}
                      className="relative"
                      onClick={() => {
                        handleSelectThumbnail(media.media_url);
                        setIsCropping(true);
                      }}
                    >
                      <img
                        src={media.media_url}
                        alt={`Thumbnail ${index}`}
                        className={`h-16 w-16 border-2 object-cover ${
                          media.media_url === thumbnail
                            ? "border-blue-500"
                            : "border-gray-300"
                        } cursor-pointer transition-all duration-300 ease-in-out`}
                      />

                      {/* Show an icon for the selected thumbnail */}
                      {media.media_url === thumbnail && (
                        <div className="absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center rounded-full bg-blue-500 bg-opacity-50 text-white">
                          <FaCheckCircle className="text-lg" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Media Details */}
        <div className="w-full space-y-8 p-2 shadow-md lg:min-h-[1094px] lg:max-w-[401px] lg:p-6">
          <div className="space-y-6">
            {/* Enable Public Post */}
            <div className="mt-6 flex items-center">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isPublicPost}
                  onChange={(prev) => setIsPublicPost(!isPublicPost)}
                />
                <div
                  className={`h-6 w-11 rounded-full bg-gray-200 transition-colors ${
                    isPublicPost ? "bg-indigo-600" : ""
                  }`}
                ></div>
                <div
                  className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                    isPublicPost ? "translate-x-5" : ""
                  }`}
                ></div>
              </label>
              <span className="ml-3 text-gray-700">Public Post</span>
            </div>
            <h3 className="text-[24px] font-bold text-secondary-200">
              Media Details
            </h3>
            <div>
              <label className="text-secondary-200">Title</label>
              <input
                type="text"
                value={selectedMedia[currentIndex]?.media_name || ""}
                onChange={(e) =>
                  handleMediaChange("media_name", e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-2 text-secondary-200"
              />
            </div>

            <div>
              <label className="text-secondary-200">Description</label>
              <input
                type="text"
                value={selectedMedia[currentIndex]?.media_desc || ""}
                onChange={(e) =>
                  handleMediaChange("media_desc", e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-gray-300 bg-white p-2 text-secondary-200"
              />
            </div>

            <div>
              <label className="block text-secondary-200">Custom Data</label>
              {customFields.map((field, index) => (
                <div key={index} className="mt-2 flex items-center">
                  <input
                    type="text"
                    value={field.key}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "key", e.target.value)
                    }
                    placeholder="Key"
                    className="w-full rounded-lg border bg-white p-2 text-secondary-200"
                  />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) =>
                      handleCustomFieldChange(index, "value", e.target.value)
                    }
                    placeholder="Value"
                    className="w-full rounded-lg border bg-white p-2 text-secondary-200"
                  />
                  <button
                    onClick={() => handleRemoveCustomField(index)}
                    className="ml-2 text-secondary-200 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <button
                onClick={handleAddCustomField}
                className="mt-4 rounded-lg bg-secondary-100 px-4 py-2 text-[14px] text-primary-300"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      </div>

      <ThumbnailSelection
        isOpen={isCropping}
        onClose={() => setIsCropping(false)}
        image={
          thumbnail ||
          (() => {
            const firstImage = selectedMedia.find(
              (media) => media.type === "image",
            );
            return firstImage ? firstImage.media_url : "";
          })()
        }
        setThumbnail={setThumbnail}
      />

      {isModalOpen && (
        <FinalTouchesModal
          isOpen={isModalOpen}
          description={description}
          name={name}
          selectedMedia={selectedMedia}
          onClose={handleCloseModal}
          isStory={isStory} // Pass isStory to modal
          isPublicPost={isPublicPost}
          both={postType === "both"}
        />
      )}
    </div>
  );
};

export default ShareWork;
