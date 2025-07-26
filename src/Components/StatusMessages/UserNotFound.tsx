import { FaHome, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserNotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg p-8 text-center">
        <div className="mb-6 animate-bounce text-blue-500">
          <FaSearch className="mx-auto text-6xl" />
        </div>
        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          User Not Found
        </h1>
        <p className="mb-6 text-gray-600">
          Sorry, we couldn't find the user you're looking for. They may have
          moved or never existed or Invalid Id.
        </p>
        <div className="space-y-4">
          <Link
            to={"/"}
            className="flex w-full items-center justify-center rounded-lg bg-gray-200 px-4 py-2 font-semibold text-gray-800 shadow-md transition duration-300 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            <FaHome className="mr-2" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
