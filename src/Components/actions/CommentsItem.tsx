import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingLoader } from "Components/LoadingLoader";
import { useUserInfo } from "context/UserInfoContext";
import EmojiPicker from "emoji-picker-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdEmojiEmotions } from "react-icons/md";
import { CommentType } from "Types";
import { fetchReplies } from "utils/api/commentsApi";
interface CommentItemProps {
  comment: CommentType;
  onDelete: (
    commentId: number,
    parentId?: number | null,
    replies_count?: number,
  ) => void;
  onReply: (
    parentId: number | null,
    replyText?: string,
    replies_count?: number,
    parentCommentUserId?: string,
  ) => void;
  setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}

const CommentItem = ({
  comment,
  onDelete,
  onReply,
  setComments,
}: CommentItemProps) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const queryClient = useQueryClient();
  const { userInfo } = useUserInfo();

  const {
    data: replies,
    isLoading: loadingReplies,
    refetch: fetchRepliesQuery,
  } = useQuery({
    queryKey: ["replies", comment.id],
    queryFn: () => fetchReplies(comment.id),
    enabled: showReplies,
    staleTime: 0,
  });

  useEffect(() => {
    // Automatically show replies if they are loaded
    if (replies) {
      setShowReplies(true);
    }
  }, [replies]);

  const handleReply = async () => {
    if (replyText.trim()) {
      await onReply(
        comment.id,
        replyText,
        comment.replies_count,
        comment.user.id,
      );
      setReplyText("");
      setShowReplyInput(false);

      // Re-fetch replies for updated list
      fetchRepliesQuery();
      if (replies) {
        setShowReplies(true);
      }
    }
  };

  const handleShowReplies = async () => {
    if (!showReplies && !replies) {
      await fetchRepliesQuery();
    }
    setShowReplies(!showReplies); // Toggle visibility
  };

  const handleEmojiSelect = (emoji: string) => {
    setReplyText((prev) => prev + emoji); // Append selected emoji to the input
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  const isOwner = comment.user.id === userInfo?.id;

  return (
    <div
      className={`flex flex-col gap-4 ${
        comment.parent_id ? "ml-6 rounded bg-gray-100 p-2" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={comment.user.profile}
          alt={comment.user.full_name}
        />
        <div className="flex w-full flex-col">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold">{comment.user.full_name}</span>
          </div>
          <p className="text-left text-sm text-gray-700">{comment.comment}</p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-400">
              {moment(comment.created_at).fromNow()}
            </span>
            {isOwner && (
              <button
                onClick={() =>
                  onDelete(
                    comment.id,
                    comment.parent_id ? comment.parent_id : null,
                    comment.replies_count,
                  )
                }
                className="ml-2 text-xs text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="text-xs text-blue-500 hover:text-blue-700"
            >
              Reply
            </button>
            {comment.replies_count > 0 && (
              <button
                onClick={handleShowReplies}
                className="text-xs text-blue-500 hover:text-blue-700"
              >
                {showReplies
                  ? "Hide Replies"
                  : `Show Replies (${comment.replies_count})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {showReplyInput && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleReply();
          }}
        >
          <div className="ml-12 flex items-center gap-2">
            <input
              type="text"
              className="w-full rounded-lg border px-4 py-2 text-sm"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button
              type="button"
              className="rounded-full bg-gray-300 p-2 text-xl text-gray-500"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <MdEmojiEmotions />
            </button>

            <button
              className="rounded-full bg-indigo-600 p-2 text-white"
              disabled={!replyText.trim()}
            >
              <FiSend size={20} />
            </button>
          </div>
          {showEmojiPicker && (
            <div className="absolute right-20 mt-2">
              <EmojiPicker
                className="bg-red-400 text-gray-100"
                onEmojiClick={(emoji) => handleEmojiSelect(emoji.emoji)}
              />
            </div>
          )}
        </form>
      )}

      {showReplies &&
        (loadingReplies ? (
          <LoadingLoader />
        ) : (
          replies?.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              onReply={onReply}
              setComments={setComments}
            />
          ))
        ))}
    </div>
  );
};

export default CommentItem;
