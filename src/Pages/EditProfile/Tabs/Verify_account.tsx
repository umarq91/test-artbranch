import { useUserInfo } from "context/UserInfoContext";
import { uploadImagesToSupabase } from "helpers/uploadImagesToSupabase";
import { useEffect, useState } from "react";
import { FaPlus, FaUpload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { submitVerificationRequest } from "utils/api/verification_api";
import { socialPlatforms } from "utils/constants";
import { useEditProfile } from "../useEditProfile";
interface Props {
  checkVerificationStatus: () => void;
}
function VerifyAccountTab({ checkVerificationStatus }: Props) {
  const { temporaryUserInfo: userInfo } = useUserInfo();
  const { handleChangeSocialProfiles } = useEditProfile();
  const [socialProfiles, setSocialProfiles] = useState<{
    [key: string]: string;
  }>({});
  const [proofImages, setProofImages] = useState<{ [key: string]: string }>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [additionalSocial, setAdditionalSocial] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize state for social profiles
  const initializeSocialProfiles = () => {
    const initialProfiles: { [key: string]: string } = {};
    const initialProofImages: { [key: string]: string } = {};
    socialPlatforms.forEach((platform) => {
      if (userInfo?.social_profiles?.[platform.key]) {
        initialProfiles[platform.key] =
          userInfo.social_profiles[platform.key] || "";
        initialProofImages[platform.key] = ""; // Initialize proof images as empty
      }
    });
    setSocialProfiles(initialProfiles);
    setProofImages(initialProofImages);
  };

  useEffect(() => {
    initializeSocialProfiles();
  }, [userInfo]);

  const handleImageChange = (platform: string, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const imageUrl = reader.result as any;
          setProofImages((prev) => ({
            ...prev,
            [platform]: imageUrl, // Save the Data URL for preview
          }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      setProofImages((prev) => ({
        ...prev,
        [platform]: "",
      }));
    }
  };

  const handleUrlChange = (platform: string, url: string) => {
    setSocialProfiles((prev) => ({
      ...prev,
      [platform]: url,
    }));
  };

  const handleSubmitRequest = async () => {
    // Validate that all required proof images are provided
    setLoading(true);
    const missingImages = Object.entries(proofImages).filter(
      ([key, value]) => !value,
    );

    if (missingImages.length > 0) {
      setErrorMessage(
        `Please provide proof images for: ${missingImages.map(([key]) => key).join(", ")}`,
      );
      return;
    }

    setErrorMessage("");

    // Extract URLs from proofImages
    const images: string[] = Object.values(proofImages);

    const proofImagesPublicURL = await uploadImagesToSupabase(
      images as any,
      "proofs",
    );

    // Store this in Verification request table
    const body = {
      id: userInfo?.id!,
      social_platforms: socialProfiles,
      proof_images: proofImagesPublicURL,
    };
    await submitVerificationRequest(body);
    setLoading(false);
    toast.success("Your request has been submitted successfully");
    checkVerificationStatus();
  };

  const handleAddSocial = () => {
    if (additionalSocial) {
      setSocialProfiles((prev) => ({
        ...prev,
        [additionalSocial]: "",
      }));
      setProofImages((prev) => ({
        ...prev,
        [additionalSocial]: "",
      }));
      setAdditionalSocial("");
    }
  };

  // Determine disconnected social platforms
  const availablePlatforms = socialPlatforms.filter(
    (platform) => !userInfo?.social_profiles?.[platform.key],
  );

  return (
    <div className="space-y-10">
      {/* Error Message */}
      {errorMessage && (
        <div className="rounded bg-red-100 p-4 text-red-600">
          {errorMessage}
        </div>
      )}

      {/* Social Profiles Display */}
      <div className="space-y-6">
        {/* Render only connected social platforms */}
        {Object.entries(socialProfiles).map(([key, value]) => (
          <div key={key} className="space-y-4">
            {/* Social Media Input */}
            <div className="flex flex-col space-y-2">
              <label className="text-lg font-bold" htmlFor={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="url"
                value={value}
                className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`Enter your ${key.charAt(0).toUpperCase() + key.slice(1)} profile URL`}
                name={key}
                onChange={(e) => handleUrlChange(key, e.target.value)}
              />
            </div>

            {/* Proof Image Upload */}
            <div className="flex flex-col space-y-2">
              {/* Custom File Upload with Icon */}
              <div className="flex items-center space-x-4">
                <button
                  className="flex h-12 w-36 items-center justify-center rounded-lg border border-gray-300 bg-gray-100 hover:bg-gray-200"
                  onClick={() =>
                    document.getElementById(`${key}-file`)?.click()
                  }
                >
                  <FaUpload className="text-gray-600" size={16} />
                  <span className="ml-2 text-gray-600">Upload proof</span>
                </button>
                <input
                  type="file"
                  id={`${key}-file`}
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(
                      key,
                      e.target.files ? e.target.files[0] : null,
                    )
                  }
                />
                {proofImages[key] && (
                  <img
                    src={proofImages[key]}
                    alt={`${key} proof`}
                    className="h-32 w-32 rounded-lg border border-gray-300 object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selector to add new social platforms */}
      <div className="flex flex-col">
        <label className="text-lg font-bold">Add a Social</label>
        <div className="spacex-4 flex w-full gap-3">
          <select
            className="flex-1 rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={additionalSocial}
            onChange={(e) => setAdditionalSocial(e.target.value)}
          >
            <option value="">Select a platform</option>
            {availablePlatforms.map((platform) => (
              <option key={platform.key} value={platform.key}>
                {platform.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddSocial}
            className="h-12 rounded-lg border-2 bg-gray-100 px-4 text-white hover:shadow-lg"
          >
            <FaPlus className="text-black" />
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmitRequest}
        disabled={loading}
        className="mt-4 h-12 w-full rounded-lg bg-green-900 text-white hover:bg-green-600"
      >
        {loading ? "Loading" : "Submit Verification Request"}
      </button>
    </div>
  );
}

export default VerifyAccountTab;
