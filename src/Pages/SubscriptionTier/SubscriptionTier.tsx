import PageMeta from "Components/PageMeta";
import SubscriptionsPackages from "Components/SubscriptionsTiers";
import background from "../../assets/Group 14@3x.png";
import useSubscriptionTier from "./useSubscriptionTier";

const SubscriptionTier = () => {
  const {
    packageSectionRef,
    handlePackageSelect,
    handleSubscribeClick,
    TIERS,
    navigate,
  } = useSubscriptionTier();
  return (
    <>
      <PageMeta
        title="Subscription Tiers"
        description="Explore and upgrade your Artbranch subscription tiers. Unlock premium features and enhance your creative experience."
      />

      <div
        style={{ backgroundImage: `url(${background})` }}
        className="relative m-3 flex items-center justify-center rounded-2xl bg-[#291241] bg-cover bg-center pb-5 md:m-10 md:p-10"
      >
        <div className="mx-auto max-w-xl rounded-lg bg-opacity-50 p-6 text-center">
          <h1 className="mb-2 text-xl font-bold text-[#ffe6b5] md:text-2xl">
            JOIN ART BRANCH
          </h1>
          <h2 className="mb-3 text-2xl font-bold text-white md:text-6xl">
            Start your artistic journey
          </h2>
          <p className="mb-3 text-base text-white">
            Get your work out there and start building your audience with basic
            profile features.
          </p>
          <div className="mt-5 text-sm text-[#8c8c8c]">Start as low as</div>
          <div className="mb-1 text-5xl font-bold text-[#ffffff]">$20/mo</div>
          <div className="mb-5 text-sm text-[#8c8c8c]">*billed monthly*</div>
          <button
            className="font-sync bg-primary rounded-full px-10 py-2 text-sm font-semibold text-[#131114] transition-transform duration-200 hover:scale-110 hover:bg-[#90743e]"
            onClick={handleSubscribeClick}
          >
            SUBSCRIBE NOW
          </button>
        </div>
      </div>

      <div className="flex justify-center md:justify-start">
        <div
          className="cursor-pointer transition-transform duration-300 hover:-translate-x-1 hover:scale-[1.01] md:pl-10"
          onClick={() => {
            navigate(-1);
          }}
        >
          {"<"} Go Back
        </div>
      </div>

      <div ref={packageSectionRef} className="m-10 py-8">
        <div
          className="mb-16 text-center text-xl font-bold md:text-3xl"
          style={{ fontFamily: "Syne, sans-serif" }}
        >
          Choose what's best for you
        </div>
        <SubscriptionsPackages />
      </div>
    </>
  );
};

export default SubscriptionTier;
