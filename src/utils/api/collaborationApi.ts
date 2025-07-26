import { supabase } from "../services/supabase";

// Helper function for notification handling
const handleNotification = async (
  type: "collab_request" | "collab_accept",
  senderId: string,
  receiverId: string,
  action: "insert" | "delete",
  note?: string,
) => {
  if (action === "insert") {
    const notificationData = {
      type,
      user_id: receiverId,
      actor_id: senderId,
      note,
    };

    if (type === "collab_accept") {
      // Delete existing "collab_request" notification
      const { error: deleteError } = await supabase
        .from("notifications")
        .update({ type: "you_accepted" })
        .eq("user_id", senderId)
        .eq("actor_id", receiverId);

      if (deleteError) {
        return { error: "Error deleting previous collab_request notification" };
      }
    }

    // Insert new notification
    const { error: insertError } = await supabase
      .from("notifications")
      .insert(notificationData);

    if (insertError) {
      return { error: "Error inserting collaboration notification" };
    }
  } else if (action === "delete") {
    // Delete notification
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("user_id", receiverId)
      .eq("actor_id", senderId)
      .eq("type", type);

    if (error) {
      return { error: "Error deleting collaboration notification" };
    }
  }
};

// Function to handle sending and canceling collaboration requests
export const toggleSendRequestApi = async (
  senderId: string,
  receiverId: string,
  action: "send" | "cancel",
  note?: string,
) => {
  try {
    if (action === "send") {
      const { data, error } = await supabase.from("collaborations").insert({
        sender_id: senderId,
        receiver_id: receiverId,
        status: "pending",
      });

      if (error) {
        return { error: "Error sending collaboration request" };
      }

      // Notification
      await handleNotification(
        "collab_request",
        senderId,
        receiverId,
        "insert",
        note,
      );

      return { data };
    } else {
      const { data, error } = await supabase
        .from("collaborations")
        .delete()
        .or(
          `sender_id.eq.${senderId},receiver_id.eq.${receiverId},sender_id.eq.${receiverId},receiver_id.eq.${senderId}`,
        );

      if (error) {
        return { error: "Error canceling collaboration request" };
      }

      // Notification
      await handleNotification(
        "collab_request",
        senderId,
        receiverId,
        "delete",
      );

      return { data };
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Unexpected error occurred" };
  }
};

// Function to check the status of a collaboration request
export const requestSentStatusApi = async (
  senderId: string,
  receiverId: string,
) => {
  try {
    const { data, error } = await supabase
      .from("collaborations")
      .select("status")
      .or(
        `sender_id.eq.${senderId},receiver_id.eq.${receiverId},sender_id.eq.${receiverId},receiver_id.eq.${senderId}`,
      )
      .single();

    if (error) {
      return "not available";
    }

    if (!data) {
      return "not available";
    }
    console.log(data.status);

    // Return the status or "not available" if there's no status field
    return data.status || "not available";
  } catch (err) {
    console.error("Unexpected error:", err);
    return "not available"; // Handle unexpected errors
  }
};

// Function to handle accepting or rejecting collaboration requests
export const handleCollabActionApi = async (
  senderId: string,
  receiverId: string,
  action: "accept" | "reject",
) => {
  try {
    const { error } =
      action === "accept"
        ? await supabase
            .from("collaborations")
            .update({ status: "accepted" })
            .eq("sender_id", senderId)
            .eq("receiver_id", receiverId)
            .select("*")
        : await supabase
            .from("collaborations")
            .delete()
            .eq("sender_id", senderId)
            .eq("receiver_id", receiverId);

    if (error) {
      return { error: `Error ${action}ing collaboration` };
    }

    // Handle notification for both accept and reject actions
    if (action === "accept") {
      await handleNotification("collab_accept", receiverId, senderId, "insert");
    }

    // Remove collaboration request notification if rejected
    if (action === "reject") {
      await handleNotification(
        "collab_request",
        senderId,
        receiverId,
        "delete",
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "Unexpected error occurred" };
  }
};

export const fetchCollaboratorsApi = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("collaborations")
      .select(
        `
        sender_id (id, username, profile,is_verified,followers),
        receiver_id (id, username, profile,is_verified,followers)
      `,
      )
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .eq("status", "accepted");

    if (error) {
      console.error("Error fetching collaborators:", error);
      return null;
    }

    // Transform data if needed
    const collaborators = data?.map((item: any) => {
      const isSender = item.sender_id.id === userId;
      return isSender ? item.receiver_id : item.sender_id;
    });

    return collaborators || [];
  } catch (err) {
    console.error("Unexpected error fetching collaborators:", err);
    return null;
  }
};
