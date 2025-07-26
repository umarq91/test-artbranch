import { useMedia } from "context/MediaProvider";
import { useUserInfo } from "context/UserInfoContext";
import { getCroppedImg } from "helpers/helpers";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { AiOutlineClose, AiOutlineUpload } from "react-icons/ai";
import { toast } from "react-toastify";

interface ImageUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { userInfo, setUserInfo } = useUserInfo();
  const {
    setTemporaryImages,
    setAddedCoverImages,
    setDeletedCoverImages,
    temporaryImages,
    addedCoverImages,
  } = useMedia();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const img = new Image();
      const imageUrl = URL.createObjectURL(file);

      try {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageUrl;
        });

        // Check if image has at least 1:1 aspect ratio
        if (img.width >= img.height) {
          setCurrentImage(imageUrl);
          setOriginalFile(file);
          setCropping(true);
        } else {
          URL.revokeObjectURL(imageUrl);
          toast.error(`Image must have at least a square (1:1) aspect ratio`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      } catch (err) {
        URL.revokeObjectURL(imageUrl);
        console.error("Error loading image:", err);
        toast.error("Error loading image. Please try again.");
      }
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleConfirmSaveOnCrop = async () => {
    if (croppedAreaPixels && currentImage) {
      try {
        const croppedImageUrl = await getCroppedImg(
          currentImage,
          croppedAreaPixels,
        );

        // Convert base64 to Blob for temporary display
        const response = await fetch(croppedImageUrl);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const filename =
          originalFile?.name || `cropped-image-${Date.now()}.jpg`;
        const file = new File([blob], filename, {
          type: "image/jpeg",
          lastModified: Date.now(),
        });

        // Update temporaryImages with the new blob URL
        setTemporaryImages((prev) => [...prev, blobUrl]);

        // Update addedCoverImages with the cropped file
        setAddedCoverImages((prev) => [...prev, file]);

        setCropping(false);
        setCurrentImage(null);
        setOriginalFile(null);
        setZoom(1);
      } catch (error) {
        console.error("Error cropping image:", error);
        toast.error("Error cropping image. Please try again.");
      }
    }
  };

  const handleSaveImages = () => {
    onClose();
  };

  const handleRemoveImage = (index: number) => {
    // Get the image that is being removed
    const removedTempImage = temporaryImages[index];
    const removedAddedImage = addedCoverImages[index];

    // Add to deleted images (using the original if available)
    setDeletedCoverImages((prev) => [
      ...prev,
      typeof removedAddedImage === "string"
        ? removedTempImage
        : removedAddedImage,
    ]);

    // Remove from both arrays
    setTemporaryImages((prev) => prev.filter((_, i) => i !== index));
    setAddedCoverImages((prev) => prev.filter((_, i) => i !== index));

    // Update userInfo if needed
    if (userInfo?.images) {
      const updatedImages = userInfo.images.filter(
        (_: string, i: number) => i !== index,
      );
      setUserInfo((prevInfo: any) => ({
        ...prevInfo,
        images: updatedImages,
      }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300">
      <div className="w-full max-w-lg scale-105 transform-gpu rounded-lg bg-white p-6 shadow-xl transition-transform">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Upload Images</h2>
        <div className="relative mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />
          <div className="flex w-full cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-300 p-4 transition-colors duration-300 hover:border-blue-400 hover:bg-gray-500">
            <AiOutlineUpload className="mr-2 text-2xl text-gray-500" />
            <span className="text-gray-500">Click to upload an image</span>
          </div>
        </div>

        {temporaryImages.length > 0 && (
          <div className="mb-4 grid grid-cols-3 gap-4">
            {temporaryImages.map((image: string, index: number) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="h-24 w-full transform object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-xs text-white shadow-md hover:bg-red-600"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleSaveImages}
            className="rounded-md bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Images
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2 text-black transition duration-200 hover:bg-gray-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Cropping Modal */}
      {cropping && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-lg font-semibold">
              Crop Your Image
            </h2>
            <div className="relative mb-4 h-60 w-full">
              <Cropper
                image={currentImage}
                crop={crop}
                zoom={zoom}
                aspect={16 / 9}
                cropShape="rect"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <input
              min={1}
              max={5}
              type="range"
              value={zoom}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="mb-4 w-full"
            />
            <div className="flex justify-between">
              <button
                className="rounded-md bg-gray-300 px-4 py-2 font-medium text-gray-700 shadow-md transition duration-300 hover:bg-gray-400"
                onClick={() => {
                  setCropping(false);
                  setCurrentImage(null);
                  setOriginalFile(null);
                  if (currentImage) URL.revokeObjectURL(currentImage);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition duration-300 hover:bg-blue-700"
                onClick={handleConfirmSaveOnCrop}
              >
                Confirm Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploaderModal;
