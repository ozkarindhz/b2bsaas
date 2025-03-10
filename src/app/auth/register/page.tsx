import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default function RegisterPage() {
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
      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your information to create an account
            </p>
          </div>
          <div className="grid gap-6">
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/auth/login"
                className="hover:text-primary underline underline-offset-4"
              >
                Already have an account? Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
