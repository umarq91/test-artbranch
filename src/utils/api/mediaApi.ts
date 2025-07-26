import { supabase } from "../services/supabase";

export async function removeMediaFromBucket(
  id: number,
  type: string,
  fileName: string,
) {
  // Get media details before deletion
  const { data: mediaData, error: fetchError } = await supabase
    .from("media")
    .select("media_url, thumbnail_url")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching media details:", fetchError.message);
    return false;
  }

  const filePathsToDelete = [`${type}/${fileName}`];

  // If the media has a thumbnail, add it to the delete list
  if (mediaData?.thumbnail_url) {
    const thumbnailPath = mediaData.thumbnail_url
      .split("/")
      .slice(-2)
      .join("/");
    filePathsToDelete.push(thumbnailPath);
  }

  // Remove files from Supabase Storage
  const { error: storageError } = await supabase.storage
    .from("media")
    .remove(filePathsToDelete);

  if (storageError) {
    console.error("Error deleting from storage:", storageError.message);
    return false;
  }

  // Remove media metadata from Supabase database
  const { error: deleteError } = await supabase
    .from("media")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Error deleting media from database:", deleteError.message);
    return false;
  }

  console.log("Media successfully deleted:", id);
  return { success: true };
}

export async function updateMedia(id: number, updatedData: any) {
  const { data, error } = await supabase
    .from("media")
    .update(updatedData)
    .eq("id", id);
  if (error) {
    console.error(error);
    return false;
  }
  return data;
}
