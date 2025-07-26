import { supabase } from "../services/supabase";

// Fetch top-level comments with pagination
export const fetchComments = async (
  portfolio_id: number,
  page: number = 1,
  limit: number = 6,
) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, user:profiles(id, full_name, profile,is_verified)")
    .eq("portfolio_id", portfolio_id)
    .is("parent_id", null) // Only get top-level comments
    .order("created_at", { ascending: false })
    .range((page - 1) * limit, page * limit - 1); // Pagination logic

  if (error) {
    console.error("Error fetching comments:", error);
  } else {
    return data;
  }
};

// Fetch replies for a specific comment with pagination
export const fetchReplies = async (commentId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*, user:profiles(id, full_name, profile,is_verified)")
    .eq("parent_id", commentId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching replies:", error);
    return [];
  }
  return data;
};

const sendNotification = async (
  type: "comment" | "reply",
  actor_id: string,
  user_id: string,
  portfolio_slug: string,
) => {
  try {
    const { error } = await supabase.from("notifications").insert({
      type,
      user_id,
      actor_id,
      portfolio_slug,
    });

    if (error) {
      console.error("Error sending notification:", error);
      throw error;
    }
  } catch (err) {
    console.error("Error in sendNotification:", err);
    throw err;
  }
};

export const addCommentToDb = async (
  portfolio_id: number,
  userId: string,
  comment: string,
  parent: string | null,
  replies_count: number,
  portfolioOwnerId: string,
  portfolio_slug: string,
  parentCommentUserId: string,
) => {
  try {
    if (!userId) throw new Error("User not authenticated");
    if (!portfolio_id || !portfolio_slug || !portfolioOwnerId) {
      throw new Error("Missing required parameters");
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([
        {
          portfolio_id,
          user_id: userId,
          comment,
          parent_id: parent || null,
        },
      ])
      .select("*, user:profiles(id, profile, full_name, is_verified)");

    if (error) {
      console.error("Error inserting comment:", error);
      throw error;
    }

    if (parent) {
      const { data: parentData, error: fetchError } = await supabase
        .from("comments")
        .select("replies_count")
        .eq("id", parent)
        .single();

      if (fetchError) {
        console.error("Error fetching parent comment:", fetchError);
        throw fetchError;
      }

      const currentRepliesCount = parentData?.replies_count || 0;
      const { error: updateError } = await supabase
        .from("comments")
        .update({
          replies_count: currentRepliesCount + 1,
        })
        .eq("id", parent);

      if (updateError) {
        console.error("Error updating replies_count:", updateError);
        throw updateError;
      }
    }

    if (
      (!parent && userId === portfolioOwnerId) ||
      (parent && userId === parentCommentUserId)
    ) {
      console.log("Notification not sent: Self-comment or self-reply.");
      return data;
    }

    // Send notification for either comment or reply
    await sendNotification(
      parent ? "reply" : "comment",
      userId,
      parent ? parentCommentUserId : portfolioOwnerId,
      portfolio_slug,
    );

    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const deleteCommentFromDb = async (
  commentId: number,
  parent?: number,
  replies_count?: number,
) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      throw error;
    }

    if (parent) {
      const { data: parentData, error: fetchError } = await supabase
        .from("comments")
        .select("replies_count")
        .eq("id", parent)
        .single();

      if (fetchError) {
        console.error("Error fetching parent comment:", fetchError);
        throw fetchError;
      }

      const currentRepliesCount = parentData?.replies_count || 0;

      // Update replies_count by subtracting 1
      const { error: updateError } = await supabase
        .from("comments")
        .update({
          replies_count: currentRepliesCount > 0 ? currentRepliesCount - 1 : 0,
        })
        .eq("id", parent);

      if (updateError) {
        console.error("Error updating replies_count:", updateError);
        throw updateError;
      }
    }

    return data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
