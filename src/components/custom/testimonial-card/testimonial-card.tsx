import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Quote, Star } from "lucide-react";
import Image from "next/image";
import React from "react";

export interface TestimonialCardProps extends Omit<React.ComponentProps<"div">, "children"> {
    /**
     * The testimonial text
     */
    testimonial: string;
    /**
     * Author name
     */
    author: string;
    /**
     * Author role/title
     */
    role?: string;
    /**
     * Author company
     */
    company?: string;
    /**
     * Author avatar URL
     */
    avatar?: string;
    /**
     * Rating out of 5. Values outside 0 to 5 are clamped.
     */
    rating?: number;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Card variant
     */
    variant?: "default" | "bordered" | "elevated";
}

/**
 * TestimonialCard component for displaying customer testimonials.
 * Renders a figure with a blockquote and a figcaption; the star rating has a
 * text alternative. Other props (`id`, `aria-*`, `data-*`, `ref`) go to the root element.
 *
 * @example
 * ```tsx
 * <TestimonialCard
 *   testimonial="This product has completely transformed how we work. The team is more productive than ever!"
 *   author="Sarah Johnson"
 *   role="Product Manager"
 *   company="TechCorp"
 *   rating={5}
 *   avatar="/avatars/sarah.jpg"
 * />
 * ```
 */
export const TestimonialCard = React.memo<TestimonialCardProps>(({
    testimonial,
    author,
    role,
    company,
    avatar,
    rating,
    className,
    variant = "default",
    ...props
}) => {
    const renderStars = () => {
        if (!rating) return null;
        const value = Math.min(5, Math.max(0, rating));

        return (
            <div
                role="img"
                aria-label={`Rated ${value} out of 5`}
                className="flex items-center space-x-1 mb-4"
            >
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        aria-hidden="true"
                        className={cn(
                            "w-4 h-4",
                            i < value
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                        )}
                    />
                ))}
            </div>
        );
    };

    const getCardVariant = () => {
        switch (variant) {
            case "bordered":
                return "border-2 border-primary/20";
            case "elevated":
                return "shadow-lg hover:shadow-xl transition-shadow duration-300";
            default:
                return "hover:shadow-md transition-shadow duration-200";
        }
    };

    return (
        <Card {...props} className={cn(getCardVariant(), "relative", className)}>
            {/* Quote Icon */}
            <div aria-hidden="true" className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8" />
            </div>

            <CardContent className="pt-6">
                <figure>
                    {/* Rating */}
                    {renderStars()}

                    {/* Testimonial */}
                    <blockquote className="text-lg font-medium leading-relaxed mb-6">
                        &ldquo;{testimonial}&rdquo;
                    </blockquote>

                    {/* Author: the name is right here, so the avatar is decorative (alt="") */}
                    <figcaption className="flex items-center space-x-4">
                        {avatar ? (
                            <Image
                                src={avatar}
                                alt=""
                                width={48}
                                height={48}
                                className="rounded-full object-cover border-2 border-primary/10"
                            />
                        ) : (
                            <div aria-hidden="true" className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                                <span className="text-primary font-semibold text-lg">
                                    {author.charAt(0)}
                                </span>
                            </div>
                        )}

                        <div>
                            <div className="font-semibold text-foreground">{author}</div>
                            {(role || company) && (
                                <div className="text-sm text-muted-foreground">
                                    {role}
                                    {role && company && (
                                        <>
                                            <span aria-hidden="true"> • </span>
                                            <span className="sr-only">, </span>
                                        </>
                                    )}
                                    {company}
                                </div>
                            )}
                        </div>
                    </figcaption>
                </figure>
            </CardContent>
        </Card>
    );
});

TestimonialCard.displayName = "TestimonialCard";

export default TestimonialCard;
