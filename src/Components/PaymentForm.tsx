import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import Button from "./Button";

interface PaymentFormProps {
  successURL: string;
  amount?: number;
  preProcessingPayment: () => Promise<string>;
}

export default function PaymentForm({
  successURL,
  preProcessingPayment,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const clientSecret = await preProcessingPayment();

    if (!clientSecret) {
      setMessage("Failed to retrieve client secret.");
      setIsProcessing(false);
      return;
    }

    elements.submit();

    const { error } = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: successURL,
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(
        error.message ?? "An unexpected error occured. Please try again.",
      );
    } else {
      setMessage("An unexpected error occured. Please try again.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="relative z-[999999] mx-auto w-full rounded-lg border border-gray-400 p-5">
      <form onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <div className="relative z-[999999] mt-8 flex justify-center">
          <Button
            type="submit"
            title={isProcessing ? "Processing..." : `Pay Now`}
          />
        </div>
        {message && (
          <div className="mt-8 flex justify-center">
            <p className="text-red-500">{message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
