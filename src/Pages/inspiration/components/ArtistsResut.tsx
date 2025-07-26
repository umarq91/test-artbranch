import ProfileCard from "Pages/Search/components/ArtistProfileSearchCard";
import { Link } from "react-router-dom";
import { UserProfileType } from "Types";

type Props = { artists: UserProfileType[] };

function ArtistsResut({ artists }: Props) {
  if (!artists) return;
  return (
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {artists?.map((profile) => (
        <Link key={profile?.id} to={`/portfolio/${profile?.id}`}>
          <ProfileCard profile={profile} />
        </Link>
      ))}
    </div>
  );
}

export default ArtistsResut;
