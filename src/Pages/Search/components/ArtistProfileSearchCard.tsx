import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { UserProfileType } from "Types";

interface ProfileCardProps {
  profile: UserProfileType;
  query?: string;
}

export const ProfileCard = ({ profile, query }: ProfileCardProps) => {
  const categories = profile?.categories || [];
  const [isHovered, setIsHovered] = useState(false);
  const [isSearchedByTag, setIsSearchedByTag] = useState(false);

  if (!profile) {
    return;
  }
  // Check if query is in full_name or username ,
  useEffect(() => {
    const isSearchedByTag = () => {
      if (!query) {
        setIsSearchedByTag(true);
      } else {
        const isQueryInNameOrUsername = [
          profile?.full_name,
          profile?.username,
        ].some(
          (field) => field && field.toLowerCase().includes(query.toLowerCase()),
        );
        setIsSearchedByTag(!isQueryInNameOrUsername);
      }
    };
    // since we're using this card in multi-places , its important to run only if query ( by search page) is available
    if (query) {
      isSearchedByTag();
    }
  }, [query, profile?.full_name, profile?.username]);

  // Function to highlight matching text
  const highlightText = (text: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const displayedCategories = categories.slice(0, 3);
  const hasMoreCategories = categories.length > 3;

  return (
    <div className="mx-auto max-w-sm transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative">
        <img
          className="w-full object-cover"
          src={
            profile?.profile ||
            "https://pics.craiyon.com/2023-06-22/95964999233344d3b2fb29c6eea5d36f.webp"
          }
          alt={`${profile.full_name} profile image`}
        />
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center">
          {profile.show_name ? (
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold text-gray-900">
                {highlightText(profile.full_name)}
              </h2>
              <p> @{highlightText(profile.username)} </p>
            </div>
          ) : (
            <h2 className="text-2xl font-bold text-gray-900">
              {highlightText(profile.username)}
            </h2>
          )}
          {profile?.is_verified && (
            <FaCheckCircle
              className="ml-2 text-blue-500"
              title="Verified"
              style={{ fontSize: "1.2rem" }}
            />
          )}
        </div>

        {isSearchedByTag && (
          <div className="mb-2 text-sm text-blue-500">Matched by tag</div>
        )}

        <div className="mb-4 flex items-center gap-2 text-sm text-gray-600">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13 12m0 0l-4.657-4.657M13 12l4.657 4.657M13 12l-4.657 4.657"
            ></path>
          </svg>
          {profile.suburb || "Unknown suburb"}
        </div>

        <div className="relative flex items-center justify-between">
          <div className="flex flex-wrap">
            {displayedCategories.map((category: string, index: number) => (
              <span
                key={index}
                className="mb-2 mr-2 rounded-full bg-gray-200 px-4 py-1 text-xs font-medium text-gray-700"
              >
                {category}
              </span>
            ))}
            {hasMoreCategories && (
              <span
                className="mb-2 mr-2 cursor-pointer rounded-full bg-gray-200 px-4 py-1 text-xs font-medium text-gray-700"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                +{categories.length - 3} more
              </span>
            )}
          </div>
          {isHovered && hasMoreCategories && (
            <div className="absolute z-10 mt-2 w-40 rounded border border-gray-300 bg-white p-2 shadow-lg">
              <ul className="list-disc pl-5">
                {categories.slice(3).map((category: string, index: number) => (
                  <li key={index} className="text-gray-700">
                    {highlightText(category)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
