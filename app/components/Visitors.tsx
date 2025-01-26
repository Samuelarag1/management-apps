"use client";

import { TrendingUp } from "lucide-react";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { browser: "safari", visitors: 1260, fill: "var(--color-safari)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function Visitors() {
  const months = [
    {
      name: "Enero",
      id: "0",
    },
    {
      name: "Febrero",
      id: "1",
    },
    {
      name: "Marzo",
      id: "2",
    },
    {
      name: "Abril",
      id: "3",
    },
    {
      name: "Mayo",
      id: "4",
    },
    {
      name: "Junio",
      id: "5",
    },
    {
      name: "Julio",
      id: "6",
    },
    {
      name: "Agosto",
      id: "7",
    },
    {
      name: "Septiembre",
      id: "8",
    },
    {
      name: "Octubre",
      id: "9",
    },
    {
      name: "Noviembre",
      id: "10",
    },
    {
      name: "Diciembre",
      id: "11",
    },
  ];

  const time = new Date().getMonth().toLocaleString();
  console.log("Time:", time);
  const Month = months.find((month) => {
    return month.id == time;
  });

  return (
    <Card className="flex flex-col shadow-none h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-2xl">SamaragTech </CardTitle>
        <CardDescription className="font-semibold">{`${
          Month?.name
        } ${new Date().getFullYear()}`}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={100}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="visitors" background />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].visitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-md"
                        >
                          Visitantes
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
