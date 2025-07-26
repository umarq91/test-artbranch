import { HeartIcon } from "@heroicons/react/20/solid";
import NavbarDropdown from "Components/NavDropbar";
import { useNotificationContext } from "context/NotificatonProvider";
import { useUserInfo } from "context/UserInfoContext";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User_ROLES } from "Types";
import logo from "../../assets/newLogo.png";
import Button from "../Button";
import Notificationbar from "./NotificationBar";
import useNav from "./useNav";

const Navbar: React.FC = () => {
  const {
    isOpen,
    setIsOpen,
    handleSignupClick,
    handleLoginClick,
    handlePortfolioClick,
    handleLogout,
    profile,
  } = useNav();

  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useUserInfo();
  const { unreadCount, notifications, deleteNotificationById } =
    useNotificationContext();
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  const drawerVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  useEffect(() => {
    if (isNotificationsOpen) {
      setIsNotificationsOpen(false);
    }
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white px-4 py-3">
      <div className="mx-auto flex items-center justify-center py-3 md:px-16">
        {/* Left Section: Logo */}
        <div className="absolute left-10 flex-shrink-0">
          <img
            onClick={() => navigate("/")}
            src={logo}
            alt="Logo"
            className="h-14 w-auto cursor-pointer md:h-32"
          />
        </div>

        {/* Middle Section: Custom Links */}
        <div className="hidden flex-1 justify-center lg:flex">
          <div className="flex items-center space-x-6 rounded-full border border-gray-200 bg-[#F5F3F1] px-6 py-2">
            <Link
              to="/"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-[#E6E2DC] hover:text-black active:bg-[#D9D5CF]"
            >
              Home
            </Link>
            <Link
              to="/search"
              className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-[#E6E2DC] hover:text-black active:bg-[#D9D5CF]"
            >
              Explore
            </Link>

            {userInfo && (
              <Link
                to="/inspiration"
                className="rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-[#E6E2DC] hover:text-black active:bg-[#D9D5CF]"
              >
                Inspiration
              </Link>
            )}
          </div>
        </div>

        {/* Right Section: Profile/Buttons */}
        <div className="absolute right-10 hidden items-center space-x-4 lg:inline">
          {userInfo && profile ? (
            <div className="relative flex items-center space-x-4">
              {/* Heart Icon with Badge */}
              {userInfo?.role === User_ROLES.audience && (
                <Link to={"/favorites"}>
                  <div className="relative">
                    <button className="relative flex items-center">
                      <HeartIcon className="h-6 w-6 text-gray-700 hover:text-red-600" />
                    </button>
                  </div>
                </Link>
              )}

              {/* Notifications Icon with Badge */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative flex items-center"
                >
                  {/* <BellIcon className="h-6 w-6 text-gray-700 hover:text-blue-600" /> */}
                  <img
                    src="/icons/bellicon.png"
                    className="h-16 w-16 text-gray-700"
                  />
                  {unreadCount > 0 && (
                    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <Notificationbar
                    isModalOpen={isNotificationsOpen}
                    setIsNotificationsOpen={setIsNotificationsOpen}
                  />
                )}
              </div>

              {/* Existing Manage/Logout Buttons */}
              <button
                className="rounded-full bg-gray-900 px-4 py-2 text-white transition-colors hover:bg-gray-900/90"
                onClick={handlePortfolioClick}
              >
                {profile.role === "Artist" || profile.role === "Admin"
                  ? "Portfolio"
                  : "Become a Creator"}
              </button>
              <NavbarDropdown handleLogout={handleLogout} />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="text-sm text-gray-700 transition-colors hover:text-black"
                onClick={handleSignupClick}
              >
                Sign Up
              </button>
              <Button
                title="Log In"
                onClick={handleLoginClick}
                className="rounded-full bg-black text-white transition-colors hover:bg-gray-900"
              />
            </div>
          )}
        </div>

        {/* Mobile Menu Button on Right */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="absolute right-1 top-0"
          >
            <img src="/icons/hamburger2.png" alt="Menu" className="h-16 w-16" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer and Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50"></div>
      )}
      <motion.div
        className="fixed inset-0 z-50 flex justify-end font-poppins"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={drawerVariants}
      >
        <motion.div
          className="relative h-full w-3/4 bg-white p-6 shadow-lg"
          variants={drawerVariants}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4"
          >
            <svg
              className="h-6 w-6 text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className="mt-16 flex flex-col items-center space-y-4">
            <Link
              to="/"
              className="flex max-h-[50px] w-full items-center justify-center rounded-md bg-gray-100 py-3 text-lg transition-all duration-300 hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <img src="/icons/home.png" className="h-16 w-16 flex-shrink-0" />
              Home
            </Link>
            <Link
              to="/search"
              className="flex max-h-[50px] w-full items-center justify-center gap-1 rounded-md bg-gray-100 py-3 text-lg transition-all duration-300 hover:bg-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="/icons/search.png"
                className="h-16 w-16 flex-shrink-0"
              />
              <span>Explore</span>
            </Link>

            {userInfo && (
              <>
                <Link
                  to="/inspiration"
                  className="flex max-h-[50px] w-full items-center justify-center rounded-md bg-gray-100 py-3 pl-4 text-lg transition-all duration-300 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src="/icons/artbranchicon.png"
                    className="h-12 w-12 flex-shrink-0"
                  />
                  Inspiration
                </Link>
                <Link
                  to="/notifications"
                  className="relative flex max-h-[50px] w-full items-center justify-center rounded-md bg-gray-100 py-3 pl-6 text-lg transition-all duration-300 hover:bg-gray-200"
                  onClick={() => setIsOpen(false)}
                >
                  <img
                    src="/icons/bellicon.png"
                    className="h-12 w-12 flex-shrink-0"
                  />
                  Notifications
                  {unreadCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <button
                  className="w-full rounded-md bg-gray-100 py-3 text-lg font-medium text-gray-700 transition-all duration-300 hover:bg-gray-200 hover:text-black"
                  onClick={() => {
                    setIsOpen(false);
                    handlePortfolioClick();
                  }}
                >
                  {profile.role === "Artist" || profile.role === "Admin"
                    ? "Portfolio"
                    : "Become a Creator"}
                </button>
              </>
            )}
          </div>

          {/* Profile and Logout */}
          {userInfo ? (
            <div className="absolute bottom-6 left-0 w-full px-6">
              <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
                <button
                  className="text-lg font-medium text-red-600 transition-colors hover:text-red-800"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="absolute bottom-6 left-0 w-full px-6 flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
                <button
                  className="text-lg font-medium text-blue-600 transition-colors hover:text-blue-800"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-gray-100 p-4">
                <button
                  className="text-lg font-medium text-green-600 transition-colors hover:text-green-800"
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </button>
              </div>
              
            </div>
          )}
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
