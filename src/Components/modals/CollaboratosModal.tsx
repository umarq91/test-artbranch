import LoadingSpinner from "Components/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserProfileType } from "Types";
import { fetchCollaboratorsApi } from "utils/api/collaborationApi";
import { formatPlural } from "utils/helpers";

type ModalProps = {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
};

const CollaboratorsModal: React.FC<ModalProps> = ({
  userId,
  isOpen,
  onClose,
}) => {
  const [collaborators, setCollaborators] = useState<UserProfileType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      fetchCollaborators();
    }
  }, [isOpen]);

  const fetchCollaborators = async () => {
    setIsLoading(true);
    try {
      if (!userId) return;
      const response = await fetchCollaboratorsApi(userId);
      if (response) {
        setCollaborators(response);
      }
    } catch (error) {
      console.error("Error fetching collaborators:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProfile = (id: string) => {
    navigate(`/portfolio/${id}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="relative max-h-[85vh] w-[70vw] overflow-auto rounded-lg bg-white p-6 shadow-lg">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 text-xl text-gray-500 hover:text-gray-800"
              >
                ✕
              </button>

              <h2 className="mb-6 text-center text-2xl font-semibold">
                Collaborators
              </h2>

              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner />
                </div>
              ) : collaborators?.length === 0 ? (
                <p className="text-center text-gray-500">
                  No collaborators found.
                </p>
              ) : (
                <ul className="space-y-4">
                  {collaborators?.map((collab) => (
                    <li
                      key={collab.id}
                      className="flex items-center space-x-4 rounded-lg border p-4 shadow-sm"
                    >
                      <img
                        src={collab.profile || "/default-profile.png"}
                        alt={collab.username}
                        className="h-14 w-14 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="flex items-center gap-1 text-lg font-medium">
                          {collab.username}
                          {collab.is_verified && (
                            <FaCheckCircle
                              className="inline-block h-4 w-4 text-blue-500"
                              title="Verified"
                            />
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {collab.followers}{" "}
                          {formatPlural(collab?.followers || 0, "Subscriber")}
                        </p>
                      </div>
                      <button
                        onClick={() => handleViewProfile(collab.id)}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        View Profile
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CollaboratorsModal;
