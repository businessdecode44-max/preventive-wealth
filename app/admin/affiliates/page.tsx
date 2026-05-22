import { AdminPayoutControls } from "@/components/AdminPayoutControls";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Affiliate Admin | Preventive Wealth"
};

type AffiliateOrder = {
  id: string;
  product_name: string | null;
  customer_email: string | null;
  amount_cents: number;
  commission_cents: number;
  payout_status: string;
  created_at: string;
  affiliates: {
    name: string;
    email: string;
    slug: string;
  } | null;
};

type SupabaseAffiliateOrder = Omit<AffiliateOrder, "affiliates"> & {
  affiliates:
    | {
        name: string;
        email: string;
        slug: string;
      }
    | {
        name: string;
        email: string;
        slug: string;
      }[]
    | null;
};

type Affiliate = {
  id: string;
  name: string;
  email: string;
  slug: string;
  status: string;
  commission_rate: number;
  created_at: string;
};

function money(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(cents / 100);
}

export default async function AffiliateAdminPage() {
  const supabase = getSupabaseAdmin();
  const [{ data: affiliates }, { data: orders }] = await Promise.all([
    supabase
      .from("affiliates")
      .select("id,name,email,slug,status,commission_rate,created_at")
      .order("created_at", { ascending: false }),
    supabase
      .from("affiliate_orders")
      .select("id,product_name,customer_email,amount_cents,commission_cents,payout_status,created_at,affiliates(name,email,slug)")
      .order("created_at", { ascending: false })
  ]);

  const affiliateRows = (affiliates || []) as Affiliate[];
  const orderRows = ((orders || []) as SupabaseAffiliateOrder[]).map((order) => ({
    ...order,
    affiliates: Array.isArray(order.affiliates) ? order.affiliates[0] || null : order.affiliates
  }));
  const unpaidTotal = orderRows
    .filter((order) => order.payout_status !== "paid")
    .reduce((total, order) => total + Number(order.commission_cents || 0), 0);

  return (
    <main className="admin-page">
      <section className="section admin-section">
        <div className="section-heading align-left">
          <p className="section-kicker">Affiliate Admin</p>
          <h1>Commission and payout tracking</h1>
          <p>Review affiliate applications, tracked purchases, commissions owed, and payout status.</p>
        </div>

        <div className="admin-summary">
          <article>
            <span>Affiliates</span>
            <strong>{affiliateRows.length}</strong>
          </article>
          <article>
            <span>Tracked Orders</span>
            <strong>{orderRows.length}</strong>
          </article>
          <article>
            <span>Unpaid Commission</span>
            <strong>{money(unpaidTotal)}</strong>
          </article>
        </div>

        <h2>Affiliate Applications</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Code</th>
                <th>Status</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              {affiliateRows.map((affiliate) => (
                <tr key={affiliate.id}>
                  <td>{affiliate.name}</td>
                  <td>{affiliate.email}</td>
                  <td>{affiliate.slug}</td>
                  <td>{affiliate.status}</td>
                  <td>{Math.round(Number(affiliate.commission_rate || 0) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Commission Report</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Affiliate</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Sale</th>
                <th>Commission</th>
                <th>Payout</th>
              </tr>
            </thead>
            <tbody>
              {orderRows.map((order) => (
                <tr key={order.id}>
                  <td>{new Date(order.created_at).toLocaleDateString("en-US")}</td>
                  <td>{order.affiliates ? `${order.affiliates.name} (${order.affiliates.slug})` : "Unknown"}</td>
                  <td>{order.product_name || "Product"}</td>
                  <td>{order.customer_email || "Not provided"}</td>
                  <td>{money(Number(order.amount_cents || 0))}</td>
                  <td>{money(Number(order.commission_cents || 0))}</td>
                  <td>
                    <AdminPayoutControls orderId={order.id} initialStatus={order.payout_status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
