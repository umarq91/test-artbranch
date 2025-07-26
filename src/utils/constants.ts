import architects from "../../public/images/architects.jpg";
import cinematics from "../../public/images/cinematics.jpeg";
import craftsmen from "../../public/images/craftsmen.jpg";
import illustrators from "../../public/images/illustrators.jpg";
import literature from "../../public/images/literature.jpeg";
import musicians from "../../public/images/musicians.jpg";
import painters from "../../public/images/painters.jpg";
import performers from "../../public/images/performers.jpeg";
import photography from "../../public/images/photography.jpg";
import tattooart from "../../public/images/tattooart.jpg";
import buds from "../assets/buds_subscription.png";
import flower from "../assets/flowers_subscription.png";
import leaves from "../assets/leaves_subscription.png";
import Man from "../assets/man.jpg";
import { Tier, TierKeys } from "../Types";
import { toBytes } from "./helpers";

export const feedPostsPerPage = 10;
export const portfoliosPostsPerPage = 10;

// OTP
export const MAX_RESEND_ATTEMPTS = 3;
export const COOLDOWN_DURATION = 180;

// TIER
export const TIERS: Record<TierKeys, Tier> = {
  FREE: {
    name: "FREE",
    dailyUploadLimit: 1,
    storageLimit: toBytes("MB", 512),
    customLogo: false,
    price: 0,
    description: [
      "1 Branch per day",
      "512 MB total storage",
      "No custom logo support",
      "Watermark position is fixed",
    ],
    canMoveWatermark: false,
    image: buds,
  },
  BASIC: {
    name: "BASIC",
    dailyUploadLimit: 1,
    storageLimit: toBytes("GB", 1),
    customLogo: false,
    price: 5,
    description: [
      "1 Branches per day",
      "1 GB total storage",
      "No custom logo support",

      "Watermark position is fixed",
    ],
    canMoveWatermark: false,
    image: buds,
  },
  STANDARD: {
    name: "STANDARD",

    dailyUploadLimit: 5,
    customLogo: false,
    storageLimit: toBytes("GB", 2),
    price: 10,
    description: [
      "5 Branches per day",
      "2 GB total storage",
      "No custom logo support",
      "Watermark can be moved",
    ],
    canMoveWatermark: true,
    image: leaves,
  },
  PREMIUM: {
    name: "PREMIUM",
    dailyUploadLimit: 5,
    customLogo: true,
    storageLimit: toBytes("GB", 3),
    price: 20,
    description: [
      "5 Branches per day",
      "3 GB total storage",
      "Custom logo support included",
      "Watermark can be moved",
    ],
    canMoveWatermark: true,
    image: flower,
  },
};

export type TierName = keyof typeof TIERS;
export const getTierDetails = (tierName: TierKeys): Tier => TIERS[tierName];

// All available social platforms
export const socialPlatforms = [
  { name: "Twitter", key: "twitter" },
  { name: "Facebook", key: "facebook" },
  { name: "Instagram", key: "instagram" },
  { name: "Behance", key: "behance" },
  { name: "LinkedIn", key: "linkedin" },
  { name: "Vimeo", key: "vimeo" },
  { name: "Medium", key: "medium" },
];
export const cards = [
  { id: 1, name: "Max Ealley", role: "Musician", imageUrl: Man },
  { id: 2, name: "Max Ealley", role: "Musician", imageUrl: Man },
  { id: 3, name: "Max Ealley", role: "Musician", imageUrl: Man },
  { id: 4, name: "Max Ealley", role: "Musician", imageUrl: Man },
  { id: 5, name: "Max Ealley", role: "Musician", imageUrl: Man },
];

export const images = [
  { src: photography, title: "Photography" },
  { src: cinematics, title: "Cinematics" },
  { src: musicians, title: "Musicians" },
  { src: architects, title: "Architects" },
  { src: performers, title: "Performers" },
  { src: tattooart, title: "Tattoo and body art" },
  { src: painters, title: "Painters" },
  { src: illustrators, title: "Illustrators" },
  { src: cinematics, title: "Cinematics" },
  { src: literature, title: "Literature" },
  { src: craftsmen, title: "Craftsmen" },
];
