import { images } from "utils/constants";

function CateogryImages() {
  return (
    <>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto py-5">
        {images.map((imageObj, index) => (
          <div
            key={index}
            className="w-[311px] flex-none rounded-[20px] bg-white transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <img
              src={imageObj.src}
              alt={`Carousel ${index}`}
              className="h-[264px] w-full rounded-[20px] object-cover"
            />
            <h3 className="mt-2 text-center text-lg font-semibold text-black">
              {imageObj.title}
            </h3>{" "}
            {/* Title below image */}
          </div>
        ))}
      </div>
    </>
  );
}

export default CateogryImages;
