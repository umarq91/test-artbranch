import React, { useEffect, useState } from "react";
import { COOLDOWN_DURATION, MAX_RESEND_ATTEMPTS } from "utils/constants";

type Props = {
  trigger: any; // HTML
  generateAndSendOtp: (email: string) => Promise<void>;
  email: string;
  setMaxAttemptsReached: any;
  setOtpAttempts: any;
  setOtpError: any;
};

const OtpVerification: React.FC<Props> = ({
  trigger,
  email,
  generateAndSendOtp,
  setMaxAttemptsReached,
  setOtpAttempts,
  setOtpError,
}) => {
  const [isResetAvailable, setIsResetAvailable] = useState(false);
  const [countdown, setCountdown] = useState(COOLDOWN_DURATION);
  const [resendAttempts, setResendAttempts] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev > 1) return prev - 1;
          clearInterval(timer);
          setIsResetAvailable(true);
          return 0;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsResetAvailable(true);
    }, COOLDOWN_DURATION * 1000);

    return () => clearTimeout(initialTimer);
  }, []);

  const handleResetClick = async () => {
    if (resendAttempts >= MAX_RESEND_ATTEMPTS) {
      setMaxAttemptsReached(true);
      return;
    }

    await generateAndSendOtp(email);
    setIsResetAvailable(false);
    setOtpAttempts(0);
    setMaxAttemptsReached(false);
    setOtpError("");
    // Reset the countdown to 10 minutes
    setCountdown(COOLDOWN_DURATION);

    setResendAttempts((prev) => prev + 1);
  };

  return (
    <div>
      {trigger}
      <div className="mt-4">
        <button
          type="button"
          className={`underline ${(!isResetAvailable || resendAttempts >= MAX_RESEND_ATTEMPTS) && "text-gray-500"}`}
          onClick={handleResetClick}
          disabled={!isResetAvailable || resendAttempts >= MAX_RESEND_ATTEMPTS}
        >
          Resend
        </button>
        {!isResetAvailable && (
          <div className="xs:text-xs mt-2 text-gray-500">
            Resend the OTP in {Math.floor(countdown / 60)}:
            {String(countdown % 60).padStart(2, "0")}
          </div>
        )}
        {resendAttempts >= MAX_RESEND_ATTEMPTS && (
          <div className="mt-2 text-red-500">
            Maximum resend attempts reached. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;
