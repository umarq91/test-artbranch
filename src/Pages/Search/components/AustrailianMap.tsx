// import { AiFillEnvironment } from "react-icons/ai";

// interface Props {
//   selectedState: string;
//   setSelectedState: (state: string) => void;
// }

// const AustraliaMap = ({ selectedState, setSelectedState }: Props) => {
//   const isSelected = (state: string) => selectedState === state;
//   const handleStateClick = (state: string) => {
//     if (isSelected(state)) {
//       setSelectedState("");
//     } else {
//       setSelectedState(state);
//     }
//   };

//   return (
//     <div className="relative h-auto w-full">
//       <img className="w-full" src="./tree.png" alt="Map of Australia" />

//       {/* Western Australia */}
//       <div
//         onClick={() => handleStateClick("Western Australia")}
//         className={`absolute left-[17%] top-[35%] flex cursor-pointer items-center transition-all duration-300 ease-in-out lg:left-[10%] xl:left-[18%] ${
//           isSelected("Western Australia") ? "scale-105 shadow-md" : ""
//         }`}
//       >
//         {!isSelected("Western Australia") && (
//           <h1
//             className={`max-w-[40px] transform text-lg font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("Western Australia")
//                 ? "text-white"
//                 : "stroke-black text-white"
//             }`}
//           >
//             WA
//           </h1>
//         )}
//         {isSelected("Western Australia") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>

//       {/* Northern Territory */}
//       <div
//         onClick={() => handleStateClick("Northern Territory")}
//         className={`absolute left-[47%] top-[23%] flex cursor-pointer items-center transition-all duration-300 ease-in-out lg:left-[47%] lg:top-[12%] xl:top-[23%] ${
//           isSelected("Northern Territory") ? "scale-105 shadow-md" : ""
//         }`}
//       >
//         {!isSelected("Northern Territory") && (
//           <h1
//             className={`max-w-[40px] transform text-xl font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("Northern Territory")
//                 ? "text-white"
//                 : "stroke-black text-white"
//             }`}
//           >
//             NT
//           </h1>
//         )}
//         {isSelected("Northern Territory") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>

//       {/* Queensland */}
//       <div
//         onClick={() => handleStateClick("Queensland")}
//         className={`absolute right-[20%] top-[28%] flex cursor-pointer items-center transition-all duration-300 ease-in-out lg:right-[14%] xl:right-[18%] xl:top-[28%] ${
//           isSelected("Queensland") ? "scale-105 shadow-md" : ""
//         }`}
//       >
//         {!isSelected("Queensland") && (
//           <h1
//             className={`max-w-[80px] transform text-xl font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("Queensland")
//                 ? "text-white"
//                 : "stroke-black text-white"
//             }`}
//           >
//             QLD
//           </h1>
//         )}
//         {isSelected("Queensland") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>

//       {/* South Australia */}
//       <div
//         onClick={() => handleStateClick("South Australia")}
//         className={`absolute bottom-[50%] right-[42%] flex cursor-pointer items-center transition-all duration-300 ease-in-out ${
//           isSelected("South Australia") ? "scale-105 shadow-md" : ""
//         }`}
//       >
//         {!isSelected("South Australia") && (
//           <h1
//             className={`max-w-[40px] transform text-xl font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("South Australia")
//                 ? "text-white"
//                 : "stroke-black text-white"
//             }`}
//           >
//             SA
//           </h1>
//         )}
//         {isSelected("South Australia") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>

//       {/* New South Wales */}
//       <div
//         onClick={() => handleStateClick("New South Wales")}
//         className={`absolute bottom-[45%] right-[12%] flex cursor-pointer items-center transition-all duration-300 ease-in-out lg:bottom-[45%] lg:right-[10px] xl:right-[14%] ${
//           isSelected("New South Wales") ? "scale-105 shadow-md" : ""
//         }`}
//       >
//         {!isSelected("New South Wales") && (
//           <h1
//             className={`max-w-[60px] transform text-sm font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("New South Wales")
//                 ? "text-white"
//                 : "stroke-black text-white"
//             }`}
//           >
//             NSW
//           </h1>
//         )}
//         {isSelected("New South Wales") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>

//       {/* Victoria */}
//       <div
//         onClick={() => handleStateClick("Victoria")}
//         className={`absolute bottom-[33%] right-[20%] flex cursor-pointer items-center transition-all duration-300 ease-in-out lg:bottom-[32%] lg:right-[18%] ${
//           isSelected("Victoria") ? "scale-105 shadow-md" : ""
//         }`}
//       >
//         {!isSelected("Victoria") && (
//           <h1
//             className={`transform text-sm font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("Victoria") ? "text-white" : "stroke-black text-white"
//             }`}
//           >
//             VIC
//           </h1>
//         )}
//         {isSelected("Victoria") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>
//       {/* ACT */}
//       <div
//         onClick={() => handleStateClick("Australian Capital Territory")}
//         className={`absolute bottom-[35%] left-[86%] flex cursor-pointer items-center transition-all duration-300 ease-in-out lg:bottom-[36%] lg:right-[10%] ${
//           isSelected("Australian Capital Territory")
//             ? "scale-105 shadow-md"
//             : ""
//         }`}
//       >
//         {!isSelected("Australian Capital Territory") && (
//           <h1
//             className={`transform text-sm font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("Australian Capital Territory")
//                 ? "text-white"
//                 : "stroke-black text-white"
//             }`}
//           >
//             ACT
//           </h1>
//         )}
//         {isSelected("Australian Capital Territory") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>

//       {/* Tasmania */}
//       <div
//         onClick={() => handleStateClick("Tasmania")}
//         className={`absolute bottom-[20%] right-[18%] flex cursor-pointer items-center transition-all duration-300 ease-in-out ${
//           isSelected("Tasmania") ? "scale-105 shadow-md" : ""
//         }`}
//       >
//         {!isSelected("Tasmania") && (
//           <h1
//             className={`max-w-[80px] transform text-sm font-semibold transition-all duration-200 hover:scale-110 hover:text-red-600 lg:text-xl ${
//               isSelected("Tasmania") ? "text-white" : "stroke-black text-white"
//             }`}
//           >
//             TAS
//           </h1>
//         )}
//         {isSelected("Tasmania") && (
//           <AiFillEnvironment className="h-6 w-6 text-red-500" />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AustraliaMap;

import { AiFillEnvironment } from "react-icons/ai";

interface Props {
  selectedState: string;
  setSelectedState: (state: string) => void;
}

const AustraliaMap = ({ selectedState, setSelectedState }: Props) => {
  const isSelected = (state: string) => selectedState === state;
  const handleStateClick = (state: string) => {
    setSelectedState(isSelected(state) ? "" : state);
  };
  {
    /* Helper function for state labels */
  }
  const renderLabel = (state: string, label: string, position: string) => (
    <div
      onClick={() => handleStateClick(state)}
      className={`absolute ${position} flex cursor-pointer items-center transition-all duration-300 ease-in-out ${
        isSelected(state) ? "scale-105 shadow-md" : ""
      }`}
    >
      {!isSelected(state) && (
        <h1
          className="max-w-[80px] transform text-sm text-white transition-all duration-200 hover:scale-110 hover:text-red-600"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)" }}
        >
          {label}
        </h1>
      )}
      {isSelected(state) && (
        <AiFillEnvironment className="h-6 w-6 text-red-500" />
      )}
    </div>
  );

  return (
    <div className="relative h-auto w-full">
      <img className="w-full" src="./tree.png" alt="Map of Australia" />

      {/* Render state labels */}
      {renderLabel(
        "Western Australia",
        "WA",
        "left-[17%] top-[35%] lg:left-[10%] xl:left-[18%]",
      )}
      {renderLabel(
        "Northern Territory",
        "NT",
        "left-[47%] top-[23%] lg:left-[47%] lg:top-[12%] xl:top-[23%]",
      )}
      {renderLabel(
        "Queensland",
        "QLD",
        "right-[20%] top-[28%] lg:right-[14%] xl:right-[18%] xl:top-[28%]",
      )}
      {renderLabel("South Australia", "SA", "bottom-[50%] right-[42%]")}
      {renderLabel(
        "New South Wales",
        "NSW",
        "bottom-[45%] right-[12%] lg:bottom-[45%] lg:right-[10px] xl:right-[14%]",
      )}
      {renderLabel(
        "Victoria",
        "VIC",
        "bottom-[33%] right-[20%] lg:bottom-[32%] lg:right-[18%]",
      )}
      {renderLabel(
        "Australian Capital Territory",
        "ACT",
        "bottom-[35%] left-[86%] lg:bottom-[36%] lg:right-[10%]",
      )}
      {renderLabel("Tasmania", "TAS", "bottom-[20%] right-[18%]")}
    </div>
  );
};

export default AustraliaMap;
