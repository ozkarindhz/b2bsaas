import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { UserNav } from "@/components/layout/user-nav";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function SiteHeader() {
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let userData = null;
  if (session) {
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    userData = {
      ...user,
      email: session.user.email,
    };
  }

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "POS",
      href: "/pos",
    },
    {
      title: "Inventory",
      href: "/inventory",
    },
    {
      title: "Customers",
      href: "/customers",
    },
    {
      title: "Settings",
      href: "/settings",
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={mainNavItems} />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitcher />
          {userData && <UserNav user={userData} />}
        </div>
      </div>
    </header>
  );
}
