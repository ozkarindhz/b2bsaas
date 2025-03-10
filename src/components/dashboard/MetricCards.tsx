import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowDown,
  ArrowUp,
  DollarSign,
  Users,
  BarChart,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  icon = <DollarSign className="h-5 w-5" />,
  trend = { value: "0%", isPositive: true },
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("h-full bg-white", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full bg-muted p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="mt-2 flex items-center text-xs">
          {trend.isPositive ? (
            <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span
            className={cn(trend.isPositive ? "text-green-500" : "text-red-500")}
          >
            {trend.value}
          </span>
          <span className="ml-1 text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricCardsProps {
  metrics?: MetricCardProps[];
}

const MetricCards = ({ metrics }: MetricCardsProps) => {
  const defaultMetrics: MetricCardProps[] = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-5 w-5" />,
      trend: { value: "20.1%", isPositive: true },
    },
    {
      title: "Active Users",
      value: "2,345",
      icon: <Users className="h-5 w-5" />,
      trend: { value: "10.3%", isPositive: true },
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      icon: <BarChart className="h-5 w-5" />,
      trend: { value: "1.1%", isPositive: false },
    },
    {
      title: "Avg. Session",
      value: "2m 56s",
      icon: <Clock className="h-5 w-5" />,
      trend: { value: "12.4%", isPositive: true },
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="w-full bg-background p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {displayMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default MetricCards;
