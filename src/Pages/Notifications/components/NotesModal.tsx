import { useEffect } from "react";
import { Notification } from "Types";

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  notes: any;
};

const NotesModal = ({ isOpen, onClose, notes }: NoteModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Your Notes</h3>
        <div className="mt-4">
          {notes.length > 0 ? (
            notes.map((note:Notification) => (
              <div key={note.id} className="mb-4">
                <p className="text-sm text-gray-500">{note.note}</p>
                <p className="text-xs text-gray-400">
                  Created at: {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No notes available.</p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;