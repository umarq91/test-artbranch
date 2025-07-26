import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "context/UserInfoContext";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdEmojiEmotions } from "react-icons/md";
import { CommentType, PortfolioType } from "Types";
import {
  addCommentToDb,
  deleteCommentFromDb,
  fetchComments,
} from "utils/api/commentsApi";
import { LoadingLoader } from "../LoadingLoader";
import CommentItem from "./CommentsItem";

interface Props {
  portfolio: PortfolioType;
}

function CommentsPortfolio({ portfolio }: Props) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();
  const portfolio_id = portfolio?.id;
  const portfolio_slug = portfolio?.slug;
  const portfolio_owner = portfolio?.user;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    setNewComment((prev) => prev + emoji); // Append selected emoji to the input
    setShowEmojiPicker(false); // Close the emoji picker after selection
  };

  const { data: fetchedComments } = useQuery({
    queryKey: ["comments", portfolio_id],
    queryFn: async () => fetchComments(portfolio_id),
    staleTime: 0,
  });

  useEffect(() => {
    if (fetchedComments) {
      const grouped = groupCommentsByParent(fetchedComments as CommentType[]);
      setComments(grouped);
    }
  }, [fetchedComments]);

  // Recursive function to group comments by parent_id
  const groupCommentsByParent = (
    comments: CommentType[],
    parentId: number | null = null,
  ): CommentType[] => {
    // Filter comments with the matching parent ID
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => ({
        ...comment,
        replies: groupCommentsByParent(comments, comment.id), // Recursively group replies
      }));
  };

  const addCommentMutation = useMutation({
    mutationFn: async ({
      portfolio_id,
      userId,
      commentText,
      parentId,
      repliesCount,
      parentCommentUserId,
    }: any) =>
      addCommentToDb(
        portfolio_id,
        userId,
        commentText,
        parentId,
        repliesCount,
        portfolio_owner,
        portfolio_slug,
        parentCommentUserId,
      ),
    onSuccess: (_, { parentId, portfolio_id }) => {
      // Re-invalidate the replies for the specific comment where the reply was added
      if (parentId) {
        queryClient.invalidateQueries({ queryKey: ["replies", parentId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["comments", portfolio_id] });
      }

      setNewComment("");
      setError("");
    },
    onError: () => {
      setError("Failed to add comment.");
    },
  });

  const handleAddComment = async (
    parentId: number | null = null,
    replyText?: string,
    repliesCount: number = 0,
    parentCommentUserId?: string,
  ) => {
    const commentText = replyText || newComment;

    if (!commentText.trim()) return;
    if (!userInfo) return;

    // Use mutation to add a comment
    await addCommentMutation.mutate({
      portfolio_id,
      userId: userInfo.id,
      commentText,
      parentId,
      repliesCount,
      portfolio_owner,
      portfolio_slug,
      parentCommentUserId,
    });

    setNewComment("");
  };

  const handleDeleteComment = async (
    commentId: number,
    parentId?: number | null,
    replies_count?: number,
  ) => {
    try {
      await deleteCommentFromDb(commentId);

      if (parentId) {
        await deleteCommentFromDb(commentId, parentId, replies_count);
        queryClient.invalidateQueries({ queryKey: ["replies", parentId] });
      }

      // Fetch and update the comments list after deleting the comment
      const data = await fetchComments(portfolio_id);
      setComments(groupCommentsByParent(data!)); // Reset to 5 comments after deletion
    } catch (error) {
      setError("Failed to delete comment.");
    }
  };

  return (
    <div>
      <div className="mt-4">
        <h3 className="mb-4 text-lg font-semibold">Comments</h3>

        <div className="my-6">
          <div className="relative flex items-center gap-2">
            {userInfo ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddComment();
                }}
                className="w-full"
              >
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </form>
            ) : (
              <p className="text-gray-600">You need to log in to comment.</p>
            )}
            <div className="relative">
              <button
                type="button"
                className="rounded-full bg-gray-300 p-2 text-xl text-gray-500"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <MdEmojiEmotions />
              </button>
              {showEmojiPicker && (
                <div className="absolute right-0 top-12 z-50 rounded-lg">
                  <EmojiPicker
                    className="text-gray-100"
                    onEmojiClick={(emoji) => handleEmojiSelect(emoji.emoji)}
                  />
                </div>
              )}
            </div>
            <button
              className="flex items-center justify-center rounded-full bg-indigo-600 p-2 text-white transition hover:bg-indigo-700 disabled:opacity-50"
              onClick={() => handleAddComment()}
              disabled={!newComment.trim() || !userInfo}
            >
              <FiSend size={20} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center">
            <LoadingLoader />
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div
            className="space-y-4 overflow-y-auto"
            style={{ maxHeight: "300px" }}
          >
            {comments?.length === 0 && (
              <p>No comments yet. Be the first to comment!</p>
            )}
            {comments?.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                setComments={setComments}
                onDelete={handleDeleteComment}
                onReply={handleAddComment}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default CommentsPortfolio;
