// import { LoadingLoader } from 'Components/LoadingLoader';
// import React, { useState, useEffect } from 'react';
// import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from 'react-icons/ai';

// // Array of image data with new categories
// const images = [
//     {
//         src: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/65/78ce0081ad11e681d7bb31b0a632ef/starry-night.jpg",
//         alt: "Starry Night",
//         title: "Starry Night",
//         category: "Photography"
//     },
//     {
//         src: "https://rukminim2.flixcart.com/image/850/1000/poster/s/7/y/abstract-modern-art-canvas-painting-ip2037-24x16-medium-original-imae794b4tkzgken.jpeg?q=90&crop=false",
//         alt: "Abstract Modern Art",
//         title: "Abstract Modern Art",
//         category: "Mixed Media"
//     },
//     {
//         src: "https://storage.googleapis.com/pod_public/1300/178810.jpg",
//         alt: "Abstract Art",
//         title: "Abstract Art",
//         category: "Illustration"
//     },
//     {
//         src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH_2bOX14GY0ZtmvaAsF9xZzDv-WWE2W4oSQ&s",
//         alt: "Abstract Art 2",
//         title: "Abstract Art 2",
//         category: "Digital Art"
//     },
//     {
//         src: "https://rukminim2.flixcart.com/image/850/1000/poster/s/7/y/abstract-modern-art-canvas-painting-ip2037-24x16-medium-original-imae794b4tkzgken.jpeg?q=90&crop=false",
//         alt: "Abstract Modern Art 2",
//         title: "Abstract Modern Art 2",
//         category: "Sculpture"
//     },
//     {
//         src: "https://storage.googleapis.com/pod_public/1300/178810.jpg",
//         alt: "Abstract Art 3",
//         title: "Abstract Art 3",
//         category: "Photography"
//     }
//     // Add more images as needed
// ];

// function ExplorePage() {
//     const [likes, setLikes] = useState(Array(images.length).fill(false));
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [displayedImages, setDisplayedImages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);

//     const handleLike = (index:number) => {
//         const newLikes = [...likes];
//         newLikes[index] = !newLikes[index];
//         setLikes(newLikes);
//     };

//     const handleCategoryChange = (category: any) => {
//         setSelectedCategory(category);
//         setDisplayedImages([]); // Reset displayed images
//         setHasMore(true); // Reset hasMore flag
//         setLoading(false); // Reset loading state
//     };

//     const loadMoreImages = () => {
//         if (loading || !hasMore) return;

//         setLoading(true);
//         setTimeout(() => {
//             const newImages =
//                 selectedCategory === 'All'
//                     ? images.slice(displayedImages.length, displayedImages.length + 4)
//                     : images
//                           .filter(image => image.category === selectedCategory)
//                           .slice(displayedImages.length, displayedImages.length + 4);

//             if (newImages.length > 0) {
//                 setDisplayedImages(prev => [...prev, ...newImages]);
//             } else {
//                 setHasMore(false); // No more images to load
//             }

//             setLoading(false);
//         }, 1000); // Simulating network delay
//     };

//     // Ensure useEffect reloads images when the category changes
//     useEffect(() => {
//         loadMoreImages();
//     }, [selectedCategory]);

//     return (
//         <div className='min-h-screen max-w-6xl mx-auto font-poppins'>
//             <div className='p-10'>
//                 <h4 className='text-3xl text-center py-20 text-gray-600 '>Discover the Beauty of Art</h4>

//                 <div className='flex justify-center gap-4 mb-10'>
//                     {/* Categories - Bubble Buttons */}
//                     <button
//                         className={`px-4 py-2 ${selectedCategory === 'All' ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-full hover:bg-blue-600 transition`}
//                         onClick={() => handleCategoryChange('All')}
//                     >
//                         All
//                     </button>
//                     <button
//                         className={`px-4 py-2 ${selectedCategory === 'Photography' ? 'bg-green-600' : 'bg-green-500'} text-white rounded-full hover:bg-green-600 transition`}
//                         onClick={() => handleCategoryChange('Photography')}
//                     >
//                         Photography
//                     </button>
//                     <button
//                         className={`px-4 py-2 ${selectedCategory === 'Sculpture' ? 'bg-red-600' : 'bg-red-500'} text-white rounded-full hover:bg-red-600 transition`}
//                         onClick={() => handleCategoryChange('Sculpture')}
//                     >
//                        Sculpture
//                     </button>
//                     <button
//                         className={`px-4 py-2 ${selectedCategory === 'Digital Art' ? 'bg-purple-600' : 'bg-purple-500'} text-white rounded-full hover:bg-purple-600 transition`}
//                         onClick={() => handleCategoryChange('Digital Art')}
//                     >
//                         Digital Art
//                     </button>
//                     <button
//                         className={`px-4 py-2 ${selectedCategory === 'Illustration' ? 'bg-yellow-600' : 'bg-yellow-500'} text-white rounded-full hover:bg-yellow-600 transition`}
//                         onClick={() => handleCategoryChange('Illustration')}
//                     >
//                         Illustration
//                     </button>
//                     <button
//                         className={`px-4 py-2 ${selectedCategory === 'Mixed Media' ? 'bg-teal-600' : 'bg-teal-500'} text-white rounded-full hover:bg-teal-600 transition`}
//                         onClick={() => handleCategoryChange('Mixed Media')}
//                     >
//                         Mixed Media
//                     </button>
//                     <button
//                         className={`px-4 py-2 ${selectedCategory === 'Printmaking' ? 'bg-indigo-600' : 'bg-indigo-500'} text-white rounded-full hover:bg-indigo-600 transition`}
//                         onClick={() => handleCategoryChange('Printmaking')}
//                     >
//                         Printmaking
//                     </button>
//                 </div>

//                 {/* Display Selected Category as Hashtag */}
//                 <div className='text-center mb-10'>
//                     <span className='text-2xl text-gray-500'>
//                         {selectedCategory !== 'All' && `#${selectedCategory}`}
//                     </span>
//                 </div>

//                 <div className='min-h-screen w-full grid md:grid-cols-2 gap-5'>
//                     {displayedImages.map((image:any, index) => (
//                         <div key={index} className='flex flex-col gap-4 group cursor-pointer'>
//                             <img
//                                 src={image.src}
//                                 className='h-[500px] rounded-lg object-cover transform transition-all duration-300 ease-in-out  group-hover:brightness-75'
//                                 alt={image.alt}
//                             />
//                             <div className='flex justify-between items-center'>
//                                 <h3 className='text-xl text-gray-600'>{image.title}</h3>
//                                 <div className='flex gap-3'>
//                                     <button
//                                         className='flex items-center text-gray-600 hover:text-red-500'
//                                         onClick={() => handleLike(index)}
//                                     >
//                                         {likes[index] ? (
//                                             <AiFillHeart className='text-2xl text-red-500' />
//                                         ) : (
//                                             <AiOutlineHeart className='text-2xl' />
//                                         )}
//                                     </button>
//                                     <button className='flex items-center text-gray-600 hover:text-blue-500'>
//                                         <AiOutlineComment className='text-2xl' />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 {hasMore && (
//                     <div className='flex justify-center mt-10'>
//                         <button
//                             className='bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition'
//                             onClick={loadMoreImages}
//                         >
//                             {loading ? 'Loading...' : 'Load More'}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ExplorePage;
