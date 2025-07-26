import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserInfo } from "../../context/UserInfoContext";
import { PortfolioType, Post_Types } from "../../Types";
import {
  requestSentStatusApi,
  toggleSendRequestApi,
} from "../../utils/api/collaborationApi";
import { getTotalViewsFromDb } from "../../utils/api/Info";
import { portfoliosPostsPerPage } from "../../utils/constants";
import PortfolioRepository from "../../utils/repositories/portfolioRepository";
import { UserRepository } from "../../utils/repositories/userRepository";

export const useArtistPortfolio = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { userInfo } = useUserInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioType | null>(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [tab, setTab] = useState<Post_Types>(Post_Types.posts);
  const [requestCollabStatus, setRequestCollabStatus] = useState<
    "pending" | "accepted" | "not available"
  >("not available");

  const portfolioIdFromUrl = new URLSearchParams(location.search).get("post");
  const artistId = id || userInfo?.id || "";

  const observerRef = useRef<HTMLDivElement | null>(null);
  const owner = artistId === userInfo?.id;

  // Redirect to own portfolio if viewing own profile
  useEffect(() => {
    if (owner) navigate("/portfolio");
  }, [id, userInfo?.id, navigate]);

  const fetchUserInfo = async () => {
    const fetchedUserInfo = await UserRepository.getUserInfo(artistId);
    if (!fetchedUserInfo) {
      setUserNotFound(true);
      throw new Error("User not found");
    }
    return fetchedUserInfo;
  };

  const {
    data: artistInfo,
    isLoading: artistLoading,
    isError: artistInfoError,
  } = useQuery({
    queryKey: ["artist-info", artistId],
    queryFn: fetchUserInfo,
    enabled: !!artistId && artistId !== userInfo?.id,
  });

  // Infinite query for portfolios
  // const {
  //   data: portfoliosData,
  //   fetchNextPage: fetchNextPortfoliosPage,
  //   isLoading: portfoliosLoading,
  //   hasNextPage: hasNextPortfoliosPage,
  //   isFetchingNextPage: isFetchingNextPortfoliosPage,
  //   refetch: refetchPortfolios,
  // } = useInfiniteQuery({
  //   queryKey: ["artist-portfolios", artistId],
  //   queryFn: ({ pageParam = 0 }) =>
  //     PortfolioRepository.getUserPortfolios(artistId, pageParam, owner),
  //   initialPageParam: 0,
  //   getNextPageParam: (lastPage) =>
  //     lastPage?.length! < portfoliosPostsPerPage ? undefined : lastPage!.length,
  //   enabled: !!artistId && !userNotFound && tab === Post_Types.posts,
  // });

  const {
    data: portfoliosData,
    fetchNextPage: fetchNextPortfoliosPage,
    isLoading: portfoliosLoading,
    hasNextPage: hasNextPortfoliosPage,
    isFetchingNextPage: isFetchingNextPortfoliosPage,
    refetch: refetchPortfolios,
  } = useInfiniteQuery({
    queryKey: ["artist-portfolios", artistId],
    queryFn: ({ pageParam = 0 }) =>
      PortfolioRepository.getUserPortfolios(artistId, pageParam, owner),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flat().length;
      return lastPage!.length < portfoliosPostsPerPage
        ? undefined
        : totalFetched;
    },
    enabled: !!artistId && !userNotFound && tab === Post_Types.posts,
  });

  const portfolios = portfoliosData?.pages.flat() || [];

  // Infinite query for daily branch posts
  const {
    data: dailyBranchData,
    fetchNextPage: fetchNextDailyBranchPage,
    isLoading: dailyBranchLoading,
    hasNextPage: hasNextDailyBranchPage,
    isFetchingNextPage: isFetchingNextDailyBranchPage,
    refetch: refectchDailyBranch,
  } = useInfiniteQuery({
    queryKey: ["artist-daily-branch", artistId],
    queryFn: ({ pageParam = 0 }) =>
      PortfolioRepository.getUsersDailyBranch(artistId, pageParam, owner),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage!.length < portfoliosPostsPerPage ? undefined : lastPage!.length,
    enabled: !!artistId && !userNotFound && tab === Post_Types.daily_branch,
  });

  const dailyBranchPortfolios = dailyBranchData?.pages.flat() || [];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (tab === Post_Types.posts && hasNextPortfoliosPage) {
            fetchNextPortfoliosPage();
          } else if (
            tab === Post_Types.daily_branch &&
            hasNextDailyBranchPage
          ) {
            fetchNextDailyBranchPage();
          }
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.8 },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [
    hasNextPortfoliosPage,
    fetchNextPortfoliosPage,
    hasNextDailyBranchPage,
    fetchNextDailyBranchPage,
    tab,
  ]);

  const { data: views } = useQuery({
    queryKey: ["artist-views", artistId],
    queryFn: () => getTotalViewsFromDb(artistId),
    enabled: !!artistId && !userNotFound,
  });

  const handleSendCollabRequest = async (reciverId: string, note?: string) => {
    if (!userInfo) return;
    // cancel a request or unfriend the user
    if (
      requestCollabStatus === "pending" ||
      requestCollabStatus === "accepted"
    ) {
      const { data, error } = await toggleSendRequestApi(
        userInfo.id,
        reciverId,
        "cancel",
        note,
      );
      if (error) {
        toast.error("error sending request", {
          position: "bottom-right",
        });
      }
      setRequestCollabStatus("not available");
    }

    if (requestCollabStatus === "not available") {
      const { data, error } = await toggleSendRequestApi(
        userInfo.id,
        reciverId,
        "send",
        note,
      );
      if (error) {
        toast.error("error sending request", {
          position: "bottom-right",
        });
      }
      setRequestCollabStatus("pending");
    }
  };

  const checkRequestStauts = async () => {
    if (userInfo && !owner) {
      const status = await requestSentStatusApi(userInfo?.id, artistId);

      if (status === "accepted") {
        setRequestCollabStatus("accepted");
      } else if (status === "pending") {
        setRequestCollabStatus("pending");
      } else {
        setRequestCollabStatus("not available");
      }
    }
  };

  useEffect(() => {
    checkRequestStauts();
  }, []);

  // to prevent from scrolling when portfolio is open
  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // this is to directly open Postfolio from url
  useEffect(() => {
    if (portfolioIdFromUrl) {
      PortfolioRepository.fetchSinglePortfolio(portfolioIdFromUrl, owner).then(
        (portfolio) => {
          setIsModalOpen(true);
          setSelectedItem(portfolio);
          queryClient.setQueryData(
            ["portfolio", portfolioIdFromUrl],
            portfolio,
          );
        },
      );
    }
  }, [portfolioIdFromUrl, location.search]);

  const handleOpenPortfolio = (portfolio: PortfolioType) => {
    setSelectedItem(portfolio);
    setIsModalOpen(true);
    navigate(`?post=${portfolio.slug}`);
  };

  const handleClosePortfolio = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    navigate(location.pathname);
  };

  return {
    artistInfo,
    isModalOpen,
    isQrModalOpen,
    setIsQrModalOpen,
    setIsModalOpen,
    posts: portfolios,
    dailyBranchPortfolios,
    selectedItem,
    tab,
    setTab,
    views,
    handleOpenPortfolio,
    handleClosePortfolio,
    observerRef,
    navigate,
    loading: portfoliosLoading || dailyBranchLoading, // initial loading
    artistLoading,
    isFetchingNextPostsLoading:
      isFetchingNextDailyBranchPage || isFetchingNextPortfoliosPage,
    userNotFound,
    refetchPortfolios,
    handleSendCollabRequest,
    requestCollabStatus,
  };
};
