import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "context/UserInfoContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { followArtist, isFollowing, unfollowArtist } from "utils/api/followApi";
import Button from "./Button";

interface FollowProps {
  artistId: string;
}

function FollowButton({ artistId }: FollowProps) {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [note, setNote] = useState("");
  const queryClient = useQueryClient();
  const { userInfo } = useUserInfo();
  const userId: string = userInfo?.id as string;

  const { data: isFollowingArtist = false } = useQuery({
    queryKey: ["isFollowing", artistId],
    queryFn: () => isFollowing(userId, artistId),
    enabled: !!userInfo && !!artistId,
  });

  const updateCache = (isFollowing: boolean, followersDelta: number) => {
    queryClient.setQueryData(["isFollowing", artistId], isFollowing);
    queryClient.setQueryData(["artist-info", artistId], (oldData: any) => {
      return {
        ...oldData,
        followers: oldData?.followers + followersDelta,
      };
    });
  };

  const toggleFollowMutation = useMutation({
    mutationFn: () =>
      isFollowingArtist
        ? unfollowArtist(userId, artistId)
        : followArtist(userId, artistId, note),
    onMutate: async () => {
      if (!userInfo) return;
      await queryClient.cancelQueries({ queryKey: ["artist-info", artistId] });
      await queryClient.cancelQueries({ queryKey: ["isFollowing", artistId] });

      const previousArtistInfo = queryClient.getQueryData([
        "artist-info",
        artistId,
      ]);
      const previousFollowingStatus = queryClient.getQueryData([
        "isFollowing",
        artistId,
      ]);

      const followersDelta = isFollowingArtist ? -1 : 1;
      updateCache(!isFollowingArtist, followersDelta);

      return { previousArtistInfo, previousFollowingStatus };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(
        ["isFollowing", artistId],
        context?.previousFollowingStatus,
      );
      queryClient.setQueryData(
        ["artist-info", artistId],
        context?.previousArtistInfo,
      );
    },
  });

  const handleFollow = async () => {
    if (isFollowingArtist) {
      toggleFollowMutation.mutateAsync();
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSendRequest = async () => {
    setLoading(true);
    try {
      await toggleFollowMutation.mutateAsync();
    } catch (error) {
      console.error("Error updating follow status", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setNote("");
    }
  };

  if (!userInfo) return null;

  return (
    <div className="relative">
      <Button
        className={`transform transition-all duration-300 ${clicked ? "scale-110" : "scale-100"} ${
          isFollowingArtist && "border border-black bg-gray-100 text-gray-800"
        }`}
        title={isFollowingArtist ? "Unsubscribe" : "Subscribe"}
        onClick={handleFollow}
        disabled={loading}
      />
      {isModalOpen && (
        <FollowModal
          note={note}
          setNote={setNote}
          onClose={() => setIsModalOpen(false)}
          onSend={handleSendRequest}
        />
      )}
    </div>
  );
}

function FollowModal({
  note,
  setNote,
  onClose,
  onSend,
}: {
  note: string;
  setNote: (value: string) => void;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="h-6 w-6" />
        </button>
        <h3 className="mb-4 text-xl font-semibold text-gray-800">
          Send a Note
        </h3>
        <p className="mb-4 text-sm text-gray-600">(Optional)</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write your note here..."
          className="w-full rounded-md border border-gray-300 p-3 focus:border-primary-600 focus:outline-none"
        />
        <p className="mt-1 text-right text-xs text-gray-500">
          {note.length}/200
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSend}
            className="rounded-md bg-[#93916e] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            Follow
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FollowButton;
