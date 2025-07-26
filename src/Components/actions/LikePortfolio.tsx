import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "context/UserInfoContext";
import { updatePortfolioInCategoriesCachce } from "helpers/helpers";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PortfolioType } from "Types";
import { checkLiked, handleToggleLike } from "utils/api/likeAction";
import { formatCompactNumber } from "utils/helpers";

interface LikeProps {
  portfolio: PortfolioType;
  likes: number;
  slug: string;
  artistId: string;
}

function LikePortfolio({ portfolio, likes, slug, artistId }: LikeProps) {
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();
  const portfolioId = portfolio?.id;
  const portfolioSlug = portfolio?.slug;
  if (!userInfo) return null;

  const { data: isLiked = false } = useQuery({
    queryKey: ["isLiked", portfolioId, userInfo?.id],
    queryFn: () => checkLiked(portfolioId, userInfo?.id),
    enabled: !!userInfo,
  });

  const [likeCount, setLikeCount] = useState(likes);

  // Helper function to optimistically update the cache
  const updateCache = (isLiked: boolean, likeDelta: number) => {
    queryClient.setQueryData(["portfolio", slug], (oldData: any) => {
      if (oldData) {
        return {
          ...oldData,
          like_count: oldData.like_count + likeDelta,
        };
      }
      return oldData;
    });

    // Update the "isLiked" cache
    queryClient.setQueryData(["isLiked", portfolioId, userInfo?.id], isLiked);

    // Update the like count in category-related caches
    updatePortfolioInCategoriesCachce(
      queryClient,
      slug,
      (portfolio: PortfolioType) => {
        return {
          ...portfolio,
          like_count: portfolio.like_count + likeDelta,
        };
      },
    );

    queryClient.setQueryData(
      ["artist-portfolios", artistId],
      (oldData: any) => {
        if (!oldData) return oldData;

        // Update each page since its using infinite scroll
        const updatedPages = oldData.pages.map((page: PortfolioType[]) =>
          page.map((portfolio) => {
            if (portfolio.slug === slug) {
              return {
                ...portfolio,
                like_count: portfolio.like_count + likeDelta,
              };
            }
            return portfolio;
          }),
        );

        return {
          ...oldData,
          pages: updatedPages,
        };
      },
    );

    // Update local state for like count
    setLikeCount((prevCount) => prevCount + likeDelta);
  };

  const toggleLikeMutation = useMutation({
    mutationFn: () =>
      handleToggleLike(
        portfolioId,
        userInfo?.id!,
        !isLiked,
        portfolio?.user,
        portfolioSlug,
      ),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["isLiked", portfolioId, userInfo?.id],
      });

      // Optimistically update the like count
      const likeDelta = isLiked ? -1 : 1;
      updateCache(!isLiked, likeDelta);

      return {
        previousLikeCount: likeCount,
        previousPortfolio: queryClient.getQueryData(["portfolio", slug]),
      };
    },
    onError: (_error, _variables, context) => {
      // Rollback
      setLikeCount(context?.previousLikeCount!);

      if (context?.previousPortfolio) {
        queryClient.setQueryData(
          ["portfolio", slug],
          context.previousPortfolio,
        );
      }
    },
  });

  const handleLike = async () => {
    if (!userInfo) return;
    await toggleLikeMutation.mutateAsync();
  };

  useEffect(() => {
    setLikeCount(likes);
  }, [likes]);

  return (
    <div className="flex items-center gap-1">
      <button
        className="flex items-center text-gray-600 hover:text-red-500"
        onClick={handleLike}
        disabled={toggleLikeMutation.isPending} // Disable button while the request is pending
      >
        {isLiked ? (
          <AiFillHeart className="text-2xl text-red-500" />
        ) : (
          <AiOutlineHeart className="text-2xl" />
        )}
      </button>
      <span className="text-gray-700">
        {formatCompactNumber(likeCount | 0)}
      </span>
    </div>
  );
}

export default LikePortfolio;
