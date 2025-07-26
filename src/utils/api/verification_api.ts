import { supabase } from "../services/supabase";

interface VerificationRequest {
  id: string;
  social_platforms: any; // object
  proof_images: any; // object
  // rest will be handled in db
}

export async function submitVerificationRequest(body: VerificationRequest) {
  const { social_platforms, id, proof_images } = body;
  try {
    const { error } = await supabase.from("verification_requests").insert({
      user_id: id,
      social_platforms,
      proof_images,
    });

    if (error) {
      console.error("Error inserting verification request:", error);
      return { success: false, error: error.message };
    }

    return {
      success: true,
      message: "Verification request submitted successfully",
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function checkForUserStatus(id: string): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("verification_requests")
      .select("*")
      .eq("user_id", id)
      .limit(1);

    if (error) {
      console.error(`Error fetching user status: ${error.message}`);
      throw new Error(error.message);
    }

    if (data.length === 0) {
      console.warn(`No verification requests found for user ID: ${id}`);
      return null;
    }

    return data[0];
  } catch (err) {
    console.error(`Unexpected error: ${err}`);
    throw err; // Rethrow the error to be handled by the caller
  }
}

export const retryVerification = async (userId: string) => {
  const { data, error } = await supabase
    .from("verification_requests")
    .delete()
    .eq("user_id", userId);
  if (error) {
    console.log(error);
  }
  return data;
};
