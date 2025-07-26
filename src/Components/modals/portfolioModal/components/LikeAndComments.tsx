import CommentsPortfolio from "Components/actions/CommentsPortfolio";
import LikePortfolio from "Components/actions/LikePortfolio";
import ProtectedAction from "Components/actions/ProtectedAction";
import { FaCommentAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatCompactNumber } from "utils/helpers";

interface LikesAndCommentsProps {
  portfolioData: any;
  loading?: boolean;
}

const LikesAndComments = ({
  portfolioData,
  loading,
}: LikesAndCommentsProps) => (
  <div className="rounded-lg bg-gray-50 p-6">
    {loading ? (
      // Skeleton for the entire Likes and Comments section
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton width={100} height={24} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton width={100} height={20} />
          </div>
        </div>
        <div>
          <Skeleton height={100} />
        </div>
      </div>
    ) : (
      // Actual content when data is loaded
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <ProtectedAction>
            <div className="flex items-center gap-2">
              <LikePortfolio
                likes={portfolioData?.like_count}
                portfolio={portfolioData}
                slug={portfolioData?.slug}
                artistId={portfolioData?.user}
                key={portfolioData?.id}
              />
            </div>
          </ProtectedAction>
          <div className="flex items-center gap-2">
            <FaCommentAlt size={18} className="text-gray-600" />
            <span className="text-sm font-medium">
              {formatCompactNumber(portfolioData?.comment_count || 0)} Comments
            </span>
          </div>
        </div>
        <CommentsPortfolio portfolio={portfolioData} />
      </div>
    )}
  </div>
);

export default LikesAndComments;
