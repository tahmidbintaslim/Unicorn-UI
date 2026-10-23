import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, Clock, Heart, User } from "lucide-react";
import Image from "next/image";
import React from "react";

export interface BlogCardProps extends Omit<React.ComponentProps<"article">, "title" | "onClick" | "children"> {
    /**
     * Blog post title
     */
    title: string;
    /**
     * Blog post excerpt/description
     */
    excerpt: string;
    /**
     * Author name
     */
    author: string;
    /**
     * Author avatar URL
     */
    authorAvatar?: string;
    /**
     * Publication date as an ISO string ("2024-01-15"). Shown in UTC so the
     * day is the same on the server and in every time zone.
     */
    date: string;
    /**
     * Reading time estimate
     */
    readTime?: string;
    /**
     * Featured image URL
     */
    image?: string;
    /**
     * Blog post URL. The title becomes a link that covers the whole card.
     */
    href?: string;
    /**
     * Category/tag
     */
    category?: string;
    /**
     * Category color
     */
    categoryColor?: string;
    /**
     * Like count
     */
    likes?: number;
    /**
     * Additional CSS classes for the root `<article>`
     */
    className?: string;
    /**
     * Card variant
     */
    variant?: "default" | "horizontal" | "minimal";
    /**
     * Click handler. Without `href`, the title becomes a button that covers the whole card.
     */
    onClick?: () => void;
}

/**
 * BlogCard component for displaying blog posts and articles.
 * Renders an `<article>` with a `<time>` element. With `href` or `onClick`,
 * the title is the one interactive control and its hit area covers the card;
 * the "Read more" label is shown only then. Other props (`id`, `aria-*`,
 * `data-*`, `ref`) go to the root element.
 *
 * @example
 * ```tsx
 * <BlogCard
 *   title="Getting Started with React Components"
 *   excerpt="Learn how to build reusable React components with TypeScript and modern best practices."
 *   author="Jane Smith"
 *   date="2024-01-15"
 *   readTime="5 min read"
 *   image="/blog/react-components.jpg"
 *   category="React"
 *   categoryColor="bg-blue-100 text-blue-800"
 *   likes={42}
 *   href="/blog/react-components"
 * />
 * ```
 */
export const BlogCard = React.memo<BlogCardProps>(({
    title,
    excerpt,
    author,
    authorAvatar,
    date,
    readTime,
    image,
    href,
    category,
    categoryColor = "bg-gray-100 text-gray-800",
    likes,
    className,
    variant = "default",
    onClick,
    ...props
}) => {
    const published = formatDate(date);
    const interactive = Boolean(href || onClick);
    // The control's ::after fills the card (positioned by the Card's `relative`),
    // so the whole card is clickable while only the title is in the tab order.
    const controlClass = "cursor-pointer outline-none after:absolute after:inset-0";

    const renderTitle = () => {
        if (href) {
            return (
                <a href={href} onClick={onClick} className={controlClass}>
                    {title}
                </a>
            );
        }
        if (onClick) {
            return (
                <button type="button" onClick={onClick} className={cn(controlClass, "text-left")}>
                    {title}
                </button>
            );
        }
        return title;
    };

    const renderImage = () => {
        if (!image) return null;

        return (
            <div className={cn(
                "relative overflow-hidden",
                variant === "horizontal" ? "w-48 h-full" : "w-full h-48"
            )}>
                {/* Decorative: the title next to it already names the post */}
                <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {category && (
                    <Badge
                        className={cn(
                            "absolute top-3 left-3",
                            categoryColor
                        )}
                    >
                        {category}
                    </Badge>
                )}
            </div>
        );
    };

    const renderContent = () => (
        <div className="flex flex-col flex-1">
            <CardHeader className="pb-3">
                {/* With an image the category sits on the image instead */}
                {category && !image && (
                    <Badge className={cn("w-fit mb-2", categoryColor)}>
                        {category}
                    </Badge>
                )}
                <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {renderTitle()}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                    {excerpt}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-0 mt-auto">
                {/* Author and Meta */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        {authorAvatar ? (
                            <Image
                                src={authorAvatar}
                                alt=""
                                width={32}
                                height={32}
                                className="rounded-full object-cover"
                            />
                        ) : (
                            <div aria-hidden="true" className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                            </div>
                        )}
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{author}</span>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Calendar aria-hidden="true" className="w-3 h-3" />
                                <time dateTime={published.dateTime}>{published.label}</time>
                                {readTime && (
                                    <>
                                        <span aria-hidden="true">•</span>
                                        <Clock aria-hidden="true" className="w-3 h-3" />
                                        <span>{readTime}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Likes and Read More */}
                    <div className="flex items-center space-x-2">
                        {likes !== undefined && (
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                                <Heart aria-hidden="true" className="w-4 h-4" />
                                <span>
                                    {likes}
                                    <span className="sr-only"> likes</span>
                                </span>
                            </div>
                        )}
                        {interactive && variant !== "minimal" && (
                            // Visual cue only: the title control above is the real link or button.
                            <span
                                aria-hidden="true"
                                className={buttonVariants({ variant: "ghost", size: "sm" })}
                            >
                                Read more
                                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </div>
    );

    return (
        <article {...props} className={className}>
            <Card
                className={cn(
                    "group relative h-full hover:shadow-lg transition-all duration-300 overflow-hidden",
                    interactive && "has-[:focus-visible]:ring-[3px] has-[:focus-visible]:ring-ring/50",
                    variant === "horizontal" && "flex flex-row",
                    variant === "minimal" && "border-0 shadow-none hover:shadow-md"
                )}
            >
                {renderImage()}
                {renderContent()}
            </Card>
        </article>
    );
});

/**
 * Formats a date the same way on the server and in every browser.
 * Date-only strings ("2024-01-15") parse as UTC midnight, so formatting in UTC
 * keeps the calendar day instead of shifting it to the viewer's time zone.
 */
function formatDate(dateString: string) {
    const parsed = new Date(dateString);
    if (Number.isNaN(parsed.getTime())) {
        return { label: dateString, dateTime: undefined };
    }
    return {
        label: parsed.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: "UTC",
        }),
        dateTime: parsed.toISOString().slice(0, 10),
    };
}

BlogCard.displayName = "BlogCard";

export default BlogCard;
