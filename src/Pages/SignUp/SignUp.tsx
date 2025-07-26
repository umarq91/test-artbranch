import Button from "Components/Button";
import FormInput from "Components/FormInput";
import PageMeta from "Components/PageMeta";
import PictureLayout from "Components/PictureLayout";
import StepIndicator from "Components/StepIndicator";
import { Field, Form, Formik } from "formik";
import { generateNameSuggestions } from "helpers/helpers";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCheckSquare, FaSquare } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Austrailia_State, Post_Categories } from "Types";
import { checkIfEmailExist, checkIfUsernameExists } from "utils/api/Info";
import { socialPlatforms } from "utils/constants";
import Background from "../../../public/login.png";
import Leaf from "../../assets/Leaf.png";
import OtpVerification from "./otp";
import useSignUp from "./useSignUp";
interface SignUpFormValues {
  fullName: string;
  email: string;
  password: string;
  userType: "Audience" | "Artist";
  suburb: string;
  state: string;
  postal: string;
  category: string[];
  socials: any;
  username: string;
  otp: string;
}
const SignUp = () => {
  const {
    onSubmit,
    validate,
    loading,
    showPassword,
    togglePasswordVisibility,
    generateAndSendOtp,
    otpError,
    setOtpAttempts,
    setMaxAttemptsReached,
    maxAttemptsReached,
    selectedTab,
    setSelectedTab,
    setOtpError,
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
  } = useSignUp();

  const [step, setStep] = useState<number>(1);
  const [isAgreedToTerms, setIsAgreedToTerms] = useState(false);

  const handleArtistNextStep = async (
    setTouched: any,
    validateForm: any,
    values: any,
    setFieldError: any,
  ) => {
    const touchFields = {
      fullName: true,
      email: true,
      password: true,
      category: true,
      username: true,
      postal: true,
      suburb: true,
      state: true,
      socials: Object.keys(socialProfiles).reduce((acc: any, key) => {
        acc[key] = true;
        return acc;
      }, {}),
    };
    setTouched(touchFields);

    // Validate the form
    const errors = await validateForm();

    // If there are validation errors, stop here
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      console.log("Cannot continue due to validation errors");
      return;
    }

    // Step 1: Check if email exists before proceeding to Step 2
    if (step === 1) {
      const usernameExists = await checkIfUsernameExists(values.username);
      if (usernameExists) {
        setFieldError("username", "Username already exists");
        setSuggestedNames(generateNameSuggestions(values.username));
        return;
      } else {
        setSuggestedNames([]);
      }
      const emailExists = await checkIfEmailExist(values.email);
      if (emailExists) {
        setFieldError("email", "Email already exists");
        console.log("Email already exists");
        return;
      }

      setStep(2);
    }

    // Step 2: Generate and send OTP before proceeding to Step 3
    if (step === 2) {
      await generateAndSendOtp(values.email);
      setStep(3);
    }
  };

  // Function to handle next step for Audience tab
  const handleAudienceNextStep = async (
    setTouched: any,
    validateForm: any,
    values: any,
    setFieldError: any,
  ) => {
    // Mark all fields as touched to trigger validation
    const touchFields = {
      fullName: true,
      username: true,
      email: true,
      password: true,
    };
    setTouched(touchFields);

    // Validate the form
    const errors = await validateForm();

    // If there are validation errors, stop here
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      console.log("Cannot continue due to validation errors");
      return;
    }

    if (step === 1) {
      const emailExists = await checkIfEmailExist(values.email);
      if (emailExists) {
        setFieldError("email", "Email already exists");
        console.log("Email already exists");
        return;
      }
      const usernameExists = await checkIfUsernameExists(values.username);
      if (usernameExists) {
        setFieldError("username", "Username already exists");
        setSuggestedNames(generateNameSuggestions(values.username));
        return;
      } else {
        setSuggestedNames([]);
      }
      setStep(2);
    }

    await generateAndSendOtp(values.email);
  };

  const handleSetSuggestName = (setFieldValue: any, name: string) => {
    setFieldValue("username", name);
    setSuggestedNames([]);
  };

  const handleChangeTab = (value: "Audience" | "Artist") => {
    setSelectedTab(value);
    setStep(1);
  };

  const initialValues: SignUpFormValues = {
    fullName: "",
    email: "",
    password: "",
    userType: selectedTab,
    suburb: "",
    state: "",
    postal: "",
    category: [],
    socials: {},
    username: "",
    otp: "",
  };
  return (
    <PictureLayout
      title="Find your place in Australia's largest network of creators"
      backgroundImage={Background}
      decorationImage={Leaf}
    >
      <PageMeta
        title="Sign Up on Artbranch"
        description="Create your Artbranch account today and connect with artists, showcase your work, and explore inspiring creations."
      />

      <h2 className="mb-8 text-3xl font-bold">Create an account</h2>

      {/* Tab Toggle */}
      <div className="mb-10 flex justify-center space-x-4">
        <div className="flex w-max items-center rounded-full bg-gray-200 p-2">
          {["Audience", "Artist"].map((tab) => (
            <button
              key={tab}
              className={`rounded-full px-6 py-2 transition-colors duration-300 ${
                selectedTab === tab
                  ? "bg-[#131114] text-white hover:opacity-80"
                  : "text-gray-700"
              }`}
              onClick={() => handleChangeTab(tab as "Audience" | "Artist")}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Step Indicator */}
      {selectedTab === "Artist" && (
        <div className="my-6">
          <StepIndicator currentStep={step} />
        </div>
      )}

      {((selectedTab !== "Audience" && step === 2) ||
        (selectedTab !== "Artist" && step === 3)) && (
        <button
          title="Go Back"
          onClick={() => setStep(step - 1)}
          className="my-2 flex items-center space-x-2 text-gray-600 hover:text-blue-600 focus:outline-none"
        >
          <FiArrowLeft className="h-5 w-5" /> {/* Minimal left arrow icon */}
          <span className="text-sm font-medium">Go Back</span>{" "}
          {/* Simple text */}
        </button>
      )}

      {/* Form */}
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values, step)}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({
          errors,
          touched,
          validateForm,
          setTouched,
          values,
          setFieldValue,
          setFieldError,
        }) => (
          <Form className="space-y-6">
            {/* Step 1: Common Fields */}

            {step === 1 && (
              <>
                <FormInput
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  label="Full Name"
                  error={touched.fullName ? errors.fullName : ""}
                />

                <div
                  onFocus={() => handleFocus("username")}
                  onBlur={handleBlur}
                >
                  <FormInput
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your Username here"
                    label="Username"
                    error={touched.username ? errors.username : ""}
                  />
                </div>
                <div className="mt-2 flex flex-wrap gap-4">
                  {suggestedNames.map((name) => (
                    <button
                      key={name}
                      onClick={() => handleSetSuggestName(setFieldValue, name)}
                      className="rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-800 shadow-sm transition-colors duration-200 ease-in-out hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {name}
                    </button>
                  ))}
                </div>

                <div onFocus={() => handleFocus("email")} onBlur={handleBlur}>
                  <FormInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    label="Email Address"
                    error={touched.email ? errors.email : ""}
                  />
                </div>
                <FormInput
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                  error={touched.password ? errors.password : ""}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
                <FormInput
                  id="suburb"
                  name="suburb"
                  type="text"
                  placeholder="Suburb"
                  label="Suburb"
                  error={touched.suburb ? errors.suburb : ""}
                />
                <FormInput
                  id="postal"
                  name="postal"
                  type="text"
                  placeholder="Postal Code"
                  label="Postal Code"
                  error={touched.postal ? errors.postal : ""}
                />
                <div>
                  <label htmlFor="state" className="block font-semibold">
                    State
                  </label>
                  <Field
                    as="select"
                    name="state"
                    className="w-full rounded-lg border p-6"
                  >
                    <option value="" disabled>
                      Select state
                    </option>
                    {Object.values(Austrailia_State).map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Field>
                  {touched.state && errors.state && (
                    <div className="text-red-500">{errors.state}</div>
                  )}
                </div>

                {/* Artist Specific Fields */}
                {selectedTab === "Artist" && (
                  <>
                    <label htmlFor="checkbox" className="block font-semibold">
                      Categories
                    </label>
                    <div className="mb-3 grid grid-cols-2 space-y-2 lg:grid-cols-3">
                      {Object.values(Post_Categories).map(
                        (category: string) => (
                          <div key={category} className="flex items-center">
                            <input
                              type="checkbox"
                              id={category}
                              checked={values?.category.includes(category)}
                              onChange={() => {
                                const newCategories = values.category.includes(
                                  category,
                                )
                                  ? values.category.filter(
                                      (cat) => cat !== category,
                                    )
                                  : [...values.category, category];
                                setFieldValue("category", newCategories);
                              }}
                              className="hidden"
                            />
                            <span
                              className="cursor-pointer text-blue-600"
                              onClick={() => {
                                const newCategories = values.category.includes(
                                  category,
                                )
                                  ? values.category.filter(
                                      (cat) => cat !== category,
                                    )
                                  : [...values.category, category];
                                setFieldValue("category", newCategories);
                              }}
                            >
                              {values.category.includes(category) ? (
                                <FaCheckSquare className="h-5 w-5 text-blue-600" />
                              ) : (
                                <FaSquare className="h-5 w-5 text-gray-300" />
                              )}
                            </span>
                            <label
                              htmlFor={category}
                              className="ml-2 text-sm font-medium text-gray-700"
                            >
                              {category}
                            </label>
                          </div>
                        ),
                      )}
                      {touched.category && errors.category && (
                        <div className="mt-2 text-red-500">
                          {errors.category}
                        </div>
                      )}
                    </div>
                  </>
                )}

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isAgreedToTerms}
                    onChange={() => setIsAgreedToTerms(!isAgreedToTerms)}
                    className="h-5 w-5 rounded text-[#131114] focus:ring-2 focus:ring-[#131114]"
                  />
                  <label htmlFor="terms" className="cursor-pointer">
                    I agree to the{" "}
                    <a
                      href="/termsconditions"
                      className="text-blue-500 underline"
                    >
                      Terms & Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacypolicy"
                      className="text-blue-500 underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <Button
                  title={loading ? "Loading..." : "Continue"}
                  className={`my-5 w-full rounded-lg text-[20px] text-[#F5F3EE] ${isAgreedToTerms ? "bg-[#131114] hover:bg-gray-800" : "cursor-not-allowed bg-gray-400"}`}
                  disabled={!isAgreedToTerms || loading}
                  onClick={() =>
                    selectedTab === "Artist"
                      ? handleArtistNextStep(
                          setTouched,
                          validateForm,
                          values,
                          setFieldError,
                        )
                      : handleAudienceNextStep(
                          setTouched,
                          validateForm,
                          values,
                          setFieldError,
                        )
                  }
                />
              </>
            )}

            {/* Audience Step 2: OTP */}
            {selectedTab === "Audience" && step === 2 && (
              <>
                <OtpVerification
                  email={values.email}
                  generateAndSendOtp={generateAndSendOtp}
                  setOtpAttempts={setOtpAttempts}
                  setMaxAttemptsReached={setMaxAttemptsReached}
                  setOtpError={setOtpError}
                  trigger={
                    <>
                      <FormInput
                        id="otp"
                        name="otp"
                        type="text"
                        placeholder="Enter your OTP"
                        label="One Time Verification"
                        error={touched.otp ? errors.otp : ""}
                      />
                      {otpError && (
                        <div className="text-red-500">{otpError}</div>
                      )}
                      <Button
                        title={loading ? "Loading..." : "Complete Signup"}
                        type="submit"
                        className="my-5 w-full rounded-lg bg-[#131114] text-[20px] text-[#F5F3EE] hover:bg-gray-800"
                      />
                    </>
                  }
                />
              </>
            )}

            {/* Artist Step 2: Social Links */}
            {selectedTab === "Artist" && step === 2 && (
              <>
                {/* <FormInput
                  id="instagram"
                  name="instagram"
                  type="text"
                  placeholder="Instagram"
                  label="Instagram"
                  error={touched.instagram ? errors.instagram : ""}
                />
                <FormInput
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  placeholder="LinkedIn"
                  label="LinkedIn"
                  error={touched.linkedin ? errors.linkedin : ""}
                /> */}
                <div className="flex flex-col">
                  <label className="text-md mb-2 mt-6 font-semibold">
                    Add a Social
                  </label>
                  <div className="spacex-4 flex w-full gap-3">
                    <select
                      className="flex-1 rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      // value={additionalSocial}
                      onChange={(e) => handleAddSocial(e)}
                    >
                      <option value="">Select a platform</option>
                      {availableSocialPlatforms.map((platform) => (
                        <option key={platform.key} value={platform.key}>
                          {platform.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Social Profiles Display */}
                <div className="space-y-6">
                  {Object.entries(socialProfiles).map(
                    ([key, value]: [string, string]) => {
                      const name = socialPlatforms.find(
                        (platform) => platform.key === key,
                      )?.name;
                      return (
                        <div
                          key={key}
                          className="flex items-center justify-center space-x-4"
                        >
                          <div className="flex flex-grow flex-col space-y-2">
                            <FormInput
                              label={`${name}`}
                              name={`socials.${key}`}
                              type="url"
                              id={`socials.${key}`}
                              placeholder={`Enter your ${key.charAt(0).toUpperCase() + key.slice(1)} profile URL`}
                              error={
                                ((touched.socials as Record<string, boolean>)?.[
                                  key
                                ] &&
                                  (errors.socials as Record<string, string>)?.[
                                    key
                                  ]) ||
                                ""
                              }
                            />
                          </div>
                          {/* Close icon button */}
                          <button
                            type="button"
                            onClick={() => handleRemoveSocialProfile(key)}
                            className="p-2 text-gray-500 transition hover:text-red-500"
                          >
                            <AiOutlineClose size={20} />
                          </button>
                        </div>
                      );
                    },
                  )}
                </div>
                {errors.socials && typeof errors.socials === "string" && (
                  <div className="text-sm text-red-500">{errors.socials}</div>
                )}
                <Button
                  title={loading ? "Loading..." : "Continue"}
                  className={`w-full rounded-lg bg-[#131114] text-[20px] text-[#F5F3EE] hover:opacity-90`}
                  loading={loading}
                  onClick={() =>
                    handleArtistNextStep(
                      setTouched,
                      validateForm,
                      values,
                      setFieldError,
                    )
                  }
                />
              </>
            )}

            {/* Step 3: Final Step */}
            {step === 3 && (
              <>
                <OtpVerification
                  email={values.email}
                  generateAndSendOtp={generateAndSendOtp}
                  setOtpAttempts={setOtpAttempts}
                  setMaxAttemptsReached={setMaxAttemptsReached}
                  setOtpError={setOtpError}
                  trigger={
                    <>
                      <FormInput
                        id="otp"
                        name="otp"
                        type="text"
                        placeholder="Enter your OTP"
                        label="Enter your OTP"
                        // error={touched.socials ? errors.socials : ""}
                      />
                      {otpError && (
                        <div className="text-red-500">{otpError}</div>
                      )}
                    </>
                  }
                />

                <Button
                  title={loading ? "Loading..." : "Complete Signup"}
                  type="submit"
                  className="my-5 w-full rounded-lg bg-[#131114] text-[20px] text-[#F5F3EE] hover:bg-gray-800"
                />
              </>
            )}
          </Form>
        )}
      </Formik>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link className="text-indigo-600 hover:underline" to={"/login"}>
          Login
        </Link>
      </p>
    </PictureLayout>
  );
};

export default SignUp;
