import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserRepository } from "../utils/repositories/userRepository";
import { supabase } from "../utils/services/supabase";

export interface AuthState {
  profile: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunks for authentication actionss
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (
    {
      email,
      password,
      fullName,
      userType,
      username,
      suburb,
      state,
      postalCode,
      category,
      socials,
    }: {
      email: string;
      password: string;
      fullName: string;
      userType: string;
      username: string;
      suburb?: string;
      state?: string;
      postalCode?: string;
      category?: string[];
      socials?: any;
    },
    { rejectWithValue },
  ) => {
    try {
      await UserRepository.createUser(
        fullName,
        email,
        password,
        userType,
        username,
        suburb,
        state,
        postalCode,
        category,
        socials,
      );

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      const profile = await UserRepository.getUserProfile(data.user?.id);
      return profile;
    } catch (error) {
      // Handle errors from createUser and signInWithPassword
      if (error instanceof Error) {
        if (error.message.includes("This email is already registered")) {
          return rejectWithValue(
            "This email is already registered. Please log in instead.",
          );
        }
        return rejectWithValue(`Sign up failed: ${error.message}`);
      } else {
        return rejectWithValue("An unknown error occurred during sign-up");
      }
    }
  },
);

// For login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw new Error(error.message);

      // Fetch user profile after login
      const profile = await UserRepository.getUserProfile(data.user?.id || "");
      return profile;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("An unknown error occurred during login");
      }
    }
  },
);

// For logout
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred during logout");
    }
  }
});

// For getting profile data
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (userId: string) => {
    try {
      const profile = await UserRepository.getUserProfile(userId);
      return profile;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch profile: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred while fetching profile");
      }
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.profile = null;
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.error = action.error.message || null;
        state.loading = false;
      });
  },
});

export default authSlice.reducer;
