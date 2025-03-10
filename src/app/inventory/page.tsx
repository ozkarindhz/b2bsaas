import { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Inventory Management",
  description: "Manage your inventory and stock levels",
};

export default async function InventoryPage() {
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

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Inventory Management"
        text="Manage your products and stock levels"
      />
      <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">
            Inventory Management Coming Soon
          </h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            The Inventory Management interface is under development. Check back
            soon for updates.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
