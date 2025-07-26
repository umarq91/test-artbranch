import { motion } from "framer-motion";
type Props = {
  setIsModalOpen: any;
  note: string;
};

function NoteModal({ setIsModalOpen, note }: Props) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsModalOpen(false)}
    >
      <motion.div
        className="relative w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg"
        style={{ height: "500px" }}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h2 className="text-xl font-bold">Note for you</h2>
          <button
            className="h-8 w-8 text-gray-400 hover:text-gray-600"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>
        </div>

        <div className="flex h-full flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto rounded border border-gray-300 bg-gray-50 p-4">
            <pre
              className="whitespace-pre-wrap break-words text-sm text-gray-800"
              style={{ wordBreak: "break-word" }}
            >
              {note}
            </pre>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default NoteModal;
