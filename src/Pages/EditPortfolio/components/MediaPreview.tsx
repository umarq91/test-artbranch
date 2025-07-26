import { getMediaUrl } from "helpers/helpers";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DbMediaType } from "Types";
interface Props {
  selectedMedia: DbMediaType[];
  currentIndex: number;
  handleNext: () => void;
  handlePrevious: () => void;
}

function MediaPreview({
  selectedMedia,
  currentIndex,
  handleNext,
  handlePrevious,
}: any) {
  return (
    <div className="relative max-h-[539px] w-full overflow-hidden rounded-lg">
      {selectedMedia.length > 0 ? (
        selectedMedia[currentIndex]?.type === "image" ? (
          <img
            src={selectedMedia[currentIndex]?.media_url}
            alt={`Selected Media ${currentIndex + 1}`}
            className="max-h-full max-w-full bg-primary-1400 object-contain"
          />
        ) : (
          <video
            controls
            src={getMediaUrl(selectedMedia[currentIndex])}
            className="h-auto max-h-[539px] w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        )
      ) : (
        <div className="flex h-full items-center justify-center">
          <p>No media selected.</p>
        </div>
      )}

      {selectedMedia.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className={`absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-r-md bg-secondary-100 p-2 text-sm text-primary-200 md:block ${currentIndex === 0 ? "invisible" : ""}`}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className={`absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-l-md bg-secondary-100 p-2 text-sm text-primary-200 md:block ${currentIndex === selectedMedia.length - 1 ? "invisible" : ""}`}
          >
            <FaChevronRight />
          </button>

          <div className="mt-4 flex justify-between px-16 md:hidden md:px-0">
            <button
              onClick={handlePrevious}
              className={`rounded-r-md bg-secondary-100 p-2 text-sm text-primary-200 ${currentIndex === 0 ? "invisible" : ""}`}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className={`rounded-l-md bg-secondary-100 p-2 text-sm text-primary-200 ${currentIndex === selectedMedia.length - 1 ? "invisible" : ""}`}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MediaPreview;
