"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2C73D2",
  },
  mobile: {
    label: "Mobile",
    color: "#845EC2",
  },
};

const chartData2 = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];
const chartConfig2 = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#845EC2",
  },
  safari: {
    label: "Safari",
    color: "#008E9B",
  },
  firefox: {
    label: "Firefox",
    color: "#2C73D2",
  },
  edge: {
    label: "Edge",
    color: "#008F7A",
  },
  other: {
    label: "Other",
    color: "#0081CF",
  },
};

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

const chartData3 = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];
const chartConfig3 = {
  desktop: {
    label: "Desktop",
    color: "##0081CF",
  },
};

export default function DashBoard () {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <h1 className="text-xl md:text-2xl font-bold text-center md:text-left px-2 py-4">
        Business Analysis Dashboard
      </h1>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>

      <Card className="flex flex-col bg-gradient-to-br from-sage-dark to-blue-600">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Label List</CardTitle>
          <CardDescription>January - June 2025</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig2}
            className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-62.5]"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="visitors" hideLabel />}
              />
              <Pie data={chartData2} dataKey="visitors">
                <LabelList
                  dataKey="browser"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value) => chartConfig2[value]?.label}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-sage-dark to-blue-600">
        <CardHeader className="items-center">
          <CardTitle>Radar Chart - Dots</CardTitle>
          <CardDescription>
            Showing total visitors for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <ChartContainer
            config={chartConfig3}
            className="[mx-auto aspect-square max-h-62.5]"
          >
            <RadarChart data={chartData3}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid />
              <Radar
                dataKey="desktop"
                fill="#0081CF"
                fillOpacity={0.6}
                dot={{
                  r: 4,
                  fillOpacity: 1,
                }}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground flex items-center gap-2 leading-none">
            January - June 2025
          </div>
        </CardFooter>
      </Card>


    </ChartContainer>
  );
}
