"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart"

const chartData = [
  { month: "January", price: 0.50 },
  { month: "February", price: 0.75 },
  { month: "March", price: 2.00 },
  { month: "April", price: 5.00 },
  { month: "May", price: 10.00 },
  { month: "June", price: 12.50 },
  { month: "July", price: 15.50 },
  { month: "August", price: 13.50 },
  { month: "september", price: 17.50 },
  { month: "october", price: 18.50 },
  { month: "november", price: 19.50 },
  { month: "december", price: 21.32 },
]

const chartConfig = {
  price: {
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function PriceChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Linears</CardTitle>
      </CardHeader>
      <CardContent className="w-[40vw]">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid className="text-gray-400" vertical={false}/>
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="price"
              type="linear"
              stroke="var(--color-price)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">

      </CardFooter>
    </Card>
  )
}
