import useLogin from "Pages/Login/useLogin";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }: { onClose?: () => void }) => {
  const { handleSubmit, handleChange, values, errors, touched, loading } =
    useLogin();

  const navigate = useNavigate();

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75 font-poppins">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Login to Continue
        </h2>

        {/* Description about the actions after login */}
        <p className="mb-4 text-center text-xs text-gray-600">
          Log in to access exclusive features like{" "}
          <span className="font-bold text-indigo-400 underline">
            commenting
          </span>
          ,{" "}
          <span className="font-bold text-indigo-400 underline">
            adding to your wishlist
          </span>
          , and{" "}
          <span className="font-bold text-indigo-400 underline">liking</span>{" "}
          your favorite items!
        </p>

        {/* Display error message if any */}
        {errors.email && touched.email && (
          <p className="mb-4 text-sm text-red-500">{errors.email}</p>
        )}
        {errors.password && touched.password && (
          <p className="mb-4 text-sm text-red-500">{errors.password}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 w-full rounded-lg border px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign-up prompt */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-indigo-600 hover:underline" to={"/signup"}>
            Sign up
          </Link>
        </p>

        <button
          className="mt-4 text-sm text-gray-500 underline hover:text-gray-900"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>,
    document.body, // Render it directly into the body
  );
};

export default LoginModal;
