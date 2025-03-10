import { Metadata } from "next";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Customer Management",
  description: "Manage your customers and their information",
};

export default async function CustomersPage() {
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

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Customer Management"
        text="Manage your customers and their information"
      />
      <div className="flex h-[calc(100vh-10rem)] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">
            Customer Management Coming Soon
          </h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            The Customer Management interface is under development. Check back
            soon for updates.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
