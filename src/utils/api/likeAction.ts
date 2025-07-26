import { supabase } from "../services/supabase";

// Check if the user liked the specific portfolio
export async function checkLiked(portfolio_id: number, userId: string) {
  if (!userId) return false;

  try {
    const { data, error, count } = await supabase
      .from("likes")
      .select("id", { count: "exact" })
      .eq("portfolio_id", portfolio_id)
      .eq("user_id", userId)
      .limit(1);

    if (error) {
      console.error("Error checking like:", error.message);
      return false;
    }

    return count !== null && count > 0;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
}

export const handleToggleLike = async (
  portfolio_id: number,
  user_id: string,
  isLiked: boolean,
  portfolioOwnerId?: string,
  slug?: string,
) => {
  if (!user_id) return;
  try {
    if (isLiked) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("portfolio_id", portfolio_id)
        .eq("user_id", user_id);

      if (error) {
        console.error("Error unliking portfolio:", error.message);
      }
    } else {
      const { data, error } = await supabase
        .from("likes")
        .insert([{ portfolio_id, user_id }]);
      if (error) {
      }
      // send a notification
      if (user_id !== portfolioOwnerId) {
        await supabase.from("notifications").insert({
          type: "like",
          user_id: portfolioOwnerId,
          actor_id: user_id,
          portfolio_slug: slug,
        });
      }
    }
  } catch (err) {
    console.error("Unexpected error while toggling like:", err);
  }
};
