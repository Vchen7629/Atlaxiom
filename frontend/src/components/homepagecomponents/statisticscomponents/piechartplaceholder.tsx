"use client"

import { NumberTicker } from "@/components/ui/number-ticker"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
]

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function PieChartPlaceholder() {
  return (
    <Card className="flex flex-col transition-all duration-300 ease-out group-hover:scale-105">
        <div className="w-full flex justify-center">
            <CardTitle className="hidden lg:flex text-[hsl(var(--text))]">Card Type Make-up</CardTitle>
        </div>
        <CardContent className="flex-1 pb-0">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
            >
            <PieChart>
                <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
                >
                <Label
                content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        const centerX = viewBox.cx ?? 0;
                        const centerY = viewBox.cy ?? 0;
                    
                        return (
                            <foreignObject
                            x={centerX - 50}
                            y={centerY - 40}
                            width={100}
                            height={80}
                            >
                            <div className="flex flex-col items-center justify-center h-full">
                                <NumberTicker 
                                value={723}
                                className="text-3xl font-bold"
                                />
                                <span className="text-sm text-gray-500">
                                Cards
                                </span>
                            </div>
                            </foreignObject>
                        );
                    }
                    return null;
                }}
                />
                </Pie>
            </PieChart>
            </ChartContainer>
        </CardContent>
    </Card>
  )
}
