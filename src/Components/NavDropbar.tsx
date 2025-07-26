import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";
import { useUserInfo } from "context/UserInfoContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface NavbarDropdownProps {
  handleLogout: () => void;
}

export default function NavbarDropdown({ handleLogout }: NavbarDropdownProps) {
  const { userInfo } = useUserInfo();
  return (
    <Menu as="div" className="relative inline-block py-4 text-left">
      <div>
        {/* Menu button with an image */}
        <MenuButton className="inline-flex justify-center rounded-full">
          <img
            src={userInfo?.profile}
            alt="Profile"
            className="h-10 w-10 rounded-full object-cover"
          />
        </MenuButton>
      </div>

      <MenuItems
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white py-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div className="py-2">
          <MenuItem>
            {({ active }) => (
              <Link
                to="/edit/profile"
                className={`flex items-center px-4 py-3 text-sm ${
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                }`}
              >
                <UserIcon className="mr-2 h-5 w-5" />{" "}
                {/* Account settings icon */}
                Account settings
              </Link>
            )}
          </MenuItem>

          <form>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  type="button"
                  className={`flex w-full items-center px-4 py-2 text-left text-sm ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  }`}
                >
                  <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5" />{" "}
                  {/* Sign out icon */}
                  Sign out
                </button>
              )}
            </MenuItem>
          </form>
        </div>
      </MenuItems>
    </Menu>
  );
}
