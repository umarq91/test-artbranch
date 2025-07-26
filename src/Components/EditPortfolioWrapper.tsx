import EditPortfolioPage from "Pages/EditPortfolio/EditPortfolioPage";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortfolioType } from "Types";
import PortfolioRepository from "utils/repositories/portfolioRepository";
import { LoadingLoader } from "./LoadingLoader";

const EditPortfolioWrapper = () => {
  const { portfolioId } = useParams();
  const [portfolio, setPortfolio] = useState<PortfolioType>(
    {} as PortfolioType,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const fetchedPortfolio = await PortfolioRepository.fetchSinglePortfolio(
          portfolioId!,
          true,
        ); // Fetch portfolio by ID

        setPortfolio(fetchedPortfolio);
      } catch (err) {
        setError("Failed to load portfolio.");
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [portfolioId]);

  if (loading) return <LoadingLoader />;
  if (error) return <p>{error}</p>;

  // if(portfolio?.user!==userInfo?.id) return <p>You are not authorized to edit this portfolio</p>

  return (
    <div className="min-h-screen">
      {portfolio ? (
        <EditPortfolioPage portfolio={portfolio} />
      ) : (
        <p>Portfolio not found</p>
      )}
    </div>
  );
};

export default EditPortfolioWrapper;
