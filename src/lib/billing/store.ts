import type { SupabaseClient } from "@supabase/supabase-js";
import type { BillingStore } from "./sync";

/** BillingStore backed by the Supabase service-role client. */
export function supabaseBillingStore(db: SupabaseClient): BillingStore {
  const check = (error: { message: string } | null) => {
    if (error) throw new Error(error.message);
  };
  return {
    async alreadyProcessed(id) {
      const { data, error } = await db.from("stripe_events").select("id").eq("id", id).maybeSingle();
      check(error);
      return !!data;
    },
    async markProcessed(id, type) {
      const { error } = await db.from("stripe_events").upsert({ id, type });
      check(error);
    },
    async linkCheckout(userId, customerId) {
      const { error } = await db.from("profiles").update({ stripe_customer_id: customerId, updated_at: new Date().toISOString() }).eq("id", userId);
      check(error);
    },
    async updateByCustomer(customerId, patch) {
      const { error } = await db.from("profiles").update({ ...patch, updated_at: new Date().toISOString() }).eq("stripe_customer_id", customerId);
      check(error);
    },
  };
}
