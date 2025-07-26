import { DbMediaType } from "../Types";
import { addWatermark, sanitizeFileName } from "../utils/helpers";
import { supabase } from "../utils/services/supabase";
import { DEFAULT_THUMBNAIL, generateVideoThumbnail } from "./helpers";

// Upload Media with Watermark to Supabase
export async function uploadMediaToSupabase(
  media: DbMediaType[],
  portfolioId: string,
  enableWatermark: boolean,
  selectedLogo: "logo" | "logob" | "logoc",
  customWatermarkFile: File | null,
  opacity: number,
  thumbnail?: string,
  position?:
    | ("top-left" | "top-right" | "center" | "bottom-left" | "bottom-right")
    | null,
): Promise<string[] | { error: string }> {
  const uploadedMediaUrls: string[] = [];

  try {
    for (const file of media) {
      // Sanitize the file name
      const sanitizedFileName = sanitizeFileName(file.file_name || "file");

      // Convert base64 to Blob
      const base64Response = await fetch(file.media_url);
      const originalBlob = await base64Response.blob();

      let blobToUpload = originalBlob;

      // Apply watermark only for images
      if (enableWatermark && file.type === "image") {
        try {
          const watermarkedBlob = await addWatermark(
            file.media_url,
            selectedLogo,
            customWatermarkFile || null,
            position || "center",
            opacity,
          );
          blobToUpload = watermarkedBlob;
        } catch (error) {
          // If watermarking fails, return an error and stop the process
          return { error: `Error adding watermark: ${error}` };
        }
      }

      const currentTime = Date.now();
      const filePath = `${file.type}/${currentTime}_${sanitizedFileName}`;

      // Upload the file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("media")
        .upload(filePath, blobToUpload, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        return {
          error: `Error uploading media to Supabase: ${uploadError.message}`,
        };
      }

      const publicUrl = supabase.storage.from("media").getPublicUrl(filePath)
        .data.publicUrl;
      uploadedMediaUrls.push(publicUrl);

      let thumbnailUrl: string | undefined;

      if (file.type === "video") {
        try {
          const thumbnailBlob = await generateVideoThumbnail(blobToUpload);
          if (thumbnailBlob) {
            const thumbnailPath = `thumbnails/${currentTime}_${sanitizedFileName}.jpg`;
            const { error: thumbError } = await supabase.storage
              .from("media")
              .upload(thumbnailPath, thumbnailBlob, {
                cacheControl: "3600",
                upsert: true,
              });

            if (thumbError) {
              return {
                error: `Error uploading video thumbnail: ${thumbError.message}`,
              };
            }

            thumbnailUrl = supabase.storage
              .from("media")
              .getPublicUrl(thumbnailPath).data.publicUrl;
          }
        } catch (error) {
          return {
            error: `Error generating or uploading video thumbnail: ${error}`,
          };
        }
      } else if (file.type === "image" && thumbnail) {
        try {
          const byteCharacters = atob(thumbnail.split(",")[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const thumbnailBlob = new Blob([byteArray], { type: "image/jpeg" });

          const thumbnailPath = `thumbnails/${currentTime}_${sanitizedFileName}.jpg`;
          const { error: thumbError } = await supabase.storage
            .from("media")
            .upload(thumbnailPath, thumbnailBlob, {
              cacheControl: "3600",
              upsert: true,
            });

          if (thumbError) {
            return {
              error: `Error uploading image thumbnail: ${thumbError.message}`,
            };
          }

          thumbnailUrl = supabase.storage
            .from("media")
            .getPublicUrl(thumbnailPath).data.publicUrl;
        } catch (error) {
          return {
            error: `Error converting and uploading thumbnail: ${error}`,
          };
        }
      }

      // If no thumbnail is generated, use a default image
      if (!thumbnailUrl) {
        thumbnailUrl = DEFAULT_THUMBNAIL;
      }

      // Insert media metadata into the "media" table
      const { error: insertError } = await supabase.from("media").insert([
        {
          portfolio_id: Number(portfolioId),
          media_name: file.media_name || "",
          media_desc: file.media_desc || "",
          custom_data: file.custom_data || [],
          media_url: publicUrl,
          thumbnail_url: thumbnailUrl,
          type: file.type,
          file_name: sanitizedFileName, // Use sanitized file name
          storage_id: uploadData.id,
          size: file.size,
        },
      ]);

      if (insertError) {
        return {
          error: `Error inserting media metadata into table: ${insertError.message}`,
        };
      }
    }
  } catch (error) {
    return { error: `Error in uploadMediaToSupabase: ${error}` };
  }

  return uploadedMediaUrls;
}

export const associateMediaWithPortfolio = async (
  media: DbMediaType[],
  portfolioId: string,
  mediaUrls: string[],
): Promise<void> => {
  try {
    for (let i = 0; i < media.length; i++) {
      const file = media[i];
      const publicUrl = mediaUrls[i];

      // Insert media metadata for the second portfolio
      const { data: insertData, error: insertError } = await supabase
        .from("media")
        .insert([
          {
            portfolio_id: Number(portfolioId),
            media_name: file.media_name || "",
            media_desc: file.media_desc || "",
            custom_data: file.custom_data || [],
            media_url: publicUrl,
            type: file.type,
            file_name: file.file_name || "",
            storage_id: file.storage_id, // Re-use storage ID from the first upload
          },
        ]);

      if (insertError) {
        console.error(
          "Error associating media with second portfolio:",
          insertError.message,
        );
      } else {
        console.log("Associated media with second portfolio:", insertData);
      }
    }
  } catch (error) {
    console.error("Error in associateMediaWithPortfolio:", error);
  }
};
