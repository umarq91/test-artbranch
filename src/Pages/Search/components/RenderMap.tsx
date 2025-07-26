interface Props {
  selectedState: string;
}

function RenderMap({ selectedState }: Props) {
  return (
    <div className="my-3 flex w-full items-center gap-4">
      {/* Text on the left side */}
      <div className="text-xs font-medium">
        {selectedState ? (
          <>
            You're searching in:{" "}
            <span className="font-bold">{selectedState}</span>
          </>
        ) : (
          <>
            You're searching <span className="font-bold"> Australia wide </span>
          </>
        )}
      </div>

      {/* Image on the right side */}
      <div className="ml-4">
        {selectedState === "Western Australia" && (
          <img
            className="h-20 w-20 object-contain"
            src="./wa.png"
            alt="Western Australia"
          />
        )}
        {selectedState === "Northern Territory" && (
          <img
            className="h-20 w-20 object-contain"
            src="./northern.png"
            alt="Northern Territory"
          />
        )}
        {selectedState === "Queensland" && (
          <img
            className="h-20 w-20 object-contain"
            src="./queensland.png"
            alt="Queensland"
          />
        )}
        {selectedState === "South Australia" && (
          <img
            className="h-20 w-20 object-contain"
            src="./sa.png"
            alt="South Australia"
          />
        )}
        {selectedState === "New South Wales" && (
          <img
            className="h-20 w-20 object-contain"
            src="./nsw.png"
            alt="New South Wales"
          />
        )}
        {selectedState === "Victoria" && (
          <img
            className="h-20 w-20 object-contain"
            src="./victoria.png"
            alt="Victoria"
          />
        )}
        {selectedState === "Tasmania" && (
          <img
            className="h-20 w-20 object-contain"
            src="./tasmania.png"
            alt="Tasmania"
          />
        )}
      </div>
    </div>
  );
}

export default RenderMap;
