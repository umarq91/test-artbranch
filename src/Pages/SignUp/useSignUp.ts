import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { postalCodeRanges } from "../../Types";
import { triggerOTP, verifyOTP } from "../../utils/api/otpApi";
import { socialPlatforms } from "../../utils/constants";
import { socialRegex } from "../../utils/helpers";

export interface SignUp {
  fullName: string;
  email: string;
  password: string;
  userType: string;
  username: string;
  category?: string[];
  socials: any;
  suburb?: string;
  state?: string;
  postal?: string;
  otp?: string;
}

const useSignUp = () => {
  const { handleSignUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpAttempts, setOtpAttempts] = useState(0); // Track OTP verification attempts
  const [maxAttemptsReached, setMaxAttemptsReached] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"Audience" | "Artist">(
    "Audience",
  );
  const [suggestedNames, setSuggestedNames] = useState<string[]>([]);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [additionalSocial, setAdditionalSocial] = useState("");
  const [availableSocialPlatforms, setAvailableSocialPlatforms] =
    useState(socialPlatforms);
  const [socialProfiles, setSocialProfiles] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setMaxAttemptsReached(false);
    setOtpAttempts(0);
    setOtpError("");
  }, [selectedTab]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleFocus = (field: string) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  async function validate(values: SignUp, step: number) {
    const errors = {} as Partial<SignUp>;

    if (step === 1) {
      if (!values.fullName.trim()) {
        errors.fullName = "Full name is required";
      }

      // usernameValidation
      if (!values.username.trim()) {
        errors.username = "Username is required";
      } else if (/\s/.test(values.username)) {
        errors.username = "Username should not contain spaces";
      } else if (/^\d/.test(values.username)) {
        errors.username = "Username should not start with a number";
      } else if (!/^[a-zA-Z0-9_.]+$/.test(values.username)) {
        errors.username =
          "Username can only contain letters, numbers, underscores (_), or dots (.)";
      } else if (values.username.length < 4) {
        errors.username = "Username should be at least 4 characters long";
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(values.email)) {
        errors.email = "Valid email is required";
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:<>?]).{8,}$/;
      if (!passwordRegex.test(values.password.trim())) {
        errors.password =
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character";
      }
      if (!values.suburb?.trim()) {
        errors.suburb = "Suburb is required";
      }
      if (!values.state?.trim()) {
        errors.state = "State is required";
      }

      const postalCodeRegex = /^\d{4}$/;

      if (!postalCodeRegex.test(String(values.postal))) {
        errors.postal = "Postal code must be a 4-digit number";
      } else if (values.state) {
        const ranges = postalCodeRanges[values.state];
        const postalCode = String(values.postal).padStart(4, "0"); // Ensures leading zeros

        if (
          !ranges ||
          !ranges.some(([min, max]) => postalCode >= min && postalCode <= max)
        ) {
          errors.postal = `Postal code ${values.postal} is not valid for ${values.state}`;
        }
      }

      if (values.userType === "Artist") {
        if (values.category!.length == 0) {
          errors.category = ["Category is required"];
        }
      }
    }
    if (step === 2 && selectedTab === "Artist") {
      if (Object.keys(socialProfiles).length === 0) {
        errors.socials = "At least one social profile is required";
      } else {
        errors.socials = {};
        let hasErrors = false;

        for (const [platform, url] of Object.entries(socialProfiles)) {
          const name = socialPlatforms.find((pf) => pf.key === platform)?.name; // to go from instagram is required to Instagram is required

          if (!values?.socials?.[platform]?.trim()) {
            errors.socials[platform] = `${name} URL is required`;
            hasErrors = true;
          } else {
            const trimmedUrl = values.socials[platform].trim();
            if (
              socialRegex[platform] &&
              !socialRegex[platform].test(trimmedUrl)
            ) {
              errors.socials[platform] = `Invalid ${name} URL`;
              hasErrors = true;
            }
          }
        }
        if (!hasErrors) {
          delete errors.socials;
        }
      }
    }
    return errors;
  }

  async function generateAndSendOtp(email: string) {
    const success = await triggerOTP(email);
    if (success) {
      // TODO: send otp to mail
    }
  }

  const handleAddSocial = (e: any) => {
    const platform = e.target.value;
    if (platform) {
      setSocialProfiles((prev) => ({
        ...prev,
        [platform]: "",
      }));
      setAdditionalSocial("");
    }

    setAvailableSocialPlatforms((prev) =>
      prev.filter((pf) => pf.key !== platform),
    );
  };

  const handleRemoveSocialProfile = (key: string) => {
    const updatedProfiles = { ...socialProfiles };
    delete updatedProfiles[key];
    setSocialProfiles(updatedProfiles);

    const platformToAddBack = socialPlatforms.find((pf) => pf.key === key);
    if (platformToAddBack) {
      setAvailableSocialPlatforms((prev) => [...prev, platformToAddBack]);
    }
  };

  async function onSubmit(values: SignUp) {
    setLoading(true);
    try {
      const {
        email,
        fullName,
        password,
        userType,
        suburb,
        state,
        postal,
        category,
        otp,
        username,
        socials,
      } = values;
      console.log(socials);

      // Check if maximum attempts are reached
      if (maxAttemptsReached) {
        setOtpError("Wait for resend");
        return;
      }

      // Verify OTP
      const isVerified = await verifyOTP(email, otp!);
      if (!isVerified) {
        setOtpAttempts((prev) => prev + 1);
        if (otpAttempts + 1 >= 3) {
          setMaxAttemptsReached(true);
        }
        setOtpError("Invalid OTP or OTP expired");
        return;
      }

      if (userType === "Artist") {
        await handleSignUp(
          email,
          password,
          fullName,
          userType,
          username,
          suburb,
          state,
          postal,
          category,
          socials,
          // socialProfiles,
        );
      } else {
        await handleSignUp(
          email,
          password,
          fullName,
          userType,
          username,
          suburb,
          state,
          postal,
        );
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setLoading(false);
    }
  }

  return {
    onSubmit,
    generateAndSendOtp,
    validate,
    showPassword,
    togglePasswordVisibility,
    loading,
    otpError,
    maxAttemptsReached,
    setOtpAttempts,
    setMaxAttemptsReached,
    setOtpError,
    selectedTab,
    setSelectedTab,
    suggestedNames,
    setSuggestedNames,
    handleBlur,
    handleFocus,
    additionalSocial,
    setAdditionalSocial,
    handleAddSocial,
    socialProfiles,
    handleRemoveSocialProfile,
    availableSocialPlatforms,
  };
};

export default useSignUp;
