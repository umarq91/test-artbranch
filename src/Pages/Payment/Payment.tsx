import { Elements } from "@stripe/react-stripe-js";
import PackageCard from "Components/PackageCard";
import PageMeta from "Components/PageMeta";
import PaymentForm from "Components/PaymentForm";
import PictureLayout from "Components/PictureLayout";
import Background from "../../assets/Background.png";
import Leaf from "../../assets/LoginLeaf.png";
import usePayment from "./usePayment";

const Payment = () => {
  const { stripe, selectedTier, retrievePaymentIntent, navigate, loading } =
    usePayment();

  return (
    <PictureLayout
      backgroundImage={Background}
      decorationImage={Leaf}
      title="You're just a step away from being a part of Austalia's largest network of creators"
    >
      <PageMeta
        title="Payment"
        description="Enhance your Artbranch experience by upgrading your plan. Get access to exclusive features and premium tools for creators."
      />

      <div className="mb-10 flex justify-center md:justify-start">
        <div
          className="cursor-pointer transition-transform duration-300 hover:-translate-x-1 hover:scale-[1.01]"
          onClick={() => {
            navigate("/subscription-tier");
          }}
        >
          {"<"} Go Back
        </div>
      </div>
      {selectedTier && stripe ? (
        <div className="flex flex-col items-center gap-10">
          <div className="w-full">
            <PackageCard
              // isCurrent={userInfo}
              tier={selectedTier}
            />
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl">Proceed with our Secure Payment</div>
            <div className="text-sm text-gray-400">
              By proceeding, you agree with our terms and conditions and our
              privacy policy.
            </div>
          </div>
          <Elements
            stripe={stripe}
            options={{
              mode: "payment",
              payment_method_types: ["card"],
              currency: "aud",
              amount: selectedTier?.price * 100,
              loader: "always",
              setup_future_usage: "off_session",
              appearance: {
                theme: "stripe",
                labels: "floating",

                // variables: {
                //   colorPrimaryText: globalColors.white,
                //   focusOutline: `1px solid ${globalColors.mainBlue}`,
                //   fontFamily: "sans-serif",
                //   colorPrimary: globalColors.mainBlue,
                //   colorTextPlaceholder: globalColors.gray,
                //   colorText: globalColors.white,
                //   colorTextSecondary: globalColors.white,
                //   colorBackground: globalColors.blackLight,
                //   colorDanger: globalColors.red,
                // },
              },
            }}
          >
            <PaymentForm
              successURL={`https://artbranch.com.au/`}
              amount={selectedTier.price}
              preProcessingPayment={retrievePaymentIntent}
            />
          </Elements>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="text-grey-400">An unexpected error occured...ƒ</div>
        </div>
      )}
    </PictureLayout>
  );
};

export default Payment;
