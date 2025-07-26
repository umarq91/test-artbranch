import Button from "Components/Button";
import CustomLoader from "Components/Loader";
import PageMeta from "Components/PageMeta";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PictureLayout from "../../Components/PictureLayout";
import Background from "../../assets/Background.png";
import Leaf from "../../assets/flower.png";
import useResetPassword from "./useResetPassword";

const ResetPassword = () => {
  const {
    formik,
    showNewPassword,
    toggleNewPasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
    isTokenValid,
    navigate,
    loading,
    actionLoading,
  } = useResetPassword();
  return (
    <PictureLayout
      title="Find your place in Australia's largest network of creators"
      backgroundImage={Background}
      decorationImage={Leaf}
    >
      <PageMeta
        title="Reset Your Password"
        description="Forgot your password? Reset it securely and regain access to your Artbranch account in just a few steps."
      />

      {loading ? (
        <CustomLoader />
      ) : (
        <>
          <div className="mb-10 flex justify-center md:justify-start">
            <div
              className="cursor-pointer transition-transform duration-300 hover:-translate-x-1 hover:scale-[1.01]"
              onClick={() => navigate("/login")}
            >
              {"<"} Go Back
            </div>
          </div>
          <h2 className="mb-8 text-center text-xl font-bold md:text-start md:text-3xl">
            Reset your password
          </h2>

          {!isTokenValid ? (
            <p className="text-center text-red-500 md:text-start">
              The request is either expired or invalid.
            </p>
          ) : (
            <form className="space-y-6" onSubmit={formik.handleSubmit}>
              {/* New Password */}
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  className="w-full rounded-lg border p-6"
                  style={{
                    borderColor: "#E6E2DC",
                    height: "84px",
                    padding: "30px 20px",
                  }}
                  placeholder="New Password"
                  {...formik.getFieldProps("newPassword")}
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-6"
                  onClick={toggleNewPasswordVisibility}
                >
                  {showNewPassword ? (
                    <FaEye className="text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-gray-600" />
                  )}
                </div>
                {formik.errors.newPassword && (
                  <div className="text-red-600">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full rounded-lg border p-6"
                  style={{
                    borderColor: "#E6E2DC",
                    height: "84px",
                    padding: "30px 20px",
                  }}
                  placeholder="Confirm Password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                <div
                  className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-6"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <FaEye className="text-gray-600" />
                  ) : (
                    <FaEyeSlash className="text-gray-600" />
                  )}
                </div>
                {formik.errors.confirmPassword && (
                  <div className="text-red-600">
                    {formik.errors.confirmPassword}
                  </div>
                )}
              </div>

              <Button
                title="Reset"
                className="w-full rounded-lg bg-[#131114] p-[10px_30px] font-syne text-[20px] font-bold leading-[24px] text-[#F5F3EE] hover:bg-gray-800"
                type="submit"
                loading={actionLoading}
                withTransition
                disabled={actionLoading}
              />
            </form>
          )}
        </>
      )}
    </PictureLayout>
  );
};

export default ResetPassword;
