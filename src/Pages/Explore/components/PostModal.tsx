import Button from "Components/Button";
import React, { useEffect, useState } from "react";
import { AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { FiChevronLeft, FiChevronRight, FiTrash2, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { PortfolioType } from "Types"; // Adjust based on your actual type definition
import PortfolioRepository from "utils/repositories/portfolioRepository";

interface PostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioType; // Ensure this matches your actual data structure
  user: any; // Define this based on your user structure
}

const PostDetailModal: React.FC<PostDetailModalProps> = ({
  isOpen,
  onClose,
  portfolio,
  user,
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentMediaIndex(0);
    // Load initial comments or other data if needed
  }, [portfolio]);

  if (!isOpen) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, text: newComment, user: "You" },
      ]);
      setNewComment("");
    }
  };

  const handleDeletePortfolio = async () => {
    await PortfolioRepository.deletePortfolio(portfolio.id);
    toast.success("Portfolio deleted successfully");
    onClose(); // Close the modal after deletion
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === portfolio.media.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? portfolio.media.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 font-syne">
      <div className="h-[95vh] w-full max-w-5xl transform overflow-hidden overflow-y-auto rounded-lg bg-white shadow-xl transition-all duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute right-3 top-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <FiX size={24} />
        </button>

        <div className="flex h-full flex-col">
          {/* Media Slider */}
          <div className="relative h-3/4 w-full">
            <Swiper
              onSlideChange={(swiper) =>
                setCurrentMediaIndex(swiper.activeIndex)
              }
              className="h-full"
            >
              {portfolio.media.map((media, index) => (
                <SwiperSlide key={index} className="h-full">
                  <img
                    src={media.media_url}
                    alt={media.media_name}
                    className="h-full w-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              onClick={prevMedia}
              className="absolute left-5 top-1/2 z-10 -translate-y-1/2 transform"
            >
              <FiChevronLeft className="text-3xl text-gray-700" />
            </button>
            <button
              onClick={nextMedia}
              className="absolute right-5 top-1/2 z-10 -translate-y-1/2 transform"
            >
              <FiChevronRight className="text-3xl text-gray-700" />
            </button>
          </div>

          {/* Post Details */}
          <div className="flex flex-col overflow-y-auto rounded-md bg-gray-50 p-6 shadow-md">
            <div className="mb-4 flex gap-4">
              <img
                src={user?.profile}
                className="h-12 w-12 rounded-full object-cover"
                alt="profile"
              />
              <div className="flex flex-col justify-center">
                <h4
                  className="cursor-pointer text-lg font-semibold hover:underline"
                  onClick={() => navigate(`/portfolio/${user.id}`)}
                >
                  {user?.full_name}
                </h4>
                <p className="text-sm text-gray-600">@{portfolio.category}</p>
              </div>
            </div>

            <h3 className="mb-2 text-2xl font-semibold">{portfolio.title}</h3>
            <p className="mb-4 text-gray-700">{portfolio.description}</p>

            {/* Like and Comment Buttons */}
            <div className="mb-4 flex gap-4">
              <button className="flex items-center text-gray-600 transition hover:text-red-500">
                <AiOutlineHeart className="text-2xl" />
                <span className="ml-2">Like</span>
              </button>
              <button
                onClick={() => document.getElementById("commentInput")?.focus()}
                className="flex items-center text-gray-600 transition hover:text-blue-500"
              >
                <AiOutlineComment className="text-2xl" />
                <span className="ml-2">Comment</span>
              </button>
            </div>

            {/* Comments Section */}
            <form onSubmit={handleCommentSubmit} className="mb-4 flex gap-2">
              <input
                id="commentInput"
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="rounded bg-gray-700 px-4 text-white"
              >
                Post
              </button>
            </form>

            <div className="border-t border-gray-300 pt-2">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b py-2">
                  <strong className="text-gray-800">{comment.user}</strong>:{" "}
                  <span className="text-gray-600">{comment.text}</span>
                </div>
              ))}
            </div>

            {/* Delete and Edit Options for Owner */}
            {user?.id === portfolio?.user && (
              <div className="mt-4 flex justify-end">
                <Button
                  title="Edit"
                  onClick={() => navigate(`/edit-portfolio/${portfolio.id}`)}
                />
                <button
                  onClick={handleDeletePortfolio}
                  className="ml-4 flex items-center justify-center rounded-full bg-red-600 p-2 text-white transition duration-200 hover:bg-red-700"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
