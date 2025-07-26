import { useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "context/UserInfoContext";
import {
  associateMediaWithPortfolio,
  uploadMediaToSupabase,
} from "helpers/UploadMediaToSupabase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DbMediaType, PositionType, TierKeys } from "Types";
import {
  addWatermark,
  suggestedTagsHelper,
  userPermissions,
} from "utils/helpers";
import PortfolioRepository from "utils/repositories/portfolioRepository";
import Button from "../Button";

interface FinalTouchesModalProps {
  selectedMedia: DbMediaType[];
  isOpen: boolean;
  onClose: () => void;
  name: string;
  description: string;
  isStory: boolean;
  both?: boolean;
  thumbnailIndex?: number;
  isPublicPost?: boolean;
}

const FinalTouchesModal = ({
  selectedMedia,
  isOpen,
  onClose,
  name,
  description,
  isStory,
  both,
  thumbnailIndex,
  isPublicPost,
}: FinalTouchesModalProps) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  const queryClient = useQueryClient();
  const { userInfo } = useUserInfo();
  const [tagInput, setTagInput] = useState("");

  const [tags, setTags] = useState<string[]>([]);
  const [suggestedTags, setSuggestedTags] =
    useState<string[]>(suggestedTagsHelper);

  const [canAddCustomWatermark, setCanAddCustomWatermark] = useState(false);
  const [canPositionWatermark, setCanPositionWatermark] = useState(false);
  const [previewImage, setPreviewImage] = useState(selectedMedia[0]?.media_url);
  const [positionOfWatermark, setPositionOfWatermark] =
    useState<PositionType>("center");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [enableWatermark, setIsEnableWatermark] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentActiveTabIndex, setCurrentActiveTabIndex] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<"logo" | "logob" | "logoc">(
    "logo",
  );
  const [watermarkOpacity, setWatermarkOpacity] = useState(100);

  const handleLogoSelection = (logo: "logo" | "logob" | "logoc") => {
    setSelectedLogo(logo);
  };
  const handleToggle = async () => {
    setIsEnableWatermark(!enableWatermark);
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // const handleNext = () => {
  //   if (0 < selectedMedia.length - 1) {
  //     set0(0 + 1);
  //   }
  // };

  // const handlePrevious = () => {
  //   if (0 > 0) {
  //     set0(0 - 1);
  //   }
  // };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleAddTag = () => {
    setTags([...tags, tagInput]);
    setTagInput("");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handleWatermarkPositionChange = (e: any) => {
    setPositionOfWatermark(e.target.value);
  };

  const handleChangeOpacity = (e: any) => {
    setWatermarkOpacity(e.target.value);
  };
  const handleContinue = async () => {
    setLoading(true);
    const portfolios = await PortfolioRepository.createPortfolio(
      name,
      description,
      tags,
      isStory,
      both,
      isPublicPost,
    );

    const firstPortfolioId = portfolios[0]?.id;
    const secondPortfolioId = both ? portfolios[1]?.id : null;
    const mediaUrls = await uploadMediaToSupabase(
      selectedMedia,
      firstPortfolioId,
      enableWatermark,
      selectedLogo,
      uploadedImage,
      watermarkOpacity,
      canPositionWatermark ? positionOfWatermark : undefined,
    );

    if ("error" in mediaUrls) {
      toast.error(`Upload failed: ${mediaUrls.error}`);
      onClose();
      return;
    }

    // If 'both' is true, associate the media with the second portfolio without uploading again
    if (both && secondPortfolioId) {
      await associateMediaWithPortfolio(
        selectedMedia,
        secondPortfolioId,
        mediaUrls,
      );
    }

    setLoading(false);
    if (both) {
      queryClient.invalidateQueries({
        queryKey: ["artist-portfolios", userInfo?.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["artist-daily-branch", userInfo?.id],
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ["artist-portfolios", userInfo?.id],
      });
    }
    navigate("/portfolio");
  };

  useEffect(() => {
    if (userInfo) {
      setCanAddCustomWatermark(
        userPermissions((userInfo?.tier as TierKeys) || "FREE").customLogo,
      );
      setCanPositionWatermark(
        userPermissions((userInfo?.tier as TierKeys) || "FREE")
          .canMoveWatermark,
      );
    }
  }, []);

  useEffect(() => {
    if (enableWatermark) {
      const newImage = addWatermark(
        selectedMedia[0].media_url,
        selectedLogo,
        uploadedImage,
        positionOfWatermark,
        watermarkOpacity,
      ).then((newImage: Blob) => {
        const previewImageUrl = URL.createObjectURL(newImage);
        setPreviewImage(previewImageUrl);
      });
    } else {
      setPreviewImage(selectedMedia[0].media_url);
    }
  }, [
    enableWatermark,
    watermarkOpacity,
    positionOfWatermark,
    selectedLogo,
    uploadedImage,
  ]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="md:0 no-scrollbar mx-auto max-h-[90vh] max-w-5xl overflow-y-scroll rounded-[30px] bg-[#F5F2ED] p-6 md:p-6">
        <h2 className="text-[36px] font-bold text-[#000000]">Final Touches</h2>

        {/* Grid Container */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Thumbnail Preview */}
          <div className="relative flex flex-col items-center">
            <p className="mb-4 text-[16px] text-[#B9B3AE]">Post Preview</p>
            <div className="relative">
              {selectedMedia[0]?.type === "image" ? (
                <img
                  src={previewImage}
                  alt={`Thumbnail Preview ${0 + 1}`}
                  className="h-[150px] w-[200px] rounded-[10px] object-contain shadow-lg sm:h-[255px] sm:w-[328px]"
                />
              ) : (
                <video
                  controls
                  className="h-[150px] w-[200px] rounded-[10px] object-cover shadow-lg sm:h-[255px] sm:w-[328px]"
                >
                  <source src={selectedMedia[0].media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {/* {selectedMedia?.length > 1 && (
                <>
                  <button
                    onClick={handlePrevious}
                    className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-secondary-100 p-2 text-primary-200 hover:bg-secondary-200"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-secondary-100 p-2 text-primary-200 hover:bg-secondary-200"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )} */}
            </div>
          </div>

          {/* Tags Input & Watermark Options */}

          <div>
            {/* Step 1 */}
            {currentActiveTabIndex === 1 && (
              <div className="space-y-2">
                {/* Tags Section */}
                <p className="text-lg font-bold text-[#131114]">
                  {" "}
                  Suggested Tags
                </p>

                {/* Suggested Tags */}
                <div className="flex flex-wrap gap-3">
                  {suggestedTags.slice(0, 8).map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        // Add the tag to the `tags` array
                        setTags([...tags, item]);

                        // Remove the tag from `suggestedTags`
                        setSuggestedTags(
                          suggestedTags.filter((_, i) => i !== index),
                        );
                      }}
                      className="cursor-pointer rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-700 hover:bg-indigo-200"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Tag Input */}
                <div className="">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagChange}
                    onKeyDown={handleKeyDown}
                    className="mt-4 h-[57px] w-full rounded-lg border border-gray-300 bg-white p-4 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Add tags..."
                  />
                </div>

                {/* Added Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs text-gray-700 shadow"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => {
                            // Remove the tag from `tags` array
                            const updatedTags = tags.filter(
                              (_, i) => i !== index,
                            );
                            setTags(updatedTags);

                            // Add the removed tag back to `suggestedTags` if not already present
                            if (!suggestedTags.includes(tag)) {
                              setSuggestedTags([...suggestedTags, tag]);
                            }
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentActiveTabIndex === 2 && (
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-[#131114]">
                    Watermark settings
                  </p>
                  {/* Info Icon */}
                  <button
                    onClick={() => setShowInfo(true)}
                    className="text-gray-500 hover:text-indigo-600"
                    aria-label="More info about watermark"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75v6.5m0 3.25h.007M21 12c0 4.971-4.029 9-9 9s-9-4.029-9-9 4.029-9 9-9 9.029-9 9 9z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Tooltip or Modal */}
                {showInfo && (
                  <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
                    <div className="max-h-[90vh] w-96 overflow-y-scroll rounded-lg bg-white p-6 shadow-lg">
                      <p className="mt-4 text-xs text-gray-600">
                        Watermark features are available based on your
                        subscription tier. Below are the details of each tier:
                      </p>

                      {/* Tiers */}
                      <div className="mt-6 space-y-4">
                        <div className="rounded-md border p-4">
                          <h4 className="text-md font-bold text-indigo-600">
                            Basic Tier
                          </h4>
                          <p className="text-xs text-gray-600">
                            - Add default logo. <br />- Logo fixed at the center
                            of the image.
                          </p>
                        </div>
                        <div className="rounded-md border p-4">
                          <h4 className="text-md font-bold text-indigo-600">
                            Standard Tier
                          </h4>
                          <p className="text-xs text-gray-600">
                            - Add default logo. <br />- Choose logo position
                          </p>
                        </div>
                        <div className="rounded-md border p-4">
                          <h4 className="text-md font-bold text-indigo-600">
                            Premium Tier
                          </h4>
                          <p className="text-xs text-gray-600">
                            - Add default logo or upload a custom logo. <br />-
                            Choose logo position.
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 text-right">
                        <button
                          onClick={() => setShowInfo(false)}
                          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                        >
                          Got it
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enable Watermark */}
                <div className="mt-6 flex items-center">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={enableWatermark}
                      onChange={handleToggle}
                    />
                    <div
                      className={`h-6 w-11 rounded-full bg-gray-200 transition-colors ${
                        enableWatermark ? "bg-indigo-600" : ""
                      }`}
                    ></div>
                    <div
                      className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                        enableWatermark ? "translate-x-5" : ""
                      }`}
                    ></div>
                  </label>
                  <span className="ml-3 text-gray-700">Add Watermark</span>
                </div>

                {/* Watermark Options */}
                {enableWatermark && (
                  <div className="mt-6">
                    <p className="text-sm text-gray-500">
                      {!uploadedImage && (
                        <span className="text-green-600">
                          Default Art Branch Logo added.
                        </span>
                      )}
                    </p>
                    <div>
                      {/* Logos Section */}
                      <div className="mt-4 flex items-center justify-center space-x-4">
                        {/* Logo 1 */}
                        <div
                          className={`flex h-20 w-20 items-center justify-center border ${
                            selectedLogo === "logo" && !uploadedImage
                              ? "border-indigo-600"
                              : "border-gray-300"
                          } cursor-pointer rounded-md`}
                          onClick={() => {
                            handleLogoSelection("logo");
                            setUploadedImage(null);
                          }}
                        >
                          <img
                            src="/logo.png"
                            alt="Logo 1"
                            className="h-12 w-12 object-contain"
                          />
                        </div>

                        {/* Logo 2 */}
                        <div
                          className={`flex h-20 w-20 items-center justify-center border ${
                            selectedLogo === "logob" && !uploadedImage
                              ? "border-indigo-600"
                              : "border-gray-300"
                          } cursor-pointer rounded-md`}
                          onClick={() => {
                            handleLogoSelection("logob");
                            setUploadedImage(null);
                          }}
                        >
                          <img
                            src="/logob.png"
                            alt="Logo 2"
                            className="h-12 w-12 object-contain"
                          />
                        </div>
                        {/* Logo 2 */}
                        <div
                          className={`flex h-20 w-20 items-center justify-center border ${
                            selectedLogo === "logoc" && !uploadedImage
                              ? "border-indigo-600"
                              : "border-gray-300"
                          } cursor-pointer rounded-md`}
                          onClick={() => {
                            handleLogoSelection("logoc");
                            setUploadedImage(null);
                          }}
                        >
                          <img
                            src="/logoc.png"
                            alt="Logo 3"
                            className="h-12 w-12 object-contain"
                          />
                        </div>

                        {/* Custom Logo */}
                        {canAddCustomWatermark && (
                          <div
                            className={`relative flex h-20 w-20 items-center justify-center rounded-md border`}
                          >
                            <button
                              className="flex h-full w-full items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200"
                              disabled={!canAddCustomWatermark}
                            >
                              <span className="text-2xl font-bold text-indigo-600">
                                +
                              </span>
                            </button>
                            <input
                              id="styledFileInput"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                              disabled={!canAddCustomWatermark}
                            />
                          </div>
                        )}

                        {/*  */}
                      </div>
                    </div>

                    {uploadedImage && canAddCustomWatermark && (
                      <p className="mt-4 text-sm text-gray-700">
                        Uploaded:{" "}
                        <span className="font-semibold">
                          {uploadedImage.name}
                        </span>
                      </p>
                    )}

                    {/* Watermark Position */}
                    {canPositionWatermark && (
                      <>
                        <div className="mt-4">
                          <p className="text-sm font-bold text-gray-800">
                            Watermark Position
                          </p>
                          <select
                            onChange={(e) => handleWatermarkPositionChange(e)}
                            className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="center">Center</option>
                            <option value="top-left">Top-Left</option>
                            <option value="top-right">Top-Right</option>
                            <option value="bottom-left">Bottom-Left</option>
                            <option value="bottom-right">Bottom-Right</option>
                          </select>
                        </div>
                        <div className="mt-3 flex gap-6">
                          <label>
                            <p className="text-sm font-bold text-gray-800">
                              Opacity
                            </p>
                          </label>
                          <input
                            type="range"
                            value={watermarkOpacity}
                            onChange={(e) => handleChangeOpacity(e)}
                            max={100}
                            min={10}
                            step={10}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            className="rounded-full bg-[#E1DDD2] px-6 py-2 text-[14px] text-[#131114] hover:bg-[#d0ccc5]"
            onClick={onClose}
          >
            Cancel
          </button>
          {currentActiveTabIndex === 1 ? (
            <div>
              <button
                onClick={() => setCurrentActiveTabIndex(2)}
                className="rounded-full bg-[#131114] px-14 py-3 text-[14px] text-[#F5F3EE] transition hover:scale-105 hover:bg-[#000000] hover:opacity-80"
              >
                Next Step
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button
                className="rounded-full bg-[#E1DDD2] px-8 py-2 text-[14px] text-[#131114] hover:bg-[#d0ccc5]"
                onClick={() => setCurrentActiveTabIndex(1)}
              >
                Back
              </button>
              <Button
                loading={loading}
                title="Confirm"
                className="rounded-full bg-[#131114] px-14 py-2 text-[14px] text-[#F5F3EE] hover:bg-[#000000]"
                onClick={handleContinue}
                disabled={loading}
                withTransition={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinalTouchesModal;
