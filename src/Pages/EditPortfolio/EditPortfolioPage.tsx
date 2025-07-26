import { useQueryClient } from "@tanstack/react-query";
import Button from "Components/Button";
import PageMeta from "Components/PageMeta";
import { useMedia } from "context/MediaProvider";
import { useUserInfo } from "context/UserInfoContext";
import { uploadMediaToSupabase } from "helpers/UploadMediaToSupabase";
import useShareWork from "Pages/ShareWork/useShareWork";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { removeMediaFromBucket, updateMedia } from "utils/api/mediaApi";
import PortfolioRepository from "utils/repositories/portfolioRepository";
import FinalTouchesModal from "../../Components/modals/FinalTouchModal";
import MediaDetails from "./components/MediaDetails";
import MediaPreview from "./components/MediaPreview";
import PortfolioForm from "./components/PortfolioForm";
import UploadImageModal from "./UploadImageModal";

const EditPortfolioPage = ({ portfolio }: any) => {
  const {
    name,
    description,
    isModalOpen,
    setName,
    setDescription,
    handleMediaChange,
    currentIndex,
    handleNext,
    handlePrevious,
    handleRemoveCustomField,
    handleAddCustomField,
    handleCustomFieldChange,
    setTags,
    tags,
    setTagInput,
    tagInput,
    handleKeyDown,
    isStory,
    isPublicPost,
    setIsPublicPost,
  } = useShareWork();

  const {
    setSelectedMedia,
    addedImages,
    deletedImages,
    setAddedImages,
    setDeletedImages,
    selectedMedia,
  } = useMedia();

  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();

  // Setting the portfolio details
  useEffect(() => {
    setSelectedMedia(portfolio?.media);
    setName(portfolio?.title);
    setDescription(portfolio?.description);
    setTags(portfolio?.tags);
    setIsPublicPost(portfolio?.is_public);
    window.scroll(0, 0);
  }, [
    portfolio,
    setSelectedMedia,
    setName,
    setDescription,
    setTags,
    setIsPublicPost,
  ]);

  console.log(deletedImages);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Upload added images

      console.log(deletedImages);

      if (addedImages.length > 0) {
        const matchedImages = selectedMedia.filter((addedImage) =>
          addedImages.some((media) => media.id === addedImage.id),
        );
        await uploadMediaToSupabase(
          matchedImages,
          portfolio.id,
          false,
          "logo",
          null,
          50,
        );
      }

      // Remove deleted images
      if (deletedImages.length > 0) {
        await Promise.all(
          deletedImages.map((image) =>
            removeMediaFromBucket(image.id || -1, image.type, image.file_name!),
          ),
        );
      }

      // Update the filtered images
      const filteredImages = selectedMedia.filter(
        (media) =>
          !addedImages.some((added) => added.id === media.id) &&
          !deletedImages.some((deleted) => deleted.id === media.id),
      );

      await Promise.all(
        filteredImages.map((image) => updateMedia(image.id || -1, image)),
      );

      // Update the portfolio with the new info
      await PortfolioRepository.updatePortfolio(portfolio.id, {
        title: name,
        description: description,
        tags: tags,
        is_public: isPublicPost,
      });

      toast.success("post updated successfully");
      // check if its daily branch
      if (portfolio?.is_story) {
        queryClient.invalidateQueries({
          queryKey: ["artist-daily-branch", userInfo?.id],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: ["artist-portfolios", userInfo?.id],
        });
      }

      navigate("/portfolio");
    } catch (error) {
      toast.error("Failed to update portfolio, try again");
    } finally {
      setLoading(false);
      setSelectedMedia([]);
      setAddedImages([]);

      setDeletedImages([]);
    }
  };

  return (
    <div className="min-h-screen p-12">
      <PageMeta
        title="Edit Your Portfolio"
        description="Easily edit your existing portfolio on Artbranch. Update your posts, refine your work, and showcase your creativity to the world."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-2 space-y-8">
          <div className="flex justify-between">
            <button
              className="bg-primary-3000 rounded-full px-6 py-2 text-[14px] text-secondary-100"
              onClick={() => navigate("/portfolio")}
            >
              Cancel
            </button>

            <Button
              onClick={handleUpdate}
              title="Confirm Changes"
              loading={loading}
              withTransition
              disabled={loading}
            />
          </div>

          <div className="space-y-8">
            <PortfolioForm
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
            />
            <div className="flex w-full justify-end">
              <button
                onClick={() => setIsAddImageModalOpen(true)}
                className="rounded-full bg-gray-800 px-4 py-2 text-primary-500 transition hover:scale-110 hover:opacity-95"
              >
                Update images
              </button>
            </div>

            <MediaPreview
              selectedMedia={selectedMedia}
              currentIndex={currentIndex}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          </div>
        </div>
        {/* Media Details */}
        <MediaDetails
          tags={tags}
          setTags={setTags}
          selectedMedia={selectedMedia}
          setTagInput={setTagInput}
          tagInput={tagInput}
          currentIndex={currentIndex}
          isPublicPost={isPublicPost}
          setIsPublicPost={setIsPublicPost}
          handleKeyDown={handleKeyDown}
          handleMediaChange={handleMediaChange}
          handleCustomFieldChange={handleCustomFieldChange}
          handleRemoveCustomField={handleRemoveCustomField}
          handleAddCustomField={handleAddCustomField}
        />

        {isModalOpen && (
          <FinalTouchesModal
            isOpen={isModalOpen}
            description={description}
            name={name}
            selectedMedia={selectedMedia}
            onClose={() => setIsAddImageModalOpen(false)}
            isStory={isStory}
          />
        )}

        {isAddImageModalOpen && (
          <UploadImageModal
            isOpen={isAddImageModalOpen}
            onClose={() => setIsAddImageModalOpen(false)}
            setAddedImages={setAddedImages}
            setDeletedImages={setDeletedImages}
          />
        )}
      </div>
    </div>
  );
};

export default EditPortfolioPage;
