import PortfolioModal from "Components/modals/portfolioModal/PortfolioModal";
import PageMeta from "Components/PageMeta";
import { AnimatePresence, motion } from "framer-motion"; // Import framer-motion for animations
import { useEffect } from "react";
import { FaChevronDown, FaChevronUp, FaInfoCircle } from "react-icons/fa";
import "react-loading-skeleton/dist/skeleton.css";
import AustraliaMap from "./components/AustrailianMap";
import RenderMap from "./components/RenderMap";
import SearchResults from "./components/SearchResults";
import useSearch from "./useSearch";

export const SearchPage = () => {
  const {
    searchQuery,
    loading,
    searchedProfiles,
    isModalOpen,
    setIsModalOpen,
    selectedState,
    suburb,
    postal,
    setSearchQuery,
    setSuburb,
    updateSearchParams,
    handleStateChange,
    searchType,
    searchedPortfolios,
    setSearchType,
    navigate,
    selectedPortfolio,
    handleClosePortfolio,
    searchInput,
    tab,
    handleTabChange,
    handleSearchChange,
    isFetchingNextResults,
    handleOpenPortfolio,
    smallScreenObserverRef,
    largeScreenObserverRef,
    hasNextPortfoliosPage,
    hasNextProfilesPage,
    isLargeScreen,
    isAdvancedSearchOpen,
    setIsAdvancedSearchOpen,
    handlePostalCode,
    postalError,
    selectedCategory,
    setSelectedCategory,
  } = useSearch();

  useEffect(() => {
    if (isLargeScreen) {
      setIsAdvancedSearchOpen(true);
    } else {
      setIsAdvancedSearchOpen(false);
    }
  }, []);

  const variants = {
    open: { opacity: 1, height: "auto", transition: { duration: 0.3 } },
    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="mx-auto mb-10 grid min-h-screen grid-cols-1 font-poppins sm:px-10 lg:grid-cols-[70%_30%]">
      <PageMeta
        title="Search for your favorite posts"
        description="Forgot your password? Reset it securely and regain access to your Artbranch account in just a few steps."
      />

      {/* Left Section (Search & Results) */}
      <div className="p-5 md:p-10 lg:col-span-1">
        <div className="flex flex-col gap-8 text-center">
          <h4 className="text-base font-semibold md:text-lg lg:text-2xl">
            Explore Artists and your favourite content
          </h4>

          {/* Search Input Section */}
          <div className="relative mt-4 w-full">
            <div className="flex w-full items-center rounded-lg border border-gray-300 bg-gray-100">
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchChange}
                placeholder={`Search for ${tab === "artist" ? "artists" : "daily_branch"}`}
                className="w-full rounded-l-lg bg-transparent px-4 py-5 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Search Results */}
        <div className="hidden lg:block">
          <SearchResults
            searchQuery={searchQuery}
            observerRef={largeScreenObserverRef}
            isFetchingNextResults={isFetchingNextResults}
            loading={loading}
            searchedPortfolios={searchedPortfolios}
            searchedProfiles={searchedProfiles}
            tab={tab}
            handleOpenPortfolio={handleOpenPortfolio}
            handleTabChange={handleTabChange}
            limitReached={!hasNextPortfoliosPage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Right Section (Filter) */}
      <div className="relative bg-gray-100 p-8 md:border-l lg:col-span-1">
        <h2 className="text-2xl font-bold">Filter Your Search</h2>
        <div className="mt-6 flex flex-col gap-5">
          {/* Advanced Search Button */}
          <button
            onClick={() => setIsAdvancedSearchOpen((prev) => !prev)}
            className="flex cursor-pointer items-center justify-between rounded-lg bg-gray-200 p-3"
          >
            <span className="font-syne">Advanced Search</span>
            {isAdvancedSearchOpen ? <FaChevronUp /> : <FaChevronDown />}
          </button>

          {/* Tooltip Section */}
          <div className="relative">
            <p className="my-3 flex items-center justify-between text-[10px] text-gray-600">
              <span>Choose any state on the map to filter your results!</span>
              <span className="group relative ml-1 cursor-pointer">
                <FaInfoCircle className="h-4 w-4 text-blue-600" />
              </span>
            </p>
          </div>

          {/* Animated collapsible section */}
          <AnimatePresence>
            {isAdvancedSearchOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={variants}
                className="mt-4 overflow-hidden"
              >
                <div>
                  <RenderMap selectedState={selectedState} />
                  <hr />
                  <AustraliaMap
                    selectedState={selectedState}
                    setSelectedState={handleStateChange}
                  />
                </div>

                <div>
                  <label className="mb-2 block">Suburb</label>
                  <input
                    type="text"
                    value={suburb}
                    onChange={(e) => setSuburb(e.target.value)}
                    placeholder="Enter suburb"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="my-2 block">Postal Code</label>
                  <input
                    type="text"
                    value={postal}
                    onChange={(e) => handlePostalCode(e.target.value)}
                    placeholder="Enter postal code"
                    className={`w-full rounded-lg border px-3 py-2 ${
                      postalError ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {postalError && (
                    <p className="mt-1 text-sm text-red-500">{postalError}</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Search Results */}
        <div className="lg:hidden">
          <SearchResults
            searchQuery={searchQuery}
            loading={loading}
            observerRef={smallScreenObserverRef}
            isFetchingNextResults={isFetchingNextResults}
            searchedPortfolios={searchedPortfolios}
            searchedProfiles={searchedProfiles}
            tab={tab}
            handleOpenPortfolio={handleOpenPortfolio}
            handleTabChange={handleTabChange}
            limitReached={!hasNextProfilesPage}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      {isModalOpen && (
        <PortfolioModal
          isOpen={isModalOpen}
          onClose={handleClosePortfolio}
          portfolio={selectedPortfolio}
          mode="search"
        />
      )}
    </div>
  );
};
