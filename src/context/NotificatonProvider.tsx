import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Notification } from "Types";
import { handleCollabActionApi } from "utils/api/collaborationApi";
import {
  deleteAllNotificationsApi,
  deleteNotification,
  fetchNotifications,
  fetchUnreadCount,
  fetchUsersForNotification,
} from "utils/api/notificationApi";
import { supabase } from "utils/services/supabase";
import { useUserInfo } from "./UserInfoContext";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  deleteNotificationById: (notificationId: string) => void;
  deleteAllNotifications: () => void;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  handleCollabAction: (
    senderId: string,
    receiverId: string,
    action: "accept" | "reject",
    notificationId: string,
  ) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userInfo, loading: isUserInfoLoading } = useUserInfo();
  const queryClient = useQueryClient();

  const userId = userInfo?.id!;
  const {
    data: unreadData,
    error: unreadError,
    isLoading: isUnreadLoading,
  } = useQuery({
    queryKey: ["unreadCount", userId],
    queryFn: () => fetchUnreadCount(userId),
    enabled: !!userId,
  });

  // Subscription to real-time notifications via Supabase
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          const newNotification = payload.new;
          if (!newNotification) return;

          try {
            const data = await fetchUsersForNotification(
              newNotification.user_id,
              newNotification.actor_id,
            );

            const user = data.find(
              (profile) => profile.id === newNotification.user_id,
            );
            const actor = data.find(
              (profile) => profile.id === newNotification.actor_id,
            );

            if (user && actor) {
              const enrichedNotification = {
                ...newNotification,
                user,
                actor,
              };

              // Update notifications state with the new notification
              setNotifications((prev: any) => [enrichedNotification, ...prev]);

              // Increment unread count
              queryClient.setQueryData(
                ["unreadCount", userId],
                (oldData: any) => ({
                  count: (oldData?.count || 0) + 1,
                }),
              );
            }
          } catch (err) {
            console.error("Error processing notification:", err);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);

  // Fetch notifications with infinite scrolling
  const {
    data: notificationData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["notifications", userId],
    queryFn: ({ pageParam = 0 }) => fetchNotifications(userId, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextPage || null,
    enabled: !!userId,
  });

  // Update notifications state when new data is fetched
  useEffect(() => {
    if (notificationData) {
      const updatedNotifications = notificationData.pages.flatMap(
        (page) => page.data || [],
      );
      setNotifications(updatedNotifications as any);
    }
  }, [notificationData]);

  const deleteNotificationById = async (notificationId: string) => {
    try {
      await deleteNotification(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId,
        ),
      );
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      await deleteAllNotificationsApi(userId);
      setNotifications([]);
      queryClient.setQueryData(["notifications", userId], {
        pages: [],
        pageParams: [],
      });
      queryClient.setQueryData(["unreadCount", userId], { count: 0 });
    } catch (err) {
      console.error("Error deleting all notifications:", err);
    }
  };

  const handleCollabAction = async (
    senderId: string,
    receiverId: string,
    action: "accept" | "reject",
    notificationId: string,
  ) => {
    await handleCollabActionApi(senderId, receiverId, action);


    // handle on frontend
    const notification = notifications.find(
      (item) => item.id === notificationId,
    );

    if (notification) {
      const updatedNotifications = notifications.filter(
        (item) => item.id !== notificationId,
      );

      if (action === "accept") {
        const newNotification: Notification = {
          id: `you_accepted_${Date.now()}`,
          type: "you_accepted",
          actor: notification.actor,
          created_at: new Date().toISOString(),
          user: notification.user,
          read: true,
        };

        setNotifications((prevNotifications) => [
          ...updatedNotifications,
          newNotification,
        ]);
      } else {
        setNotifications(updatedNotifications);
      }
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount: unreadData?.count || 0,
        isFetchingNextPage,
        deleteNotificationById,
        deleteAllNotifications,
        fetchNextPage,
        hasNextPage,
        handleCollabAction,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to access the Notification context
export const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider",
    );
  }
  return context;
};
