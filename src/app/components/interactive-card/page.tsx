"use client";

import { InteractiveCard } from "@/components/custom/interactive-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InteractiveCardPage() {
    const [copied, setCopied] = useState(false);

    const basicUsageCode = `import { InteractiveCard } from "@/components/custom/interactive-card";

export default function Example() {
  return (
    <InteractiveCard
      title="Sample Card"
      description="This is a sample interactive card"
      badge="New"
      actionText="Learn More"
      onAction={() => console.log("Action clicked")}
    />
  );
}`;

    const advancedUsageCode = `import { InteractiveCard } from "@/components/custom/interactive-card";

export default function Example() {
  return (
    <InteractiveCard
      title="Advanced Card"
      description="This card has custom content and styling"
      badge="Premium"
      badgeVariant="secondary"
      hoverEffect={true}
      className="max-w-md"
    >
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Custom content can be added here
        </p>
        <div className="flex gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="outline">Secondary</Button>
        </div>
      </div>
    </InteractiveCard>
  );
}`;

    const componentCode = `import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface InteractiveCardProps extends Omit<React.ComponentProps<"div">, "title"> {
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  actionText?: string;
  onAction?: () => void;
}

export const InteractiveCard = React.memo<InteractiveCardProps>(({
  title,
  description,
  badge,
  badgeVariant = "default",
  children,
  className,
  hoverEffect = true,
  actionText,
  onAction,
  ...props
}) => {
  const titleId = React.useId();

  return (
    <Card
      {...props}
      className={cn(
        "border-2 transition-all duration-300",
        hoverEffect && "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
        className
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle id={titleId} className="text-lg">{title}</CardTitle>
          {badge && (
            <Badge variant={badgeVariant}>{badge}</Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {(children || actionText) && (
        <CardContent>
          {children}
          {actionText && (
            <Button
              type="button"
              onClick={onAction}
              aria-describedby={titleId}
              className="w-full mt-4"
              variant="outline"
            >
              {actionText}
            </Button>
          )}
        </CardContent>
      )}
    </Card>
  );
});

InteractiveCard.displayName = "InteractiveCard";`;

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
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
                            <div>
                                <h1 className="text-2xl font-bold">Interactive Card</h1>
                                <p className="text-sm text-muted-foreground">A card with an optional hover effect and custom content</p>
                            </div>
                        </div>
                        <Badge variant="outline">Custom Component</Badge>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Preview Section */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                                <CardDescription>
                                    See the component in action with different configurations
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Basic Example */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Basic Usage</h3>
                                    <div className="border rounded-lg p-4 bg-muted/50">
                                        <InteractiveCard
                                            title="Sample Card"
                                            description="This is a sample interactive card with hover effects"
                                            badge="New"
                                            actionText="Learn More"
                                            onAction={() => alert("Action clicked!")}
                                        />
                                    </div>
                                </div>

                                {/* Advanced Example */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">With Custom Content</h3>
                                    <div className="border rounded-lg p-4 bg-muted/50">
                                        <InteractiveCard
                                            title="Advanced Card"
                                            description="This card has custom content and styling"
                                            badge="Premium"
                                            badgeVariant="secondary"
                                            hoverEffect={true}
                                            className="max-w-md"
                                        >
                                            <div className="space-y-4">
                                                <p className="text-sm text-muted-foreground">
                                                    Custom content can be added here with buttons, images, or any other elements.
                                                </p>
                                                <div className="flex gap-2">
                                                    <Button size="sm">Primary</Button>
                                                    <Button size="sm" variant="outline">Secondary</Button>
                                                </div>
                                            </div>
                                        </InteractiveCard>
                                    </div>
                                </div>

                                {/* Without Hover Effect */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-3">Without Hover Effect</h3>
                                    <div className="border rounded-lg p-4 bg-muted/50">
                                        <InteractiveCard
                                            title="Static Card"
                                            description="This card doesn't have hover effects"
                                            badge="Static"
                                            badgeVariant="outline"
                                            hoverEffect={false}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Code Section */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Implementation</CardTitle>
                                <CardDescription>
                                    Copy the code and use it in your project
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="usage" className="w-full">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="usage">Usage</TabsTrigger>
                                        <TabsTrigger value="advanced">Advanced</TabsTrigger>
                                        <TabsTrigger value="component">Component</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="usage" className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">Basic Usage</h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(basicUsageCode)}
                                            >
                                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                {copied ? "Copied!" : "Copy"}
                                            </Button>
                                        </div>
                                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                            <code>{basicUsageCode}</code>
                                        </pre>
                                    </TabsContent>

                                    <TabsContent value="advanced" className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">Advanced Usage</h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(advancedUsageCode)}
                                            >
                                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                {copied ? "Copied!" : "Copy"}
                                            </Button>
                                        </div>
                                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                                            <code>{advancedUsageCode}</code>
                                        </pre>
                                    </TabsContent>

                                    <TabsContent value="component" className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-lg font-semibold">Full Component Code</h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => copyToClipboard(componentCode)}
                                            >
                                                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                                                {copied ? "Copied!" : "Copy"}
                                            </Button>
                                        </div>
                                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm max-h-96">
                                            <code>{componentCode}</code>
                                        </pre>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* API Reference */}
                        <Card>
                            <CardHeader>
                                <CardTitle>API Reference</CardTitle>
                                <CardDescription>
                                    All available props and their types
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { prop: "title", type: "string", required: true, description: "The card title" },
                                            { prop: "description", type: "string", required: true, description: "The card description" },
                                            { prop: "badge", type: "string", required: false, description: "Optional badge text" },
                                            { prop: "badgeVariant", type: "string", required: false, description: "Badge variant style" },
                                            { prop: "children", type: "ReactNode", required: false, description: "Custom content" },
                                            { prop: "className", type: "string", required: false, description: "Additional CSS classes" },
                                            { prop: "hoverEffect", type: "boolean", required: false, description: "Enable hover effects (default: true)" },
                                            { prop: "actionText", type: "string", required: false, description: "Action button text" },
                                            { prop: "onAction", type: "function", required: false, description: "Action button click handler" },
                                        ].map((item, index) => (
                                            <div key={index} className="border rounded-lg p-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                                                        {item.prop}
                                                    </code>
                                                    <div className="flex gap-2">
                                                        <Badge variant="outline" className="text-xs">
                                                            {item.type}
                                                        </Badge>
                                                        {item.required && (
                                                            <Badge variant="destructive" className="text-xs">
                                                                Required
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
