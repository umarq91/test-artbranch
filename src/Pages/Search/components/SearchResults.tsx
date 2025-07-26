import ImageGrid from "Pages/Explore/components/ImageGrid";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { PortfolioType, Post_Categories, UserProfileType } from "Types";
import ProfileCard from "./ArtistProfileSearchCard";
interface SearchProps {
  loading: boolean;
  tab: string;
  searchedProfiles: UserProfileType[];
  searchedPortfolios: PortfolioType[];
  handleOpenPortfolio: (portfolio: PortfolioType) => void;
  handleTabChange: (tab: string) => void;
  observerRef: any;
  isFetchingNextResults: boolean;
  limitReached: boolean;
  searchQuery: string;
  selectedCategory: string;
  setSelectedCategory: any;
}

function SearchResults({
  loading,
  tab,
  observerRef,
  searchedProfiles,
  searchedPortfolios,
  handleOpenPortfolio,
  handleTabChange,
  isFetchingNextResults,
  limitReached,
  searchQuery,
  selectedCategory,
  setSelectedCategory,
}: SearchProps) {
  const renderSkeletonCards = (count = 6) => {
    return Array(count)
      .fill(0)
      .map((_, idx) => (
        <div key={idx} className="p-4">
          <Skeleton height={350} />
          {tab === "artist" && (
            <>
              {/* profile and name skeleton */}
              <Skeleton height={20} width="60%" className="mt-2" />
              <Skeleton height={20} width="80%" className="mt-1" />
            </>
          )}
        </div>
      ));
  };

  return (
    <div>
      <div className="flex w-full justify-around gap-3 rounded-lg p-2">
        <button
          onClick={() => handleTabChange("artist")}
          className={`flex max-h-[70px] w-full items-center justify-center gap-2 rounded-lg border-2 py-3 text-center transition-all duration-300 ${
            tab === "artist"
              ? "border-[#93916e] bg-[#babaa0] font-semibold text-white"
              : "border border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <img
            src="/icons/artisticon.png"
            className={`h-12 w-12 transition-all duration-300 ${
              tab === "artist" ? "brightness-0 invert filter" : ""
            }`}
          />
          Artists
        </button>

        <button
          onClick={() => handleTabChange("daily_branch")}
          className={`flex max-h-[70px] w-full items-center justify-center gap-2 rounded-lg border-2 py-3 text-center transition-all duration-300 ${
            tab === "daily_branch"
              ? "border-[#93916e] bg-[#babaa0] font-semibold text-white hover:opacity-80"
              : "border border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <img
            src="/icons/artbranchicon.png"
            className={`h-14 w-14 transition-all duration-300 ${
              tab === "daily_branch" ? "brightness-0 invert filter" : ""
            }`}
          />
          Daily Branch
        </button>
      </div>

      {tab === "artist" && (
        <div className="mt-3 w-full">
          <label className="my-2 block font-medium text-gray-700">
            Art form
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">All</option>
            {Object.keys(Post_Categories).map((category) => (
              <option key={category} value={category}>
                {category.split("_").join(" ")}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-8">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {renderSkeletonCards()}
          </div>
        ) : (
          <div>
            {tab === "artist" ? (
              <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
                {searchedProfiles.map((profile) => (
                  <Link
                    key={profile.id}
                    to={`/portfolio/${profile?.id}`}
                    className="transition-transform duration-200 hover:scale-105"
                  >
                    <ProfileCard profile={profile} query={searchQuery} />
                  </Link>
                ))}
              </div>
            ) : (
              <ImageGrid
                posts={searchedPortfolios}
                handleOpenPortfolio={handleOpenPortfolio}
              />
            )}
          </div>
        )}
      </div>

      <div ref={observerRef} className="h-2" />
      {isFetchingNextResults && (
        <div className="mt-4 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        </div>
      )}

      {limitReached && (
        <div className="my-10 mt-20 text-center text-gray-600">
          <h4 className="text-lg font-semibold">
            You're all caught up for now.
          </h4>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
