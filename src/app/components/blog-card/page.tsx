"use client";

import { BlogCard } from "@/components/custom/blog-card";
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
import { ArrowLeft, BookOpen, Copy } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function BlogCardPage() {
  const basicUsageCode = `import { BlogCard } from "@/components/custom/blog-card";

export default function Example() {
  return (
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
    />
  );
}`;

  const advancedUsageCode = `import { BlogCard } from "@/components/custom/blog-card";

export default function Example() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      />

      <BlogCard
        title="Mastering TypeScript Generics"
        excerpt="Deep dive into TypeScript generics with practical examples and real-world use cases."
        author="Alex Chen"
        date="2024-01-12"
        readTime="12 min read"
        category="TypeScript"
        categoryColor="bg-green-100 text-green-800"
        likes={89}
        variant="elevated"
      />

      <BlogCard
        title="CSS Grid vs Flexbox: When to Use What"
        excerpt="Understanding the differences between CSS Grid and Flexbox to choose the right layout system for your project."
        author="Emma Davis"
        date="2024-01-10"
        readTime="6 min read"
        category="CSS"
        categoryColor="bg-purple-100 text-purple-800"
        likes={156}
        variant="outlined"
      />

      <BlogCard
        title="Optimizing React Performance"
        excerpt="Advanced techniques for improving React application performance and reducing bundle sizes."
        author="Mike Rodriguez"
        date="2024-01-08"
        readTime="15 min read"
        category="Performance"
        categoryColor="bg-orange-100 text-orange-800"
        likes={203}
        variant="default"
      />

      <BlogCard
        title="Building Accessible Web Applications"
        excerpt="Essential practices for creating inclusive web experiences that work for everyone."
        author="Lisa Park"
        date="2024-01-05"
        readTime="10 min read"
        category="Accessibility"
        categoryColor="bg-pink-100 text-pink-800"
        likes={178}
        variant="elevated"
      />

      <BlogCard
        title="State Management in 2024"
        excerpt="Comparing modern state management solutions for React applications."
        author="David Kim"
        date="2024-01-03"
        readTime="14 min read"
        category="State Management"
        categoryColor="bg-indigo-100 text-indigo-800"
        likes={145}
        variant="outlined"
      />
    </div>
  );
}`;

  const propsData = [
    {
      prop: "title",
      type: "string",
      required: true,
      description: "The blog post title",
    },
    {
      prop: "excerpt",
      type: "string",
      required: true,
      description: "Brief summary of the blog post",
    },
    {
      prop: "author",
      type: "string",
      required: true,
      description: "Name of the blog post author",
    },
    {
      prop: "date",
      type: "string",
      required: true,
      description: "Publication date (ISO format recommended)",
    },
    {
      prop: "readTime",
      type: "string",
      required: false,
      description: "Estimated reading time",
    },
    {
      prop: "category",
      type: "string",
      required: false,
      description: "Blog post category/tag",
    },
    {
      prop: "categoryColor",
      type: "string",
      required: false,
      default: "bg-gray-100 text-gray-800",
      description: "Tailwind CSS classes for category badge",
    },
    {
      prop: "likes",
      type: "number",
      required: false,
      description: "Number of likes/reactions",
    },
    {
      prop: "variant",
      type: "string",
      required: false,
      default: "default",
      description: "Visual style variant",
    },
    {
      prop: "image",
      type: "string",
      required: false,
      description: "URL to blog post featured image",
    },
    {
      prop: "onClick",
      type: "function",
      required: false,
      description: "Callback when card is clicked",
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
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Blog Card</h1>
                  <p className="text-sm text-muted-foreground">
                    Beautiful blog post cards with metadata
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
                  Blog card with author info, categories, reading time, and like
                  counts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
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
                  Simple blog card with essential metadata
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
                  Blog grid showcasing multiple posts with different variants
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
