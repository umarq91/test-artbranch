import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserInfo } from "../../../context/UserInfoContext";
import { trackPortfolioView } from "../../../utils/api/Info";
import PortfolioRepository from "../../../utils/repositories/portfolioRepository";
import { UserRepository } from "../../../utils/repositories/userRepository";

interface CanPostDailyBranchState {
  canPost: boolean;
  loading?: boolean;
}

export const usePortfolioModal = ({
  portfolio,
  params,
  onClose,
  mode,
}: any) => {
  const [currentOpenMedia, setCurrentOpenMedia] = useState(0);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedPortfolioSlug, setSelectedPortfolioSlug] = useState<string>(
    portfolio?.slug,
  );

  const modalContentRef = useRef(null);

  const [deleting, setDeleting] = useState(false);
  const [canPostDailyBranch, setCanPostDailyBranch] =
    useState<CanPostDailyBranchState>({
      canPost: false,
    });

  const { userInfo } = useUserInfo();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  // Only fetch if `portfolio` is not provided via props
  const {
    data: portfolioData,
    isLoading: portfolioLoadingState,
    refetch,
  } = useQuery({
    queryKey: ["portfolio", selectedPortfolioSlug],
    queryFn: () =>
      PortfolioRepository.fetchSinglePortfolio(selectedPortfolioSlug),
    staleTime: 10000,
  });

  const finalPortfolioData = portfolio || portfolioData;

  const { data: artistInfo, isLoading: artistLoading } = useQuery({
    queryKey: ["artist-info", finalPortfolioData?.user],
    queryFn: () => UserRepository.getUserInfo(finalPortfolioData?.user),
    enabled: !!finalPortfolioData?.user,
  });

  const postType = finalPortfolioData?.is_story ? "Daily Branch" : "portfolio";

  const { mutate: deletePortfolio } = useMutation({
    mutationFn: () =>
      PortfolioRepository.deletePortfolio(finalPortfolioData?.id),
    onSuccess: () => {
      onClose();
      navigate({ pathname: location.pathname });
      toast.success(`${postType} deleted successfully`, {
        position: "bottom-right",
      });
      const type =
        postType === "Daily Branch"
          ? "artist-daily-branch"
          : "artist-portfolios";
      queryClient.invalidateQueries({ queryKey: [type, artistInfo?.id] });
    },
    onError: () => {
      toast.error("Failed to delete portfolio");
    },
  });

  const isOwner =
    userInfo?.id === finalPortfolioData?.user && userInfo?.role !== "Audience";

  useEffect(() => {
    if (params) {
      const paramSlug = params.get("post");
      setSelectedPortfolioSlug(paramSlug);
      navigate({ search: params.toString() });
    }
  }, [params]);

  useEffect(() => {
    if (portfolio) {
      setSelectedPortfolioSlug(portfolio?.slug);
    }
  }, [portfolio]);

  useEffect(() => {
    if (!userInfo || !finalPortfolioData) return;
    if (userInfo?.id === finalPortfolioData?.user) return;
    trackPortfolioView(finalPortfolioData?.id, userInfo?.id, isOwner);
  }, [userInfo, finalPortfolioData]);

  useEffect(() => {
    const fetchCanPostDailyBranch = async () => {
      try {
        if (userInfo) {
          const response = (await PortfolioRepository.canPostStory(
            userInfo?.id,
            userInfo?.tier || "FREE",
          )) as CanPostDailyBranchState;
          setCanPostDailyBranch({ canPost: response.canPost });
        }
      } catch (error) {
        console.error("Error fetching canPostDailyBranch:", error);
        setCanPostDailyBranch({ canPost: false });
      }
    };

    if (finalPortfolioData && !finalPortfolioData?.is_story && userInfo) {
      fetchCanPostDailyBranch();
    }
  }, [finalPortfolioData, userInfo]);

  useEffect(() => {
    if (isShareModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isShareModalOpen]);

  const handleAddToDailyBranch = async () => {
    if (finalPortfolioData) {
      setCanPostDailyBranch({ ...canPostDailyBranch, loading: true });
      const res =
        await PortfolioRepository.addToDailyBranch(finalPortfolioData);
      if (res) {
        toast.success("Added this post to daily branch", {
          position: "bottom-right",
        });
        queryClient.invalidateQueries({
          queryKey: ["artist-daily-branch", userInfo?.id],
        });
        setCanPostDailyBranch({ canPost: false });
      }
    }
  };

  const nextImage = () => {
    if (!userInfo) return;
    setCurrentOpenMedia((prevIndex) =>
      prevIndex === finalPortfolioData?.media.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentOpenMedia((prevIndex) =>
      prevIndex === 0 ? finalPortfolioData?.media.length - 1 : prevIndex - 1,
    );
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, [location]);

  const handleChangePortfolio = (portfolioId: string) => {
    setSelectedPortfolioSlug(portfolioId);

    const newParams = new URLSearchParams(location.search);
    newParams.set("post", portfolioId);
    navigate({ search: newParams.toString() });

    if (modalContentRef.current) {
      console.log("comingggg");
      //@ts-ignore
      modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    refetch();
  };

  return {
    modalContentRef,
    currentOpenMedia,
    isDeleteModalOpen,
    setDeleteModalOpen,
    isShareModalOpen,
    setIsShareModalOpen,
    isQrModalOpen,
    setIsQrModalOpen,
    selectedPortfolioSlug,
    setSelectedPortfolioSlug,
    deleting,
    canPostDailyBranch,
    portfolioData: finalPortfolioData,
    artistInfo,
    deletePortfolio,
    handleAddToDailyBranch,
    nextImage,
    prevImage,
    handleChangePortfolio,
    artistLoading: artistLoading,
    portfolioLoadingState,
    navigate,
    userInfo,
    isOwner,
    setCurrentOpenMedia,
    notFound: !finalPortfolioData && !portfolio,
  };
};
