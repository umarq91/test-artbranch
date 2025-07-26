import FollowButton from "Components/follow-button";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
import { CanPostDailyBranchState, User_STATUS, UserProfileType } from "Types";

interface PortfolioData {
  title: string;
  slug: string;
  description?: string;
}

interface ArtistPortfolioHeaderProps {
  loading: boolean;
  artistInfo?: UserProfileType | null;
  portfolioData: PortfolioData;
  userInfo: UserProfileType | null;
  isOwner: boolean;
  canPostDailyBranch: CanPostDailyBranchState;
  handleAddToDailyBranch: () => void;
  setDeleteModalOpen: (open: boolean) => void;
  navigate: (path: string) => void;
}

const ArtistHeader: React.FC<ArtistPortfolioHeaderProps> = ({
  loading,
  artistInfo,
  portfolioData,
  userInfo,
  isOwner,
  canPostDailyBranch,
  handleAddToDailyBranch,
  setDeleteModalOpen,
  navigate,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const renderArtistInfo = () => {
    if (loading) {
      return (
        <>
          <Skeleton circle={true} height={80} width={80} />
          <div className="flex flex-col justify-center">
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={10} />
          </div>
        </>
      );
    }

    return (
      <>
        <img
          src={artistInfo?.profile}
          className="h-20 w-20 rounded-full object-cover"
          alt="Artist Profile"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-md font-syne font-bold md:text-lg">
            {portfolioData?.title || "Untitled"}
          </h1>
          <Link to={`/portfolio/${artistInfo?.id}`}>
            <p className="text-[8px] text-gray-500 md:text-sm">
              @{artistInfo?.username}{" "}
              {artistInfo?.is_verified && (
                <FaCheckCircle
                  className="inline-block h-3 w-3 text-blue-500"
                  title="Verified"
                />
              )}
            </p>
          </Link>
        </div>
      </>
    );
  };

  const renderActions = () => {
    if (loading) {
      return (
        <>
          <Skeleton circle={true} height={30} width={30} />
          <Skeleton circle={true} height={30} width={30} />
        </>
      );
    }

    if (isOwner) {
      return (
        <div className="flex gap-3">
          {canPostDailyBranch.canPost &&
            userInfo?.status === User_STATUS.ACTIVE && (
              <button
                onClick={handleAddToDailyBranch}
                className="flex items-center justify-center gap-1 rounded-full bg-[#c8ffdb] p-2 px-3 transition-all duration-200 hover:bg-opacity-75"
                aria-label="Add to daily branch"
                disabled={canPostDailyBranch.loading}
              >
                <FiPlus size={18} className="text-green-500" />
                {canPostDailyBranch.loading ? "Adding..." : "Daily branch"}
              </button>
            )}
          <button
            className="flex items-center justify-center rounded-full bg-black p-2 transition-all duration-200 hover:bg-opacity-75"
            aria-label="Edit portfolio"
            onClick={() => navigate(`/edit-portfolio/${portfolioData?.slug}`)}
          >
            <FiEdit size={20} className="text-white" />
          </button>
          <button
            onClick={() => setDeleteModalOpen(true)}
            className="flex items-center justify-center rounded-full bg-[#FFDCDC] p-2 transition-all duration-200 hover:bg-opacity-75"
            aria-label="Delete portfolio"
          >
            <FiTrash2 size={20} className="text-red-600" />
          </button>
        </div>
      );
    }

    return <FollowButton artistId={artistInfo?.id!} />;
  };

  return (
    <div className="my-6 flex flex-col justify-between gap-4 px-6 md:flex-row">
      {/* Artist Info Section */}
      <div className="flex gap-8">{renderArtistInfo()}</div>

      {/* Action Buttons Section */}
      <div className="flex items-center justify-center">{renderActions()}</div>
    </div>
  );
};

export default ArtistHeader;
