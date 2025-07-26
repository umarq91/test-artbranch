import { v4 as uuidv4 } from "uuid";
import { supabase } from "../utils/services/supabase";

// Function to upload multiple images to Supabase bucket
export const uploadImagesToSupabase = async (
  blobs: Blob[],
  folderName: string,
): Promise<string[]> => {
  try {
    const uploadedImageUrls: string[] = [];

    for (const blob of blobs) {
      const imageName = `${uuidv4()}.jpg`;

      const { data, error } = await supabase.storage
        .from("media")
        .upload(`${folderName}/${imageName}`, blob, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw new Error(error.message);

      const publicUrl = supabase.storage
        .from("media")
        .getPublicUrl(`${folderName}/${imageName}`).data.publicUrl;

      if (publicUrl) uploadedImageUrls.push(publicUrl);
    }

    return uploadedImageUrls;
  } catch (error) {
    console.error("Error uploading images to Supabase:", error);
    return [];
  }
};


// Function to delete images from Supabase storage
export const deleteImagesFromSupabase = async (
  imageUrls: string[],
): Promise<boolean> => {
  try {
    // Ensure there are image URLs to delete
    if (!imageUrls || imageUrls.length === 0) {
      console.warn("No images to delete.");
      return false;
    }

    // Extract paths for the images stored in Supabase
    const imagePaths = imageUrls
      .map((url) => {
        try {
          const urlObject = new URL(url);
          const pathArray = urlObject.pathname.split("/").slice(-2);

          // Ensure pathArray has at least two parts (bucket and filename)
          if (pathArray.length < 2) {
            throw new Error(`Invalid image path: ${url}`);
          }

          return pathArray.join("/");
        } catch (error) {
          console.error("Error parsing URL:", url, error);
          return null; // Skip invalid URLs
        }
      })
      .filter(Boolean); // Remove null values from invalid URLs

    // Ensure there are valid image paths to delete
    if (imagePaths.length === 0) {
      console.warn("No valid images to delete.");
      return false;
    }

    const { data, error } = await supabase.storage
      .from("media")
      .remove(imagePaths as string[]);

    if (error) {
      throw new Error(`Error deleting images from Supabase: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting images from Supabase:", error);
    return false;
  }
};
