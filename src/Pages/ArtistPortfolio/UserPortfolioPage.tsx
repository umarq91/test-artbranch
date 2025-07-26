import PortfolioModal from "Components/modals/portfolioModal/PortfolioModal";
import { QRCodeModal } from "Components/modals/QRCodeModal";
import PageMeta from "Components/PageMeta";
import ProfileCarousel from "Components/ProfileCarousel";
import Wishlists from "Components/Wishlists";
import { useUserInfo } from "context/UserInfoContext";
import { PortfolioType, UserProfileType } from "Types";
import ArtistInfo from "./components/ArtistInfoSection";
import PortfolioSection from "./components/PortfolioSection";
import Tabsection from "./components/Tabsection";
import { useArtistPortfolio } from "./useArtistPortfolio";

const UserPortfolioPage = () => {
  const {
    isModalOpen,
    selectedItem,
    views,
    artistLoading,
    handleClosePortfolio,
    handleOpenPortfolio,
    loading,
    posts,
    artistInfo,
    tab,
    navigate,
    observerRef,
    setTab,
    dailyBranchPortfolios,
    isFetchingNextPostsLoading,
    refetchPortfolios,
    isQrModalOpen,
    setIsQrModalOpen,
  } = useArtistPortfolio();

  const portfolios = tab == "posts" ? posts : dailyBranchPortfolios; // this is for dynamic post mapping , instead of conditionally render and to prevent duplication
  const { userInfo } = useUserInfo();

  return (
    <>
      <div className="max-w-[100vw] overflow-hidden bg-primary-300 p-2 font-poppins lg:p-10">
        <PageMeta
          title="My Portfolio"
          description="Explore my portfolio to see my latest projects,
         daily branch posts, and creative insights. Discover my journey, skills, and the stories behind my work. Stay updated with my daily updates and connect with me for collaborations!"
        />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left Section */}
          <ArtistInfo
            loading={artistLoading}
            artistInfo={userInfo as UserProfileType}
            views={views || 0}
            owner={true}
            setIsQrModalOpen={setIsQrModalOpen}
          />
          {/* Right Section */}
          <div className="relative">
            <ProfileCarousel
              cover_images={userInfo?.images}
              isOwnProfile={true}
              onEditClick={() => navigate("/edit/profile")}
            />
          </div>
        </div>

        <Tabsection
          tab={tab}
          setTab={setTab}
          owner={artistInfo?.id === userInfo?.id || !artistInfo}
        />
        {/* Add Portfolio Button - Positioned on the right */}
        <div className="mt-4 flex justify-start">
          <button
            onClick={() => navigate("/upload-image")}
            className="flex max-h-[50px] items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-lg font-medium text-gray-800 shadow-sm transition-colors duration-300 hover:scale-105 hover:bg-[#babaa0] hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            {/* <PlusIcon className="mr-2 h-5 w-5" /> */}
            <img src="/icons/upload.png" className="h-16 w-16" />
            Upload
          </button>
        </div>
      </div>

      {tab === "posts" || tab === "daily_branch" ? (
        <PortfolioSection
          handleOpenPortfolio={handleOpenPortfolio}
          portfolios={(portfolios as PortfolioType[]) || []}
          portfoliosLoading={loading}
          tab={tab}
          observerRef={observerRef}
          isFetchingNextPostsLoading={isFetchingNextPostsLoading}
        />
      ) : (
        <Wishlists />
      )}

      {/* Portfolio Modal */}
      {isModalOpen && (
        <PortfolioModal
          portfolio={selectedItem!}
          isOpen={isModalOpen}
          onClose={handleClosePortfolio}
        />
      )}

      {isQrModalOpen && (
        <QRCodeModal
          url={`https://www.artbranch.com.au/portfolio/${userInfo?.id}`}
          isModalOpen={isQrModalOpen}
          setIsModalOpen={setIsQrModalOpen}
        />
      )}
    </>
  );
};

export default UserPortfolioPage;
