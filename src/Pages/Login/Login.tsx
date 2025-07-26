import Button from "Components/Button";
import PageMeta from "Components/PageMeta";
import useAuth from "hooks/useAuth";
import OtpVerification from "Pages/SignUp/otp";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { triggerOTP, verifyOTP } from "utils/api/otpApi";
import Background from "../../../public/login.png";
import Leaf from "../../assets/flower.png";
import PictureLayout from "../../Components/PictureLayout";
import useLogin from "./useLogin";

const SignIn = () => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    showPassword,
    togglePasswordVisibility,
    loading,
    step,
    setStep,
    validateCredentials,
  } = useLogin();

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpAttempts, setOtpAttempts] = useState(0);
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const { handleLogin } = useAuth();

  // Function to generate and send OTP
  const generateAndSendOtp = async (email: string) => {
    setOtpLoading(true);
    const success = await triggerOTP(email);
    setOtpLoading(false);

    if (success) {
      setOtp("");
      setOtpError("");
      setOtpAttempts(0);
      setMaxAttemptsReached(false);
      setStep(2); // Move to OTP verification step
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      const isValid = await validateCredentials(values.email, values.password);
      if (isValid) {
        await generateAndSendOtp(values.email);
      }
    } else if (step === 2) {
      if (maxAttemptsReached) {
        setOtpError("Maximum attempts reached. Please wait for OTP resend.");
        return;
      }

      const isVerified = await verifyOTP(values.email, otp);
      if (!isVerified) {
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);
        if (newAttempts >= 3) {
          setMaxAttemptsReached(true);
        }
        setOtpError("Invalid OTP or OTP expired");
        return;
      }

      await handleLogin(values.email, values.password);
    }
  };

  return (
    <PictureLayout
      title="Find your place in Australia's largest network of creators"
      backgroundImage={Background}
      decorationImage={Leaf}
    >
      <PageMeta
        title="Login to Artbranch – Access Your Creative Space"
        description="Sign in to your Artbranch account to connect with artists, explore new creations, and manage your portfolio effortlessly."
      />

      <h2 className="mb-8 text-3xl font-bold">Login to your account</h2>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        {step === 1 && (
          <>
            <div>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border p-6"
                style={{
                  borderColor: "#E6E2DC",
                  height: "84px",
                  padding: "30px 20px",
                }}
                placeholder="Email Address"
              />
              {touched.email && errors.email && (
                <div className="mt-2 text-red-500">{errors.email}</div>
              )}
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full rounded-lg border p-6"
                style={{
                  borderColor: "#E6E2DC",
                  height: "84px",
                  padding: "30px 20px",
                }}
                placeholder="Password"
              />
              <div
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-6"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <FaEye className="text-gray-600" />
                ) : (
                  <FaEyeSlash className="text-gray-600" />
                )}
              </div>
              {touched.password && errors.password && (
                <div className="mt-2 text-red-500">{errors.password}</div>
              )}
            </div>
            <Button
              title={otpLoading ? "Loading..." : "Send OTP"}
              disabled={loading}
              className="w-full rounded-lg bg-[#131114] p-[10px_30px] font-syne text-[20px] font-bold leading-[24px] text-[#F5F3EE] hover:bg-gray-800"
              type="submit"
            />
          </>
        )}

        {step === 2 && (
          <>
            <OtpVerification
              email={values.email}
              generateAndSendOtp={generateAndSendOtp}
              setOtpAttempts={setOtpAttempts}
              setMaxAttemptsReached={setMaxAttemptsReached}
              setOtpError={setOtpError}
              trigger={
                <div className="flex flex-col">
                  <label htmlFor="otp" className="mb-2 text-lg font-medium">
                    Enter your OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full rounded-lg border p-4"
                    style={{
                      borderColor: "#E6E2DC",
                    }}
                  />
                  {otpError && (
                    <div className="mt-2 text-red-500">{otpError}</div>
                  )}
                </div>
              }
            />
            <Button
              title={loading ? "Loading..." : "Log In"}
              disabled={loading}
              className="w-full rounded-lg bg-[#131114] p-[10px_30px] font-syne text-[20px] font-bold leading-[24px] text-[#F5F3EE] hover:bg-gray-800"
              type="submit"
            />
          </>
        )}
      </form>

      <div className="mt-4 flex justify-between text-start">
        <p>
          Don't have an account?{" "}
          <a
            href="/signup"
            className="cursor-pointer text-blue-600 hover:underline"
          >
            Sign up
          </a>
        </p>
        <a
          href="/forgot-password"
          className="cursor-pointer text-blue-600 hover:underline"
        >
          Forgot Password
        </a>
      </div>
    </PictureLayout>
  );
};

export default SignIn;
