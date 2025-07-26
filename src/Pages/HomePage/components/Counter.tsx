import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function Counter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [counts, setCounts] = useState({
    artists: 0,
    collaborations: 0,
    portfolios: 0,
    features: 0,
  });

  // Function to handle counting animation
  useEffect(() => {
    if (inView) {
      const duration = 6000; // total time in ms (6 seconds)
      const frameRate = 20; // frame update rate in ms
      const steps = duration / frameRate; // total number of frames

      const maxValues = {
        artists: 451000,
        collaborations: 120,
        portfolios: 626000,
        features: 50,
      };

      const incrementValues = {
        artists: Math.ceil(maxValues.artists / steps),
        collaborations: Math.ceil(maxValues.collaborations / steps),
        portfolios: Math.ceil(maxValues.portfolios / steps),
        features: Math.ceil(maxValues.features / steps),
      };

      const interval = setInterval(() => {
        setCounts((prevCounts) => ({
          artists: Math.min(
            prevCounts.artists + incrementValues.artists,
            maxValues.artists,
          ),
          collaborations: Math.min(
            prevCounts.collaborations + incrementValues.collaborations,
            maxValues.collaborations,
          ),
          portfolios: Math.min(
            prevCounts.portfolios + incrementValues.portfolios,
            maxValues.portfolios,
          ),
          features: Math.min(
            prevCounts.features + incrementValues.features,
            maxValues.features,
          ),
        }));

        // Check if all counts reached the max values, then clear interval
        if (
          counts.artists >= maxValues.artists &&
          counts.collaborations >= maxValues.collaborations &&
          counts.portfolios >= maxValues.portfolios &&
          counts.features >= maxValues.features
        ) {
          clearInterval(interval);
        }
      }, frameRate);

      return () => clearInterval(interval);
    }
  }, [inView, counts]);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-center font-syne text-2xl font-semibold">
        JOIN AUSTRALIA'S FUN AND ENGAGING DIRECTORY FOR ARTISTS WHILE HOSTING
        YOUR OWN CREATIVE PORTFOLIO
      </p>

      {/* Grid */}
      <div
        ref={ref}
        className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-center font-serif text-5xl font-bold">
            {counts.artists.toLocaleString()}
          </h1>
          <button className="w-[80%] rounded-full border border-black bg-transparent py-3 text-lg font-semibold text-black transition-all lg:w-full">
            ARTISTS
          </button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-center font-serif text-5xl font-bold">
            +{counts.collaborations}
          </h1>
          <button className="w-[80%] rounded-full border border-black bg-transparent py-3 text-lg font-semibold text-black transition-all lg:w-full">
            COLLABORATIONS
          </button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-center font-serif text-5xl font-bold">
            {counts.portfolios.toLocaleString()}
          </h1>
          <button className="w-[80%] rounded-full border border-black bg-transparent py-3 text-lg font-semibold text-black transition-all lg:w-full">
            PORTFOLIOS
          </button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-center font-serif text-5xl font-bold">
            +{counts.features}
          </h1>
          <button className="w-[80%] rounded-full border border-black bg-transparent py-3 text-lg font-semibold text-black transition-all lg:w-full">
            FEATURES
          </button>
        </div>
      </div>
    </div>
  );
}

export default Counter;
