import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserInfo } from "context/UserInfoContext";
import { motion } from "framer-motion"; // Import framer-motion
import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa"; // Import bookmark icons
import { PortfolioType } from "Types";
import {
  addToWishlist,
  isInWishList,
  removeFromWishlist,
} from "utils/api/wishListApi";

interface WishListProps {
  portfolio: PortfolioType;
}

const WishListToggle: React.FC<WishListProps> = ({ portfolio }) => {
  const { userInfo } = useUserInfo();
  const queryClient = useQueryClient();

  const { data: inWishList, isLoading: isWishlistLoading } = useQuery({
    queryKey: ["wishlist", userInfo?.id, portfolio?.id],
    queryFn: () => isInWishList(userInfo?.id!, portfolio?.id),
    enabled: !!userInfo?.id && !!portfolio?.id, // Only run if user and portfolio ids exist
  });

  // Mutation to add/remove from the wishlist
  const mutation = useMutation({
    mutationFn: (inWishList: boolean) => {
      if (inWishList) {
        return removeFromWishlist(userInfo?.id!, portfolio.id);
      } else {
        return addToWishlist(userInfo?.id!, portfolio.id);
      }
    },

    onMutate: async (isCurrentlyInWishlist) => {
      await queryClient.cancelQueries({
        queryKey: ["wishlist", userInfo?.id, portfolio.id],
      });

      const previousValue = queryClient.getQueryData<boolean>([
        "wishlist",
        userInfo?.id,
        portfolio.id,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["wishlist", userInfo?.id, portfolio.id],
        !isCurrentlyInWishlist,
      );

      if (isCurrentlyInWishlist) {
        queryClient.setQueryData(
          ["wishlist", userInfo?.id, portfolio.id],
          false,
        );

        queryClient.setQueryData(["wishlist", userInfo?.id], (oldData: any) => {
          if (!oldData) return []; // Handle cases where oldData is undefined
          return oldData.filter((data: any) => data.id !== portfolio.id);
        });
      }

      return { previousValue };
    },
    onError: (error, isCurrentlyInWishlist, context) => {
      // Roll back optimistic update if there's an error
      queryClient.setQueryData(
        ["wishlist", userInfo?.id, portfolio.id],
        context?.previousValue,
      );
    },
    onSettled: () => {
      // Invalidate the query to ensure refetch after mutation
      queryClient.invalidateQueries({
        queryKey: ["wishlist", userInfo?.id, portfolio.id],
      });
    },
  });

  const handleToggle = async () => {
    if (!userInfo) {
      return;
    }

    mutation.mutate(inWishList!); // Trigger mutation (toggle wishlist)
  };

  return (
    <div
      onClick={handleToggle}
      className="flex cursor-pointer items-center justify-center"
    >
      <motion.div
        className={`flex h-12 w-12 items-center justify-center rounded-full border transition-transform duration-300 md:h-14 md:w-14 ${isWishlistLoading || mutation.isPending ? "opacity-50" : ""}`}
        whileTap={{ scale: 0.9 }}
        animate={{ backgroundColor: inWishList ? "#2f7deb" : "#ffffff" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isWishlistLoading || mutation.isPending ? (
          <span className="loader"></span>
        ) : inWishList ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FaBookmark className="h-6 w-4 text-white" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <FaRegBookmark className="h-6 w-4 text-black" />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WishListToggle;
