import React from "react";

const ImageUploader = ({ save }: { save: (imageDataUrl: string) => void }) => {
  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          save(reader.result as string); // Send image data URL to parent component
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="hidden">
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploader;
