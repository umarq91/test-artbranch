export enum Austrailia_State {
  NSW = "New South Wales",
  QLD = "Queensland",
  WA = "Western Australia",
  SA = "South Australia",
  NT = "Northern Territory",
  TA = "Tasmania",
  VIC = "Victoria",
  ACT = "Australian Capital Territory",
}

export interface CanPostDailyBranchState {
  canPost: boolean;
  loading?: boolean;
}
export type CommentType = {
  id: number;
  user: {
    full_name: string;
    profile: string;
    id: string;
  };
  comment: string;
  parent_id: number | null;
  created_at: string;
  replies: CommentType[]; // not in db
  replies_count: number;
};

export type DbMediaType = {
  storage_id?: any;
  id?: number;
  portfolio_id?: number;
  media_url: string;
  media_desc: string;
  media_name: string;
  custom_data: any[];
  type: string;
  file_name?: string;
  size: number;
  thumbnail_url?: string;
};

export type Notification = {
  id: string;
  type: NotificationType;
  portfolio_slug?: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
  actor: {
    id: string;
    username: string;
    role: string;
  };
  read: boolean;
  note?: string;
};

export type NotificationType =
  | "like"
  | "comment"
  | "follow"
  | "post"
  | "reply"
  | "collab_request"
  | "collab_accept"
  | "you_accepted"
  | "account_activated";

export type PortfolioType = {
  id: number;
  title: string;
  description: string;
  media: DbMediaType[];
  tags: string[];
  created_at: string;
  category: string;
  like_count: number;
  comment_count: number;
  user: string;
  slug: string;
  is_story: boolean;
  story_status: string;
  expired_at: string;
  views: number;
  thumbnail_index?: number;
  is_public?: boolean;
};

export const postalCodeRanges: Record<string, [string, string][]> = {
  "New South Wales": [
    ["1000", "1999"],
    ["2000", "2599"],
    ["2619", "2899"],
    ["2921", "2999"],
  ],
  Victoria: [
    ["3000", "3999"],
    ["8000", "8999"],
  ],
  Queensland: [
    ["4000", "4999"],
    ["9000", "9999"],
  ],
  "South Australia": [
    ["5000", "5799"],
    ["5800", "5999"],
  ],
  "Western Australia": [
    ["6000", "6799"],
    ["6800", "6999"],
  ],
  Tasmania: [
    ["7000", "7799"],
    ["7800", "7999"],
  ],
  "Australian Capital Territory": [
    ["0200", "0299"],
    ["2600", "2618"],
    ["2900", "2920"],
  ],
  "Northern Territory": [
    ["0800", "0899"],
    ["0900", "0999"],
  ],
};

export enum Post_Categories {
  "Photography" = "Photography",
  "Sculptor" = "Sculptor",
  "Maker" = "Maker",
  "Cinematics" = "Cinematics",
  "Digital And Graphics" = "Digital And Graphics",
  "Painting" = "Painting",
  "Illustration" = "Illustration",
  "Literature" = "Literature",
  "Make Up Artists" = "Make Up Artists",
  "Performers" = "Performers",
  "Body Art" = "Body Art",
  "Musicians" = "Musicians",
  "Crafters" = "Crafters",
  "Architectural Design" = "Architectural Design",
  "Fashion Design" = "Fashion Design",
  "Entertainer" = "Entertainer",
  "Other" = "Other",
}

export enum Post_Types {
  posts = "posts",
  daily_branch = "daily_branch",
  saved = "saved",
}

export type PositionType =
  | "center"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type TierKeys = "FREE" | "BASIC" | "STANDARD" | "PREMIUM";

export type Tier = {
  name: TierKeys;
  dailyUploadLimit: number;
  storageLimit: number;
  customLogo: boolean;
  price: number;
  description: string[];
  canMoveWatermark: boolean;
  image: string;
};

export enum User_STATUS {
  ACTIVE = "active",
  DISABLED = "disabled",
  PENDING = "verification_pending",
  REJECTED = "rejected",
  DELETE_REQUEST = "delete_request",
}

export type UserProfileType = {
  id: string;
  full_name: string;
  email: string;
  username: string;
  show_name: boolean;
  bio: string;
  websiteURL: string;
  portfolioURL: string;
  portfolio?: PortfolioType[]; // FK
  images: string[]; // cover images
  is_verified: boolean;
  social_profiles: any;
  category: string;
  categories: string[];
  role: string;
  status: string;
  profile: string;
  suburb?: string;
  postal?: string;
  followers?: number;
  state?: string;
  tags: string[];
  collaborators?: number;
  tier: string;
};

export enum verification_status {
  not_applied = "not_applied",
  pending = "pending",
  verified = "verified",
  rejected = "rejected",
}

export enum User_ROLES {
  artist = "Artist",
  audience = "Audience",
}
