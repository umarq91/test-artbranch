import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckCircle, FaClock, FaUserPlus } from "react-icons/fa";

type Props = {
  sendRequest: (note?: string) => void;
  requestCollabStatus: "pending" | "accepted" | "not available";
};

function CollaborateButton({ sendRequest, requestCollabStatus }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");

  const handleClick = () => {
    if (requestCollabStatus === "not available") {
      setIsModalOpen(true);
    } else {
      sendRequest();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);

    setNote("");
  };

  const handleSendRequest = () => {
    sendRequest(note);
    closeModal();
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`mt-3 transform rounded-full px-16 py-3 text-[14px] font-semibold transition-all duration-150 sm:mt-0 ${
          requestCollabStatus === "accepted"
            ? "border border-black bg-gray-100 text-gray-800"
            : requestCollabStatus === "pending"
              ? "border border-black bg-gray-100 text-gray-800"
              : "bg-primary-600 text-secondary-100 hover:border-[1px] hover:border-black"
        } ${requestCollabStatus === "accepted" || requestCollabStatus === "pending" ? "scale-100" : "scale-110"}`}
      >
        {requestCollabStatus === "accepted" ? (
          <>
            <FaCheckCircle className="mr-2 inline h-5 w-5" />
            Collaborating
          </>
        ) : requestCollabStatus === "pending" ? (
          <>
            <FaClock className="mr-2 inline h-5 w-5" />
            Request Sent
          </>
        ) : (
          <>
            <FaUserPlus className="mr-2 inline h-5 w-5" />
            Collaborate
          </>
        )}
      </button>

      {isModalOpen && (
        <CollaborateModal
          note={note}
          setNote={setNote}
          onClose={closeModal}
          onSend={handleSendRequest}
        />
      )}
    </div>
  );
}

/**
 * Props for CollaborateModal Component
 */
type ModalProps = {
  note: string;
  setNote: (value: string) => void;
  onClose: () => void;
  onSend: () => void;
};

/**
 * CollaborateModal Component
 */
function CollaborateModal({ note, setNote, onClose, onSend }: ModalProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    console.log(e);

    if (input.length <= 200 || input === "") {
      setNote(input);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>

        {/* Modal Content */}
        <div className="flex items-center gap-2">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Send a Note
          </h3>
          <p className="mb-4 mt-2 text-sm text-gray-600">(Optional)</p>
        </div>

        <textarea
          value={note}
          onChange={handleInputChange}
          placeholder="Write your note here..."
          className="w-full rounded-md border border-gray-300 p-3 focus:border-primary-600 focus:outline-none"
        />
        <p className="mt-1 text-right text-xs text-gray-500">
          {note.length}/200
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="cursor-pointer rounded-md bg-[#93916e] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Send request
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CollaborateButton;
