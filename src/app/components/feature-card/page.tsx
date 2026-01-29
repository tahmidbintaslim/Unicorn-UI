"use client";

import { FeatureCard } from "@/components/custom/feature-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Lightbulb } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function FeatureCardPage() {
  const basicUsageCode = `import { FeatureCard } from "@/components/custom/feature-card";
import { BarChart3 } from "lucide-react";

export default function Example() {
  return (
    <FeatureCard
      title="Advanced Analytics"
      description="Get detailed insights with our powerful analytics dashboard"
      icon={BarChart3}
      iconColor="text-blue-600"
      iconBg="bg-blue-100"
      badge="Popular"
      ctaText="Explore Analytics"
      onCtaClick={() => console.log("Analytics clicked")}
      hoverEffect={true}
    />
  );
}`;

  const advancedUsageCode = `import { FeatureCard } from "@/components/custom/feature-card";
import { BarChart3, Users, Zap, Shield } from "lucide-react";

export default function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <FeatureCard
        title="Advanced Analytics"
        description="Get detailed insights with our powerful analytics dashboard"
        icon={BarChart3}
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
        badge="Popular"
        ctaText="Explore Analytics"
        onCtaClick={() => console.log("Analytics clicked")}
        hoverEffect={true}
      />

      <FeatureCard
        title="Team Collaboration"
        description="Work together seamlessly with real-time collaboration tools"
        icon={Users}
        iconColor="text-green-600"
        iconBg="bg-green-100"
        ctaText="Learn More"
        onCtaClick={() => console.log("Collaboration clicked")}
        hoverEffect={true}
      />

      <FeatureCard
        title="Lightning Fast"
        description="Optimized performance with sub-second response times"
        icon={Zap}
        iconColor="text-yellow-600"
        iconBg="bg-yellow-100"
        badge="New"
        ctaText="See Performance"
        onCtaClick={() => console.log("Performance clicked")}
        hoverEffect={true}
      />

      <FeatureCard
        title="Enterprise Security"
        description="Bank-level security with end-to-end encryption"
        icon={Shield}
        iconColor="text-red-600"
        iconBg="bg-red-100"
        ctaText="Security Details"
        onCtaClick={() => console.log("Security clicked")}
        hoverEffect={true}
      />
    </div>
  );
}`;

  const propsData = [
    {
      prop: "title",
      type: "string",
      required: true,
      description: "The main heading of the feature",
    },
    {
      prop: "description",
      type: "string",
      required: true,
      description: "Detailed description of the feature",
    },
    {
      prop: "icon",
      type: "LucideIcon",
      required: false,
      description: "Lucide icon component to display",
    },
    {
      prop: "iconColor",
      type: "string",
      required: false,
      default: "text-muted-foreground",
      description: "Tailwind CSS classes for icon color",
    },
    {
      prop: "iconBg",
      type: "string",
      required: false,
      default: "bg-muted",
      description: "Background color for icon container",
    },
    {
      prop: "badge",
      type: "string",
      required: false,
      description: "Optional badge text (e.g., 'New', 'Popular')",
    },
    {
      prop: "ctaText",
      type: "string",
      required: false,
      default: "Learn More",
      description: "Call-to-action button text",
    },
    {
      prop: "onCtaClick",
      type: "function",
      required: false,
      description: "Callback when CTA button is clicked",
    },
    {
      prop: "hoverEffect",
      type: "boolean",
      required: false,
      default: false,
      description: "Enable hover animations",
    },
    {
      prop: "className",
      type: "string",
      required: false,
      description: "Additional CSS classes",
    },
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/components">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Components
                </Link>
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Feature Card</h1>
                  <p className="text-sm text-muted-foreground">
                    Showcase features with icons and call-to-actions
                  </p>
                </div>
              </div>
            </div>
            <Badge variant="secondary">Component</Badge>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="preview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="props">Props</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  Feature card with customizable icons, badges, and hover
                  effects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <FeatureCard
                    title="Advanced Analytics"
                    description="Get detailed insights with our powerful analytics dashboard"
                    icon={Lightbulb}
                    iconColor="text-purple-600"
                    iconBg="bg-purple-100"
                    badge="Popular"
                    ctaText="Explore Analytics"
                    onCtaClick={() => toast.success("Analytics clicked!")}
                    hoverEffect={true}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Usage</CardTitle>
                <CardDescription>
                  Simple feature card with icon and CTA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{basicUsageCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(basicUsageCode)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Usage</CardTitle>
                <CardDescription>
                  Feature grid showcasing multiple capabilities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{advancedUsageCode}</code>
                  </pre>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(advancedUsageCode)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="props" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Props API</CardTitle>
                <CardDescription>
                  Complete list of component props and their types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2 font-medium">Prop</th>
                        <th className="text-left p-2 font-medium">Type</th>
                        <th className="text-left p-2 font-medium">Required</th>
                        <th className="text-left p-2 font-medium">Default</th>
                        <th className="text-left p-2 font-medium">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {propsData.map((prop, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-mono text-blue-600">
                            {prop.prop}
                          </td>
                          <td className="p-2 font-mono text-green-600">
                            {prop.type}
                          </td>
                          <td className="p-2">
                            {prop.required ? (
                              <Badge variant="destructive" className="text-xs">
                                Yes
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                No
                              </Badge>
                            )}
                          </td>
                          <td className="p-2 font-mono text-gray-500">
                            {prop.default || "-"}
                          </td>
                          <td className="p-2">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playground" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Interactive Playground</CardTitle>
                <CardDescription>
                  Experiment with different props and see live changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <p>
                    Playground coming soon! For now, check the usage examples
                    above.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
