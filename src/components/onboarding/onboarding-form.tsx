"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessSlug: z
    .string()
    .min(2, {
      message: "Business slug must be at least 2 characters.",
    })
    .regex(/^[a-z0-9-]+$/, {
      message:
        "Business slug can only contain lowercase letters, numbers, and hyphens.",
    }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  postalCode: z.string().min(3, {
    message: "Postal code must be at least 3 characters.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  phone: z.string().min(5, {
    message: "Phone number must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  taxId: z.string().min(5, {
    message: "Tax ID must be at least 5 characters.",
  }),
  taxRate: z.string().min(1, {
    message: "Tax rate is required.",
  }),
  currency: z.string().min(1, {
    message: "Currency is required.",
  }),
});

interface OnboardingFormProps {
  userId: string;
}

export function OnboardingForm({ userId }: OnboardingFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessSlug: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
      phone: "",
      email: "",
      taxId: "",
      taxRate: "",
      currency: "USD",
    },
  });

  // Auto-generate slug from business name
  const watchBusinessName = form.watch("businessName");
  if (watchBusinessName && !form.getValues("businessSlug")) {
    const slug = watchBusinessName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    form.setValue("businessSlug", slug);
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      // Check if slug is already taken
      const { data: existingTenant, error: slugCheckError } = await supabase
        .from("tenants")
        .select("id")
        .eq("slug", values.businessSlug)
        .single();

      if (existingTenant) {
        setError(
          "This business slug is already taken. Please choose another one.",
        );
        setIsLoading(false);
        return;
      }

      // Create new tenant with additional information
      const { data: tenant, error: tenantError } = await supabase
        .from("tenants")
        .insert({
          name: values.businessName.trim(),
          slug: values.businessSlug.trim(),
          active: true,
          settings: {
            taxId: values.taxId.trim(),
            defaultTaxRate: values.taxRate,
            currency: values.currency,
            address: {
              street: values.address.trim(),
              city: values.city.trim(),
              postalCode: values.postalCode.trim(),
              country: values.country.trim(),
            },
          },
        })
        .select()
        .single();

      if (tenantError) {
        setError(tenantError.message);
        return;
      }

      // Create default admin role
      const { data: role, error: roleError } = await supabase
        .from("roles")
        .insert({
          tenant_id: tenant.id,
          name: "Admin",
          permissions: {
            admin: true,
            pos: true,
            inventory: true,
            customers: true,
            reports: true,
            settings: true,
          },
        })
        .select()
        .single();

      if (roleError) {
        setError(roleError.message);
        return;
      }

      // Create main location
      const { data: location, error: locationError } = await supabase
        .from("locations")
        .insert({
          tenant_id: tenant.id,
          name: "Main Store",
          address: `${values.address}, ${values.city}, ${values.postalCode}, ${values.country}`,
          phone: values.phone,
          email: values.email,
          is_main: true,
        })
        .select()
        .single();

      if (locationError) {
        setError(locationError.message);
        return;
      }

      // Update user with tenant and role
      const { error: userUpdateError } = await supabase
        .from("users")
        .update({
          tenant_id: tenant.id,
          role_id: role.id,
        })
        .eq("id", userId);

      if (userUpdateError) {
        setError(userUpdateError.message);
        return;
      }

      // Assign user to location
      const { error: userLocationError } = await supabase
        .from("user_locations")
        .insert({
          user_id: userId,
          location_id: location.id,
          is_default: true,
        });

      if (userLocationError) {
        setError(userLocationError.message);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="p-6 bg-card rounded-lg border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Business Information</h2>
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Awesome Store" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="my-awesome-store" {...field} />
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-muted-foreground">
                    This will be used in your unique URL: yourdomain.com/
                    {field.value}
                  </p>
                </FormItem>
              )}
            />
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">Business Address</h2>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="United States" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="store@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="p-6 bg-card rounded-lg border shadow-sm space-y-4">
            <h2 className="text-lg font-semibold">
              Tax & Financial Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="taxId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax ID / VAT Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Tax ID or VAT Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default Tax Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="21" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                      <option value="MXN">MXN - Mexican Peso</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting up your business...
              </>
            ) : (
              "Complete Setup"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
