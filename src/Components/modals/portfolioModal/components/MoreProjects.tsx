import { useQuery } from "@tanstack/react-query";
import RelatedCard from "Components/RelatedCard";
import Skeleton from "react-loading-skeleton";
import PortfolioRepository from "utils/repositories/portfolioRepository";

interface MoreProjectsProps {
  portfolioData: any;
  artistInfo: any;
  mode?: string;
  navigate: any;
  handleChangePortfolio: (slug: string) => void;
}

const MoreProjects = ({
  portfolioData,
  artistInfo,
  mode,
  navigate,
  handleChangePortfolio,
}: MoreProjectsProps) => {
  const { data: portfolios, isLoading: loading } = useQuery({
    queryKey: ["related-portfolios", portfolioData?.user],
    queryFn: () => PortfolioRepository.getRelatedPortfolio(portfolioData?.user),
    enabled: !!portfolioData?.user && mode !== "search", // disable fetch on search mode
  });

  return (
    <div className="py-10">
      {mode === "search" ? (
        <div className="my-10 px-6 pb-6 text-center">
          {loading ? (
            <Skeleton width={150} height={20} />
          ) : (
            <h2 className="mb-4 text-2xl font-bold">
              Check out more by{" "}
              <span
                onClick={() => navigate(`/portfolio/${artistInfo?.id}`)}
                className="cursor-pointer text-[#93916e] hover:underline"
              >
                {artistInfo?.full_name}
              </span>
            </h2>
          )}
        </div>
      ) : (
        portfolios &&
        portfolios?.length > 1 && (
          <div className="mb-5 mt-8 flex flex-col items-center justify-center px-2 pb-6">
            {loading ? (
              <Skeleton className="mb-10" width={200} height={30} />
            ) : (
              <h2 className="mb-4 text-lg font-[500]">
                More Projects by {artistInfo?.full_name}
              </h2>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading ? (
                <Skeleton
                  className="flex grid-cols-3 space-x-4"
                  count={1}
                  height={200}
                  width={350}
                />
              ) : (
                portfolios
                  .filter((work: any) => work.id !== portfolioData?.id)
                  .map((work: any) => (
                    <div
                      key={work.id}
                      onClick={() => handleChangePortfolio(work.slug)}
                    >
                      <RelatedCard
                        imageSrc={work.media[0]?.media_url}
                        title={work.title}
                      />
                    </div>
                  ))
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MoreProjects;
