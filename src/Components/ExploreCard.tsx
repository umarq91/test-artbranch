import { getPostThumbnail } from "helpers/helpers";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { FaImages } from "react-icons/fa"; // Import the album icon
import { PortfolioType } from "Types";
import { formatCompactNumber } from "utils/helpers";

const ExploreCard = ({ item }: { item: PortfolioType }) => {
  return (
    <div className="flex justify-center font-poppins">
      <div
        key={item.id}
        className="relative h-[330px] w-full max-w-[350px] transform cursor-pointer overflow-hidden rounded-lg shadow-sm transition duration-300 ease-in-out hover:shadow-xl md:h-[340px] md:w-[382px]"
      >
        {/* Image Section */}
        <div className="relative h-[265px] w-full md:h-[285px]">
          <div className="transform-origin-center h-full overflow-hidden transition-transform hover:scale-105">
            <img
              src={
                // item?.media[item.thumbnail_index || 0]?.media_url ||
                // "https://media.istockphoto.com/id/1147544806/vector/no-thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=Ni8CpW8dNAV0NrS6Odo5csGcWUySFydNki9FYi1XHYo="
                getPostThumbnail(item?.media)
              }
              alt={item?.media[0]?.media_name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Album Icon */}
          {item?.media?.length > 1 && (
            <div className="absolute left-2 top-2 z-10 flex items-center rounded-full bg-black bg-opacity-50 p-2 text-sm text-white">
              <FaImages className="mr-1 text-lg" />
              {item?.media?.length}
            </div>
          )}
        </div>

        {/* Title, Like, and Comment Section */}
        <div className="mt-4 flex h-[45px] w-full flex-col justify-between px-4">
          <div className="flex items-start justify-between">
            {/* Title */}
            <div className="flex items-center justify-start gap-2">
              <span className="line-clamp-2 text-[16px] font-medium leading-[20px] text-gray-900">
                {item?.title}
              </span>
            </div>

            {/* Likes and Comments */}
            <div className="flex items-center gap-4">
              {/* Likes */}
              <div className="flex items-center gap-1">
                <AiOutlineHeart className="text-black" />
                <span className="text-[14px] font-medium text-gray-700">
                  {formatCompactNumber(item?.like_count || 0)}
                </span>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-1">
                <AiOutlineComment className="text-black" />
                <span className="text-[14px] font-medium text-gray-700">
                  {formatCompactNumber(item?.comment_count || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreCard;
