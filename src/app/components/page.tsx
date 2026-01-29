"use client";

import { BlogCard } from "@/components/custom/blog-card";
import { FeatureCard } from "@/components/custom/feature-card";
import { InteractiveCard } from "@/components/custom/interactive-card";
import { PricingCard } from "@/components/custom/pricing-card";
import { StatisticsCard } from "@/components/custom/statistics-card";
import { TestimonialCard } from "@/components/custom/testimonial-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  Copy,
  DollarSign,
  Github,
  Lightbulb,
  MessageSquare,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-2xl font-bold">Components</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://github.com/tahmidbintaslim/unicorn-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Source
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Component Library</h2>
          <p className="text-muted-foreground max-w-2xl">
            Browse our collection of 6 beautiful, accessible, and customizable
            components. Each component is built with TypeScript, includes live
            interactive previews, and comes with copy-paste code examples.
          </p>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Interactive Card Component */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-500" />
                  <CardTitle className="text-lg">Interactive Card</CardTitle>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
              <CardDescription>
                A beautiful card component with hover effects, animations, and
                flexible content layout.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Live Preview */}
                <div className="border rounded-lg p-4 bg-muted/50">
                  <InteractiveCard
                    title="Product Launch"
                    description="Join us for the biggest tech event of the year! Discover innovations that will shape the future."
                    badge="Live"
                    badgeVariant="destructive"
                    hoverEffect={true}
                    actionText="Register Now"
                    onAction={() => alert("Registration clicked!")}
                    className="max-w-sm mx-auto"
                  />
                </div>

                {/* Code Example */}
                <div className="text-xs bg-gray-100 rounded p-2 font-mono">
                  <code>{`<InteractiveCard
  title="Product Launch"
  description="Join us for the biggest tech event"
  badge="Live"
  actionText="Register Now"
  onAction={() => alert("Clicked!")}
/>`}</code>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`import { InteractiveCard } from "@/components/custom/interactive-card";

<InteractiveCard
  title="Product Launch"
  description="Join us for the biggest tech event of the year!"
  badge="Live"
  badgeVariant="destructive"
  hoverEffect={true}
  actionText="Register Now"
  onAction={() => alert("Registration clicked!")}
/>`);
                      toast.success("Code copied to clipboard!");
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/components/interactive-card">
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Card Component */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <CardTitle className="text-lg">Pricing Card</CardTitle>
                </div>
                <Badge variant="outline">Popular</Badge>
              </div>
              <CardDescription>
                Professional pricing cards with features list, call-to-action
                buttons, and responsive design.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Live Preview */}
                <div className="border rounded-lg p-4 bg-muted/50">
                  <PricingCard
                    name="Pro Plan"
                    description="Perfect for growing teams"
                    price={29}
                    currency="$"
                    period="month"
                    features={[
                      { text: "Unlimited projects", included: true },
                      { text: "Priority support", included: true },
                      { text: "Advanced analytics", included: true },
                      { text: "Custom integrations", included: false },
                    ]}
                    ctaText="Start Free Trial"
                    popular={true}
                    onSelect={() => alert("Plan selected!")}
                    className="max-w-sm mx-auto"
                  />
                </div>

                {/* Code Example */}
                <div className="text-xs bg-gray-100 rounded p-2 font-mono">
                  <code>{`<PricingCard
  name="Pro Plan"
  price={29}
  features={[...]}
  popular={true}
  onSelect={() => {...}}
/>`}</code>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`import { PricingCard } from "@/components/custom/pricing-card";

<PricingCard
  name="Pro Plan"
  description="Perfect for growing teams"
  price={29}
  currency="$"
  period="month"
  features={[
    { text: "Unlimited projects", included: true },
    { text: "Priority support", included: true },
    { text: "Advanced analytics", included: true },
    { text: "Custom integrations", included: false }
  ]}
  ctaText="Start Free Trial"
  popular={true}
  onSelect={() => alert("Plan selected!")}
/>`);
                      toast.success("Code copied to clipboard!");
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/components/pricing-card">View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Card Component */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  <CardTitle className="text-lg">Statistics Card</CardTitle>
                </div>
                <Badge variant="secondary">Analytics</Badge>
              </div>
              <CardDescription>
                Display key metrics and statistics with beautiful icons and
                trend indicators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Live Preview */}
                <div className="border rounded-lg p-4 bg-muted/50 grid grid-cols-1 gap-3">
                  <StatisticsCard
                    title="Total Revenue"
                    value={45231}
                    prefix="$"
                    change={20.1}
                    changePeriod="from last month"
                    icon={DollarSign}
                    iconColor="text-green-600"
                    className="max-w-sm mx-auto"
                  />
                  <StatisticsCard
                    title="Active Users"
                    value="12.5K"
                    change={-2.4}
                    changePeriod="from last week"
                    icon={Users}
                    iconColor="text-blue-600"
                    className="max-w-sm mx-auto"
                  />
                </div>

                {/* Code Example */}
                <div className="text-xs bg-gray-100 rounded p-2 font-mono">
                  <code>{`<StatisticsCard
  title="Total Revenue"
  value={45231}
  prefix="$"
  change={20.1}
  icon={DollarSign}
/>`}</code>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`import { StatisticsCard } from "@/components/custom/statistics-card";
import { DollarSign } from "lucide-react";

<StatisticsCard
  title="Total Revenue"
  value={45231}
  prefix="$"
  change={20.1}
  changePeriod="from last month"
  icon={DollarSign}
  iconColor="text-green-600"
/>`);
                      toast.success("Code copied to clipboard!");
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/components/statistics-card">View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Card Component */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-pink-500" />
                  <CardTitle className="text-lg">Testimonial Card</CardTitle>
                </div>
                <Badge variant="outline">Social</Badge>
              </div>
              <CardDescription>
                Beautiful testimonial cards with ratings, user avatars, and
                authentic customer feedback.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Live Preview */}
                <div className="border rounded-lg p-4 bg-muted/50">
                  <TestimonialCard
                    testimonial="This component library has saved our team countless hours. The components are beautiful, accessible, and easy to use!"
                    author="Alex Chen"
                    role="Frontend Developer"
                    company="InnovateTech"
                    rating={5}
                    variant="elevated"
                    className="max-w-sm mx-auto"
                  />
                </div>

                {/* Code Example */}
                <div className="text-xs bg-gray-100 rounded p-2 font-mono">
                  <code>{`<TestimonialCard
  testimonial="Amazing components!"
  author="Alex Chen"
  role="Frontend Developer"
  rating={5}
/>`}</code>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`import { TestimonialCard } from "@/components/custom/testimonial-card";

<TestimonialCard
  testimonial="This component library has saved our team countless hours. The components are beautiful, accessible, and easy to use!"
  author="Alex Chen"
  role="Frontend Developer"
  company="InnovateTech"
  rating={5}
  variant="elevated"
/>`);
                      toast.success("Code copied to clipboard!");
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/components/testimonial-card">
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feature Card Component */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <CardTitle className="text-lg">Feature Card</CardTitle>
                </div>
                <Badge variant="secondary">Featured</Badge>
              </div>
              <CardDescription>
                Showcase product features with icons, descriptions, and
                call-to-action elements in vertical or horizontal layouts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Live Preview */}
                <div className="border rounded-lg p-4 bg-muted/50 space-y-4">
                  <FeatureCard
                    title="Advanced Analytics"
                    description="Get detailed insights with our powerful analytics dashboard"
                    icon={BarChart3}
                    iconColor="text-blue-600"
                    iconBg="bg-blue-100"
                    badge="Popular"
                    ctaText="Explore Analytics"
                    onCtaClick={() => alert("Analytics clicked!")}
                    className="max-w-sm mx-auto"
                    hoverEffect={true}
                  />
                  <FeatureCard
                    title="Team Collaboration"
                    description="Work together seamlessly with real-time collaboration tools"
                    icon={Users}
                    iconColor="text-green-600"
                    iconBg="bg-green-100"
                    orientation="horizontal"
                    ctaText="Learn More"
                    onCtaClick={() => alert("Collaboration clicked!")}
                    className="max-w-sm mx-auto"
                  />
                </div>

                {/* Code Example */}
                <div className="text-xs bg-gray-100 rounded p-2 font-mono">
                  <code>{`<FeatureCard
  title="Advanced Analytics"
  description="Get detailed insights..."
  icon={BarChart3}
  badge="Popular"
  ctaText="Explore"
/>`}</code>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`import { FeatureCard } from "@/components/custom/feature-card";
import { BarChart3 } from "lucide-react";

<FeatureCard
  title="Advanced Analytics"
  description="Get detailed insights with our powerful analytics dashboard"
  icon={BarChart3}
  iconColor="text-blue-600"
  iconBg="bg-blue-100"
  badge="Popular"
  ctaText="Explore Analytics"
  onCtaClick={() => alert("Analytics clicked!")}
  hoverEffect={true}
/>`);
                      toast.success("Code copied to clipboard!");
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/components/feature-card">View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Blog Card Component */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  <CardTitle className="text-lg">Blog Card</CardTitle>
                </div>
                <Badge variant="outline">Content</Badge>
              </div>
              <CardDescription>
                Perfect for blog posts, articles, and news content with images,
                metadata, and multiple layout variants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Live Preview */}
                <div className="border rounded-lg p-4 bg-muted/50 space-y-4">
                  <BlogCard
                    title="Building Modern UI Components"
                    excerpt="Learn how to create beautiful, reusable UI components with TypeScript, Tailwind CSS, and modern React patterns."
                    author="Sarah Wilson"
                    date="2024-01-15"
                    readTime="8 min read"
                    category="React"
                    categoryColor="bg-blue-100 text-blue-800"
                    likes={127}
                    className="max-w-sm mx-auto"
                    variant="default"
                  />
                  <BlogCard
                    title="Advanced TypeScript Tips"
                    excerpt="Discover advanced TypeScript techniques for better code quality and developer experience."
                    author="Mike Chen"
                    date="2024-01-10"
                    readTime="6 min read"
                    category="TypeScript"
                    categoryColor="bg-purple-100 text-purple-800"
                    likes={89}
                    className="max-w-sm mx-auto"
                    variant="horizontal"
                  />
                </div>

                {/* Code Example */}
                <div className="text-xs bg-gray-100 rounded p-2 font-mono">
                  <code>{`<BlogCard
  title="Building Modern UI Components"
  excerpt="Learn how to create beautiful..."
  author="Sarah Wilson"
  date="2024-01-15"
  category="React"
  likes={127}
/>`}</code>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`import { BlogCard } from "@/components/custom/blog-card";

<BlogCard
  title="Building Modern UI Components"
  excerpt="Learn how to create beautiful, reusable UI components with TypeScript, Tailwind CSS, and modern React patterns."
  author="Sarah Wilson"
  date="2024-01-15"
  readTime="8 min read"
  category="React"
  categoryColor="bg-blue-100 text-blue-800"
  likes={127}
  variant="default"
/>`);
                      toast.success("Code copied to clipboard!");
                    }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Code
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/components/blog-card">View Details</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Want to Contribute?</CardTitle>
              <CardDescription>
                Help us build an even better component library. Contribute new
                components, fix bugs, or improve documentation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <a
                    href="https://github.com/tahmidbintaslim/unicorn-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Contribute on GitHub
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
