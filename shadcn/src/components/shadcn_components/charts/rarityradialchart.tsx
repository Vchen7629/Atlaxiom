"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart"

const chartData = [
  { month: "Common", desktop: 186 },
  { month: "Rare", desktop: 237 },
  { month: "Super Rare", desktop: 209 },
  { month: "Secret Rare", desktop: 150 },
  { month: "Ultra Rare", desktop: 222 },
  { month: "Ultimate Rare", desktop: 222 },
  { month: "Collector's Rare", desktop: 222 },
  { month: "Prismatic Secret Rare", desktop: 222 },
  { month: "Quarter Century Secret Rare", desktop: 222 },
  { month: "Ghost Rare", desktop: 222 },
  { month: "Starlight Rare", desktop: 222 },
  { month: "Pharaohs Rare", desktop: 222 },
  { month: "Gold Rare", desktop: 222 },
  { month: "Premium Gold Rare", desktop: 222 },
  { month: "Platinum Rare", desktop: 222 },
  { month: "Platinum Secret Rare", desktop: 222 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function RarityRadialChartComponent() {
  return (
    <Card className="bg-transparent border-transparent">
      <CardHeader className="items-center pb-4">
        <CardTitle className="text-white">Collection Rarity Stats</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData} >
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid  />
            <Radar
              dataKey="desktop"
              fill="hsl(var(--background3))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
