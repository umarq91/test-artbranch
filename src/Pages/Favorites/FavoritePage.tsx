import PageMeta from "Components/PageMeta";
import Wishlists from "Components/Wishlists";

function FavoritePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 font-poppins">
      <PageMeta
        title="Your Favorite Portfolios – Discover & Save Inspiring Art"
        description="Browse and revisit your favorite portfolios. Stay inspired with daily creative updates and handpicked art collections."
      />
      <h1 className="mb-2 text-center text-4xl font-semibold">
        Your Favorite Posts
      </h1>
      <p className="mb-8 text-center text-xs text-gray-600 opacity-50 md:text-lg">
        Here are all the posts you've marked as your favorites. Explore them
        anytime!
      </p>
      <Wishlists />
    </div>
  );
}

export default FavoritePage;
