type Props = {
  handleTabChange: (tab: string) => void;
  selectedTab: string;
};

function TabSelect({ handleTabChange, selectedTab }: Props) {
  return (
    <div className="mb-10 flex flex-col justify-around gap-3 rounded-lg bg-gray-50 p-2 shadow-sm sm:flex-row">
      <button
        onClick={() => handleTabChange("Artists")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-center transition-all duration-300 sm:max-h-[50px] sm:flex-row sm:py-2 ${
          selectedTab === "Artists"
            ? "border-[#93916e] bg-[#babaa0] font-semibold text-white hover:opacity-80"
            : "border text-gray-600 hover:bg-gray-100 hover:opacity-90"
        }`}
      >
        <img
          src="/icons/artisticon.png"
          className={`h-10 w-10 transition-all duration-300 sm:h-12 sm:w-12 ${
            selectedTab === "Artists" ? "brightness-0 invert filter" : ""
          }`}
        />
        <span className="text-sm sm:text-base">Artists</span>
      </button>

      <button
        onClick={() => handleTabChange("Portfolios")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-center transition-all duration-300 sm:max-h-[50px] sm:flex-row sm:py-2 ${
          selectedTab === "Portfolios"
            ? "border-[#93916e] bg-[#babaa0] font-semibold text-white hover:opacity-80"
            : "border text-gray-600 hover:bg-gray-100"
        }`}
      >
        <img
          src="/icons/artbranchicon.png"
          className={`h-12 w-12 transition-all duration-300 sm:h-16 sm:w-16 ${
            selectedTab === "Portfolios" ? "brightness-0 invert filter" : ""
          }`}
        />
        <span className="text-sm sm:text-base">Daily Branch</span>
      </button>

      <button
        onClick={() => handleTabChange("saved")}
        className={`flex flex-1 items-center justify-center gap-2 rounded-lg border-2 px-3 py-2 text-center transition-all duration-300 sm:max-h-[50px] sm:flex-row sm:py-2 ${
          selectedTab === "saved"
            ? "border-[#93916e] bg-[#babaa0] font-semibold text-white hover:opacity-80"
            : "border text-gray-600 hover:bg-gray-100"
        }`}
      >
        <img
          src="/icons/saveicon.png"
          className={`h-12 w-12 transition-all duration-300 sm:h-14 sm:w-14 ${
            selectedTab === "saved" ? "brightness-0 invert filter" : ""
          }`}
        />
        <span className="text-sm sm:text-base">Saved Posts</span>
      </button>
    </div>
  );
}

export default TabSelect;
