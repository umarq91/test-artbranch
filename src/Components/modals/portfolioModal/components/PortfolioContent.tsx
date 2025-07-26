import ProtectedAction from "Components/actions/ProtectedAction";
import LoginModal from "Components/modals/LoginModal";
import { QRCodeButton } from "Components/modals/QRCodeModal";
import ShareButton from "Components/ShareButton";
import WishListToggle from "Components/wishlist/WishListToggle";
import { useUserInfo } from "context/UserInfoContext";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";

interface MainContentProps {
  loading: boolean;
  portfolioData: any;
  currentOpenMedia: number;
  prevImage: () => void;
  nextImage: () => void;
  setIsShareModalOpen: (isOpen: boolean) => void;
  setIsQrModalOpen: (isOpen: boolean) => void;
  setCurrentOpenMedia: (index: number) => void;
}

const MainContent = ({
  loading,
  portfolioData,
  currentOpenMedia,
  prevImage,
  nextImage,
  setIsShareModalOpen,
  setCurrentOpenMedia,
  setIsQrModalOpen,
}: MainContentProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { userInfo } = useUserInfo();
  const sliderRef = useRef<any>(null);

  const handleSlideChange = (index: number) => {
    setCurrentOpenMedia(index);
  };

  const handleBeforeSlideChange = (current: number, next: number) => {
    if (!userInfo && next !== current) {
      setShowLoginModal(true);
      if (sliderRef.current) {
        sliderRef.current.slickGoto(current);
      }
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleSlideChange,
    beforeChange: handleBeforeSlideChange,
    arrows: false,
    dots: true,
    initialSlide: currentOpenMedia,
    draggable: userInfo ? true : false,
  };

  const isMultipleImages = portfolioData?.media?.length > 1;

  return (
    <div className="custom-scrollbar my-8 flex-grow overflow-y-auto font-poppins">
      <div className="relative mx-auto my-10 h-auto w-[80%] rounded-3xl bg-gray-50 py-3">
        <h1 className="my-6 text-center font-syne text-xl font-semibold md:text-5xl md:tracking-wide">
          {portfolioData?.media[currentOpenMedia]?.media_name || ""}
        </h1>

        {loading ? (
          <Skeleton height="500px" width="100%" />
        ) : isMultipleImages ? (
          <Slider
            ref={sliderRef}
            {...settings}
            className="max-h-[90vh] overflow-hidden" // Constrain slider height
          >
            {portfolioData?.media.map((mediaItem: any, index: number) => (
              <div
                key={index}
                className="flex max-h-[90vh] items-center justify-center"
              >
                {mediaItem.type === "image" ? (
                  <img
                    src={mediaItem.media_url}
                    alt={`Image ${index + 1}`}
                    className="max-h-[90vh] w-auto rounded-3xl object-contain px-2 py-4 md:px-10 md:py-8" 
                  />
                ) : (
                  <video
                    src={mediaItem.media_url}
                    controls
                    className="max-h-[90vh] w-auto rounded-3xl object-contain px-2 py-4 md:px-10 md:py-8"
                  />
                )}
              </div>
            ))}
          </Slider>
        ) : portfolioData?.media[currentOpenMedia]?.type === "image" ? (
          <div className="flex max-h-[90vh] items-center justify-center">
            <img
              src={portfolioData?.media[currentOpenMedia]?.media_url}
              alt={`Image ${currentOpenMedia + 1}`}
              className="max-h-[90vh] w-auto rounded-3xl object-contain px-2 py-4 md:px-10 md:py-8" // Constrain image height
            />
          </div>
        ) : (
          <div className="flex max-h-[90vh] items-center justify-center">
            <video
              src={portfolioData?.media[currentOpenMedia]?.media_url}
              controls
              className="max-h-[90vh] w-auto rounded-3xl object-contain px-2 py-4 md:px-10 md:py-8" // Constrain video height
            />
          </div>
        )}

        {isMultipleImages && currentOpenMedia > 0 && (
          <button
            onClick={() => {
              prevImage();
              sliderRef.current?.slickPrev();
            }}
            className="absolute left-1 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition-all duration-200 hover:bg-opacity-75"
            aria-label="Previous media"
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        {isMultipleImages &&
          currentOpenMedia < portfolioData?.media.length - 1 && (
            <ProtectedAction>
              <button
                onClick={() => {
                  nextImage();
                  sliderRef.current?.slickNext();
                }}
                className="absolute right-1 top-1/2 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition-all duration-200 hover:bg-opacity-75"
                aria-label="Next media"
              >
                <FiChevronRight size={24} />
              </button>
            </ProtectedAction>
          )}

        <div className="absolute -top-[40px] right-0 flex transform gap-4 md:right-20 md:top-[30px] md:translate-x-[160px] md:translate-y-[-10px] md:flex-col">
          <ProtectedAction>
            <WishListToggle portfolio={portfolioData} />
          </ProtectedAction>
          <ShareButton setIsShareModalOpen={setIsShareModalOpen} />
          <QRCodeButton setIsModalOpen={setIsQrModalOpen} />
        </div>

        <p className="my-4 text-center">
          {portfolioData?.media[currentOpenMedia]?.media_desc}
        </p>
      </div>

      {/* Portfolio Details moved outside the gray wrapper */}
      <div className="mx-auto my-6 max-w-[80%]">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Skeleton width={200} height={20} />
            <Skeleton width={200} height={20} />
          </div>
        ) : (
          <>
            {portfolioData?.media[currentOpenMedia]?.custom_data &&
              portfolioData?.media[currentOpenMedia]?.custom_data.map(
                (item: any, index: number) => {
                  return (
                    <p key={index} className="flex justify-center">
                      <span className="mr-2 font-bold">{item.key}:</span>{" "}
                      {item.value}
                    </p>
                  );
                },
              )}
          </>
        )}
        <p className="text-md my-4 text-center text-gray-600 md:text-lg">
          {portfolioData?.description}
        </p>
      </div>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default MainContent;
