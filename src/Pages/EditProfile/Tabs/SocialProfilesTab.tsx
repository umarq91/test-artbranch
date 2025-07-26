import { useUserInfo } from "context/UserInfoContext";
import { useEditProfile } from "../useEditProfile";

function SocialProfilesTab() {
  const { temporaryUserInfo: userInfo } = useUserInfo();
  const { handleChange, handleChangeSocialProfiles } = useEditProfile();

  return (
    <div className="space-y-10">
      {/* Social Media Inputs */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Social Profiles</h3>

        {/* Twitter Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="twitter">
            Twitter
          </label>
          <input
            type="url"
            value={userInfo?.social_profiles?.twitter || ""}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Twitter profile URL"
            name="twitter"
            onChange={(e) =>
              handleChangeSocialProfiles("twitter", e.target.value)
            }
          />
        </div>

        {/* Facebook Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="facebook">
            Facebook
          </label>
          <input
            type="url"
            value={userInfo?.social_profiles?.facebook || ""}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Facebook profile URL"
            name="facebook"
            onChange={(e) =>
              handleChangeSocialProfiles("facebook", e.target.value)
            }
          />
        </div>

        {/* Instagram Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="instagram">
            Instagram
          </label>
          <input
            type="url"
            value={userInfo?.social_profiles?.instagram || ""}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Instagram profile URL"
            name="instagram"
            onChange={(e) =>
              handleChangeSocialProfiles("instagram", e.target.value)
            }
          />
        </div>
      </div>

      {/* Additional Social Media Inputs */}
      <div className="space-y-6">
        {/* Behance Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="behance">
            Behance
          </label>
          <input
            type="url"
            value={userInfo?.social_profiles?.behance || ""}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Behance profile URL"
            name="behance"
            onChange={(e) =>
              handleChangeSocialProfiles("behance", e.target.value)
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="linkedin">
            LinkedIn
          </label>
          <input
            type="url"
            value={userInfo?.social_profiles?.linkedin || ""}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your LinkedIn profile URL"
            name="linkedin"
            onChange={(e) =>
              handleChangeSocialProfiles("linkedin", e.target.value)
            }
          />
        </div>

        {/* Vimeo Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="vimeo">
            Vimeo
          </label>
          <input
            type="url"
            value={userInfo?.social_profiles?.vimeo || ""}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Vimeo profile URL"
            name="vimeo"
            onChange={(e) =>
              handleChangeSocialProfiles("vimeo", e.target.value)
            }
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-bold" htmlFor="medium">
            Medium
          </label>
          <input
            type="url"
            value={userInfo?.social_profiles?.medium || ""}
            className="w-full rounded-xl border border-gray-300 bg-transparent px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your Medium profile URL"
            name="medium"
            onChange={(e) =>
              handleChangeSocialProfiles("medium", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SocialProfilesTab;
