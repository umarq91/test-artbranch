import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PortfolioType } from "Types";
import { fetchExplore } from "utils/api/exploreapi";
import { feedPostsPerPage } from "utils/constants";
import PortfolioRepository from "utils/repositories/portfolioRepository";

function useExplore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isportfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType>();

  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const portfolioIdFromUrl = params.get("post");

  const observerRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["portfolios", selectedCategory],
    queryFn: ({ pageParam = 0 }) => fetchExplore(selectedCategory, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length! < feedPostsPerPage) {
        return undefined;
      }
      return allPages.length * feedPostsPerPage;
    },
  });

  const posts = useMemo(() => data?.pages.flat() || [], [data]);

  useEffect(() => {
    document.body.style.overflow = isportfolioModalOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isportfolioModalOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.8, // Trigger when 90% of the element is visible
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  // Open portfolio if id exists in the URL
  useEffect(() => {
    if (portfolioIdFromUrl && !isportfolioModalOpen) {
      PortfolioRepository.fetchSinglePortfolio(portfolioIdFromUrl).then(
        (portfolio) => {
          setIsPortfolioModalOpen(true);

          setSelectedPortfolio(portfolio);

          // Optionally, cache this portfolio in React Query
          queryClient.setQueryData(
            ["portfolio", portfolioIdFromUrl],
            portfolio,
          );
        },
      );
    }
  }, [location.search]);

  const handleOpenPortfolio = useCallback(
    (portfolio: PortfolioType) => {
      setSelectedPortfolio(portfolio);
      setIsPortfolioModalOpen(true);
      navigate(`?post=${portfolio.slug}`);
    },
    [navigate],
  );

  const handleClosePortfolio = useCallback(() => {
    setIsPortfolioModalOpen(false);
    setSelectedPortfolio(undefined);
    navigate(location.pathname);
  }, [navigate, location.pathname]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      refetch();
    },
    [refetch],
  );

  return {
    posts,
    isportfolioModalOpen,
    isLoading,
    isError,
    error,
    observerRef,
    handleCategoryChange,
    selectedCategory,
    handleOpenPortfolio,
    handleClosePortfolio,
    hasNextPage,
    isFetchingNextPage,
    selectedPortfolio,
  };
}

export default useExplore;
