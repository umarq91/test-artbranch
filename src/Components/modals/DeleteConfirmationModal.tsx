import { useState } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { UserRepository } from "utils/repositories/userRepository";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemTitle: string;
  description?: string;
  isLoading?: boolean;
  loadingText?: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemTitle,
  description,
  isLoading = false,
  loadingText = "Deleting...",
}: ConfirmationModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Use the external isLoading prop if provided, otherwise use internal state
  const isProcessing = isLoading || isDeleting;

  if (!isOpen) return null;
  
  const handleConfirm = async () => {
    if (inputValue !== itemTitle) {
      setError(`The text does not match the item name: ${itemTitle}`);
      return;
    }

    setIsDeleting(true);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError("An error occurred while deleting. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <div className="relative mx-auto my-8 w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ease-in-out">
        <div className="absolute right-0 top-0 pr-4 pt-4">
          <button
            onClick={onClose}
            className="text-gray-400 transition duration-150 ease-in-out hover:text-gray-500 focus:text-gray-500 focus:outline-none"
            aria-label="Close"
          >
            <FiX className="h-6 w-6" />
          </button>
        </div>

        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <FiAlertTriangle
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3
              className="text-lg font-medium leading-6 text-gray-900"
              id="modal-title"
            >
              Confirm Delete
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Please type{" "}
                <strong style={{ userSelect: "none" }}>{itemTitle}</strong> to
                confirm the deletion. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {/* Input for item title confirmation */}
        <div className="mt-4">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder={`Type "${itemTitle}" to confirm`}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isProcessing) {
                handleConfirm();
              }
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError("");
            }}
            disabled={isProcessing}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        {description && (
          <div className="my-3">
            <p className="text-sm text-gray-400"> {description} </p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isProcessing
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
            }`}
            onClick={handleConfirm}
            disabled={isProcessing || inputValue !== itemTitle}
          >
            {isProcessing ? loadingText : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
