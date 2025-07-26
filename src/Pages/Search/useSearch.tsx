import { useInfiniteQuery } from "@tanstack/react-query";
import { PortfolioType, postalCodeRanges } from "Types";
import { useUserInfo } from "context/UserInfoContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { feedPostsPerPage, portfoliosPostsPerPage } from "utils/constants";
import PortfolioRepository from "utils/repositories/portfolioRepository";
import {
  fetchSearchPortfolios,
  fetchSearchProfiles,
} from "../../utils/api/searchApi";

function useSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [searchType, setSearchType] = useState(
    searchParams.get("type") || "daily_branch",
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );
  const [selectedState, setSelectedState] = useState(
    searchParams.get("state") || "",
  );
  const [suburb, setSuburb] = useState(searchParams.get("suburb") || "");
  const [postal, setPostalCode] = useState(searchParams.get("postal") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );

  const [searchInput, setSearchInput] = useState(searchQuery || "");
  const [tab, setTab] = useState(searchType || "daily_branch");
  const portfolioIdFromUrl = searchParams.get("post");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userInfo } = useUserInfo();
  const isLoggedIn = !!userInfo;

  const largeScreenObserverRef = useRef(null);
  const smallScreenObserverRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [postalError, setPostalError] = useState<string | null>(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType>(
    {} as PortfolioType,
  );

  // Infinite query for artist profiles
  const {
    data: searchedProfiles,
    isLoading: isLoadingProfiles,
    fetchNextPage: fetchNextProfilesPage,
    hasNextPage: hasNextProfilesPage,
    isFetchingNextPage: isFetchingNextProfilesPage,
  } = useInfiniteQuery({
    queryKey: [
      "search-profiles",
      searchQuery,
      selectedState,
      suburb,
      postal,
      selectedCategory,
    ],
    staleTime: 0,
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchProfiles(
        searchQuery,
        selectedState,
        suburb,
        postal,
        selectedCategory,
        pageParam,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flat().length;
      return lastPage!.length < portfoliosPostsPerPage
        ? undefined
        : totalFetched;
    },
    enabled: true,
  });

  const profiles = searchedProfiles?.pages.flat() || [];

  // Infinite query for portfolios
  const {
    data: searchedPortfolios,
    isLoading: isLoadingPortfolios,
    fetchNextPage: fetchNextPortfoliosPage,
    hasNextPage: hasNextPortfoliosPage,
    isFetchingNextPage: isFetchingNextPortfoliosPage,
  } = useInfiniteQuery({
    queryKey: ["search-portfolios", searchQuery, selectedState, suburb, postal],
    staleTime: 0,
    queryFn: ({ pageParam = 1 }) =>
      fetchSearchPortfolios(
        searchQuery,
        selectedState,
        suburb,
        postal,
        pageParam,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage!?.length < feedPostsPerPage
        ? undefined
        : allPages.length * feedPostsPerPage;
    },
    enabled: true,
  });

  const portfolios = searchedPortfolios?.pages.flat() || [];

  // Update searchParams in the URL based on state
  const updateSearchParams = useCallback(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("query", searchQuery);
    if (selectedState) params.set("state", selectedState);
    if (suburb) params.set("suburb", suburb);
    if (postal) params.set("postal", postal);
    if (selectedCategory.length > 0) {
      params.set("category", selectedCategory);
    }
    params.set("type", tab);

    navigate(`?${params.toString()}`, { replace: true });
  }, [
    searchQuery,
    suburb,
    postal,
    selectedState,
    tab,
    navigate,
    selectedCategory,
  ]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

  useEffect(() => {
    if (searchType !== "daily_branch" && searchType !== "artist") {
      setTab("daily_branch");
      navigate("/search?type=daily_branch");
    }
  });

  // Sync the search input with the searchQuery state
  const handleSearchChange = (e: any) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (newTab: string) => {
    setSearchType(newTab);
    setTab(newTab);
  };

  // Modal handling
  const handleOpenPortfolio = (portfolio: PortfolioType) => {
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true);
    navigate(`?post=${portfolio?.slug}&type=portfolio`);
  };

  const handleClosePortfolio = () => {
    setIsModalOpen(false);
    setSelectedPortfolio({} as PortfolioType);
  };

  useEffect(() => {
    if (portfolioIdFromUrl) {
      PortfolioRepository.fetchSinglePortfolio(portfolioIdFromUrl).then(
        (portfolio) => {
          setIsModalOpen(true);
          setSelectedPortfolio(portfolio);
        },
      );
    }
  }, [portfolioIdFromUrl]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Infinite scrolling via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (tab === "daily_branch" && hasNextPortfoliosPage) {
            fetchNextPortfoliosPage().catch((error) =>
              console.error("Error fetching portfolios:", error),
            );
          } else if (tab === "artist" && hasNextProfilesPage) {
            fetchNextProfilesPage().catch((error) =>
              console.error("Error fetching profiles:", error),
            );
          }
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.8 },
    );

    // Observe only the active ref based on screen size
    const activeRef = isLargeScreen
      ? largeScreenObserverRef
      : smallScreenObserverRef;

    if (activeRef.current) {
      observer.observe(activeRef.current);
    }

    return () => {
      if (activeRef.current) {
        observer.unobserve(activeRef.current);
      }
    };
  }, [isLargeScreen, tab, hasNextPortfoliosPage, hasNextProfilesPage]);

  const handlePostalCode = (value: string) => {
    setPostalCode(value);
    const postalCodeRegex = /^\d{4}$/;

    if (!postalCodeRegex.test(value)) {
      setPostalError("Postal code must be a 4-digit number");
      return;
    }

    if (selectedState) {
      const ranges = postalCodeRanges[selectedState];
      const postalCode = Number(value);

      if (
        !ranges ||
        !ranges.some(([min, max]) => postalCode >= Number(min) && postalCode <= Number(max))
      ) {
        setPostalError(
          `Postal code ${value} is not valid for ${selectedState}`,
        );
      } else {
        setPostalError(null);
      }
    }
  };

  return {
    searchQuery,
    searchType,
    searchedProfiles: profiles,
    searchedPortfolios: portfolios,
    isModalOpen,
    selectedState,
    suburb,
    postal,
    setSearchQuery,
    hasNextPortfoliosPage,
    hasNextProfilesPage,
    setSearchType,
    handleStateChange: setSelectedState,
    setSuburb,
    updateSearchParams,
    setIsModalOpen,
    navigate,
    selectedPortfolio,
    handleClosePortfolio,
    loading: isLoadingPortfolios || isLoadingProfiles,
    searchInput,
    isFetchingNextResults:
      isFetchingNextPortfoliosPage || isFetchingNextProfilesPage,
    handleSearchChange,
    tab,
    handleTabChange,
    smallScreenObserverRef,
    largeScreenObserverRef,
    handleOpenPortfolio,
    isLargeScreen,
    isAdvancedSearchOpen,
    setIsAdvancedSearchOpen,
    handlePostalCode,
    postalError,
    selectedCategory,
    setSelectedCategory,
  };
}

export default useSearch;
