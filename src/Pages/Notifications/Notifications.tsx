import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useQueryClient } from "@tanstack/react-query";
import DeleteConfirmationModal from "Components/modals/DeleteConfirmationModal";
import NoteModal from "Components/modals/NoteModal";
import PageMeta from "Components/PageMeta";
import { useNotificationContext } from "context/NotificatonProvider";
import { useUserInfo } from "context/UserInfoContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "Types";
import { getAllNotes, markAllAsRead } from "utils/api/notificationApi";
import NotesModal from "./components/NotesModal";
import NotificationItem from "./components/NotificationItem";
import NotificationItemSkeleton from "./components/NotificationSkeleton";

const Notifications = () => {
  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const observerRef = useRef<HTMLDivElement | null>(null);

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [openedNote, setOpenedNote] = useState("");

  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDeleteConfirmationModalOpen, setDeleteConfirmationModalOpen] =
    useState(false);
  const [notes, setNotes] = useState<Notification[]>([]);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [viewType, setViewType] = useState<"Notifications" | "Notes">(
    "Notifications",
  );

  const {
    notifications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    deleteNotificationById,
    deleteAllNotifications,
  } = useNotificationContext();

  const isLoading =
    !notifications?.length && !notifications && !isFetchingNextPage;

  useEffect(() => {
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    if (!hasScrolled || !hasNextPage || notifications.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.8 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, fetchNextPage, hasScrolled, notifications.length]);

  // Mark all notifications as read
  useEffect(() => {
    if (!userInfo?.id) return;

    const markNotificationsAsRead = async () => {
      try {
        await markAllAsRead(userInfo.id);
        queryClient.setQueryData(["unreadCount", userInfo.id], { count: 0 });
      } catch (error) {
        console.error("Failed to mark notifications as read:", error);
      }
    };

    markNotificationsAsRead();
  }, [userInfo?.id, queryClient]);

  // Fetch notes for the user
  useEffect(() => {
    if (!userInfo?.id) return;

    const fetchUserNotes = async () => {
      try {
        const data = await getAllNotes(userInfo.id);
        setNotes(data as any);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchUserNotes();
  }, [userInfo?.id]);

  const handleGoBack = () => navigate(-1);

  const handleDeleteAllNotifications = async () => {
    try {
      await deleteAllNotifications();
      setDeleteConfirmationModalOpen(false);
    } catch (error) {
      console.error("Failed to delete all notifications:", error);
    }
  };

  const noNotificationsMessage = !isLoading && !notifications.length && (
    <div className="my-10 text-center text-gray-600">
      <h4 className="text-lg font-semibold">No notifications yet.</h4>
    </div>
  );

  const limitReachedMessage = !hasNextPage && notifications.length > 0 && (
    <div className="mt-3 text-center text-gray-600">
      <h4 className="text-lg font-semibold">You're all caught up!</h4>
    </div>
  );
  
  // to ensure no empty notes show up
  const notesAvailable = notes?.filter(
    (note) => note.note && note.note !== "" || note.note && note.note !== null
  );

  const renderMessage = (note: Notification) => {
    const { type, actor } = note;

    switch (type) {
      case "you_accepted":
      case "collab_request":
        return (
          <div> {actor.username} sent you note along with collab request! </div>
        );

      case "follow":
        return <div> {actor.username} sent you note along with follow </div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4">
      <PageMeta
        title="Your Notifications"
        description="View all your latest notifications on Artbranch. Stay informed about new followers, comments, likes, and important updates."
      />

      <div className="mx-auto max-w-3xl rounded-lg bg-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button onClick={handleGoBack} aria-label="Go back">
              <ArrowLeftIcon className="h-6 w-6 cursor-pointer" />
            </button>
            <h1 className="text-2xl font-bold">
              {viewType === "Notes" ? "Notes" : "Notifications"}
            </h1>
          </div>
          <div className="flex gap-4">
            {notifications.length > 0 && (
              <button
                onClick={() => setDeleteConfirmationModalOpen(true)}
                className="rounded px-4 py-2 text-red-700 hover:text-red-400"
                aria-label="Clear all notifications"
              >
                Clear all
              </button>
            )}
            <button
              onClick={() =>
                setViewType(
                  viewType === "Notifications" ? "Notes" : "Notifications",
                )
              }
              className="rounded px-4 py-2 text-blue-700 hover:text-blue-400"
              aria-label={`Switch to ${viewType === "Notifications" ? "Notes" : "Notifications"}`}
            >
              {viewType === "Notifications"
                ? "View Notes"
                : "View Notifications"}
            </button>
          </div>
        </div>
        {viewType === "Notifications" && (
          <div className="p-6">
            {isLoading ? (
              <ul>
                {Array.from({ length: 5 }).map((_, index) => (
                  <NotificationItemSkeleton key={index} />
                ))}
              </ul>
            ) : (
              <>
                {notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onDelete={deleteNotificationById}
                  />
                ))}
                {noNotificationsMessage}
                {limitReachedMessage}

                {isFetchingNextPage && (
                  <ul>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <NotificationItemSkeleton key={`next-${index}`} />
                    ))}
                  </ul>
                )}

                {/* IntersectionObserver target */}
                {hasNextPage && (
                  <div
                    ref={observerRef}
                    className="my-10 flex justify-center"
                  />
                )}
              </>
            )}
          </div>
        )}

        {viewType === "Notes" && (
          <div className="w-full rounded-2xl bg-white p-6">
            {/* <h3 className="text-lg font-medium leading-6 text-gray-900">
              Your Notes
            </h3> */}
            <div className="mt-4 space-y-4">
              {notesAvailable.length > 0 ? (
                notesAvailable.map((note) =>
                  note.note ? (
                    <div
                      key={note.id}
                      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md active:scale-95"
                      onClick={() => {
                        setIsNoteOpen(true);
                        setOpenedNote(note.note!);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">
                          {renderMessage(note)}
                        </p>
                        <span className="ml-2 animate-pulse text-xs text-gray-500">
                          (Click to open 🔍)
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Created at: {new Date(note.created_at).toLocaleString()}
                      </p>
                    </div>
                  ) : null,
                )
              ) : (
                <p className="text-center text-sm text-gray-500">
                  No notes available.
                </p>
              )}

              {notes.length > 0 && (
                <div className="text-center text-gray-600">
                  <h4 className="text-lg font-semibold">
                    You're all caught up!
                  </h4>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationModalOpen}
        onClose={() => setDeleteConfirmationModalOpen(false)}
        onConfirm={handleDeleteAllNotifications}
        itemTitle="notifications"
        description="Deleting notifications cannot be undone. This action will also delete any associated notes, which cannot be recovered. Are you sure you want to proceed?"
      />

      <NotesModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        notes={notes}
      />

      {isNoteOpen && (
        <NoteModal note={openedNote} setIsModalOpen={setIsNoteOpen} />
      )}
    </div>
  );
};

export default Notifications;
