import React from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { DbMediaType } from "Types";

interface CustomField {
  key: string;
  value: string;
}

interface MediaDetailsProps {
  selectedMedia: DbMediaType[];
  currentIndex: number;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  tagInput: string;
  isPublicPost: boolean;
  setIsPublicPost: React.Dispatch<React.SetStateAction<boolean>>;
  setTagInput: React.Dispatch<React.SetStateAction<string>>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleMediaChange: (field: string, value: string) => void;
  handleCustomFieldChange: (
    index: number,
    field: keyof CustomField,
    value: string,
  ) => void;
  handleRemoveCustomField: (index: number) => void;
  handleAddCustomField: () => void;
}

function MediaDetails({
  selectedMedia,
  currentIndex,
  tags,
  setTags,
  tagInput,
  handleKeyDown,
  setTagInput,
  isPublicPost,
  setIsPublicPost,
  handleMediaChange,
  handleCustomFieldChange,
  handleRemoveCustomField,
  handleAddCustomField,
}: any) {
  return (
    <div
      className="space-y-8 bg-primary-1100 p-6 shadow-md"
      style={{ minHeight: "", maxWidth: "401px" }}
    >
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
      <div className="space-y-6">
        <h3 className="text-[24px] font-bold text-secondary-200">
          {" "}
          Edit Media Details
        </h3>

        <div>
          <label className="text-secondary-200">Title</label>
          <input
            type="text"
            value={selectedMedia[currentIndex]?.media_name || ""}
            onChange={(e) => handleMediaChange("media_name", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-secondary-200"
          />
        </div>

        <div>
          <label className="text-secondary-200">Description</label>
          <input
            type="text"
            value={selectedMedia[currentIndex]?.media_desc || ""}
            onChange={(e) => handleMediaChange("media_desc", e.target.value)}
            className="mt-2 w-full rounded-lg border border-gray-300 p-2 text-secondary-200"
          />
        </div>

        <div>
          <label className="block text-secondary-200">Custom Data</label>
          {selectedMedia[currentIndex]?.custom_data.map(
            (field: CustomField, index: number) => (
              <div key={index} className="mt-2 flex space-x-4">
                <input
                  type="text"
                  value={field.key}
                  onChange={(e) =>
                    handleCustomFieldChange(index, "key", e.target.value)
                  }
                  placeholder="Key"
                  className="w-full rounded-lg border p-2 text-secondary-200"
                />
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) =>
                    handleCustomFieldChange(index, "value", e.target.value)
                  }
                  placeholder="Value"
                  className="w-full rounded-lg border p-2 text-secondary-200"
                />
                <button
                  onClick={() => handleRemoveCustomField(index)}
                  className="text-secondary-200 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ),
          )}
          <button
            onClick={handleAddCustomField}
            className="mt-4 rounded-lg bg-secondary-100 px-4 py-2 text-[14px] text-primary-300"
          >
            Add Field
          </button>
        </div>
        <hr className="my-4" />
        <div className="flex">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            type="text"
            className="w-full border px-3 py-2"
            onKeyDown={handleKeyDown}
            name="tag"
            placeholder="Add tag"
          />
        </div>
        <div>
          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 rounded-full bg-gray-200 px-4 py-1 text-xs text-gray-800"
                >
                  <div>{tag}</div>
                  <button
                    onClick={() =>
                      setTags(tags.filter((_: any, i: number) => i !== index))
                    } // Remove tag by index
                    className="text-gray-500 hover:text-red-600"
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default MediaDetails;
