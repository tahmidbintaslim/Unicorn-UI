"use client";

import { StatisticsCard } from "@/components/custom/statistics-card";
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
import { ArrowLeft, Copy, TrendingUp } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function StatisticsCardPage() {
  const basicUsageCode = `import { StatisticsCard } from "@/components/custom/statistics-card";
import { DollarSign } from "lucide-react";

export default function Example() {
  return (
    <StatisticsCard
      title="Total Revenue"
      value={45231}
      prefix="$"
      change={20.1}
      changePeriod="from last month"
      icon={DollarSign}
      iconColor="text-green-600"
    />
  );
}`;

  const advancedUsageCode = `import { StatisticsCard } from "@/components/custom/statistics-card";
import { Users, TrendingUp, DollarSign } from "lucide-react";

export default function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatisticsCard
        title="Total Users"
        value={12345}
        change={12.5}
        changePeriod="from last month"
        icon={Users}
        iconColor="text-blue-600"
      />

      <StatisticsCard
        title="Revenue Growth"
        value={23.8}
        suffix="%"
        change={5.2}
        changePeriod="from last quarter"
        icon={TrendingUp}
        iconColor="text-green-600"
      />

      <StatisticsCard
        title="Monthly Revenue"
        value={45231}
        prefix="$"
        change={-2.1}
        changePeriod="from last month"
        icon={DollarSign}
        iconColor="text-red-600"
      />
    </div>
  );
}`;

  const propsData = [
    {
      prop: "title",
      type: "string",
      required: true,
      description: "The title/label of the statistic",
    },
    {
      prop: "value",
      type: "number",
      required: true,
      description: "The main numerical value",
    },
    {
      prop: "prefix",
      type: "string",
      required: false,
      description: "Text to display before the value (e.g., '$')",
    },
    {
      prop: "suffix",
      type: "string",
      required: false,
      description: "Text to display after the value (e.g., '%')",
    },
    {
      prop: "change",
      type: "number",
      required: false,
      description: "Percentage change from previous period",
    },
    {
      prop: "changePeriod",
      type: "string",
      required: false,
      description: "Description of the comparison period",
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
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Statistics Card</h1>
                  <p className="text-sm text-muted-foreground">
                    Display key metrics with trend indicators
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
                  Statistics card with trend indicators and customizable icons.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <StatisticsCard
                    title="Total Revenue"
                    value={45231}
                    prefix="$"
                    change={20.1}
                    changePeriod="from last month"
                    icon={TrendingUp}
                    iconColor="text-green-600"
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
                  Simple statistics card with icon and trend
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
                  Dashboard with multiple statistics cards
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
