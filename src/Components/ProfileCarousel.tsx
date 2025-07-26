import { FaEdit } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

type ProfileCarouselProps = {
  cover_images?: string[];
  isOwnProfile?: boolean;
  onEditClick?: () => void;
};

export default function ProfileCarousel({
  cover_images = [],
  isOwnProfile = false,
  onEditClick,
}: ProfileCarouselProps) {
  const imagesToShow =
    cover_images?.length > 0
      ? cover_images
      : ["/images/default2.jpg", "/images/default.jpg"];

  const settings = {
    dots: true,
    infinite: imagesToShow.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: imagesToShow.length > 1,
    autoplaySpeed: 3000,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {imagesToShow?.map((image, index) => (
          <div
            key={index}
            className="relative h-[550px] w-full overflow-hidden rounded-[30px]"
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </Slider>

      {/* Show edit icon if this is the user's own profile */}
      {isOwnProfile && (
        <button
          onClick={onEditClick}
          className="absolute bottom-4 right-4 rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          <FaEdit className="text-xl" />
        </button>
      )}
    </div>
  );
}
