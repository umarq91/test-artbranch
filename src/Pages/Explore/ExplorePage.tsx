import WelcomeModal from "Components/modals/WelcomeModal";
import PageMeta from "Components/PageMeta";
import Skeleton from "react-loading-skeleton";
import PortfolioModal from "../../Components/modals/portfolioModal/PortfolioModal";
import CategorySelector from "./components/CategorySelector";
import ImageGrid from "./components/ImageGrid";
import useExplore from "./useExplore";

const ExplorePage = () => {
  const {
    posts,
    isLoading,
    isportfolioModalOpen,
    selectedCategory,
    handleCategoryChange,
    handleClosePortfolio,
    observerRef,
    selectedPortfolio,
    handleOpenPortfolio,
    hasNextPage,
    isFetchingNextPage,
  } = useExplore();

  // Messages for no images and limit reached
  const noImagesMessage = posts.length === 0 && !isLoading && (
    <div className="my-10 text-center text-gray-600">
      <h4 className="text-lg font-semibold">
        No images found in this category.
      </h4>
    </div>
  );

  const limitMessage = !hasNextPage && !isLoading && posts.length > 0 && (
    <div className="my-10 mt-20 text-center text-gray-600">
      <h4 className="text-lg font-semibold">You're all caught up for now.</h4>
    </div>
  );

  return (
    <div className="mx-auto min-h-screen max-w-7xl bg-gray-100 font-poppins">
      <WelcomeModal />

      <PageMeta
        title="Australia's Live Creative Feed – Real-Time Art & Inspiration"
        description="Discover real-time updates from Australian creatives. Explore raw, authentic, and algorithm-free content from artists across Australia."
      />

      <div className="rounded-lg bg-white px-4 py-10 md:px-10">
        <div className="py-20">
          <h4 className="text-center text-4xl font-extrabold text-gray-800">
            Australia’s Live Creative Feed
          </h4>

          <p className="mt-2 text-center text-xs text-gray-300">
            Explore real-time updates from all Aussie creatives. Real, raw and
            algorithm free
          </p>
        </div>

        {/* Categories - Bubble Buttons */}
        <CategorySelector
          handleCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />

        {/* Display Selected Category as Hashtag */}
        <div className="mb-10 text-center">
          <span className="text-3xl text-gray-500">
            {selectedCategory !== "All" && `#${selectedCategory}`}
          </span>
        </div>

        {/* No Images Message */}
        {noImagesMessage}

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {" "}
            <Skeleton height={400} count={6} />
            <Skeleton height={400} count={6} />{" "}
            <Skeleton height={400} count={6} />{" "}
          </div>
        ) : (
          <ImageGrid posts={posts} handleOpenPortfolio={handleOpenPortfolio} />
        )}

        {/* Limit Reached Message */}
        {limitMessage}

        <div ref={observerRef} className="mt-10 flex justify-center">
          {isFetchingNextPage && (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
            </div>
          )}
        </div>

        {isportfolioModalOpen && (
          <PortfolioModal
            isOpen={isportfolioModalOpen}
            onClose={handleClosePortfolio}
            portfolio={selectedPortfolio!}
            mode="search"
          />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
