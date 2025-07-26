import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PortfolioType, UserProfileType } from "../../Types";
import { useUserInfo } from "../../context/UserInfoContext";
import { fetchRandomUsers } from "../../utils/api/exploreapi";
import {
  fetchFollowingPosts,
  fetchFollowingUsers,
} from "../../utils/api/followApi";
import { feedPostsPerPage } from "../../utils/constants";
import PortfolioRepository from "../../utils/repositories/portfolioRepository";

function useInspiration() {
  const [posts, setPosts] = useState<Array<PortfolioType>>([]);
  const [artists, setArtists] = useState<Array<UserProfileType>>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [selectedTab, setSelectedTab] = useState("Artists");
  const [isportfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioType>();
  const { userInfo } = useUserInfo();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const portfolioIdFromUrl = params.get("post");
  const [randomUsers, setRandomUsers] = useState([]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setPosts([]);
    setArtists([]);
    setOffset(0);
    setHasMore(true);
  };

  const loadMorePortfolios = async () => {
    if (loading || !hasMore || selectedTab !== "Portfolios") return;
    setLoading(true);
    if (!userInfo) {
      return;
    }

    try {
      const data = await fetchFollowingPosts(userInfo.id);
      if (data) {
        setPosts((prevPosts) => [...prevPosts, ...data]);
        if (data.length < feedPostsPerPage) setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await fetchRandomUsers();

      if (data) {
        setRandomUsers(data);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (portfolioIdFromUrl) {
      PortfolioRepository.fetchSinglePortfolio(portfolioIdFromUrl).then(
        (portfolio) => {
          setIsPortfolioModalOpen(true);
          setSelectedPortfolio(portfolio);
        },
      );
    }
  }, [portfolioIdFromUrl]);
  const loadMoreArtists = async () => {
    if (loading || !hasMore || selectedTab !== "Artists") return;
    setLoading(true);

    try {
      const data = await fetchFollowingUsers(userInfo?.id!);

      setArtists((prevArtists) => [...prevArtists, ...data]);
      if (data.length < feedPostsPerPage) setHasMore(false);
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedTab === "Portfolios") {
      loadMorePortfolios();
    } else if (selectedTab === "Artists") {
      loadMoreArtists();
    }
  }, [selectedTab]);

  const handleOpenPortfolio = (portfolio: PortfolioType) => {
    setSelectedPortfolio(portfolio);
    setIsPortfolioModalOpen(true);
    navigate(`?post=${portfolio.slug}`);
  };

  const handleClosePortfolio = () => {
    setIsPortfolioModalOpen(false);
    setSelectedPortfolio(undefined);
    navigate(location.pathname);
  };
  return {
    posts,
    artists,
    isportfolioModalOpen,
    setIsPortfolioModalOpen,
    loading,
    setLoading,
    hasMore,
    offset,
    setOffset,
    observerRef,
    handleTabChange,
    selectedTab,
    randomUsers,
    selectedPortfolio,
    setSelectedPortfolio,
    handleOpenPortfolio,
    handleClosePortfolio,
  };
}

export default useInspiration;
