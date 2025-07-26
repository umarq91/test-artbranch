import { PortfolioType } from "../../Types";
import { supabase } from "../services/supabase";

export const addToWishlist = async (userId: string, portfolioId: number) => {
  const { data, error } = await supabase
    .from("wishlist")
    .insert([{ user_id: userId, portfolio_id: portfolioId }]);

  if (error) {
    console.error("Error adding to wishlist:", error);
  }
};

export const removeFromWishlist = async (
  userId: string,
  portfolioId: number,
) => {
  const { data, error } = await supabase
    .from("wishlist")
    .delete()
    .eq("user_id", userId)
    .eq("portfolio_id", portfolioId);

  if (error) {
    console.error("Error removing from wishlist:", error);
  }
};
export const fetchWishLists = async (
  userId: string,
): Promise<PortfolioType[] | any> => {
  // Return null if userId is falsy
  if (!userId) return null;

  const { data, error } = await supabase
    .from("wishlist")
    .select("portfolio(*, media(*))") // Joining portfolio and media tables
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching wishlist:", error.message); // Logging the specific error message
    return null;
  }

  return data;
};

export const isInWishList = async (userId: string, portfolioId: number) => {
  if (!userId) return;
  const { data, error } = await supabase
    .from("wishlist")
    .select("*") // Selecting the relevant columns
    .eq("user_id", userId)
    .eq("portfolio_id", portfolioId);

  if (error) {
    console.error("Error fetching wishlist:", error);
    return false;
  }

  // Check if the data array has any entries (i.e., the item is in the wishlist)
  if (data && data.length > 0) {
    return true;
  }

  return false;
};
