import PageMeta from "Components/PageMeta";
import DeleteConfirmationModal from "Components/modals/DeleteConfirmationModal";
import { QRCodeModal } from "Components/modals/QRCodeModal";
import ArtistHeader from "Components/modals/portfolioModal/components/ArtistHeader";
import LikesAndComments from "Components/modals/portfolioModal/components/LikeAndComments";
import MoreProjects from "Components/modals/portfolioModal/components/MoreProjects";
import MainContent from "Components/modals/portfolioModal/components/PortfolioContent";
import ShareModal from "Components/modals/shareModal";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSinglePost } from "./useSinglePost";

const SinglePost = () => {
  const {
    currentOpenMedia,
    isDeleteModalOpen,
    setDeleteModalOpen,
    isShareModalOpen,
    setIsShareModalOpen,
    isQrModalOpen,
    setIsQrModalOpen,
    deleting,
    canPostDailyBranch,
    portfolioData,
    artistInfo,
    deletePortfolio,
    handleAddToDailyBranch,
    nextImage,
    prevImage,
    artistLoading,
    portfolioLoadingState,
    navigate,
    userInfo,
    isOwner,
    setCurrentOpenMedia,
    notFound,
    handleChangePortfolio,
    ContentRef,
  } = useSinglePost();

  if (notFound) {
    return (
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="no-scrollbar flex min-h-screen w-full transform items-center justify-center overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out"
      >
        <div className="mx-auto h-full max-w-5xl">
          <div className="relative flex h-full flex-col">
            <div className="flex h-full flex-col items-center justify-center p-6 text-center">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                className="mb-4"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <FiX size={48} className="text-red-500" />
                </motion.div>
              </motion.div>
              <h1 className="text-4xl font-bold text-gray-800">
                Portfolio Not Found
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                It seems the portfolio you’re looking for doesn’t exist or has
                been removed.
              </p>
              <Link to={"/"}>
                <button className="mt-6 rounded-md bg-red-500 px-6 py-3 text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2">
                  Close
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.1 }}
      ref={ContentRef}
      className="no-scrollbar w-full transform overflow-hidden overflow-y-auto rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out"
    >
      <PageMeta title="Portfolio Post" description="A Single portfolio post" />

      <div className="mx-auto max-w-5xl">
        <div className="relative flex h-full flex-col">
          <ArtistHeader
            loading={artistLoading || portfolioLoadingState}
            artistInfo={artistInfo}
            portfolioData={portfolioData}
            userInfo={userInfo}
            isOwner={isOwner}
            canPostDailyBranch={canPostDailyBranch}
            handleAddToDailyBranch={handleAddToDailyBranch}
            setDeleteModalOpen={() => {}}
            navigate={navigate}
          />
          <p className="text-sm text-gray-600 md:ml-10">
            {portfolioData?.description || ""}
          </p>
          <MainContent
            loading={portfolioLoadingState}
            portfolioData={portfolioData}
            currentOpenMedia={currentOpenMedia}
            setCurrentOpenMedia={setCurrentOpenMedia}
            nextImage={nextImage}
            prevImage={prevImage}
            setIsShareModalOpen={setIsShareModalOpen}
            setIsQrModalOpen={setIsQrModalOpen}
          />
          <hr className="my-4 border-t border-gray-300" />
          <LikesAndComments
            portfolioData={portfolioData}
            loading={artistLoading || portfolioLoadingState}
          />

          <MoreProjects
            portfolioData={portfolioData}
            artistInfo={artistInfo}
            navigate={navigate}
            handleChangePortfolio={handleChangePortfolio}
          />

          {isDeleteModalOpen && (
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              onConfirm={deletePortfolio}
              itemTitle={portfolioData.title}
            />
          )}
          {isShareModalOpen && (
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              postId={portfolioData.slug}
            />
          )}
          {isQrModalOpen && (
            <QRCodeModal
              isModalOpen={isQrModalOpen}
              setIsModalOpen={setIsQrModalOpen}
              url={`https://artbranch.com.au/post/${portfolioData.slug}`}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SinglePost;
