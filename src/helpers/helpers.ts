import { QueryClient } from "@tanstack/react-query";
import { PortfolioType, Post_Categories } from "../Types";

export const DEFAULT_THUMBNAIL =
  "https://ievdseyqclffjsygllom.supabase.co/storage/v1/object/public/media//default2.jpg";
export function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export const updatePortfolioInCategoriesCachce = (
  queryClient: QueryClient,
  slug: string,
  operation: (portfolio: PortfolioType) => PortfolioType | null,
) => {
  const categories = ["All", ...Object.keys(Post_Categories)];

  categories.forEach((category) => {
    const cachedCategory = queryClient.getQueryData(["portfolios", category]);

    if (cachedCategory) {
      queryClient.setQueryData(["portfolios", category], (oldData: any) => {
        return {
          ...oldData,
          pages: oldData.pages.map(
            (page: PortfolioType[]) =>
              page
                .map((portfolio: PortfolioType) => {
                  // Perform the operation (like, delete, etc.) on the portfolio
                  if (portfolio.slug === slug) {
                    return operation(portfolio); // Apply the operation
                  }
                  return portfolio; // Unchanged portfolio if it doesn't match the slug
                })
                .filter(
                  (portfolio: PortfolioType | null) => portfolio !== null,
                ), // Filter out nulls in case of delete
          ),
        };
      });
    }
  });
};

export const formatDate = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const today = new Date();
  const isToday = today.toDateString() === date.toDateString();

  // Check if it's tomorrow
  today.setDate(today.getDate() + 1);
  const isTomorrow = today.toDateString() === date.toDateString();

  if (isToday) {
    return `Today at ${hours}:${minutes}`;
  } else if (isTomorrow) {
    return `Tomorrow at ${hours}:${minutes}`;
  } else {
    return `${date.toDateString()} at ${hours}:${minutes}`;
  }
};

export function generateNameSuggestions(baseUsername: string): string[] {
  // Helper to generate random number

  const randomNumber = () => Math.floor(Math.random() * 1000);

  // Full list of potential username variations
  const allSuggestions = [
    `${baseUsername}${randomNumber()}`,
    `${baseUsername}_${randomNumber()}`,
    `${baseUsername}.${randomNumber()}`,
    `${baseUsername}${randomNumber()}_official`,
    `${baseUsername}_the_real`,
    `real_${baseUsername}`,
    `${baseUsername}_${randomNumber()}_01`,
    `${baseUsername}123`,
    `${baseUsername}_${randomNumber()}_user`,
  ];

  // Shuffle the list and return the first 3 unique suggestions
  const shuffledSuggestions = allSuggestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return shuffledSuggestions;
}

// cropImageUtils.ts
// cropImage.js
export const getCroppedImg = (imageSrc: string, crop: any) => {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Only works for CORS-enabled external URLs
    image.src = imageSrc;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return reject("Canvas context not available");

      ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height,
      );

      try {
        const dataUrl = canvas.toDataURL("image/jpeg");
        resolve(dataUrl);
      } catch (error) {
        reject(error);
      }
    };

    image.onerror = () => reject("Image failed to load");
  });
};

export const getMediaUrl = (media: any) => {
  if (!media?.media_url) return "";

  if (media.media_url.startsWith("data:video")) {
    // Convert Base64 to Blob URL
    const byteCharacters = atob(media.media_url.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "video/mp4" });
    return URL.createObjectURL(blob);
  } else {
    return media?.media_url;
  }

  return media.media_url;
};

export const getPostThumbnail = (post: any) => {
  if (!post || post.length === 0) return DEFAULT_THUMBNAIL;
  const firstFile = post[0];

  if (!firstFile) return DEFAULT_THUMBNAIL;

  // If the first file is an image, return it
  if (firstFile.type === "image") {
    return firstFile.media_url || firstFile.thumbnail_url;
  }

  // Use stored thumbnail if available
  if (firstFile.thumbnail_url) {
    return firstFile.thumbnail_url;
  }

  return DEFAULT_THUMBNAIL;
};
export const generateVideoThumbnail = (
  videoBlob: Blob,
): Promise<Blob | null> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(videoBlob);
    video.crossOrigin = "anonymous";
    video.currentTime = 2; // Capture a frame at 2s
    video.muted = true;
    video.play();

    video.onloadeddata = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext("2d");

      setTimeout(() => {
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => resolve(blob), "image/jpeg");
      }, 2000);
    };

    video.onerror = () => resolve(null);
  });
};
