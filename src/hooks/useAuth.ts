import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast } from "../helpers/Toast";
import { fetchUserProfile, logoutUser, signUpUser } from "../redux/authSlice";
import { AppDispatch, RootState } from "../redux/store/store";
import { User_STATUS } from "../Types";
import { supabase } from "../utils/services/supabase";

const useAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  // Get profile directly from the Redux store
  const { profile, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
          setLoading(false);
          return;
        }

        if (session && session.user) {
          localStorage.setItem("authToken", session.access_token || "");
          dispatch(fetchUserProfile(session.user.id));
        } else {
          localStorage.removeItem("authToken");

          dispatch(fetchUserProfile(""));
        }
      } catch (error) {
        console.error("Error in fetchSession:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [dispatch]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
      if (!data.user) {
        Toast(
          "Login unsuccessful. Please recheck the credentials and try again.",
          "error",
        );
        return;
      }
      localStorage.setItem("authToken", data.session?.access_token || "");
      const { payload } = await dispatch(fetchUserProfile(data.user.id));

      if (payload) {
        if (
          (payload.status === User_STATUS.DISABLED &&
            payload.role === "Artist") ||
          payload.status === User_STATUS.DELETE_REQUEST
        ) {
          Toast(
            "Your account has been disabled, please contact customer support",
            "error",
          );
          localStorage.removeItem("authToken");
          return;
        }
      }
      localStorage.setItem("isFirstTimeUser", "true"); // welcome modal
      Toast("Welcome back!", "success");

      window.location.reload();
    } catch (error) {
      console.error("Error logging in:", error);
      Toast(
        "Login unsuccessful. Please recheck the credentials and try again.",
        "error",
      );
    }
  };
  const validateCredentials = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        Toast(
          "Login unsuccessful. Please recheck the credentials and try again.",
          "error",
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error validating credentials:", error);
      Toast(
        "Login unsuccessful. Please recheck the credentials and try again.",
        "error",
      );
      return false;
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    fullName: string,
    userType: string,
    username: string,
    suburb?: string,
    state?: string,
    postalCode?: string,
    category?: string[],
    socials?: any,
  ) => {
    try {
      // Validate email format
      const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      );
      if (!emailRegex.test(email)) {
        Toast(
          "Invalid email format. Please enter a valid email address.",
          "error",
        );
        return;
      }

      // Check if the email already exists in Supabase
      const { data: existingUser, error: fetchError } = await supabase
        .from("profiles")
        .select("id")
        .eq("email", email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw new Error(
          `Error checking email existence: ${fetchError.message}`,
        );
      }

      if (existingUser) {
        Toast(
          "Email already exists. Please use a different email address.",
          "error",
        );
        return;
      }

      // Dispatch signUpUser Redux thunk
      const user = await dispatch(
        signUpUser({
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
        }),
      ).unwrap();

      if (user) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw new Error(error.message);

        // Store auth token
        localStorage.setItem("authToken", data.session?.access_token || "");

        localStorage.setItem("isFirstTimeUser", "true"); // welcome modal

        await dispatch(fetchUserProfile(data.user?.id || ""));

        Toast("Welcome To Art Branch", "success");

        window.location.replace("/");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      Toast("Failed to sign up. Please try again.", "error");
    }
  };

  // logout fun

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      localStorage.removeItem("authToken");
      await supabase.auth.signOut();
      Toast("Logged out successfully.", "success");
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
      Toast(
        "An error occured while logging you out. Please try again.",
        "error",
      );
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    handleLogout,
    profile,
    loading,
    error,
    validateCredentials,
  };
};

export default useAuth;
