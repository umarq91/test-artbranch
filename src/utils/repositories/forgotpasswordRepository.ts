import { supabase } from "../services/supabase";

export default class ForgotPasswordRepository {
  private className = "forgot_password_requests";

  public async getSingle(identifier: string) {
    try {
      const { data: forgotPasswordData, error: forgotPasswordError } =
        await supabase
          .from(this.className)
          .select("unique_identifier, expires_at")
          .eq("unique_identifier", identifier)
          .maybeSingle();

      return { forgotPasswordData, forgotPasswordError };
    } catch (err) {
      console.error(
        "An error occured while fetching the forgot password request:",
        err,
      );
      return null;
    }
  }
}
