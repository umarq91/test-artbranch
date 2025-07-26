import ExploreCard from "Components/ExploreCard";
import Skeleton from "react-loading-skeleton";
import { PortfolioType } from "Types";
import NoFound from "./NoFound";

type Props = {
  portfoliosLoading: boolean;
  portfolios: PortfolioType[];
  handleOpenPortfolio: (item: PortfolioType) => void;
  tab: string;
  isFetchingNextPostsLoading: boolean;
  observerRef?: any;
};

function PortfolioSection({
  portfoliosLoading,
  portfolios,
  handleOpenPortfolio,
  tab,
  observerRef,
  isFetchingNextPostsLoading,
}: Props) {
  return (
    <div className="mx-auto mt-3 max-w-5xl px-2">
      {portfoliosLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height={350} className="m-2" />
          ))}
        </div>
      ) : portfolios && portfolios.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((item: PortfolioType) => (
            <div key={item.id} onClick={() => handleOpenPortfolio(item)}>
              <ExploreCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <NoFound
          title={`This user hasn’t posted any ${tab === "posts" ? "posts" : "daily branch"} yet.`}
          description={"When they share something, you’ll see it here."}
        />
      )}
      {isFetchingNextPostsLoading && (
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
        </div>
      )}

      <div ref={observerRef} className="h-2" />
    </div>
  );
}

export default PortfolioSection;
