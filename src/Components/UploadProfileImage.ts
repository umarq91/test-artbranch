import { supabase } from "../utils/services/supabase";

async function uploadProfileImage(userId: string, imageDataUrl: string) {
  // Convert the data URL to a file Blob
  const response = await fetch(imageDataUrl);
  const blob = await response.blob();

  // Define the directory path in the bucket for the user's profile picture
  const directoryPath = `profile_picture/`;

  // List all files in the profile_picture directory to find the existing image
  const { data: existingFiles, error: listError } = await supabase.storage
    .from("media")
    .list(directoryPath, { search: userId });

  if (listError) {
    console.error("Error listing files:", listError);
    return { success: false, message: "Failed to list files." };
  }

  // Delete any existing files for this userId
  if (existingFiles) {
    const oldFiles = existingFiles
      .filter((file) => file.name.startsWith(userId))
      .map((file) => `${directoryPath}${file.name}`);

    if (oldFiles.length > 0) {
      const { error: deleteError } = await supabase.storage
        .from("media")
        .remove(oldFiles);

      if (deleteError) {
        console.error("Error deleting old image:", deleteError);
        return { success: false, message: "Failed to delete old image." };
      }
    }
  }

  // Define the file path for the new image
  const filePath = `${directoryPath}${userId}${Date.now()}.png`;

  // Upload the new image
  const { error: uploadError } = await supabase.storage
    .from("media")
    .upload(filePath, blob, {
      cacheControl: "3600", // Set cache duration in seconds
      upsert: false, // We manually delete the old file, so no need for upsert
      contentType: "image/png",
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError);
    return { success: false, message: "Image upload failed." };
  }

  // Construct the public URL to the uploaded image
  const imageUrl = `${supabase.storage.from("media").getPublicUrl(filePath).data.publicUrl}`;

  // Return the URL to the uploaded image
  return { success: true, imageUrl };
}

export default uploadProfileImage;
