import { supabase } from "../services/supabase";

export const fetchNotifications = async (userId: string, pageParam = 0) => {
  const limit = 10;
  const { data, error } = await supabase
    .from("notifications")
    .select(
      `id,
        type,
        portfolio_slug,
        created_at,
        user:user_id(id, full_name, username,role),
        actor:actor_id(id, full_name, username,role),
        read,
        note
      `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(pageParam, pageParam + limit - 1);

  if (error) {
    console.error("Error fetching notifications:", error);
    throw new Error("Failed to fetch notifications");
  }

  const nextPage = data.length === limit ? pageParam + limit : null;

  return { data, nextPage };
};

export const fetchUnreadCount = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("id")
      .eq("user_id", userId)
      .eq("read", false);

    if (error) {
      throw error;
    }

    return { count: data.length };
  } catch (error) {
    console.error("Error fetching unread notifications count:", error);
    throw new Error("Failed to fetch unread notifications count");
  }
};

export const fetchUsersForNotification = async (
  userId: string,
  actorId: string,
) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("username,id,role")
    .or(`id.eq.${userId},id.eq.${actorId}`);

  if (error) {
    throw new Error("fetching users for notification failed");
  }

  return data;
};

export const markAllAsRead = async (userId: string) => {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId);

  if (error) {
    throw new Error("marking all notifications as read failed");
  }
  return error;
};

export const deleteNotification = async (notificationId: string) => {
  const { data, error } = await supabase
    .from("notifications")
    .delete()
    .eq("id", notificationId);

  if (error) {
    throw new Error("Failed to delete notification");
  }
  return data;
};

export const deleteAllNotificationsApi = async (userId: string) => {
  if (!userId) throw new Error("User ID is required.");

  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", userId);

  if (error) {
    console.error("Error deleting notifications:", error);
    throw new Error("Failed to delete notifications.");
  }

  return true;
};

export const getAllNotes = async (userId: string): Promise<Notification[]> => {
  if (!userId) throw new Error("User ID is required.");
  const { data, error } = await supabase
    .from("notifications")
    .select("*,actor:actor_id(id, full_name, username,role)")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching notes:", error);
    throw new Error("Failed to fetch notes");
  }
  return data;
};
