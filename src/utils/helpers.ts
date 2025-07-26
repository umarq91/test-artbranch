import { PositionType, TierKeys } from "../Types";
import { TIERS } from "./constants";

export function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}

export function formatCompactNumber(number: number) {
  const compactNumberFormatter = new Intl.NumberFormat(undefined, {
    notation: "compact",
  });
  return compactNumberFormatter.format(number);
}
export function formatPlural(count: number, singular: string): string {
  if (count === 1) {
    return singular;
  }
  return `${singular}s`;
}

export const canUploadFileChecker = (
  tierKey: TierKeys,
  usedBytes: number,
  fileSizeBytes: number,
) => {
  const tier = TIERS[tierKey];

  if (!tier) {
    throw new Error("Invalid tier provided.");
  }

  const { storageLimit } = tier;
  const newTotalUsage = usedBytes + fileSizeBytes;

  return {
    canUpload: newTotalUsage <= storageLimit,
    usedMB: usedBytes / (1024 * 1024),
    tier: tier.name,
  };
};

export const canPostCustomLogo = (tierKey: TierKeys) => {
  const tier = TIERS[tierKey];
  if (!tier) {
    throw new Error("Invalid tier provided.");
  }
  const { customLogo } = tier;

  return {
    canUpload: customLogo,
  };
};

export const userPermissions = (tierKey: TierKeys) => {
  console.log(tierKey);
  const tier = TIERS[tierKey];
  if (!tier) {
    throw new Error("Invlid tier provided");
  }

  const {
    canMoveWatermark,
    customLogo,
    dailyUploadLimit,
    description,
    image,
    name,
    price,
    storageLimit,
  } = tier;

  // TOdo :fix
  return {
    canMoveWatermark,
    customLogo,
    dailyUploadLimit,
  };
};

export function toBytes(unit: "MB" | "GB", value: number): number {
  const units = {
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
  };

  return units[unit] * value;
}

export const suggestedTagsHelper = [
  "Sculpture",
  "Design",
  "Idea",
  "Painting",
  "Digital Art",
  "Illustration",
  "Graphic Design",
  "Typography",
  "Photography",
  "3D Art",
  "Abstract",
  "Landscape",
  "Portrait",
  "Minimalism",
  "Concept Art",
  "Street Art",
  "Fine Art",
  "Art Installation",
  "Mixed Media",
  "Calligraphy",
];

export async function addWatermark(
  imgSrc: string,
  defaultWatermark: "logo" | "logob" | "logoc",
  watermarkFile: File | null,
  position: PositionType | null,
  opacity: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to create 2D context"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, img.width, img.height);

      const watermarkImage = new Image();
      const watermarkSrc = watermarkFile
        ? URL.createObjectURL(watermarkFile)
        : `${window.location.origin}/${defaultWatermark}.png`;

      watermarkImage.src = watermarkSrc;

      watermarkImage.onload = () => {
        const watermarkWidth = img.width * 0.2; // 20% width
        const watermarkHeight =
          (watermarkImage.height / watermarkImage.width) * watermarkWidth;

        let watermarkX = 0;
        let watermarkY = 0;

        switch (position) {
          case "top-left":
            watermarkX = 10;
            watermarkY = 10;
            break;
          case "top-right":
            watermarkX = img.width - watermarkWidth - 10;
            watermarkY = 10;
            break;
          case "bottom-left":
            watermarkX = 10;
            watermarkY = img.height - watermarkHeight - 10;
            break;
          case "bottom-right":
            watermarkX = img.width - watermarkWidth - 10;
            watermarkY = img.height - watermarkHeight - 10;
            break;
          case "center":
          default:
            watermarkX = (img.width - watermarkWidth) / 2;
            watermarkY = (img.height - watermarkHeight) / 2;
            break;
        }

        ctx.globalAlpha = opacity / 100;
        console.log(ctx.globalAlpha);
        ctx.filter = "blur(1px)";

        ctx.drawImage(
          watermarkImage,
          watermarkX,
          watermarkY,
          watermarkWidth,
          watermarkHeight,
        );

        ctx.filter = "none";

        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Failed to create watermarked image blob"));
          },
          "image/png",
          1.0,
        );
      };

      watermarkImage.onerror = () => {
        reject(new Error("Failed to load watermark image"));
      };
    };

    img.onerror = () => {
      reject(new Error("Failed to load target image"));
    };
  });
}

export function sanitizeFileName(fileName: string): string {
  // Replace spaces and special characters with underscores
  return fileName
    .replace(/[^a-zA-Z0-9-_.]/g, "_")
    .replace(/\s+/g, "_")
    .toLowerCase();
}

export const socialRegex: any = {
  twitter: /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?(\?.*)?$/,
  facebook: /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9.]+\/?(\?.*)?$/,
  instagram:
    /^(https?:\/\/)?(www\.)?(instagram\.com|instagr\.am)\/[A-Za-z0-9._]+\/?(\?.*)?$/,
  behance: /^(https?:\/\/)?(www\.)?behance\.net\/[A-Za-z0-9_-]+\/?(\?.*)?$/,
  linkedin:
    /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?(\?.*)?$/,
  vimeo: /^(https?:\/\/)?(www\.)?vimeo\.com\/[0-9]+\/?(\?.*)?$/,
  medium: /^(https?:\/\/)?(www\.)?medium\.com\/@[A-Za-z0-9_-]+\/?(\?.*)?$/,
};
