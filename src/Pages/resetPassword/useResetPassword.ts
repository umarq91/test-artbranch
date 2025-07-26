import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Toast } from "../../helpers/Toast";
import ForgotPasswordRepository from "../../utils/repositories/forgotpasswordRepository";
import { UserRepository } from "../../utils/repositories/userRepository";

const useResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const validate = (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    const errors: { newPassword?: string; confirmPassword?: string } = {};
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,}$/;

    if (!passwordRegex.test(values.newPassword)) {
      errors.newPassword =
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
    }

    if (values.confirmPassword !== values.newPassword) {
      errors.confirmPassword = "Passwords must match";
    }

    return errors;
  };

  const handleSubmit = async (values: {
    newPassword: string;
    confirmPassword: string;
  }) => {
    if (token) {
      setActionLoading(true);
      const resetPassword = await UserRepository.resetPassword(
        token,
        values.confirmPassword,
      );

      if (resetPassword) {
        Toast(
          "Password reset successfully. Please login with your new credentials to continue.",
          "success",
        );
        navigate("/login");
      } else {
        Toast(
          "Password could not be reset successfully. Please try again.",
          "error",
        );
      }
      setActionLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validate,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          const forgotPasswordRepository = new ForgotPasswordRepository();
          const passwordRequestData =
            await forgotPasswordRepository.getSingle(token);
          if (passwordRequestData) {
            const { forgotPasswordData, forgotPasswordError } =
              passwordRequestData;
            if (forgotPasswordData && !forgotPasswordError) {
              setIsTokenValid(true);
              const expiresAt = new Date(forgotPasswordData.expires_at);
              const now = new Date();

              if (expiresAt < now) {
                setIsExpired(true);
                Toast(
                  "The reset token has expired. Please request a new reset link.",
                  "error",
                );
                navigate("/forgot-password");
              } else {
                setIsExpired(false);
              }
            } else {
              setIsTokenValid(false);
            }
          } else {
            setIsTokenValid(false);
          }
          setLoading(false);
        } catch (err) {
          console.error("Error in checking token validity:", err);
          setIsTokenValid(false);
          Toast("An error occured. Please try again.", "error");
          setLoading(false);
        }
      }
    };

    checkTokenValidity();
  }, [token, navigate]);

  return {
    formik,
    showNewPassword,
    toggleNewPasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    isTokenValid,
    isExpired,
    navigate,
    loading,
    actionLoading,
  };
};

export default useResetPassword;
