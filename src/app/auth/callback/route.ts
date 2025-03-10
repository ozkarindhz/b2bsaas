import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/dashboard";

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      },
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.user) {
      // Check if user exists in the users table
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      // If user doesn't exist in the users table, create a new record
      if (userError || !userData) {
        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          first_name:
            data.user.user_metadata.first_name ||
            data.user.user_metadata.name?.split(" ")[0] ||
            "",
          last_name:
            data.user.user_metadata.last_name ||
            data.user.user_metadata.name?.split(" ").slice(1).join(" ") ||
            "",
          avatar_url: data.user.user_metadata.avatar_url,
        });

        if (insertError) {
          console.error("Error creating user profile:", insertError);
        }

        // Redirect to onboarding if user doesn't have a tenant
        return NextResponse.redirect(`${origin}/onboarding`);
      }

      // If user exists but doesn't have a tenant, redirect to onboarding
      if (!userData.tenant_id) {
        return NextResponse.redirect(`${origin}/onboarding`);
      }
    }
  }

  // Redirect to the dashboard or the specified next path
  return NextResponse.redirect(`${origin}${next}`);
}
