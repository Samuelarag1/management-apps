"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Enero", projects: 2 },
  { month: "Febrero", projects: 5 },
  { month: "Marzo", projects: 237 },
  { month: "Abril", projects: 73 },
  { month: "Mayo", projects: 209 },
  { month: "Junio", projects: 214 },
  { month: "Julio", projects: 214 },
  { month: "Agosto", projects: 214 },
  { month: "Septiembre", projects: 214 },
  { month: "Noviembre", projects: 214 },
  { month: "Diciembre", projects: 214 },
];

const chartConfig = {
  projects: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function Counter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos realizados</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="projects" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Proyectos realizados por mes
        </div>
      </CardFooter>
    </Card>
  );
}
