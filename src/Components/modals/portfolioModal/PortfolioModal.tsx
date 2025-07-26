import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import "react-loading-skeleton/dist/skeleton.css";
import { PortfolioType } from "Types";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import { QRCodeModal } from "../QRCodeModal";
import ShareModal from "../shareModal";
import ArtistHeader from "./components/ArtistHeader";
import LikesAndComments from "./components/LikeAndComments";
import MoreProjects from "./components/MoreProjects";
import PortfolioMainContent from "./components/PortfolioContent";
import { usePortfolioModal } from "./usePortfolioModal";

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioType;
  mode?: string;
  params?: any;
}

const PortfolioModal = ({
  isOpen,
  onClose,
  portfolio,
  mode,
  params,
}: PortfolioModalProps) => {
  const {
    currentOpenMedia,
    isDeleteModalOpen,
    setDeleteModalOpen,
    isShareModalOpen,
    setIsShareModalOpen,
    isQrModalOpen,
    setIsQrModalOpen,
    portfolioData,
    artistInfo,
    handleAddToDailyBranch,
    nextImage,
    prevImage,
    artistLoading,
    handleChangePortfolio,
    portfolioLoadingState,
    deletePortfolio,
    canPostDailyBranch,
    navigate,
    isOwner,
    userInfo,
    setCurrentOpenMedia,
    notFound,
    modalContentRef,
  } = usePortfolioModal({ portfolio, params, onClose });

  if (notFound) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="no-scrollbar h-[95vh] w-full transform overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out"
          style={{ marginTop: "10vh" }}
        >
          <div className="mx-auto h-full max-w-5xl">
            <div className="relative flex h-full flex-col">
              <button
                onClick={onClose}
                className="absolute right-1 top-4 text-gray-500 transition-colors duration-200 hover:text-gray-700 xl:-right-24"
                aria-label="Close modal"
              >
                <FiX size={24} />
              </button>
              <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 120,
                  }}
                  className="mb-4"
                >
                  {/* Animated Icon or SVG */}
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
                <button
                  onClick={onClose}
                  className="mt-6 rounded-md bg-red-500 px-6 py-3 text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-poppins">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.1 }}
        ref={modalContentRef}
        className="no-scrollbar h-[95vh] w-full transform overflow-hidden overflow-y-auto rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out"
        style={{ marginTop: "10vh" }}
      >
        <div className="mx-auto max-w-5xl">
          <div ref={modalContentRef} className="relative flex h-full flex-col">
            <button
              onClick={onClose}
              className="sticky right-1 top-0 z-50 m-4 self-end text-gray-500 transition-colors duration-200 hover:text-gray-700 xl:-right-24"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>

            {/* Header */}
            <ArtistHeader
              loading={artistLoading}
              artistInfo={artistInfo}
              portfolioData={portfolioData}
              userInfo={userInfo}
              isOwner={isOwner}
              canPostDailyBranch={canPostDailyBranch}
              handleAddToDailyBranch={handleAddToDailyBranch}
              setDeleteModalOpen={setDeleteModalOpen}
              navigate={navigate}
            />

            {/* Main Content */}
            <PortfolioMainContent
              loading={portfolioLoadingState && portfolioData}
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
              mode={mode}
              navigate={navigate}
              handleChangePortfolio={handleChangePortfolio}
            />

            {isDeleteModalOpen && (
              <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={deletePortfolio}
                itemTitle={portfolio.title}
              />
            )}
            {isShareModalOpen && (
              <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                postId={portfolio?.slug}
              />
            )}
            {isQrModalOpen && (
              <QRCodeModal
                isModalOpen={isQrModalOpen}
                setIsModalOpen={setIsQrModalOpen}
                url={`https://artbranch.com.au/post/${portfolio.slug}`}
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioModal;
