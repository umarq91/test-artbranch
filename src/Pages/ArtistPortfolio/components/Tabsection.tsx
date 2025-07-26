import React, { SetStateAction } from "react";
import { FaListAlt } from "react-icons/fa";
import { Post_Types } from "Types";

// Props Type Definition
type Props = {
  tab: string;
  setTab: React.Dispatch<SetStateAction<Post_Types>>;
  owner: boolean;
};

function Tabsection({ tab, setTab, owner }: Props) {
  const getTabName = () => {
    switch (tab) {
      case Post_Types.posts:
        return "Posts";
      case Post_Types.daily_branch:
        return "Daily Branch";
      case Post_Types.saved:
        return "Saved";
      default:
        return "";
    }
  };

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-center text-lg font-semibold text-gray-700 sm:hidden">
        {getTabName()}
      </h2>
      <div className="flex flex-wrap justify-around gap-3 rounded-lg p-2 sm:flex-nowrap">
        <button
          onClick={() => setTab(Post_Types.posts)}
          className={`relative flex max-h-[60px] flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-center transition-all duration-300 sm:flex-auto sm:px-6 sm:py-4 md:px-8 lg:px-10 ${
            tab === Post_Types.posts
              ? "border-[#93916e] bg-[#babaa0] font-semibold text-white"
              : "border text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FaListAlt
            className={`h-5 w-5 transition-all duration-300 ${
              tab === Post_Types.posts ? "brightness-0 invert filter" : ""
            }`}
          />
          <span className="hidden text-sm sm:inline md:text-base lg:text-lg">
            Posts
          </span>
        </button>

        <button
          onClick={() => setTab(Post_Types.daily_branch)}
          className={`relative flex max-h-[60px] flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-center transition-all duration-300 sm:flex-auto sm:px-6 sm:py-4 md:px-8 lg:px-10 ${
            tab === Post_Types.daily_branch
              ? "border-[#93916e] bg-[#babaa0] font-semibold text-white"
              : "border text-gray-600 hover:bg-gray-100"
          }`}
        >
          <img
            src="/leaf.png"
            className={`h-14 w-14 transition-all duration-300 ${
              tab === Post_Types.daily_branch
                ? "brightness-0 invert filter"
                : ""
            }`}
          />
          <span className="hidden text-sm sm:inline md:text-base lg:text-lg">
            Daily Branch
          </span>
        </button>

        {owner && (
          <button
            onClick={() => setTab(Post_Types.saved)}
            className={`relative flex max-h-[60px] flex-1 items-center justify-center gap-2 rounded-lg border-2 py-3 text-center transition-all duration-300 sm:flex-auto sm:px-6 sm:py-4 md:px-8 lg:px-10 ${
              tab === Post_Types.saved
                ? "border-[#93916e] bg-[#babaa0] font-semibold text-white"
                : "border text-gray-600 hover:bg-gray-100"
            }`}
          >
            <img
              src="/icons/saveicon.png"
              className={`h-16 w-16 transition-all duration-300 ${
                tab === Post_Types.saved ? "brightness-0 invert filter" : ""
              }`}
            />
            <span className="hidden text-sm sm:inline md:text-base lg:text-lg">
              Saved
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Tabsection;
