import { PlusIcon } from "@heroicons/react/20/solid";
import ImageUploaderModal from "Components/ImageUploaderModal";
import { useMedia } from "context/MediaProvider";
import { useUserInfo } from "context/UserInfoContext";
import { generateNameSuggestions } from "helpers/helpers";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineUpload } from "react-icons/ai";
import { Austrailia_State, Post_Categories, postalCodeRanges } from "Types";
import { checkIfUsernameExists } from "utils/api/Info";
import ProfileImage from "../components/ProfileImage";
import { useEditProfile } from "../useEditProfile";

export default function GeneralTab() {
  const { temporaryUserInfo: userInfo } = useUserInfo();
  const {
    handleChange,
    handleAddTag,
    handleRemoveTag,
    handleAddCategory,
    handleRemoveCategory,
  } = useEditProfile();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(userInfo?.profile);
  const [originalImageUrl] = useState(userInfo?.profile);
  const [isPreviewed, setIsPreviewed] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { temporaryImages, setTemporaryImages } = useMedia();

  const [showName, setShowName] = useState(userInfo?.show_name);
  const [categories, setCategories] = useState(userInfo?.categories || []);
  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  // State for username suggestions
  const [suggestedUsernames, setSuggestedUsernames] = useState<string[]>([]);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  // State for validation errors
  const [errors, setErrors] = useState({
    suburb: "",
    postal: "",
    state: "",
    username: "",
  });

  const handlePreviewImage = (imageDataUrl: string) => {
    setImagePreviewUrl(imageDataUrl);
    setIsPreviewed(true);
  };

  const handleShowNameChange = (e: any) => {
    const newValue = e.target.checked;
    setShowName(newValue);
    handleChange("show_name", e.target.checked);
  };

  useEffect(() => {
    setTemporaryImages(userInfo?.images || []);
  }, []);

  const handleAddTagClick = () => {
    if (tagInput.trim()) {
      handleAddTag(tagInput.trim());
      setTagInput("");
    }
  };

  const handleRemoveTagClick = (tag: string) => {
    handleRemoveTag(tag);
  };

  const handleAddCategoryClick = (cat: string) => {
    setCategories((prev) => [...prev, cat]);
    handleAddCategory(cat);
  };

  const handleRemoveCategoryClick = (category: string) => {
    handleRemoveCategory(category);
    setCategories(categories.filter((c) => c !== category));
  };

  // Validation functions
  const validateSuburb = (value: string) => {
    if (!value?.trim()) {
      setErrors((prev) => ({ ...prev, suburb: "Suburb is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, suburb: "" }));
    return true;
  };

  const validateState = (value: string) => {
    if (!value?.trim()) {
      setErrors((prev) => ({ ...prev, state: "State is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, state: "" }));
    return true;
  };

  const validatePostalCode = (postal: string, state: string) => {
    const postalCodeRegex = /^\d{4}$/;

    if (!postalCodeRegex.test(postal)) {
      setErrors((prev) => ({
        ...prev,
        postal: "Postal code must be a 4-digit number",
      }));
      return false;
    }

    if (!state) {
      // State validation will handle this case
      return true;
    }

    const ranges = postalCodeRanges[state];
    const postalCode = postal.padStart(4, "0");

    if (
      !ranges ||
      !ranges.some(([min, max]) => postalCode >= min && postalCode <= max)
    ) {
      setErrors((prev) => ({
        ...prev,
        postal: `Postal code ${postal} is not valid for ${state}`,
      }));
      return false;
    }

    setErrors((prev) => ({ ...prev, postal: "" }));
    return true;
  };

  const handleSuburbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("suburb", e.target.value);
    validateSuburb(e.target.value);
  };

  const handlePostalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChange("postal", value);
    validatePostalCode(value, userInfo?.state || "");
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleChange("state", value);
    validateState(value);
    // Re-validate postal code when state changes
    if (userInfo?.postal) {
      validatePostalCode(userInfo.postal, value);
    }
  };

  const debouncedCheckUsername = useCallback(
    debounce(async (newUsername: string) => {
      if (!newUsername.trim() || newUsername === userInfo?.username) {
        setSuggestedUsernames([]);
        setErrors((prev) => ({ ...prev, username: "" }));
        return;
      }

      // Basic validation
      if (newUsername.length < 3) {
        setErrors((prev) => ({
          ...prev,
          username: "Username must be at least 3 characters",
        }));
        return;
      }

      const usernameRegex = /^[a-zA-Z0-9_.]+$/;
      if (!usernameRegex.test(newUsername)) {
        setErrors((prev) => ({
          ...prev,
          username:
            "Only letters, numbers, underscores and periods are allowed",
        }));
        return;
      }

      setIsCheckingUsername(true);
      try {
        const exists = await checkIfUsernameExists(newUsername);
        if (exists) {
          setErrors((prev) => ({
            ...prev,
            username: "Username already exists",
          }));
          setSuggestedUsernames(generateNameSuggestions(newUsername));
        } else {
          setErrors((prev) => ({ ...prev, username: "" }));
          setSuggestedUsernames([]);
        }
      } catch (error) {
        console.error("Error checking username:", error);
        setErrors((prev) => ({
          ...prev,
          username: "Error checking username availability",
        }));
      } finally {
        setIsCheckingUsername(false);
      }
    }, 500), // 500ms debounce delay
    [userInfo?.username],
  );

  // Debounce function
  function debounce<F extends (...args: any[]) => void>(
    func: F,
    delay: number,
  ): (...args: Parameters<F>) => void {
    let timeoutId: NodeJS.Timeout;
    return function (this: any, ...args: Parameters<F>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    handleChange("username", newUsername);
    debouncedCheckUsername(newUsername);
  };

  const handleUseSuggestedUsername = (suggestedUsername: string) => {
    handleChange("username", suggestedUsername);
    setSuggestedUsernames([]);
    setErrors((prev) => ({ ...prev, username: "" }));
  };

  return (
    <div className="space-y-10">
      {/* Profile Image Section */}
      <div className="space-y-4">
        <ProfileImage
          imagePreviewUrl={imagePreviewUrl!}
          setImagePreviewUrl={setImagePreviewUrl}
          originalImageUrl={originalImageUrl!}
          handleChange={handleChange}
        />
      </div>

      {/* Cover Images Section */}
      <div className="mt-6">
        <label className="mb-2 block text-xl font-bold" htmlFor="uploadImages">
          Cover Images
        </label>
        <p className="mb-4 text-sm text-gray-500">
          Upload images that will be displayed as cover images on your profile.
        </p>

        {/* Image Upload Modal */}
        <ImageUploaderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        {/* Temporary Image Previews */}
        {temporaryImages.length > 0 && (
          <div className="my-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {temporaryImages.map((image: string, index: number) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="h-24 w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-2 flex w-full items-center justify-center rounded-md border border-dashed border-gray-300 px-4 py-2 text-gray-500 transition-colors duration-300 hover:border-blue-400 hover:bg-gray-100"
        >
          <AiOutlineUpload className="mr-2 text-2xl text-gray-500" />
          Set Cover Images
        </button>
      </div>

      {/* Full Name Section */}
      <div className="space-y-2">
        <label className="text-xl font-bold" htmlFor="fullName">
          Full Name
        </label>
        <input
          value={userInfo?.full_name || ""}
          type="text"
          className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your name"
          name="fullName"
          onChange={(e) => handleChange("full_name", e.target.value)}
        />
        <p className="text-sm text-gray-500">
          We’re big on real names around here, so people know who’s who.
        </p>
      </div>

      {/* Toggle Show Name Section */}
      <div className="mt-6 flex items-center space-x-4">
        <label className="inline-flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={showName}
            onChange={handleShowNameChange}
          />
          <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full"></div>
          <span className="text-sm font-medium text-gray-900">
            {showName
              ? "Display my name to others"
              : "Hide my name from others"}
          </span>
        </label>
      </div>

      {/* Username Section */}
      <div className="mt-6 space-y-2">
        <label className="text-xl font-bold" htmlFor="username">
          Username
        </label>
        <div className="relative">
          <input
            value={userInfo?.username || ""}
            type="text"
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your username"
            name="username"
            onChange={handleUsernameChange}
            disabled={isCheckingUsername}
          />
          {isCheckingUsername && (
            <div className="absolute right-3 top-3.5">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            </div>
          )}
        </div>

        {/* Error message */}
        {errors.username && (
          <p className="text-sm text-red-500">{errors.username}</p>
        )}

        {/* Suggested usernames */}
        {suggestedUsernames.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-500">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedUsernames.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleUseSuggestedUsername(suggestion)}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-blue-600 hover:bg-gray-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Email Section */}
      <div className="space-y-4">
        <label className="text-xl font-semibold" htmlFor="email">
          Email
        </label>
        <input
          value={userInfo?.email}
          type="email"
          className="w-full rounded-md border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your email"
          name="email"
          disabled
        />
        <p className="text-sm text-gray-500">
          Your Email address cannot be changed here. Please contact support if
          you need to update it.
        </p>
      </div>

      {/* Bio Section */}
      <div className="mt-6 space-y-2">
        <label className="text-xl font-bold" htmlFor="bio">
          Bio
        </label>
        <textarea
          value={userInfo?.bio || ""}
          className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Tell us about yourself"
          name="bio"
          rows={4}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
        <p className="text-sm text-gray-500">
          Brief description for your profile. URLs are hyperlinked.
        </p>
      </div>

      {/* Tags Section */}
      <div className="mt-6 space-y-4">
        <label className="text-xl font-bold">Tags</label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="h-[57px] w-full rounded-xl border border-gray-300 bg-transparent p-3 text-black placeholder-gray-400 focus:outline-none"
            placeholder="Add tags..."
          />
          <button
            onClick={handleAddTagClick}
            className="mt-2 flex items-center justify-center rounded-md border border-dashed border-gray-300 px-4 py-2 text-gray-500 transition-colors duration-300 hover:border-blue-400 hover:bg-gray-100"
          >
            <PlusIcon height={30} className="text-gray-900" />
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Enter any search words relevant to your artistry
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {userInfo?.tags?.map((tag, index) => (
            <div
              key={index}
              className="group flex items-center space-x-2 rounded-full bg-gray-200 px-3 py-2 font-poppins text-gray-700"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTagClick(tag)}
                className="text-red-500 hover:text-red-600"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-6 space-y-4">
        <label className="text-xl font-bold">Categories</label>
        <p className="text-sm text-gray-500">
          Select categories that best describe your work.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(Post_Categories).map((category) => (
            <button
              key={category}
              onClick={() =>
                categories.includes(category)
                  ? handleRemoveCategoryClick(category)
                  : handleAddCategoryClick(category)
              }
              className={`flex items-center gap-2 rounded-full px-3 py-2 font-poppins transition-colors duration-200 ${
                categories.includes(category)
                  ? "bg-[#babaa0] text-white hover:opacity-90"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <span>{category}</span>
              {categories.includes(category) && (
                <span className="text-red-500 hover:text-red-600">&times;</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-bold">Location</h2>

        {/* Suburb */}
        <div className="space-y-2">
          <label className="block font-semibold" htmlFor="suburb">
            Suburb
          </label>
          <input
            id="suburb"
            name="suburb"
            type="text"
            value={userInfo?.suburb || ""}
            onChange={handleSuburbChange}
            onBlur={(e) => validateSuburb(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your suburb"
          />
          {errors.suburb && (
            <p className="text-sm text-red-500">{errors.suburb}</p>
          )}
        </div>

        {/* Postal Code */}
        <div className="space-y-2">
          <label className="block font-semibold" htmlFor="postal">
            Postal Code
          </label>
          <input
            id="postal"
            name="postal"
            type="text"
            value={userInfo?.postal || ""}
            onChange={handlePostalChange}
            onBlur={(e) =>
              validatePostalCode(e.target.value, userInfo?.state || "")
            }
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your postal code"
            maxLength={4}
          />
          {errors.postal && (
            <p className="text-sm text-red-500">{errors.postal}</p>
          )}
        </div>

        {/* State */}
        <div className="space-y-2">
          <label className="block font-semibold" htmlFor="state">
            State
          </label>
          <select
            id="state"
            name="state"
            value={userInfo?.state || ""}
            onChange={handleStateChange}
            onBlur={(e) => validateState(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="" disabled>
              Select state
            </option>
            {Object.values(Austrailia_State).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state}</p>
          )}
        </div>
      </div>
    </div>
  );
}
