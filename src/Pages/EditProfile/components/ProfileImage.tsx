import { getCroppedImg } from "helpers/helpers";
import { useState } from "react";
import Cropper from "react-easy-crop";
import { FaCamera } from "react-icons/fa";
import { UserProfileType } from "Types";

interface ProfileImageProps {
  imagePreviewUrl: string | null;
  setImagePreviewUrl: (url: string) => void;
  originalImageUrl: string;
  handleChange: (field: keyof UserProfileType, value: any) => void;
}

export default function ProfileImage({
  imagePreviewUrl,
  setImagePreviewUrl,
  originalImageUrl,
  handleChange,
}: ProfileImageProps) {
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [cropping, setCropping] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const handlePreviewImage = (imageDataUrl: string) => {
    setFileUrl(imageDataUrl);
    setCropping(true);
  };

  const resetImage = () => {
    setImagePreviewUrl(originalImageUrl);
    setIsPreviewed(false);
    setCropping(false);
  };

  const handleSave = async () => {
    if (croppedAreaPixels && fileUrl) {
      const croppedImage = await getCroppedImg(fileUrl, croppedAreaPixels);
      setImagePreviewUrl(croppedImage);
      handleChange("profile", croppedImage);
      setIsPreviewed(false);
      setCropping(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          handlePreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={imagePreviewUrl || originalImageUrl}
        className="relative h-24 w-24 rounded-full bg-red-500 object-cover"
        alt="Profile"
      />

      {!isPreviewed && (
        <div
          className="absolute bottom-0 left-0 mb-2 ml-2 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-50 p-1 hover:opacity-80"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <FaCamera className="text-white" size={16} />
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {/* Modal for Cropping */}
      {cropping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-lg font-semibold">
              Crop Your Image
            </h2>
            <div className="relative mb-4 h-60 w-full">
              <Cropper
                image={fileUrl!}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
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
                onClick={resetImage}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white shadow-md transition duration-300 hover:bg-blue-700"
                onClick={handleSave}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
