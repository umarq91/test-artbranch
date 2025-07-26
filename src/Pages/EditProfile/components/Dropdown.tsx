import React from "react";
import { FaChevronDown } from "react-icons/fa";

interface DropdownProps {
  activeTab: string;
  showDropdown: boolean;
  setShowDropdown: (value: boolean) => void;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
  activeTab,
  showDropdown,
  setShowDropdown,
  setActiveTab,
  tabs,
}) => {
  return (
    <div className="relative md:hidden">
      <button
        className="flex items-center rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        <FaChevronDown className="ml-2" />
      </button>

      {showDropdown && (
        <div className="absolute mt-2 w-48 rounded-lg border border-gray-300 bg-white shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              onClick={() => {
                setActiveTab(tab);
                setShowDropdown(false);
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
