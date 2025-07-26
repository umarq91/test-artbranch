import PortfolioModal from "Components/modals/portfolioModal/PortfolioModal";
import { QRCodeModal } from "Components/modals/QRCodeModal";
import PageMeta from "Components/PageMeta";
import ProfileCarousel from "Components/ProfileCarousel";
import UserNotFound from "Components/StatusMessages/UserNotFound";
import { useUserInfo } from "context/UserInfoContext";
import { PortfolioType, Post_Types, UserProfileType } from "Types";
import ArtistInfo from "./components/ArtistInfoSection";
import PortfolioSection from "./components/PortfolioSection";
import Tabsection from "./components/Tabsection";
import { useArtistPortfolio } from "./useArtistPortfolio";

const ArtistPortfolio = () => {
  const {
    handleOpenPortfolio,
    handleClosePortfolio,
    artistInfo,
    isModalOpen,
    setIsModalOpen,
    isQrModalOpen,
    setIsQrModalOpen,
    selectedItem,
    artistLoading,
    userNotFound,
    views,
    isFetchingNextPostsLoading,
    posts,
    observerRef,
    loading,
    tab,
    dailyBranchPortfolios,
    setTab,
    handleSendCollabRequest,
    requestCollabStatus,
  } = useArtistPortfolio();

  const { userInfo } = useUserInfo();
  const portfolios = tab === Post_Types.posts ? posts : dailyBranchPortfolios; // to prevent duplication since both tabs uses same template
  if (userNotFound) return <UserNotFound />;

  return (
    <>
      <PageMeta
        title={`${artistInfo?.username}'s Portfolio`}
        description="Explore artist portfolio to see latest projects,
         daily branch posts, and creative insights. Discover their journey and skills."
      />
      <div className="bg-primary-300 p-2 font-poppins lg:p-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Section */}
          <ArtistInfo
            loading={artistLoading}
            artistInfo={artistInfo as UserProfileType}
            views={views || 0}
            owner={false}
            handleSendCollabRequest={handleSendCollabRequest}
            requestCollabStatus={requestCollabStatus}
            setIsQrModalOpen={setIsQrModalOpen}
          />

          {/* Right Section */}
          <div className="relative">
            <ProfileCarousel cover_images={artistInfo?.images} />
          </div>
        </div>
      </div>

      <Tabsection
        tab={tab}
        setTab={setTab}
        owner={artistInfo?.id === userInfo?.id || !artistInfo}
      />

      <PortfolioSection
        handleOpenPortfolio={handleOpenPortfolio}
        portfoliosLoading={loading}
        portfolios={(portfolios as PortfolioType[]) || []}
        tab={tab}
        observerRef={observerRef}
        isFetchingNextPostsLoading={isFetchingNextPostsLoading}
      />

      {/* Portfolio Modal */}
      {isModalOpen && (
        <PortfolioModal
          portfolio={selectedItem as PortfolioType}
          isOpen={isModalOpen}
          onClose={handleClosePortfolio}
        />
      )}
      {isQrModalOpen && (
        <QRCodeModal
          url={`https://www.artbranch.com.au/portfolio/${artistInfo?.id}`}
          isModalOpen={isQrModalOpen}
          setIsModalOpen={setIsQrModalOpen}
        />
      )}
    </>
  );
};

export default ArtistPortfolio;
