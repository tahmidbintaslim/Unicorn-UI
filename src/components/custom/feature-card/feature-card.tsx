import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight, LucideIcon } from "lucide-react";
import React from "react";

export interface FeatureCardProps extends Omit<React.ComponentProps<"div">, "title" | "children"> {
    /**
     * Feature title
     */
    title: string;
    /**
     * Feature description
     */
    description: string;
    /**
     * Feature icon
     */
    icon: LucideIcon;
    /**
     * Icon color
     */
    iconColor?: string;
    /**
     * Background color for icon
     */
    iconBg?: string;
    /**
     * Optional badge text
     */
    badge?: string;
    /**
     * Badge variant
     */
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
    /**
     * Call-to-action text
     */
    ctaText?: string;
    /**
     * CTA click handler
     */
    onCtaClick?: () => void;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Card orientation
     */
    orientation?: "vertical" | "horizontal";
    /**
     * Enable hover effects
     */
    hoverEffect?: boolean;
}

/**
 * FeatureCard component for showcasing product features.
 * Other props (`id`, `aria-*`, `data-*`, `ref`) go to the root element.
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   title="Advanced Analytics"
 *   description="Get detailed insights into your performance with our advanced analytics dashboard"
 *   icon={BarChart3}
 *   iconColor="text-blue-600"
 *   iconBg="bg-blue-100"
 *   badge="Popular"
 *   ctaText="Learn More"
 *   onCtaClick={() => console.log("CTA clicked")}
 * />
 * ```
 */
export const FeatureCard = React.memo<FeatureCardProps>(({
    title,
    description,
    icon: Icon,
    iconColor = "text-primary",
    iconBg = "bg-primary/10",
    badge,
    badgeVariant = "secondary",
    ctaText,
    onCtaClick,
    className,
    orientation = "vertical",
    hoverEffect = true,
    ...props
}) => {
    const titleId = React.useId();

    return (
        <Card
            {...props}
            className={cn(
                "transition-all duration-300",
                hoverEffect && "hover:shadow-lg hover:-translate-y-1",
                orientation === "horizontal" && "flex",
                className
            )}
        >
            <CardHeader className={cn(
                orientation === "vertical" ? "text-center" : "flex-row items-center space-y-0",
                orientation === "horizontal" && "flex-1"
            )}>
                <div className={cn(
                    "flex items-center justify-center",
                    orientation === "vertical" ? "mx-auto mb-4" : "mr-4"
                )}>
                    <div className={cn(
                        "w-16 h-16 rounded-xl flex items-center justify-center",
                        iconBg
                    )}>
                        <Icon aria-hidden="true" className={cn("w-8 h-8", iconColor)} />
                    </div>
                </div>

                <div className={cn(
                    orientation === "horizontal" && "flex-1"
                )}>
                    <div className="flex items-center justify-between mb-2">
                        <CardTitle id={titleId} className={cn(
                            orientation === "vertical" ? "text-xl" : "text-lg"
                        )}>
                            {title}
                        </CardTitle>
                        {badge && (
                            <Badge variant={badgeVariant} className="ml-2">
                                {badge}
                            </Badge>
                        )}
                    </div>
                    <CardDescription className={cn(
                        orientation === "vertical" ? "text-center" : "text-left"
                    )}>
                        {description}
                    </CardDescription>
                </div>
            </CardHeader>

            {ctaText && (
                <CardContent className={cn(
                    orientation === "vertical" ? "text-center" : "flex items-center"
                )}>
                    <Button
                        type="button"
                        onClick={onCtaClick}
                        aria-describedby={titleId}
                        variant="ghost"
                        className="group"
                    >
                        {ctaText}
                        <ArrowRight aria-hidden="true" className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </CardContent>
            )}
        </Card>
    );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
