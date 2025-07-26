import { formatDate } from "../../helpers/helpers";
import { PortfolioType, TierKeys } from "../../Types";
import { getTierDetails, portfoliosPostsPerPage } from "../constants";
import { supabase } from "../services/supabase";

export default class PortfolioRepository {
  // Create a portfolio
  public static async createPortfolio(
    name: string,
    description: string,
    tags: string[],
    is_story: boolean,
    both?: boolean,
    isPublicPost?: boolean,
  ) {
    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      if (userError || !userData || !userData.user) {
        throw new Error("User not authenticated");
      }

      const userId = userData.user.id;
      const portfolios = [];

      // Trim the title (name)
      const trimmedName = name.trim();

      // Default portfolio input
      let portfolioInput = {
        user: userId,
        title: trimmedName,
        description: description,
        tags: tags,
        is_story: is_story,
      };

      // If 'both' is true, add two entries - one for normal and one for daily branch
      if (both) {
        portfolios.push(
          {
            user: userId,
            title: trimmedName,
            description: description,
            tags: tags,
            is_story: false, // Normal post
          },
          {
            user: userId,
            title: trimmedName,
            description: description,
            tags: tags,
            is_story: true, // Daily branch
          },
        );
      } else {
        portfolios.push(portfolioInput);
      }

      const { data: portfolioData, error: portfolioError } = await supabase
        .from("portfolio")
        .insert(portfolios)
        .select();

      if (portfolioError) {
        console.error("Error saving portfolio:", portfolioError);
        throw new Error("Failed to save portfolio");
      }

      if (portfolioData?.length && isPublicPost) {
        await this.notifyFollowers(userId, portfolioData);
      }
      return portfolioData;
    } catch (error) {
      console.error("Portfolio creation error:", error);
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred",
      );
    }

    throw new Error("Portfolio creation failed without returning data.");
  }

  private static async notifyFollowers(userId: string, portfolioData: any[]) {
    try {
      // Get followers of the user
      const { data: followers, error: followersError } = await supabase
        .from("follows")
        .select("follower_id")
        .eq("followed_id", userId);

      if (followersError) {
        console.error("Error fetching followers:", followersError);
        return;
      }

      if (!followers || followers.length === 0) {
        console.log("No followers to notify.");
        return;
      }

      // Prepare notifications
      const notifications = followers.map((follower) => ({
        user_id: follower.follower_id,
        actor_id: userId,
        type: "post",
        portfolio_slug: portfolioData[0].slug,
      }));

      // Insert notifications
      const { error: notificationError } = await supabase
        .from("notifications")
        .insert(notifications);

      if (notificationError) {
        console.error("Error sending notifications:", notificationError);
      }
    } catch (error) {
      console.error("Error in notifyFollowers:", error);
    }
  }
  public static async fetchById(id: number) {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
          *,
          portfolio (
              *,
              media (*),
            )
          ),
      `,
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching user and portfolio:", error);
      return null;
    }

    return data; // Return the fetched data
  }
  public static async getUserPortfolios(
    userId: string,
    offset: number,
    isOwner: boolean,
  ): Promise<PortfolioType[] | null> {
    const query = supabase
      .from("portfolio")
      .select(
        `
          *,
          media(*)
        `,
      )
      .eq("user", userId)
      .eq("is_deleted", false)
      .range(offset, offset + portfoliosPostsPerPage - 1)
      .order("created_at", { ascending: false });

    if (!isOwner) {
      query.eq("is_public", true);
    }

    query.eq("is_story", false);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching user and portfolio:", error);
      return null;
    }

    return data; // Return the fetched data
  }

  public static async getUsersDailyBranch(
    userId: string,
    offset: number,
    isOwner: boolean,
  ): Promise<PortfolioType[] | null> {
    const query = supabase
      .from("portfolio")
      .select(
        `
          *,
          media(*)
        `,
      )
      .eq("user", userId)
      .eq("is_deleted", false)
      .range(offset, offset + portfoliosPostsPerPage - 1);
    if (!isOwner) {
      query.eq("is_public", true);
    }
    query.eq("is_story", true).order("created_at", { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching user and portfolio:", error);
      return null;
    }

    return data; // Return the fetched data
  }

  public static async fetchSinglePortfolio(slug: string, isOwner?: boolean) {
    let query = supabase
      .from("portfolio")
      .select("*,media(*)")
      .eq("slug", slug)
      .eq("is_deleted", false);

    if (isOwner === false || isOwner === undefined) {
      query = query.eq("is_public", true);
    }

    // Execute the query
    const { data, error } = await query.single();

    if (error) {
      console.error("Error fetching portfolio:", error);
      return null;
    }

    return data;
  }

  static async deletePortfolio(portfolioId: number) {
    // Get the currently authenticated user
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData || !userData.user) {
      throw new Error("User not authenticated");
    }

    const userId = userData.user.id;

    // Fetch the portfolio to check the owner
    const { data: portfolio, error: portfolioError } = await supabase
      .from("portfolio")
      .select("user")
      .eq("id", portfolioId)
      .single();

    if (portfolioError) {
      console.error("Error fetching portfolio:", portfolioError);
      throw new Error("Portfolio not found");
    }

    // Check if the authenticated user is the owner
    if (portfolio.user !== userId) {
      throw new Error("You are not authorized to delete this portfolio");
    }

    const { data, error: deleteError } = await supabase
      .from("portfolio")
      .update({ is_deleted: true })
      .eq("id", portfolioId)
      .select();

    if (deleteError) {
      console.error("Error deleting portfolio:", deleteError);
      return deleteError;
    }

    return data;
  }

  public static async updatePortfolio(id: number, data: any) {
    const { data: error } = await supabase
      .from("portfolio")
      .update(data)
      .eq("id", id);
    if (error) {
      console.error("Error updating portfolio:", error);
    }
  }

  public static async getRelatedPortfolio(id: string) {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*, media(*)")
      .eq("user", id)
      .or("is_story.eq.true,is_story.eq.false")
      .order("created_at", { ascending: false })
      .eq("is_deleted", false)
      .eq("is_public", true)
      .limit(3);

    if (error) {
      console.error("Error fetching portfolios", error);
      return null;
    }
    return data;
  }
  public static async canPostStory(userId: string, tier: string) {
    const { data: dailyBranches, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("user", userId)
      .eq("is_story", true)
      .order("created_at", { ascending: false })
      .limit(10);
    if (error) {
      console.error("Error fetching the latest story", error);
      return { canPost: false, error: "Error checking post limit" };
    }

    // Filter the branches uploaded in the last 24 hours
    const currentTime = new Date();
    const twentyFourHoursAgo = new Date(
      currentTime.getTime() - 24 * 60 * 60 * 1000,
    );

    const recentBranches =
      dailyBranches?.filter((branch) => {
        const branchTime = new Date(branch.created_at);
        return branchTime >= twentyFourHoursAgo;
      }) || [];

    console.log("Daily branches in the last 24 hours:", recentBranches.length);

    // Get the daily upload limit based on the user's tier
    const { dailyUploadLimit } = getTierDetails(tier as TierKeys);

    if (recentBranches.length >= dailyUploadLimit) {
      const nextAllowedPostTime = new Date(
        new Date(recentBranches[0].created_at).getTime() + 24 * 60 * 60 * 1000,
      );
      const formattedNextAllowedTime = formatDate(nextAllowedPostTime);

      return {
        canPost: false,
        nextAllowedPostTime: formattedNextAllowedTime,
      };
    }

    return { canPost: true };
  }

  public static async addToDailyBranch(portfolio: PortfolioType) {
    try {
      // Step 1: Prepare the new portfolio
      const mediaLength = portfolio.media.length;

      const dailyBranch = {
        user: portfolio.user,
        title: portfolio.title,
        description: portfolio.description,
        tags: portfolio.tags,
        is_story: true,
      };

      // Insert the new portfolio
      const { data: newPortfolio, error: portfolioError } = await supabase
        .from("portfolio")
        .insert(dailyBranch)
        .select("id")
        .single();

      if (portfolioError) {
        console.error("Error inserting portfolio:", portfolioError);
        return null;
      }

      const newPortfolioId = newPortfolio.id;

      // Step 2: Fetch existing media for the original portfolio
      const { data: media, error: mediaError } = await supabase
        .from("media")
        .select("*")
        .eq("portfolio_id", portfolio.id);

      if (mediaError) {
        console.error("Error fetching media:", mediaError);
        return null;
      }

      if (!media || media.length === 0) {
        console.warn("No media found for the portfolio.");
        return newPortfolio;
      }

      // Step 3: Duplicate the media entries with the new portfolio ID
      const newMedia = media.map((item) => ({
        ...item,
        portfolio_id: newPortfolioId,
      }));
      newMedia.forEach((item) => delete item.id); // to prevent conflicts

      const { data: insertedMedia, error: mediaInsertError } = await supabase
        .from("media")
        .insert(newMedia);

      if (mediaInsertError) {
        console.error("Error inserting media:", mediaInsertError);
        return null;
      }

      return { ...newPortfolio, media: insertedMedia };
    } catch (error) {
      console.error("Unexpected error:", error);
      return null;
    }
  }
}
