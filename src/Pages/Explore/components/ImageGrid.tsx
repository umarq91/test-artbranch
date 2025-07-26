import ProtectedAction from "Components/actions/ProtectedAction";
import { getPostThumbnail } from "helpers/helpers";
import { AiOutlineComment, AiOutlineEye } from "react-icons/ai";
import { FaImages } from "react-icons/fa";
import { PortfolioType } from "Types";
import LikePortfolio from "../../../Components/actions/LikePortfolio";

interface Props {
  posts: PortfolioType[];
  handleOpenPortfolio: (portfolio: PortfolioType) => void;
  setPosts?: (posts: PortfolioType[]) => void;
}

function ImageGrid({ posts, handleOpenPortfolio, setPosts }: Props) {
  return (
    <div className="grid min-h-screen w-full gap-10 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      {posts
        .filter((item) => item.media.length > 0) // any currupted posts with no media should not be displayed
        .map((portfolio: PortfolioType, index: number) => (
          <div
            key={index}
            className="group relative flex cursor-pointer flex-col gap-4"
          >
            <div
              className="relative w-full overflow-hidden rounded-lg"
              style={{ aspectRatio: "16 / 12" }}
            >
              {/* Album icon for multiple images */}
              {portfolio?.media?.length > 1 && (
                <div className="absolute left-2 top-2 z-10 flex items-center rounded-full bg-black bg-opacity-50 p-2 text-sm text-white">
                  <FaImages className="mr-1 text-lg" />
                  {portfolio?.media?.length}
                </div>
              )}

              <img
                onClick={() => handleOpenPortfolio(portfolio)}
                src={getPostThumbnail(portfolio?.media)}
                className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-75"
                alt={portfolio?.slug}
              />
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-xl text-gray-600">{portfolio?.title}</h3>
              <div className="flex items-center gap-3">
                <ProtectedAction>
                  <LikePortfolio
                    portfolio={portfolio}
                    slug={portfolio?.slug}
                    likes={portfolio?.like_count}
                    artistId={portfolio?.user}
                  />
                </ProtectedAction>
                <button
                  className="flex items-center text-gray-600 hover:text-blue-500"
                  onClick={() => handleOpenPortfolio(portfolio)} // Open modal on comment click
                >
                  <AiOutlineComment className="text-2xl" />
                </button>
                <span className="flex items-center text-gray-600">
                  <AiOutlineEye className="mr-1 text-2xl" />
                  {portfolio?.views || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ImageGrid;
