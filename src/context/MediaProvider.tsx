import React, { createContext, ReactNode, useContext, useState } from "react";
import { DbMediaType } from "../Types";

// Define the context type with all the necessary properties
interface MediaContextType {
  selectedMedia: DbMediaType[];
  setSelectedMedia: React.Dispatch<React.SetStateAction<DbMediaType[]>>;
  addedImages: DbMediaType[];
  setAddedImages: React.Dispatch<React.SetStateAction<DbMediaType[]>>;
  deletedImages: DbMediaType[];
  setDeletedImages: React.Dispatch<React.SetStateAction<DbMediaType[]>>;
  temporaryImages: string[];
  setTemporaryImages: React.Dispatch<React.SetStateAction<string[]>>;
  addedCoverImages: Blob[];
  setAddedCoverImages: React.Dispatch<React.SetStateAction<Blob[]>>;
  deletedCoverImages: (Blob | string)[];
  setDeletedCoverImages: React.Dispatch<
    React.SetStateAction<(Blob | string)[]>
  >;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [selectedMedia, setSelectedMedia] = useState<DbMediaType[]>([]);

  // For editing Portfolio purposes
  const [addedImages, setAddedImages] = useState<DbMediaType[]>([]);
  const [deletedImages, setDeletedImages] = useState<DbMediaType[]>([]);

  // For setting the cover images in general tab of profile
  const [temporaryImages, setTemporaryImages] = useState<string[]>([]);
  const [addedCoverImages, setAddedCoverImages] = useState<Blob[]>([]);
  const [deletedCoverImages, setDeletedCoverImages] = useState<
    (Blob | string)[]
  >([]);

  return (
    <MediaContext.Provider
      value={{
        selectedMedia,
        setSelectedMedia,
        addedImages,
        setAddedImages,
        deletedImages,
        setDeletedImages,
        temporaryImages,
        setTemporaryImages,
        addedCoverImages,
        setAddedCoverImages,
        deletedCoverImages,
        setDeletedCoverImages,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

// Custom hook to consume the MediaContext
export const useMedia = () => {
  const context = useContext(MediaContext);
  if (context === undefined) {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};
