import { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard overview",
};

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  // Get user data with tenant and role
  const { data: userData } = await supabase
    .from("users")
    .select(
      `
      *,
      tenant:tenants(*),
      role:roles(*)
    `,
    )
    .eq("id", session.user.id)
    .single();

  if (!userData?.tenant_id) {
    redirect("/onboarding");
  }

  // Get user's default location
  const { data: locationData } = await supabase
    .from("user_locations")
    .select(
      `
      location:locations(*)
    `,
    )
    .eq("user_id", session.user.id)
    .eq("is_default", true)
    .single();

  // Get recent sales
  const { data: recentSales } = await supabase
    .from("sales")
    .select(
      `
      *,
      customer:customers(first_name, last_name),
      location:locations(name)
    `,
    )
    .eq("tenant_id", userData.tenant_id)
    .order("created_at", { ascending: false })
    .limit(5);

  // Get low stock items
  const { data: lowStockItems } = await supabase
    .from("inventory")
    .select(
      `
      *,
      product:products(name, sku, image_url)
    `,
    )
    .eq("location_id", locationData?.location.id)
    .lt("quantity", 10) // Example threshold
    .limit(5);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dashboard"
        text="Welcome to your business dashboard"
      />
      <DashboardOverview
        userData={userData}
        locationData={locationData}
        recentSales={recentSales || []}
        lowStockItems={lowStockItems || []}
      />
    </DashboardShell>
  );
}
