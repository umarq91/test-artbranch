import NoFound from "Pages/ArtistPortfolio/components/NoFound";
import { PortfolioType } from "Types";
import { useUserInfo } from "context/UserInfoContext";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Ensure you import skeleton styles
import { fetchWishLists } from "utils/api/wishListApi";
import ExploreCard from "./ExploreCard";
import PortfolioModal from "./modals/portfolioModal/PortfolioModal";

const Wishlists: React.FC = () => {
  const [portfolios, setPortfolios] = useState<PortfolioType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { userInfo } = useUserInfo();
  const [selectedPortfolio, setSelectedPortfolio] = useState<
    PortfolioType | any
  >(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getPortfolios = async () => {
      if (userInfo?.id) {
        setLoading(true);
        const portfoliosData = await fetchWishLists(userInfo.id);
        if (portfoliosData) {
          setPortfolios(portfoliosData); // Fallback to empty array
        }
        setLoading(false);
      }
    };
    getPortfolios();
  }, [userInfo?.id, modalOpen]);

  const handleOpenPortfolio = (portfolio: PortfolioType) => {
    setSelectedPortfolio(portfolio);
    setModalOpen(true);
  };

  return (
    <div className="mx-auto mt-6 max-w-5xl">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} height={200} style={{ margin: "10px" }} /> // Display skeletons in grid
            ))
          : portfolios.map((item: any) => (
              <div
                key={item.portfolio.id}
                onClick={() => handleOpenPortfolio(item.portfolio)}
              >
                <ExploreCard item={item.portfolio} />
              </div>
            ))}

        {modalOpen && (
          <PortfolioModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            portfolio={selectedPortfolio}
          />
        )}
      </div>

      {portfolios.length === 0 && (
        <NoFound
          title="You don't have any wishlists yet."
          description="When you add something to your wishlist, you'll see it here."
        />
      )}
    </div>
  );
};

export default Wishlists;
