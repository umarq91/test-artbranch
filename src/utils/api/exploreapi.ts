import { feedPostsPerPage } from "../constants";
import { supabase } from "../services/supabase";

export const fetchExplore = async (category: string, offset: number) => {
  let query = supabase
    .from("portfolio")
    .select("*,media(*),profiles!inner(id,category)")
    .order("created_at", { ascending: false })
    .eq("is_story", true)
    .eq("is_deleted", false)
    .eq("is_public", true)
    .range(offset, offset + feedPostsPerPage - 1);

  if (category !== "All") {
    query = query.contains("profiles.categories", [category]);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching images:", error);
  }
  if (error) {
    console.log(error.message);
  }
  return data;
};

export const fetchFollowedPosts = async (userId: string, offset: number) => {
  // Fetch followed artist IDs
  const { data: follows, error: fetchFollowsError } = await supabase
    .from("follows")
    .select("followed_id")
    .eq("is_story", true) // todo : verify
    .eq("is_deleted", false)
    .eq("is_public", true)
    .eq("follower_id", userId);

  if (fetchFollowsError) {
    console.error("Error fetching followed artists:", fetchFollowsError);
    return [];
  }

  const followedArtistIds = follows.map((follow) => follow.followed_id);

  if (followedArtistIds.length === 0) {
    return [];
  }

  // Fetch posts from followed artists
  const { data, error } = await supabase
    .from("portfolio")
    .select("*, media(*), profiles!inner(id, category)")
    .in("user_id", followedArtistIds)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .range(offset, offset + feedPostsPerPage - 1);

  if (error) {
    console.error("Error fetching followed posts:", error);
    return [];
  }

  return data;
};

export const fetchFeaturedArtists = async () => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("is_featured", true);

  if (error) {
    console.error("Error fetching random users:", error);
  }
  return data;
};

export const fetchRandomUsers = async () => {
  const { data, error } = await supabase.rpc("get_random_users");

  if (error) {
    console.error("Error fetching random users:", error);
  }
  return data;
};
