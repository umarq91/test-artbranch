import Button from "Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { animated } from "react-spring";

import PageMeta from "Components/PageMeta";
import { FaCheckCircle } from "react-icons/fa";
import CateogryImages from "./components/CateogryImages";
import HowItWorks from "./components/HowThisWorks";
import Introduction from "./components/Intro";
import Presence from "./components/Presence";
import Rectangle from "./components/Rectangle";
import ShowcaseImages from "./components/ShowcaseImages";
import ShowCaseImages2 from "./components/ShowCaseImages2";
import WhyArtBranch from "./components/WhyArtbranch";
import { useHome } from "./useHome";
const Home = () => {
  const { activeIndex, setactiveIndex, cardSprings, users } = useHome();

  const navigate = useNavigate();

  return (
    <>
      <PageMeta
        title="Welcome to Artbranch"
        description="Welcome to Art Branch – the ultimate platform that bridges the gap between artists and their communities across Australia. Discover, connect, and collaborate effortlessly with Australian artists."
      />

      <div className="relative flex items-center justify-center overflow-hidden bg-[#fff] px-4 py-10 md:py-20">
        {/* stars */}

        <div className="absolute left-[-69px] top-[98.56px] hidden h-[171.58px] w-[171.58px] rotate-[19.25deg] transform md:block">
          <img src="/logoc.png" className="opacity-35" />
        </div>

        <div
          className="absolute left-[1439.76px] top-[519.94px] h-[171.58px] w-[171.58px] rotate-[-5.29deg] transform bg-primary-100"
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        ></div>

        <Introduction />
      </div>

      <ShowcaseImages />
      <HowItWorks />

      <Rectangle />
      <WhyArtBranch />
      <hr />

      {/* Featured Artists */}
      <div className="mt-8 text-gray-900">
        {/* Featured Artists Button */}
        <div className="mt-4 py-2 text-center">
          <button className="border-5 items-center rounded-xl border border-[#93916e] bg-[#babaa0] px-7 py-3 text-sm font-semibold text-gray-900">
            <h4 className="text-stroke-3 flex gap-2 border-white text-lg">
              {" "}
              Featured Artists
              <img className="h-6 w-7" src="/icons/541.png" />
            </h4>
          </button>
        </div>
        {/* Header Section */}
        {/* <div className="py-2 text-center">
          <h1 className="font-syne text-[24px] font-medium text-gray-900 md:text-6xl">
            Join Australia's fun and <br></br>engaging directory for Artists{" "}
            <br /> While hosting your own <br /> creative portfolio
          </h1>
          <p className="mt-2 px-4 py-2 text-sm text-[#B9B3AE] md:px-0">
            Become a part of Australia's largest community of creators
          </p>
        </div> */}

        {/* <div className="flex items-center justify-center p-5 md:p-3">
          <img src="/logoc.png" className="h-48 w-48" />
          <h3 className="text-2xl font-semibold md:text-4xl">
            Join now & explore Australia’s fun and engaging directory for Aussie
            artists
          </h3>
        </div> */}

        {/* Artists Section */}
        <div
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          style={{ height: "400px" }}
        >
          {users.map((user, index) => {
            const isActive = activeIndex === index;
            const visibleCategories = user.categories.slice(0, 2); // Show only first 2 categories
            const hiddenCount =
              user.categories.length - visibleCategories.length; // Remaining categories

            return (
              <animated.div
                key={user.id}
                className={`relative mx-3 flex-none cursor-pointer snap-center p-5 transition-all duration-100 ${
                  isActive
                    ? "scale-105 shadow-2xl"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  ...cardSprings[index],
                  width: "300px",
                  height: "300px",
                }}
                onMouseOver={() => setactiveIndex(index + 1)}
                onMouseLeave={() => setactiveIndex(null)}
              >
                {/* Profile Image */}
                <img
                  src={user.profile}
                  alt={user.full_name || "Artist"}
                  className="h-full w-full rounded-full object-cover shadow-lg"
                />

                {/* User Details */}
                <div className="absolute bottom-5 right-5 w-52 rounded-lg bg-white bg-opacity-90 p-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    {/* Avatar */}
                    <img
                      src={user.profile}
                      alt={user.full_name || "Avatar"}
                      className="h-10 w-10 rounded-full"
                    />

                    {/* Name & Category */}
                    <div>
                      <h3 className="text-md font-bold">
                        {user.full_name || "John Doe"}{" "}
                        {user.is_verified && (
                          <FaCheckCircle
                            className="inline-block h-3 w-3 text-blue-500"
                            title="Verified"
                          />
                        )}
                      </h3>

                      {/* Categories (Truncated with "+X more" if needed) */}
                      <div className="flex flex-wrap gap-1 text-xs">
                        {visibleCategories.map((cat) => (
                          <p
                            key={cat}
                            className="rounded-xl bg-primary-100 px-2 py-1 text-black"
                          >
                            {cat}
                          </p>
                        ))}
                        {hiddenCount > 0 && (
                          <p className="rounded-xl bg-gray-200 px-2 py-1 text-gray-700">
                            +{hiddenCount} more
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* View Portfolio Button */}
                  <Link to={`/portfolio/${user.id}`}>
                    <button className="mt-2 w-full rounded-3xl bg-[#131114] px-5 py-1 text-sm text-white hover:bg-black">
                      View {user.full_name}'s Portfolio
                    </button>
                  </Link>
                </div>
              </animated.div>
            );
          })}
        </div>
      </div>

      <hr className="my-10" />

      <ShowCaseImages2 />

      <hr className="my-10" />

      {/* Image Category */}
      <div className="my-5 flex items-center justify-center">
        <h1 className="mx-6 font-syne text-lg font-semibold uppercase lg:text-3xl">
          Are you an Australian Artist?
        </h1>
        <Link className="mx-6" to="/signup">
          <Button title="Build a Portfolio" />
        </Link>
      </div>
      <CateogryImages />

      {/* <AustraliaMap/> */}
      {/* <Counter /> */}
      <hr className="my-10" />
      <Presence />
    </>
  );
};

export default Home;
