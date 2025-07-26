import ShareButtons from "Components/ShareButtons";
import { Toast } from "helpers/Toast";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const ShareModal = ({
  isOpen,
  onClose,
  postId,
}: {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
}) => {
  const location = useLocation();
  const urlToCopy = `${window.location.origin}/post/${postId}`;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(urlToCopy).then(() => {
      setIsCopied(true);
      Toast("Link is copied", "success");
    });
  };

  if (!isOpen) return null;

  // Render modal using React Portal
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 font-poppins">
      <div className="mx-4 w-full max-w-md transform overflow-auto rounded-lg bg-white p-6 shadow-2xl transition-all duration-300 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Share this with others
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="flex flex-col justify-between">
          {/* Share Buttons */}
          <div className="mb-6 flex flex-col items-center justify-center gap-5 text-center">
            <ShareButtons title="Art_branch" url={urlToCopy} />
          </div>

          {/* Copy Link Section */}
          <div className="mt-10 text-center">
            <p className="mb-2 text-gray-600">Or you can copy the link:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={urlToCopy}
                readOnly
                disabled
                className="mr-2 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCopy}
                className={`rounded-md bg-gray-600 px-4 py-2 text-white shadow-md transition duration-200 hover:bg-gray-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isCopied ? "bg-green-500" : "bg-gray-600"}`}
              >
                {isCopied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body, // Render modal outside of parent component in the body
  );
};

export default ShareModal;
