import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRepository } from "../../utils/repositories/userRepository";

const useForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [hideButton, setHideButton] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: { [key: string]: string } = {};
      const emailRegex = new RegExp(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/,
      );
      if (!values.email.match(emailRegex)) {
        errors.address = "Valid email is required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const forgotPasswordSent = await UserRepository.forgotPassword(
          values.email,
        );

        if (forgotPasswordSent) {
          setStatus(
            "An email has been sent to this email. Please make sure to check your spam folder. If you do not receive an email within 5 minutes, you can request a new one.",
          );
          setHideButton(true);
        } else {
          setStatus(
            "An error occured. Please make sure this email is linked to an active Art Branch account and try again.",
          );
          setHideButton(false);
        }
      } catch (error) {
        console.error("Error updating user profile:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    ...formik,
    loading,
    navigate,
    status,
    hideButton,
  };
};

export default useForgotPassword;
