// src/services/mailerSendService.js
import axios from "axios";
// TODO:
const API_KEY = import.meta.env.VITE_APP_MAILERSEND_API_KEY;
const MAILERSEND_API_URL = "https://api.mailersend.com/v1/email";

export const sendEmail = async () => {
  try {
    const response = await axios.post(
      MAILERSEND_API_URL,
      {
        from: {
          email: "umarq91.dev@gmail.com", // Your verified sender email
          name: "Art Branch", // Your name
        },
        to: [
          {
            email: "m.umarqureshi091@gmil.com@gmail.com",
            name: "Recipient Name", // Optional
          },
        ],
        subject: "something",
        text: "OTP",
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error sending email:");
    throw new Error("Failed to send email");
  }
};
