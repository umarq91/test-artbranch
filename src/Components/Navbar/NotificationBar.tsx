import { useQueryClient } from "@tanstack/react-query";
import { useNotificationContext } from "context/NotificatonProvider";
import { useUserInfo } from "context/UserInfoContext";
import { AnimatePresence, motion } from "framer-motion";
import NotificationItem from "Pages/Notifications/components/NotificationItem";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { markAllAsRead } from "utils/api/notificationApi";

// Type for the props
type Props = {
  isModalOpen: boolean;
  setIsNotificationsOpen: (value: boolean) => void;
};

// Type for the notification
type Notification = {
  id: string;
  message: string;
  read: boolean;
};

function Notificationbar({ isModalOpen, setIsNotificationsOpen }: Props) {
  const navigate = useNavigate();
  const { notifications, deleteNotificationById } = useNotificationContext();
  const queryClient = useQueryClient();
  const { userInfo } = useUserInfo();

  // Typing the ref for the notification container
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Close the notification when clicked outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsNotificationsOpen]);

  useEffect(() => {
    if (userInfo?.id) {
      markAllAsRead(userInfo.id).then((err) => {
        if (err) return;
        queryClient.setQueryData(
          ["unreadCount", userInfo.id],
          (oldCount: { count: number }) => ({
            count: 0,
          }),
        );
      });
    }
  }, [userInfo?.id, queryClient]);

  const handleNavigation = () => {
    navigate("/notifications");
    setIsNotificationsOpen(false);
  };

  return (
    <motion.div
      ref={notificationRef} // Attach the ref here
      className="absolute right-0 z-40 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      {notifications.length > 0 ? (
        <>
          <AnimatePresence>
            <div className="max-h-80 overflow-y-auto">
              {notifications.slice(0, 5).map((notification: any) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onDelete={deleteNotificationById}
                />
              ))}
            </div>
          </AnimatePresence>
          <button
            onClick={handleNavigation}
            className="mt-4 w-full rounded-md bg-gray-100 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-200"
          >
            See All
          </button>
        </>
      ) : (
        <div className="text-center text-sm text-gray-500">
          No notifications available.
        </div>
      )}
    </motion.div>
  );
}

export default Notificationbar;
