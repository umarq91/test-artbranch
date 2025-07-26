import { Link } from "react-router-dom";
import LeafIcon from "../../../../public/icons/541.png";
function Presence() {
  return (
    <div className="flex items-center justify-center py-4 font-syne md:py-8">
      <div className="w-full max-w-[400px] text-center">
        <h1 className="mb-4 flex items-center justify-center gap-2 text-[24px] font-bold text-black md:text-4xl">
          Build your online presence at no cost with Art Branch today
        </h1>

        <div className="flex flex-col items-center gap-4">
          <Link to="/login" className="w-full">
            <button className="relative inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent px-1 py-1">
              <span className="absolute inset-0 rounded-lg bg-gray-300 bg-gradient-to-l"></span>
              <span className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#b4c1bf] px-12 py-3 font-semibold uppercase">
                Join as Audience
                <img src={LeafIcon} className="h-8 w-8" />
              </span>
            </button>
          </Link>
          <Link to="/login" className="w-full">
            <button className="relative inline-flex w-full items-center justify-center rounded-xl border-2 border-transparent px-1 py-1">
              <span className="absolute inset-0 rounded-lg bg-gray-300 bg-gradient-to-l"></span>
              <span className="relative flex w-full items-center justify-center gap-2 rounded-lg bg-[#b4c1bf] px-12 py-3 font-semibold uppercase">
                Join as Artist
                <img src={LeafIcon} className="h-8 w-8" />
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Presence;
