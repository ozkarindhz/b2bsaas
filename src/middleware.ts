import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const pathname = request.nextUrl.pathname;

  // Auth routes handling
  if (pathname.startsWith("/auth")) {
    if (session) {
      // If user is signed in and tries to access auth pages, redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return response;
  }

  // Protected routes handling
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/pos") ||
    pathname.startsWith("/inventory") ||
    pathname.startsWith("/customers") ||
    pathname.startsWith("/suppliers") ||
    pathname.startsWith("/reports") ||
    pathname.startsWith("/settings")
  ) {
    if (!session) {
      // If user is not signed in and tries to access protected pages, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Check if user has a tenant
    const { data: userData } = await supabase
      .from("users")
      .select("tenant_id")
      .eq("id", session.user.id)
      .single();

    // If user doesn't have a tenant and is not on the onboarding page, redirect to onboarding
    if (!userData?.tenant_id && !pathname.startsWith("/onboarding")) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    return response;
  }

  // Onboarding route handling
  if (pathname.startsWith("/onboarding")) {
    if (!session) {
      // If user is not signed in and tries to access onboarding, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // Check if user already has a tenant
    const { data: userData } = await supabase
      .from("users")
      .select("tenant_id")
      .eq("id", session.user.id)
      .single();

    // If user already has a tenant, redirect to dashboard
    if (userData?.tenant_id) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return response;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
