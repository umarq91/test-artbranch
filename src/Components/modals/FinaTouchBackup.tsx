// // import { useQueryClient } from "@tanstack/react-query";
// // import { useUserInfo } from "context/UserInfoContext";
// // import {
// //   associateMediaWithPortfolio,
// //   uploadMediaToSupabase,
// // } from "helpers/UploadMediaToSupabase";
// // import { useEffect, useState } from "react";
// // import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// // import { useNavigate } from "react-router-dom";
// // import { DbMediaType, TierKeys } from "Types";
// // import { canPostCustomLogo } from "utils/helpers";
// // import PortfolioRepository from "utils/repositories/portfolioRepository";
// // import Button from "../Button";

// // interface FinalTouchesModalProps {
// //   selectedMedia: DbMediaType[];
// //   isOpen: boolean;
// //   onClose: () => void;
// //   name: string;
// //   description: string;
// //   isStory: boolean;
// //   both?: boolean;
// //   thumbnailIndex?: number;
// // }

// // const FinalTouchesModal = ({
// //   selectedMedia,
// //   isOpen,
// //   onClose,
// //   name,
// //   description,
// //   isStory,
// //   both,
// //   thumbnailIndex,
// // }: FinalTouchesModalProps) => {
// //   if (!isOpen) return null;
// //   const navigate = useNavigate();

// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const queryClient = useQueryClient();
// //   const { userInfo } = useUserInfo();
// //   const [tagInput, setTagInput] = useState("");

// //   const [tags, setTags] = useState<string[]>([]);
// //   const [suggestedTags, setSuggestedTags] = useState<string[]>([]);

// //   const [canAddCustomWatermark, setCanAddCustomWatermark] = useState(false);
// //   const [uploadedImage, setUploadedImage] = useState<File | null>(null);
// //   const [enableWatermark, setIsEnableWatermark] = useState(false);

// //   const [loading, setLoading] = useState(false);

// //   const handleToggle = () => {
// //     setIsEnableWatermark(!enableWatermark);
// //   };

// //   const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setTagInput(e.target.value);
// //   };

// //   const handleNext = () => {
// //     if (currentIndex < selectedMedia.length - 1) {
// //       setCurrentIndex(currentIndex + 1);
// //     }
// //   };

// //   const handlePrevious = () => {
// //     if (currentIndex > 0) {
// //       setCurrentIndex(currentIndex - 1);
// //     }
// //   };

// //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
// //     if (e.key === "Enter") {
// //       e.preventDefault();
// //       handleAddTag();
// //     }
// //   };

// //   const handleAddTag = () => {
// //     setTags([...tags, tagInput]);
// //     setTagInput("");
// //   };

// //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     if (e.target.files && e.target.files[0]) {
// //       setUploadedImage(e.target.files[0]);
// //     }
// //   };

// //   const handleContinue = async () => {
// //     setLoading(true);
// //     const portfolios = await PortfolioRepository.createPortfolio(
// //       name,
// //       description,
// //       tags,
// //       isStory,
// //       thumbnailIndex,
// //       both,
// //     );

// //     const firstPortfolioId = portfolios[0]?.id;
// //     const secondPortfolioId = both ? portfolios[1]?.id : null;
// //     const mediaUrls = await uploadMediaToSupabase(
// //       selectedMedia,
// //       firstPortfolioId,
// //       enableWatermark,
// //       canAddCustomWatermark ? uploadedImage! : undefined,
// //     );

// //     // If 'both' is true, associate the media with the second portfolio without uploading again
// //     if (both && secondPortfolioId) {
// //       await associateMediaWithPortfolio(
// //         selectedMedia,
// //         secondPortfolioId,
// //         mediaUrls,
// //       );
// //     }

// //     setLoading(false);
// //     if (both) {
// //       queryClient.invalidateQueries({
// //         queryKey: ["artist-portfolios", userInfo?.id],
// //       });
// //       queryClient.invalidateQueries({
// //         queryKey: ["artist-daily-branch", userInfo?.id],
// //       });
// //     } else {
// //       queryClient.invalidateQueries({
// //         queryKey: ["artist-portfolios", userInfo?.id],
// //       });
// //     }
// //     navigate("/portfolio");
// //   };

// //   useEffect(() => {
// //     setCanAddCustomWatermark(
// //       canPostCustomLogo("BASIC" as TierKeys).canUpload,
// //     );
// //   }, []);

// //   return (
// //     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //     <div className="mx-2 max-w-5xl rounded-[30px] bg-[#F5F2ED] p-6 md:mx-0 md:p-10">
// //       <h2 className="text-[36px] font-bold text-[#000000]">Final Touches</h2>

// //       {/* Grid Container */}
// //       <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-8">
// //         {/* Thumbnail Preview */}
// //         <div className="relative flex flex-col items-center">
// //           <p className="mb-4 text-[16px] text-[#B9B3AE]">Thumbnail Preview</p>
// //           <div className="relative">
// //             {selectedMedia[currentIndex]?.type === "image" ? (
// //               <img
// //                 src={selectedMedia[currentIndex].media_url}
// //                 alt={`Thumbnail Preview ${currentIndex + 1}`}
// //                 className="h-[150px] w-[200px] rounded-[10px] object-cover shadow-lg sm:h-[255px] sm:w-[328px]"
// //               />
// //             ) : (
// //               <video
// //                 controls
// //                 className="h-[150px] w-[200px] rounded-[10px] object-cover shadow-lg sm:h-[255px] sm:w-[328px]"
// //               >
// //                 <source
// //                   src={selectedMedia[currentIndex].media_url}
// //                   type="video/mp4"
// //                 />
// //                 Your browser does not support the video tag.
// //               </video>
// //             )}
// //             {selectedMedia?.length > 1 && (
// //               <>
// //                 <button
// //                   onClick={handlePrevious}
// //                   className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full bg-secondary-100 p-2 text-primary-200 hover:bg-secondary-200"
// //                 >
// //                   <FaChevronLeft />
// //                 </button>
// //                 <button
// //                   onClick={handleNext}
// //                   className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-secondary-100 p-2 text-primary-200 hover:bg-secondary-200"
// //                 >
// //                   <FaChevronRight />
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Tags Input & Watermark Options */}
// //         <div>
// //           {/* Tags Input */}
// //           <p className="mb-2 text-[16px] font-bold text-[#000000]">Tags</p>
// //           <input
// //             type="text"
// //             value={tagInput}
// //             onChange={handleTagChange}
// //             onKeyDown={handleKeyDown}
// //             className="h-[57px] w-full rounded-[11px] border border-[#E4E0D5] bg-transparent p-[10px_20px] text-[16px] text-[#000000] placeholder-[#C7C1AE] focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //             placeholder="Add tags..."
// //           />
// //           {tags.length > 0 && (
// //             <div className="mt-4 flex flex-wrap gap-2">
// //               {tags.map((tag, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center space-x-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
// //                 >
// //                   <span>{tag}</span>
// //                   <button
// //                     className="text-red-500 hover:text-red-600"
// //                     // onClick={() => removeTag(index)}
// //                   >
// //                     &times;
// //                   </button>
// //                 </div>
// //               ))}
// //             </div>
// //           )}

// //           {/* Watermark Toggle */}
// //           <div className="flex items-center mt-6">
// //             <label className="relative inline-flex items-center cursor-pointer">
// //               <input
// //                 type="checkbox"
// //                 className="sr-only"
// //                 checked={enableWatermark}
// //                 onChange={handleToggle}
// //               />
// //               <div
// //                 className={`h-6 w-11 rounded-full bg-gray-200 transition-colors ${
// //                   enableWatermark ? "bg-indigo-600" : ""
// //                 }`}
// //               ></div>
// //               <div
// //                 className={`absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
// //                   enableWatermark ? "translate-x-5" : ""
// //                 }`}
// //               ></div>
// //             </label>
// //             <span className="ml-3 text-gray-700">Add Watermark</span>
// //           </div>

// //           {/* Watermark Options */}
// //           {enableWatermark && (
// //             <div className="mt-6">
// //               <p className="text-sm text-gray-500">
// //                 {!uploadedImage && (
// //                   <span className="text-green-600">
// //                     Default Art Branch Logo added.
// //                   </span>
// //                 )}
// //               </p>
// //               {canAddCustomWatermark && (
// //                 <div className="relative mt-4">
// //                   <button
// //                     className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-600"
// //                     disabled={!canAddCustomWatermark}
// //                   >
// //                     Upload Custom Logo
// //                   </button>
// //                   <input
// //                     id="styledFileInput"
// //                     type="file"
// //                     accept="image/*"
// //                     onChange={handleImageUpload}
// //                     className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
// //                     disabled={!canAddCustomWatermark}
// //                   />
// //                 </div>
// //               )}
// //               {uploadedImage && canAddCustomWatermark && (
// //                 <p className="mt-4 text-sm text-gray-700">
// //                   Uploaded: <span className="font-semibold">{uploadedImage.name}</span>
// //                 </p>
// //               )}

// //               {/* Watermark Position */}
// //               <div className="mt-6">
// //                 <p className="text-sm font-bold text-gray-800">Watermark Position</p>
// //                 <select
// //                   // onChange={handleWatermarkPositionChange}
// //                   className="mt-2 w-full rounded-md border border-gray-300 bg-white p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// //                 >
// //                   <option value="top-left">Top-Left</option>
// //                   <option value="top-right">Top-Right</option>
// //                   <option value="center">Center</option>
// //                   <option value="bottom-left">Bottom-Left</option>
// //                   <option value="bottom-right">Bottom-Right</option>
// //                 </select>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Footer Buttons */}
// //       <div className="mt-8 flex justify-between">
// //         <button
// //           className="rounded-full bg-[#E1DDD2] px-6 py-2 text-[14px] text-[#131114] hover:bg-[#d0ccc5]"
// //           onClick={onClose}
// //         >
// //           Cancel
// //         </button>
// //         <Button
// //           loading={loading}
// //           title="Continue"
// //           className="rounded-full bg-[#131114] px-14 py-2 text-[14px] text-[#F5F3EE] hover:bg-[#000000]"
// //           onClick={handleContinue}
// //           disabled={loading}
// //           withTransition={true}
// //         />
// //       </div>
// //     </div>
// //   </div>

// //   );
// // };

// // export default FinalTouchesModal;
// <div>
// {/* Tags Input */}
// <p className="mb-2 text-[16px] font-bold text-[#000000]">Tags</p>
// <input
//   type="text"
//   value={tagInput}
//   onChange={handleTagChange}
//   onKeyDown={handleKeyDown}
//   className="h-[57px] w-full rounded-[11px] border border-[#E4E0D5] bg-transparent p-[10px_20px] text-[16px] text-[#000000] placeholder-[#C7C1AE] focus:outline-none focus:ring-2 focus:ring-indigo-500"
//   placeholder="Add tags..."
// />
// {tags.length > 0 && (
//   <div className="mt-4 flex flex-wrap gap-2">
//     {tags.map((tag, index) => (
//       <div
//         key={index}
//         className="flex items-center space-x-1 rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
//       >
//         <span>{tag}</span>
//         <button
//           className="text-red-500 hover:text-red-600"
//           // onClick={() => removeTag(index)}
//         >
//           &times;
//         </button>
//       </div>
//     ))}
//   </div>
// )}

// {/* Watermark Toggle */}

// </div>
