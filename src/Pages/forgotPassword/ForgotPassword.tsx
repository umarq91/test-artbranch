import Button from "Components/Button";
import PageMeta from "Components/PageMeta";
import PictureLayout from "../../Components/PictureLayout";
import Background from "../../assets/Background.png";
import Leaf from "../../assets/flower.png";
import useForgotPassword from "./useForgotPassword";

const ForgotPassword = () => {
  const {
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    status,
    navigate,
    loading,
    hideButton,
  } = useForgotPassword();

  return (
    <PictureLayout
      title="Find your place in Australia's largest network of creators"
      backgroundImage={Background}
      decorationImage={Leaf}
    >
      <PageMeta
        title="Reset Your Password – Secure Your Account"
        description="Forgot your password? Easily reset it and regain access to your Artbranch account securely."
      />

      <div className="mb-10 flex justify-center md:justify-start">
        <div
          className="cursor-pointer transition-transform duration-300 hover:-translate-x-1 hover:scale-[1.01]"
          onClick={() => navigate("/login")}
        >
          {"<"} Go Back
        </div>
      </div>
      <h2 className="mb-2 text-3xl font-bold">Forgot Password</h2>
      <h5 className="mb-4 text-sm text-gray-400">
        Please enter your registered email to receive a reset password link.
      </h5>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border p-6"
            style={{
              borderColor: "#E6E2DC",
              height: "84px",
              padding: "30px 20px",
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Email Address"
          />
          {touched.email && errors.email ? (
            <div className="text-red-500">{errors.email}</div>
          ) : null}
        </div>

        {status && <div className="mt-3 text-sm text-black">{status}</div>}

        {!hideButton && (
          <Button
            title="Send"
            className="w-full rounded-lg bg-[#131114] p-[10px_30px] font-syne text-[20px] font-bold leading-[24px] text-[#F5F3EE] hover:bg-gray-800"
            type="submit"
            loading={loading}
            withTransition
            disabled={loading}
          />
        )}
      </form>
    </PictureLayout>
  );
};

export default ForgotPassword;
