import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export interface InteractiveCardProps extends Omit<React.ComponentProps<"div">, "title"> {
    /**
     * The card title
     */
    title: string;
    /**
     * The card description
     */
    description: string;
    /**
     * Optional badge text
     */
    badge?: string;
    /**
     * Badge variant
     */
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
    /**
     * Card content
     */
    children?: React.ReactNode;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Enable hover effects
     */
    hoverEffect?: boolean;
    /**
     * Card action button text
     */
    actionText?: string;
    /**
     * Card action button click handler
     */
    onAction?: () => void;
}

/**
 * InteractiveCard component with hover effects and flexible content.
 * Other props (`id`, `aria-*`, `data-*`, `ref`) go to the root element.
 *
 * @example
 * ```tsx
 * <InteractiveCard
 *   title="Sample Card"
 *   description="This is a sample interactive card"
 *   badge="New"
 *   actionText="Learn More"
 *   onAction={() => console.log("Action clicked")}
 * >
 *   <p>Custom content goes here</p>
 * </InteractiveCard>
 * ```
 */
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

InteractiveCard.displayName = "InteractiveCard";

export default InteractiveCard;
