import AnimatedUsers from "Components/animtedUserCard";
import PageMeta from "Components/PageMeta";
import Wishlists from "Components/Wishlists";
import ImageGrid from "Pages/Explore/components/ImageGrid";
import PortfolioModal from "../../Components/modals/portfolioModal/PortfolioModal";
import ArtistsResut from "./components/ArtistsResut";
import TabSelect from "./components/TabSelect";
import useInspiration from "./useInspiration";

const InspirationPage = () => {
  const {
    posts,
    artists,
    loading,
    selectedTab,
    handleTabChange,
    isportfolioModalOpen,
    observerRef,
    setIsPortfolioModalOpen,
    setSelectedPortfolio,
    selectedPortfolio,
    handleOpenPortfolio,
    handleClosePortfolio,
    randomUsers = [],
  } = useInspiration();

  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      <PageMeta
        title="People You Follow – Stay Updated with Creators You Love"
        description="Explore the latest posts from the people you follow. Stay connected with your favorite artists and discover their newest creations on Artbranch."
      />

      <div className="mx-auto max-w-5xl rounded-lg bg-white px-4 py-10 shadow-md md:px-10">
        {/* Page Heading */}
        <h4 className="text-center text-4xl font-extrabold text-gray-800">
          Your Inspiration Hub – Curate, Collect, Connect.
        </h4>
        <p className="mb-10 mt-2 text-center text-xs text-gray-300">
          Explore your saved favourites, revisit daily branch posts, and stay
          connected with the artists who inspire you. Your personalised space
          for creativity, all in one place.
        </p>

        {/* Tab Selection: Artists or Portfolios */}
        <TabSelect
          handleTabChange={handleTabChange}
          selectedTab={selectedTab}
        />

        {/* Display Artists or Portfolios based on selectedTab */}
        {selectedTab === "Portfolios" ? (
          <ImageGrid handleOpenPortfolio={handleOpenPortfolio} posts={posts} />
        ) : (
          <ArtistsResut artists={artists} />
        )}
        {selectedTab === "saved" && <Wishlists />}

        {/* Infinite Scroll Loader */}
        <div ref={observerRef} className="mt-10 flex justify-center">
          {loading && (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-blue-500"></div>
            </div>
          )}
        </div>

        {/* Suggested Profiles Section */}
        {randomUsers.length > 0 && (
          <div className="mt-16">
            <h3 className="mb-4 text-2xl font-semibold text-gray-700">
              Suggested Profiles
            </h3>
            <AnimatedUsers users={randomUsers} />
          </div>
        )}

        {/* Portfolio Modal */}
        {isportfolioModalOpen && selectedPortfolio && (
          <PortfolioModal
            isOpen={isportfolioModalOpen}
            onClose={handleClosePortfolio}
            portfolio={selectedPortfolio}
            mode="search"
          />
        )}
      </div>
    </div>
  );
};

export default InspirationPage;
