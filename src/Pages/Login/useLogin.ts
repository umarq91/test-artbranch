import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../../context/UserInfoContext";
import useAuth from "../../hooks/useAuth";

const useLogin = () => {
  const { validateCredentials } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  if (userInfo) {
    navigate("/");
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const [loading, setLoading] = useState(false);

  const validate = (values: { email: string; password: string }) => {
    const errors: { email?: string; password?: string } = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: () => {},
  });

  return {
    ...formik,
    showPassword,
    togglePasswordVisibility,
    loading,
    step,
    setStep,
    validateCredentials,
  };
};

export default useLogin;
