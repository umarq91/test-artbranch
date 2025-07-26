import { supabase } from "../services/supabase";

// Track portfolio view
export const trackPortfolioView = async (
  portfolioId: number,
  userId: string,
  isOwner: boolean,
): Promise<void> => {
  try {
    if (!userId || isOwner) return;

    // Calculate the time window (5 minutes ago)
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

    // Check if the user has viewed the portfolio in the last 2 minutes
    const { data: recentView, error: viewError } = await supabase
      .from("views")
      .select("*")
      .eq("portfolio_id", portfolioId)
      .eq("user_id", userId)
      .gt("viewed_at", fiveMinutesAgo);

    if (viewError) {
      console.log("view error", viewError);
      return;
    }

    // Increment view count if no recent view exists
    if (!recentView || recentView.length === 0) {
      const { error: incrementError } = await supabase.rpc(
        "increment_view_count",
        { portfolio_id: portfolioId },
      );

      if (incrementError) {
        console.error("Error incrementing view count:", incrementError.message);
        return;
      }

      // Insert a new view record
      const { error: insertError } = await supabase.from("views").insert([
        {
          portfolio_id: portfolioId,
          user_id: userId,
          viewed_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        console.error("Error inserting view record:", insertError.message);
      }
    }
  } catch (err) {
    console.error("Unexpected error while tracking portfolio view:", err);
  }
};

// Get total views for a user's portfolios
export const getTotalViewsFromDb = async (userId: string): Promise<number> => {
  try {
    const { data, error } = await supabase.rpc("sum_views", {
      user_id: userId,
    });

    if (error) {
      console.error("Error fetching total views:", error);
      return 0;
    }

    return data[0].total_views || 0;
  } catch (err) {
    console.error("Unexpected error fetching total views:", err);
    return 0;
  }
};

export const checkIfUsernameExists = async (
  username: string,
): Promise<boolean | null> => {
  if (!username) {
    console.error("Username is required");
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username);

  // Handle error
  if (error) {
    console.error("Error checking username:", error.message);
    return null;
  }

  return data?.length > 0;
};

export const checkIfEmailExist = async (
  email: string,
): Promise<boolean | null> => {
  if (!email) {
    console.error("Email is required");
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("email")
    .eq("email", email);

  if (error) {
    console.error("Error checking username:", error.message);
    return null;
  }
  return data?.length > 0;
};

export const totalSizeOfMediaUploaded = async (userId: string) => {
  const { data, error } = await supabase
    .from("portfolio")
    .select("media(size)")
    .eq("user", userId);

  if (error) {
    console.error("Error fetching media sizes:", error.message);
    return null;
  }

  // Extract and calculate the total size
  const totalSize = data.reduce((sum, portfolio) => {
    const mediaSizes = portfolio.media.map((media) => media.size || 0);
    return sum + mediaSizes.reduce((mediaSum, size) => mediaSum + size, 0);
  }, 0);

  return totalSize;
};

