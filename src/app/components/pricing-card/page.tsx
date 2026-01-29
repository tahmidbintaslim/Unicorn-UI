"use client";

import { PricingCard } from "@/components/custom/pricing-card";
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
import { ArrowLeft, Copy } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function PricingCardPage() {
  // clipboard state is not needed currently

  const basicUsageCode = `import { PricingCard } from "@/components/custom/pricing-card";

export default function Example() {
  return (
    <PricingCard
      name="Pro Plan"
      description="Perfect for growing teams"
      price={29}
      currency="$"
      period="month"
      features={[
        { text: "Unlimited projects", included: true },
        { text: "Priority support", included: true },
        { text: "Advanced analytics", included: true }
      ]}
      ctaText="Start Free Trial"
      onSelect={() => console.log("Plan selected")}
    />
  );
}`;

  const advancedUsageCode = `import { PricingCard } from "@/components/custom/pricing-card";

export default function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PricingCard
        name="Starter"
        description="Perfect for individuals"
        price={9}
        currency="$"
        period="month"
        features={[
          { text: "5 projects", included: true },
          { text: "Basic support", included: true },
          { text: "Standard analytics", included: true },
          { text: "Premium features", included: false }
        ]}
        ctaText="Get Started"
        onSelect={() => console.log("Starter selected")}
      />

      <PricingCard
        name="Pro"
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
        onSelect={() => console.log("Pro selected")}
      />

      <PricingCard
        name="Enterprise"
        description="For large organizations"
        price={99}
        currency="$"
        period="month"
        features={[
          { text: "Everything in Pro", included: true },
          { text: "Custom integrations", included: true },
          { text: "Dedicated support", included: true },
          { text: "SLA guarantee", included: true }
        ]}
        ctaText="Contact Sales"
        onSelect={() => console.log("Enterprise selected")}
      />
    </div>
  );
}`;

  const propsData = [
    {
      prop: "name",
      type: "string",
      required: true,
      description: "The name/title of the pricing plan",
    },
    {
      prop: "description",
      type: "string",
      required: true,
      description: "Brief description of the plan",
    },
    {
      prop: "price",
      type: "number",
      required: true,
      description: "The price amount",
    },
    {
      prop: "currency",
      type: "string",
      required: false,
      default: "$",
      description: "Currency symbol",
    },
    {
      prop: "period",
      type: "string",
      required: false,
      default: "month",
      description: "Billing period",
    },
    {
      prop: "features",
      type: "Feature[]",
      required: true,
      description: "Array of features with included status",
    },
    {
      prop: "ctaText",
      type: "string",
      required: false,
      default: "Get Started",
      description: "Call-to-action button text",
    },
    {
      prop: "popular",
      type: "boolean",
      required: false,
      default: false,
      description: "Highlights the plan as popular",
    },
    {
      prop: "onSelect",
      type: "function",
      required: false,
      description: "Callback when CTA is clicked",
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
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">$</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Pricing Card</h1>
                  <p className="text-sm text-muted-foreground">
                    Professional pricing cards with features and CTA
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
                  Interactive pricing card component with hover effects and
                  responsive design.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
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
                    onSelect={() => toast.success("Plan selected!")}
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
                  Simple pricing card implementation
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
                  Pricing table with multiple plans
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
