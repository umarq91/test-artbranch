import { supabase } from "../services/supabase";

export const followArtist = async (
  followerId: string,
  followedId: string,
  note: string = "",
) => {
  if (!followerId || !followedId) return;

  // Insert the follow relationship
  const { data, error } = await supabase
    .from("follows")
    .insert([{ follower_id: followerId, followed_id: followedId, note }])
    .select();

  if (error) {
    console.error("Error following artist:", error);
    return;
  }

  // Delete existing follow notification (if any)
  await supabase
    .from("notifications")
    .delete()
    .eq("type", "follow")
    .eq("user_id", followedId)
    .eq("actor_id", followerId);

  // Insert new notification
  await supabase.from("notifications").insert({
    type: "follow",
    user_id: followedId,
    actor_id: followerId,
    note,
  });

  return data;
};

export const unfollowArtist = async (
  followerId: string,
  followedId: string,
) => {
  if (!followerId || !followedId) return;
  const { data, error } = await supabase
    .from("follows")
    .delete()
    .match({ follower_id: followerId, followed_id: followedId });
  if (error) {
    console.error("Error unfollowing artist:", error);
  }
  return data;
};

export const isFollowing = async (followerId: string, followedId: string) => {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("follower_id", followerId)
    .eq("followed_id", followedId);

  if (error) {
    console.error("Error checking follow status:", error);
    return false;
  }

  return data.length > 0;
};

export const fetchFollowingPosts = async (userId: string) => {
  if (!userId) return [];

  const { data, error } = await supabase.rpc("get_following_posts", {
    user_id: userId,
  });

  if (error) {
    console.error("Error fetching following posts:", error);
    return [];
  }

  return data; // This will return the optimized JSONB result from the function
};

export const fetchFollowingUsers = async (userId: string) => {
  const { data: followingData, error: followingError } = await supabase
    .from("follows")
    .select("followed_id(*)")
    .eq("follower_id", userId);

  if (followingError) {
    console.error("Error fetching followed users:", followingError);
    return [];
  }

  return followingData.map((follow: any) => follow.followed_id);
};
