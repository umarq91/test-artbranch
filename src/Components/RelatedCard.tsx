const RelatedCard = ({
  imageSrc,
  title,
}: {
  imageSrc: string;
  title: string;
}) => {
  return (
    <div className="group relative h-64 w-80 cursor-pointer overflow-hidden rounded-lg shadow-lg">
      <img
        src={imageSrc}
        alt={title}
        className="h-full w-full object-cover transition-all duration-300 ease-in-out group-hover:brightness-75"
      />
      <div className="absolute bottom-4 left-0 right-0 px-4 text-lg font-semibold text-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100">
        {title}
      </div>
    </div>
  );
};

export default RelatedCard;
