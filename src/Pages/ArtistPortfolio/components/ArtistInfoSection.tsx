import ProtectedAction from "Components/actions/ProtectedAction";
import FollowButton from "Components/follow-button";
import CollaboratorsModal from "Components/modals/CollaboratosModal";
import { QRCodeButton } from "Components/modals/QRCodeModal";
import { useUserInfo } from "context/UserInfoContext";
import { useState } from "react"; // Import useState for managing modal state
import { FaCheckCircle } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import { UserProfileType } from "Types";
import { formatCompactNumber, formatPlural } from "utils/helpers";
import CollaborateButton from "./CollaborateButton";
import SocialIcons from "./Socials";

type Props = {
  loading: boolean;
  artistInfo: UserProfileType;
  views: number;
  owner: boolean;
  handleSendCollabRequest?: (reciverId: string, note?: string) => Promise<any>;
  requestCollabStatus?: "pending" | "accepted" | "not available";
  setIsQrModalOpen: (isOpen: boolean) => void;
};

function ArtistInfo({
  loading,
  artistInfo,
  views,
  owner,
  handleSendCollabRequest,
  requestCollabStatus,
  setIsQrModalOpen,
}: Props) {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [collaboratosModal, setCollaboratorsModal] = useState(false);
  const { userInfo } = useUserInfo();

  const toggleModal = () => setModalOpen(!isModalOpen);

  const sendRequest = async (note?: string) => {
    if (!handleSendCollabRequest) {
      console.error("Collaboration request handler is not defined.");
      return;
    }

    if (artistInfo) {
      try {
        await handleSendCollabRequest(artistInfo.id, note);
      } catch (err) {
        console.error("Failed to send collaboration request:", err);
      }
    }
  };

  const toggleCollaboratorsModal = () => {
    setCollaboratorsModal(true);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Artist Image and Name */}
      <div className="flex flex-col items-center space-y-6 md:items-start">
        {loading ? (
          <>
            <Skeleton circle height={176} width={176} />
            <Skeleton height={30} width={200} />
            <Skeleton height={24} width={100} />
          </>
        ) : (
          <>
            {/* Profile Picture with click event to open modal */}
            <img
              src={artistInfo?.profile}
              alt={artistInfo?.username}
              className="h-44 w-44 cursor-pointer rounded-full object-cover"
              onClick={toggleModal}
            />

            {/* Conditional rendering based on ownership and show_name */}
            {owner || artistInfo?.show_name ? (
              <>
                <h1 className="text-center text-2xl font-bold leading-tight text-secondary-200 sm:text-left md:text-[64px]">
                  {artistInfo?.full_name}
                  {artistInfo?.is_verified && (
                    <FaCheckCircle
                      className="ml-2 inline-block h-7 w-7 text-blue-500"
                      title="Verified"
                    />
                  )}
                </h1>
                <p>@{artistInfo?.username}</p>
              </>
            ) : (
              <h1 className="text-center text-2xl font-bold leading-tight text-secondary-200 sm:text-left md:text-[64px]">
                <span className="text-lg"> @</span> {artistInfo?.username}
              </h1>
            )}
            <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
              {artistInfo?.categories &&
                artistInfo?.categories.map((category, idx) => (
                  <span
                    key={idx}
                    className="cursor-auto rounded-full bg-primary-200 px-5 py-2 text-[10px] font-bold text-secondary-200"
                  >
                    {category}
                  </span>
                ))}
            </div>
          </>
        )}
      </div>

      {/* Modal for showing large profile image */}
      {isModalOpen && (
        <div className="fixed inset-0 -top-10 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="relative">
            <img
              src={artistInfo?.profile}
              alt="Large profile"
              className="max-h-[80vh] max-w-[90vw] rounded-lg object-cover"
            />
            <button
              onClick={toggleModal}
              className="absolute right-3 top-3 text-3xl font-bold text-white"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Artist Stats */}
      <div className="space-y-8">
        <div className="flex max-w-[1000px] flex-col flex-wrap items-center justify-center space-y-4 text-xs font-semibold text-black/80 md:flex-row md:justify-start md:space-x-6 md:space-y-0">
          {loading ? (
            <>
              <Skeleton width={100} />
              <Skeleton width={120} />
              <Skeleton width={130} />
            </>
          ) : (
            <>
              <span>{artistInfo?.suburb || "suburb"}</span>
              <span>
                {formatCompactNumber(views)}{" "}
                {formatPlural(views || 0, "Project view")}
              </span>
              <span>
                {formatCompactNumber(artistInfo?.followers || 0)}{" "}
                {formatPlural(artistInfo?.followers || 0, "subscriber")}
              </span>
              <button onClick={toggleCollaboratorsModal}>
                {formatCompactNumber(artistInfo?.collaborators || 0)}{" "}
                {formatPlural(artistInfo?.collaborators || 0, "collaborator")}
              </button>
            </>
          )}
        </div>
        <div>
          <p className="text-primary-100">{artistInfo?.bio}</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 text-secondary-100 md:justify-start">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} circle height={30} width={30} />
          ))
        ) : (
          <SocialIcons userInfo={artistInfo!} />
        )}
      </div>

      {/* Action Buttons */}
      {owner ? (
        <div className="flex flex-col items-center space-y-4 sm:space-x-6 sm:space-y-0 md:flex-row">
          <button
            className="rounded-full bg-secondary-100 px-16 py-3 text-[14px] text-primary-200 hover:bg-secondary-200"
            onClick={() => navigate("/edit/profile")}
          >
            Edit Profile
          </button>
          <QRCodeButton setIsModalOpen={setIsQrModalOpen} />
        </div>
      ) : (
        <div className="flex flex-col items-center sm:flex-row sm:space-x-6">
          {loading ? (
            <Skeleton height={40} width={120} />
          ) : (
            <>
              <ProtectedAction>
                <FollowButton artistId={artistInfo?.id!} />
              </ProtectedAction>
              {artistInfo?.role === "Artist" && userInfo?.role === "Artist" && (
                <CollaborateButton
                  sendRequest={sendRequest}
                  requestCollabStatus={requestCollabStatus!}
                />
              )}
              <QRCodeButton setIsModalOpen={setIsQrModalOpen} />
            </>
          )}
        </div>
      )}
      <CollaboratorsModal
        userId={artistInfo?.id}
        isOpen={collaboratosModal}
        onClose={() => setCollaboratorsModal(false)}
      />
    </div>
  );
}

export default ArtistInfo;
