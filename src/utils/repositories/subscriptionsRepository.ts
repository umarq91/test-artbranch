import { TierKeys } from "../../Types";
import { supabase } from "../services/supabase";

export default class SubscriptionRepository {
  private className = "subscriptions";

  public async createPaymentIntent(userId: string, selectedTier: TierKeys) {
    try {
      const { data, error } = await supabase.functions.invoke(
        "handle-payments",
        {
          body: {
            userId,
            action: "subscribe",
            tier: selectedTier,
          },
        },
      );

      if (data && !error) {
        if (data.status === "success" && data.data !== null) {
          return data.data;
        }
        return null;
      }

      return null;
    } catch (e) {
      console.error("Error creating payment intent:", e);
      return null;
    }
  }
}
