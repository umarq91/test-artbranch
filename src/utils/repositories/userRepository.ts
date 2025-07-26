import { User_STATUS, UserProfileType } from "../../Types";
import { supabase } from "../services/supabase";

export class UserRepository {
  static async createUser(
    fullName: string,
    email: string,
    password: string,
    userType: string,
    username: string,
    suburb?: string,
    state?: string,
    postalCode?: string,
    category?: string[],
    socials?: any,
  ) {
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (authError) {
      throw new Error(`Error during signup: ${authError.message}`);
    }
    if (!data || !data.user) {
      throw new Error("Signup was successful, but user data is missing.");
    }

    // manually updating user Role
    if (userType === "Artist") {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          categories: category,
          role: userType,
          social_profiles: socials,
          status: "verification_pending",
          suburb,
          state,
          postal: postalCode,
          username,
        })
        .eq("id", data.user.id);

      if (updateError) {
        throw new Error(`Error updating profile: ${updateError.message}`);
      }
    } else if (userType === "Audience") {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          role: userType,
          suburb,
          state,
          postal: postalCode,
          username,
        })
        .eq("id", data.user.id);

      return data.user;
    }
  }

  static async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      throw new Error(`Error fetching profile: ${error.message}`);
    }

    return data;
  }

  static async getCurrentUser() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (data.user && !error) {
        return data.user;
      }
      return null;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  static async fetchLoggedInUser() {
    const { data, error } = await supabase.auth.getUser();
    console.log("DATA", error);
    if (error) {
      throw new Error(error.message);
    }
    return data.user;
  }

  static async getUserInfo(userId: string): Promise<UserProfileType | null> {
    if (!userId) return null;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, subscriptions(tier)")
        .eq("id", userId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        const { subscriptions, ...rest } = data;
        return {
          ...rest,
          tier: subscriptions[0]?.tier || null,
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  static async updateUserProfile(
    userId: string,
    profile: Partial<UserProfileType>,
  ): Promise<void> {
    try {
      const { portfolio, ...profileToUpdate } = profile; // Exclude portfolio for separate handling

      const { error } = await supabase
        .from("profiles")
        .update(profileToUpdate)
        .eq("id", userId);

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  }

  static async becomeArtist(
    userId: string,
    instagram: string,
    linkedin: string,
    category: string[],
  ) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({
          categories: category,
          social_profiles: { linkedin: linkedin, instgram: instagram },
          role: "Artist",
          status: User_STATUS.PENDING,
        })
        .eq("id", userId);

      if (error) {
        throw new Error(`Error updating profile: ${error.message}`);
      }

      return data;
    } catch (e) {
      console.error("An error occurred while promoting to an artist:", e);
      return null;
    }
  }

  static async forgotPassword(email: string) {
    try {
      const { data, error } = await supabase.functions.invoke("trigger-email", {
        body: {
          type: "forgotPassword",
          email,
        },
      });

      return data && !error && data.status === "success";
    } catch (e) {
      console.error(
        "An error occurred while triggering a forgot password request:",
        e,
      );
      return false;
    }
  }

  static async resetPassword(token: string, newPassword: string) {
    try {
      const { data, error } = await supabase.functions.invoke("account", {
        body: {
          action: "resetForgotPassword",
          token,
          newPassword,
        },
      });

      return data && !error && data.status === "success";
    } catch (e) {
      console.error("An error occurred while resetting the password:", e);
      return false;
    }
  }
}
