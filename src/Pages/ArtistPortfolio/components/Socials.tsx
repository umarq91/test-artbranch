import {
  FaBehance,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaMedium,
  FaTwitter,
  FaVimeo,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserProfileType } from "Types";

// All available social platforms
const socialPlatforms = [
  { name: "Facebook", key: "facebook", icon: FaFacebookF },
  { name: "Twitter", key: "twitter", icon: FaTwitter },
  { name: "Instagram", key: "instagram", icon: FaInstagram },
  { name: "Behance", key: "behance", icon: FaBehance },
  { name: "LinkedIn", key: "linkedin", icon: FaLinkedinIn },
  { name: "Vimeo", key: "vimeo", icon: FaVimeo },
  { name: "Medium", key: "medium", icon: FaMedium },
];

const SocialIcons = ({ userInfo }: { userInfo: UserProfileType }) => {
  return (
    <div className="flex justify-center space-x-4 text-secondary-100 md:justify-start">
      {socialPlatforms.map((platform) => {
        const IconComponent = platform.icon;
        const profileUrl = userInfo?.social_profiles?.[platform.key];

        return profileUrl ? (
          <Link
            key={platform.key}
            to={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.name}
            aria-label={`Link to ${platform.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-full border transition-transform duration-200 hover:scale-110"
          >
            <IconComponent className="h-5 w-5" />
          </Link>
        ) : null;
      })}
    </div>
  );
};

export default SocialIcons;
