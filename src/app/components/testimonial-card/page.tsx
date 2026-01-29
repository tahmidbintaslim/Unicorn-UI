"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Copy, Star } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function TestimonialCardPage() {
  const basicUsageCode = `import { TestimonialCard } from "@/components/custom/testimonial-card";

export default function Example() {
  return (
    <TestimonialCard
      testimonial="This component library has saved our team countless hours. The components are beautiful, accessible, and easy to use!"
      author="Alex Chen"
      role="Frontend Developer"
      company="InnovateTech"
      rating={5}
      variant="elevated"
    />
  );
}`;

  const advancedUsageCode = `import { TestimonialCard } from "@/components/custom/testimonial-card";

export default function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TestimonialCard
        testimonial="The attention to detail and accessibility features are outstanding. Our users love the smooth interactions."
        author="Sarah Johnson"
        role="Product Manager"
        company="TechCorp"
        rating={5}
        variant="default"
      />

      <TestimonialCard
        testimonial="Implementation was seamless. The TypeScript support and documentation made integration a breeze."
        author="Mike Rodriguez"
        role="Lead Developer"
        company="StartupXYZ"
        rating={4}
        variant="outlined"
      />

      <TestimonialCard
        testimonial="Beautiful design that matches our brand perfectly. The customization options are exactly what we needed."
        author="Emma Davis"
        role="Design Director"
        company="CreativeAgency"
        rating={5}
        variant="elevated"
      />

      <TestimonialCard
        testimonial="Performance is excellent and the bundle size impact is minimal. Highly recommended for production use."
        author="David Kim"
        role="CTO"
        company="ScaleUp Inc"
        rating={5}
        variant="default"
      />
    </div>
  );
}`;

  const propsData = [
    {
      prop: "testimonial",
      type: "string",
      required: true,
      description: "The testimonial text content",
    },
    {
      prop: "author",
      type: "string",
      required: true,
      description: "Name of the person giving the testimonial",
    },
    {
      prop: "role",
      type: "string",
      required: false,
      description: "Professional role/title of the author",
    },
    {
      prop: "company",
      type: "string",
      required: false,
      description: "Company name of the author",
    },
    {
      prop: "rating",
      type: "number",
      required: false,
      default: 5,
      description: "Star rating (1-5)",
    },
    {
      prop: "variant",
      type: "string",
      required: false,
      default: "default",
      description: "Visual style variant",
    },
    {
      prop: "avatar",
      type: "string",
      required: false,
      description: "URL to author's avatar image",
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
                <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <Star className="w-4 h-4 text-yellow-600 fill-current" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Testimonial Card</h1>
                  <p className="text-sm text-muted-foreground">
                    Beautiful testimonials with ratings and avatars
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
                  Testimonial card with star ratings, author info, and multiple
                  variants.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <TestimonialCard
                    testimonial="This component library has saved our team countless hours. The components are beautiful, accessible, and easy to use!"
                    author="Alex Chen"
                    role="Frontend Developer"
                    company="InnovateTech"
                    rating={5}
                    variant="elevated"
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
                  Simple testimonial card with rating and author info
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
                  Testimonial grid with multiple variants
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
