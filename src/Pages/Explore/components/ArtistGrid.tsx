import { UserProfileType } from "Types";

const ArtistGrid = ({ artists }: { artists: UserProfileType[] }) => {
  if (!artists || artists.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <h4 className="text-lg font-semibold">No followed artists found.</h4>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {artists.map((artist) => (
        <div key={artist.id} className="flex flex-col items-center">
          <img
            src={artist?.profile}
            alt={artist.full_name}
            className="mb-4 h-24 w-24 rounded-full object-cover"
          />
          <h4 className="text-sm font-semibold text-gray-800">
            {artist.full_name}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default ArtistGrid;
