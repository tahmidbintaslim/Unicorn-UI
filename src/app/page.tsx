"use client";

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
import { Accessibility, Code, Github, Palette, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  import("gsap").then(({ gsap }) => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
    });
  });
}

// Import components for live preview
import { InteractiveCard } from "@/components/custom/interactive-card";
import { PricingCard } from "@/components/custom/pricing-card";
import { StatisticsCard } from "@/components/custom/statistics-card";
import { TestimonialCard } from "@/components/custom/testimonial-card";
import { FeatureCard } from "@/components/custom/feature-card";
import { BlogCard } from "@/components/custom/blog-card";
import { Copy, Users } from "lucide-react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // Story sections animation
      const sections = gsap.utils.toArray(".story-section") as Element[];
      sections.forEach((section, index: number) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          section.querySelector(".story-text"),
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
        ).fromTo(
          section.querySelector(".story-preview"),
          { opacity: 0, scale: 0.8, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.4",
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stories = [
    {
      id: "interactive-card",
      title: "Interactive Card",
      subtitle: "Engage Your Users",
      description:
        "Create captivating card components with smooth hover effects, dynamic animations, and flexible content layouts that respond to user interactions.",
      features: [
        "Hover animations",
        "Flexible layouts",
        "Smooth transitions",
        "Accessibility focused",
      ],
      component: (
        <InteractiveCard
          title="Interactive Experience"
          description="This card responds to your hover with beautiful animations and effects."
          actionText="Learn More"
          onAction={() => console.log("Card clicked")}
        />
      ),
    },
    {
      id: "pricing-card",
      title: "Pricing Card",
      subtitle: "Convert Visitors to Customers",
      description:
        "Professional pricing tables that clearly communicate value, features, and pricing tiers to help your users make informed decisions.",
      features: [
        "Feature lists",
        "Popular badges",
        "Call-to-action buttons",
        "Responsive design",
      ],
      component: (
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
          ]}
          ctaText="Start Free Trial"
          popular={true}
          onSelect={() => console.log("Plan selected")}
        />
      ),
    },
    {
      id: "statistics-card",
      title: "Statistics Card",
      subtitle: "Show Your Impact",
      description:
        "Display a key metric with an optional icon and a percentage change that is announced in words, not by color alone.",
      features: [
        "Trend indicators",
        "Custom icons",
        "Flexible layouts",
        "Trend in words",
      ],
      component: (
        <StatisticsCard
          title="Monthly Active Users"
          value="125,430"
          change={12.5}
          changePeriod="vs last month"
          icon={Users}
        />
      ),
    },
    {
      id: "testimonial-card",
      title: "Testimonial Card",
      subtitle: "Build Trust & Credibility",
      description:
        "Show a customer quote with the author's name, role, company, an optional avatar and a star rating that screen readers announce as \"Rated N out of 5\".",
      features: [
        "Avatar support",
        "Rating display",
        "Social proof",
        "Customer quotes",
      ],
      component: (
        <TestimonialCard
          testimonial="Your customer's quote goes here: what they used, what changed for them, and why it mattered."
          author="Sarah Johnson"
          role="Product Manager"
          company="TechCorp"
          rating={5}
          avatar="/demo/avatar.webp"
        />
      ),
    },
    {
      id: "feature-card",
      title: "Feature Card",
      subtitle: "Highlight Your Strengths",
      description:
        "Showcase product features, capabilities, and benefits with visually appealing cards that guide users through your value proposition.",
      features: [
        "Icon integration",
        "Flexible layouts",
        "Call-to-action",
        "Feature highlights",
      ],
      component: (
        <FeatureCard
          title="Copy and paste"
          description="Copy the card's folder into a shadcn/ui project, import it and pass your content as props."
          icon={Copy}
          ctaText="Learn More"
          onCtaClick={() => console.log("Feature clicked")}
        />
      ),
    },
    {
      id: "blog-card",
      title: "Blog Card",
      subtitle: "Share Your Stories",
      description:
        "An article card with title, excerpt, author, date, read time, category and likes, in default, horizontal and minimal layouts.",
      features: [
        "Rich metadata",
        "Reading time",
        "Category tags",
        "Author info",
      ],
      component: (
        <BlogCard
          title="Building Modern UIs with React and TypeScript"
          excerpt="Learn how to create scalable, maintainable user interfaces using modern React patterns and TypeScript best practices."
          author="Sarah Wilson"
          date="2024-01-15"
          readTime="5 min read"
          category="Tutorial"
          image="/demo/blog-cover.webp"
        />
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-background to-muted/50"
    >
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xl font-bold">Unicorn UI</span>
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
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="outline" className="mb-4">
            <Github className="w-4 h-4 mr-2" />
            Open Source
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Unicorn UI Components
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Six card components built with React, TypeScript and Tailwind CSS
            on top of shadcn/ui. Preview each one live, then copy its code into
            your project.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/components">
                <Code className="w-4 h-4 mr-2" />
                Browse Components
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/tahmidbintaslim/unicorn-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What the cards give you</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Plain React components that use the shadcn/ui theme variables, so
            they follow your light and dark themes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Built on shadcn/ui</CardTitle>
              <CardDescription>
                Each card is made from the shadcn/ui card, button and badge
                primitives and the same theme variables.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Accessibility className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Accessible markup</CardTitle>
              <CardDescription>
                Real lists, figure and blockquote, a time element, ratings and
                trends in words, and no button nested in a link.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Typed and customizable</CardTitle>
              <CardDescription>
                Typed props, forwarded refs, and a className that is merged over
                the defaults with tailwind-merge.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Component Stories Section */}
      <section className="py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Component Stories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Scroll through the six cards. Each one has a live preview here and
            a detail page with its props and code.
          </p>
        </div>

        {stories.map((story, index) => (
          <div
            key={story.id}
            className="story-section min-h-screen flex items-center py-20"
          >
            <div className="container mx-auto px-4">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Story Text */}
                <div
                  className={`story-text space-y-6 ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      Component #{index + 1}
                    </Badge>
                    <h3 className="text-3xl font-bold mb-2">{story.title}</h3>
                    <p className="text-xl text-primary font-medium mb-4">
                      {story.subtitle}
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      {story.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {story.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button asChild>
                    <Link href={`/components/${story.id}`}>
                      <Code className="w-4 h-4 mr-2" />
                      View Details
                    </Link>
                  </Button>
                </div>

                {/* Story Preview */}
                <div
                  className={`story-preview flex justify-center ${
                    index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <div className="w-full max-w-md">
                    <Card className="p-6 shadow-2xl border-2">
                      <CardContent className="p-0">
                        {story.component}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Try the cards</h2>
          <p className="text-muted-foreground mb-8">
            Browse the six cards, try them in the live previews and copy the
            code into your Next.js and shadcn/ui project.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/components">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/tahmidbintaslim/unicorn-ui"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Star className="w-4 h-4 mr-2" />
                Star on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
