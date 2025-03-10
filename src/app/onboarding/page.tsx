import { Metadata } from "next";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Set up your business",
};

export default async function OnboardingPage() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  // Check if user already has a tenant
  const { data: userData } = await supabase
    .from("users")
    .select("tenant_id")
    .eq("id", session.user.id)
    .single();

  if (userData?.tenant_id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <ShoppingCart className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">POS SaaS</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center py-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[550px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Set up your business
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your business information to get started
            </p>
          </div>
          <OnboardingForm userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}
