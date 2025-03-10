import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  ArrowRight,
  CheckCircle,
  ShoppingCart,
  BarChart,
  Users,
  Settings,
  Shield,
} from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <ShoppingCart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">POS SaaS</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <Link href="/auth/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/auth/register" className="hidden sm:block">
              <Button>Sign Up Free</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                    Modern Point of Sale for Your Business
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-2xl">
                    A comprehensive SaaS POS solution with inventory management,
                    CRM, and business analytics.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button
                      size="lg"
                      className="w-full min-[400px]:w-auto gap-1"
                    >
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full min-[400px]:w-auto"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-primary" />
                    <span>14-day free trial</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] lg:h-[550px] lg:w-[550px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-foreground/20 rounded-full opacity-20 blur-3xl"></div>
                  <div className="relative h-full w-full bg-muted rounded-lg border border-border shadow-xl overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=800&q=80"
                      alt="POS System Dashboard"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brands Section */}
        <section className="w-full py-12 md:py-16 lg:py-20 border-y bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-xl font-medium tracking-tight md:text-2xl">
                  Trusted by businesses worldwide
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 opacity-70">
                {["Amazon", "Microsoft", "Shopify", "Spotify", "Airbnb"].map(
                  (brand) => (
                    <div
                      key={brand}
                      className="flex items-center justify-center"
                    >
                      <span className="text-xl font-bold">{brand}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything You Need to Run Your Business
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to manage your
                  business efficiently
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Point of Sale</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Fast and intuitive sales interface with barcode scanning and
                  multiple payment methods.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Inventory Management</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Real-time stock tracking, low stock alerts, and automated
                  reordering.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">CRM</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Customer database with purchase history, loyalty program, and
                  marketing campaigns.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Project Management</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Project creation, task assignment, and resource allocation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Analytics</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Sales analytics, inventory optimization, and business
                  performance metrics.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Multi-tenant</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Support for multiple businesses, users, and locations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, Transparent Pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that fits your business needs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              {/* Starter Plan */}
              <div className="flex flex-col rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <div className="mt-4 flex items-baseline text-3xl font-bold">
                    $29
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Perfect for small businesses just getting started
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "1 Location",
                      "Up to 3 Users",
                      "Basic Inventory",
                      "Customer Database",
                      "Standard Reports",
                    ].map((feature) => (
                      <li key={feature} className="flex">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto p-6 pt-0">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>

              {/* Professional Plan */}
              <div className="flex flex-col rounded-lg border bg-background shadow-sm relative transition-all hover:shadow-md">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-0 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Professional</h3>
                  <div className="mt-4 flex items-baseline text-3xl font-bold">
                    $79
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    For growing businesses with multiple locations
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Up to 5 Locations",
                      "Unlimited Users",
                      "Advanced Inventory",
                      "CRM with Loyalty Program",
                      "Advanced Analytics",
                      "API Access",
                    ].map((feature) => (
                      <li key={feature} className="flex">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto p-6 pt-0">
                  <Button className="w-full">Get Started</Button>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-lg border bg-background shadow-sm transition-all hover:shadow-md">
                <div className="p-6">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <div className="mt-4 flex items-baseline text-3xl font-bold">
                    $199
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    For large businesses with complex requirements
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Unlimited Locations",
                      "Unlimited Users",
                      "Custom Integrations",
                      "Dedicated Support",
                      "White Labeling",
                      "Custom Development",
                    ].map((feature) => (
                      <li key={feature} className="flex">
                        <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto p-6 pt-0">
                  <Button className="w-full">Contact Sales</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it - hear from some of our
                  satisfied customers
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "This POS system has transformed how we run our retail store. The inventory management is seamless and the analytics help us make better business decisions.",
                  author: "Sarah Johnson",
                  role: "Retail Store Owner",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
                },
                {
                  quote:
                    "We've tried several POS solutions, but this one stands out for its ease of use and comprehensive feature set. Our staff needed minimal training to get started.",
                  author: "Michael Chen",
                  role: "Restaurant Manager",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
                },
                {
                  quote:
                    "The multi-location support has been a game-changer for our growing business. We can manage all our stores from a single dashboard with real-time data.",
                  author: "Jessica Williams",
                  role: "Franchise Owner",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="flex-1">
                    <p className="text-muted-foreground">
                      "{testimonial.quote}"
                    </p>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="h-10 w-10 mr-3 rounded-full overflow-hidden relative">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.author}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  FAQ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Frequently Asked Questions
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our POS system
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 py-12">
              {[
                {
                  question: "How does the 14-day free trial work?",
                  answer:
                    "You can sign up for a free 14-day trial with full access to all features. No credit card is required to start. At the end of the trial, you can choose a plan that fits your business needs.",
                },
                {
                  question: "Can I use the system offline?",
                  answer:
                    "Yes, our POS system has offline capabilities. You can continue processing sales even without an internet connection, and the data will sync automatically once you're back online.",
                },
                {
                  question:
                    "Is there a limit to the number of products I can add?",
                  answer:
                    "No, there's no limit to the number of products you can add to your inventory, regardless of which plan you choose.",
                },
                {
                  question: "How secure is my business data?",
                  answer:
                    "We take security seriously. All data is encrypted both in transit and at rest. We use industry-standard security practices and regular backups to ensure your data is safe.",
                },
                {
                  question: "Can I integrate with my existing systems?",
                  answer:
                    "Yes, our system offers API access for custom integrations. We also have pre-built integrations with popular accounting software, e-commerce platforms, and payment processors.",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border bg-background p-6"
                >
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Business?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of businesses already using our POS system
                </p>
              </div>
              <div className="mx-auto w-full max-w-sm space-y-2">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="w-full bg-background text-foreground hover:bg-background/90"
                  >
                    Start Your Free Trial
                  </Button>
                </Link>
                <p className="text-xs">
                  No credit card required. 14-day free trial.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
              <ShoppingCart className="h-3 w-3 text-primary-foreground" />
            </div>
            <p className="text-sm font-medium">
              &copy; {new Date().getFullYear()} POS SaaS. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:underline hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:underline hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
