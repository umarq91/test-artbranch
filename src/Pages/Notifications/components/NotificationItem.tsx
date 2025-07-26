import DeleteConfirmationModal from "Components/modals/DeleteConfirmationModal";
import NoteModal from "Components/modals/NoteModal";
import NotificationIcon from "Components/NotificationIcon";
import { useNotificationContext } from "context/NotificatonProvider";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Notification } from "Types";

type Props = {
  notification: Notification;
  onDelete: (id: string) => void;
};

const NotificationItem: React.FC<Props> = ({ notification, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleCollabAction } = useNotificationContext();
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const handleNavigation = () => {
    if (isDeleting) return;
    if (
      notification.type === "account_activated" ||
      notification.type === "you_accepted"
    )
      return;

    if (
      notification.type === "follow" &&
      notification.actor.role === "Artist"
    ) {
      navigate(`/portfolio/${notification.actor.id}`);
    } else if (
      ["collab_request", "collab_accept"].includes(notification.type)
    ) {
      navigate(`/portfolio/${notification.actor.id}`);
    } else if (notification.type !== "follow") {
      navigate(`/?post=${notification.portfolio_slug}`);
    } else if (
      notification.type === "follow" &&
      notification.actor.role === "Audience"
    ) {
      toast.info("Cannot navigate to audience profile", {
        position: "bottom-right",
      });
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(notification.id);
    }, 100);
  };

  const handleAction = async (
    e: React.MouseEvent,
    action: "accept" | "reject",
  ) => {
    e.stopPropagation();
    await handleCollabAction(
      notification.actor.id,
      notification.user.id,
      action,
      notification.id,
    );
  };

  const renderMessage = () => {
    const { actor, type } = notification;

    switch (type) {
      case "like":
        return (
          <span>
            <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">
              ({actor.role})
            </span>{" "}
            liked your post.
          </span>
        );
      case "comment":
        return (
          <span>
            <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">
              ({actor.role})
            </span>{" "}
            commented on your post.
          </span>
        );
      case "reply":
        return (
          <span>
            <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">
              ({actor.role})
            </span>{" "}
            replied to your comment on a post.
          </span>
        );
      case "follow":
        return (
          <span>
            <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">
              ({actor.role})
            </span>{" "}
            started following you.
          </span>
        );
      case "post":
        return (
          <span>
            <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">
              ({actor.role})
            </span>{" "}
            created a new post.
          </span>
        );
      case "collab_request":
        return (
          <span>
            <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">
              ({actor.role})
            </span>{" "}
            sent you a collaboration request.
          </span>
        );
      case "collab_accept":
        return (
          <span>
            <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">
              ({actor.role})
            </span>{" "}
            accepted your collaboration request.
          </span>
        );
      case "account_activated":
        return <span>Your account has been activated!</span>;
      case "you_accepted":
        return (
          <span>
            You accepted <span className="font-semibold">{actor.username}</span>
            <span className="px-2 text-xs text-gray-500">({actor.role})</span>'s
            collaboration request.
          </span>
        );
      default:
        return "Unknown notification type.";
    }
  };

  return (
    <AnimatePresence>
      {!isDeleting && (
        <motion.li
          className="group flex cursor-pointer items-start border-b border-gray-200 p-4 hover:bg-gray-50"
          onClick={handleNavigation}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mr-4 flex-shrink-0">
            <NotificationIcon type={notification.type} />
          </div>
          <div className="flex-grow">
            <p className="text-gray-700">{renderMessage()}</p>
            {notification.type === "collab_request" && (
              <div className="gap- mt-2 flex-col space-x-2">
                <div className="flex gap-3">
                  <button
                    className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"
                    onClick={(e) => handleAction(e, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    className="rounded border px-3 py-1 text-black hover:opacity-75"
                    onClick={(e) => handleAction(e, "reject")}
                  >
                    Reject
                  </button>
                </div>
                {notification.note && (
                  <button
                    className="mt-2 text-blue-700 underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                  >
                    with Note
                  </button>
                )}
              </div>
            )}
            {notification.type === "follow" && notification.note && (
              <button
                className="mt-2 text-blue-700 underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                with Note
              </button>
            )}
            <p className="mt-1 text-sm text-gray-500">
              {moment(notification.created_at).fromNow()}
            </p>
          </div>
          <button
            className="ml-4 text-red-600 opacity-0 transition-opacity duration-300 hover:text-red-800 group-hover:opacity-100"
            onClick={() => setDeleteConfirmationModal(true)}
          >
            Clear
          </button>
        </motion.li>
      )}

      {isDeleting && (
        <motion.div
          className="flex items-start border-b border-gray-200 bg-gray-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mr-4 flex-shrink-0">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
          </div>
          <div className="flex-grow">
            <div className="mb-2 h-4 animate-pulse rounded bg-gray-300"></div>
            <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200"></div>
          </div>
        </motion.div>
      )}

      {notification?.note && isModalOpen && (
        <NoteModal setIsModalOpen={setIsModalOpen} note={notification?.note} />
      )}
      <DeleteConfirmationModal
        isOpen={deleteConfirmationModal}
        onClose={() => setDeleteConfirmationModal(false)}
        onConfirm={handleDelete as any}
        itemTitle="I accept"
        description="Deleteing notifications can have consequences"
      />
    </AnimatePresence>
  );
};

export default NotificationItem;
