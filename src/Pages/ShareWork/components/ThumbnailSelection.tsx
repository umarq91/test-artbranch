import { getCroppedImg } from "helpers/helpers";
import { useState } from "react";
import Cropper from "react-easy-crop";

type Props = {
  isOpen: boolean;
  onClose: any;
  image: string;
  setThumbnail: any;
};

function ThumbnailSelection({ isOpen, image, setThumbnail, onClose }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSave = async () => {
    if (croppedAreaPixels && image) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      setThumbnail(croppedImage);
      onClose(false);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-center text-lg font-semibold">
              Crop Your Image
            </h2>
            <div className="relative mb-4 h-60 w-full">
              <Cropper
                image={image!}
                crop={crop}
                zoom={zoom}
                aspect={1}
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
                onClick={onClose}
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

export default ThumbnailSelection;
