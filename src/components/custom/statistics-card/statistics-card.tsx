import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, Minus, TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export interface StatisticsCardProps extends Omit<React.ComponentProps<"div">, "title" | "prefix" | "children"> {
    /**
     * The statistic title
     */
    title: string;
    /**
     * The main value to display
     */
    value: string | number;
    /**
     * Optional description
     */
    description?: string;
    /**
     * Percentage change. Positive renders as up, negative as down, 0 as no change.
     */
    change?: number;
    /**
     * Change period description
     */
    changePeriod?: string;
    /**
     * Icon to display
     */
    icon?: LucideIcon;
    /**
     * Icon color
     */
    iconColor?: string;
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Value prefix (e.g., "$", "€")
     */
    prefix?: string;
    /**
     * Value suffix (e.g., "%", "K", "M")
     */
    suffix?: string;
}

/**
 * StatisticsCard component for displaying key metrics and KPIs.
 * The trend is announced in words ("Up", "Down", "No change"), not by color
 * or icon alone. Other props (`id`, `aria-*`, `data-*`, `ref`) go to the root element.
 *
 * @example
 * ```tsx
 * <StatisticsCard
 *   title="Total Revenue"
 *   value={45231}
 *   prefix="$"
 *   change={20.1}
 *   changePeriod="from last month"
 *   icon={DollarSign}
 *   iconColor="text-green-600"
 * />
 * ```
 */
export const StatisticsCard = React.memo<StatisticsCardProps>(({
    title,
    value,
    description,
    change,
    changePeriod = "from last month",
    icon: Icon,
    iconColor = "text-primary",
    className,
    prefix = "",
    suffix = "",
    ...props
}) => {
    // A fixed locale keeps server and client output identical (no hydration mismatch).
    const formatValue = (val: string | number) => {
        if (typeof val === 'number') {
            return val.toLocaleString('en-US');
        }
        return val;
    };

    const trend = getTrend(change);

    return (
        <Card {...props} className={cn("hover:shadow-md transition-shadow", className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {Icon && (
                    <Icon aria-hidden="true" className={cn("w-4 h-4", iconColor)} />
                )}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {prefix}{formatValue(value)}{suffix}
                </div>
                {description && (
                    <CardDescription className="mt-1">
                        {description}
                    </CardDescription>
                )}
                {trend && change !== undefined && (
                    <p className={cn("text-xs flex items-center mt-1", trend.colorClass)}>
                        <trend.Icon aria-hidden="true" className="w-4 h-4" />
                        <span className="sr-only">{trend.label}</span>
                        <span className="ml-1">
                            {change > 0 ? '+' : ''}{change}% {changePeriod}
                        </span>
                    </p>
                )}
            </CardContent>
        </Card>
    );
});

/**
 * Maps a percentage change to its icon, color token and screen-reader label.
 * Returns null when there is no change value to show.
 */
function getTrend(change: number | undefined) {
    if (change === undefined || Number.isNaN(change)) return null;
    if (change > 0) {
        return { direction: "up", label: "Up", Icon: TrendingUp, colorClass: "text-success" } as const;
    }
    if (change < 0) {
        return { direction: "down", label: "Down", Icon: TrendingDown, colorClass: "text-destructive" } as const;
    }
    return { direction: "flat", label: "No change", Icon: Minus, colorClass: "text-muted-foreground" } as const;
}

StatisticsCard.displayName = "StatisticsCard";

export default StatisticsCard;
