"use client"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import {
  ChartConfig,
  ChartContainer,
} from "@/shared/ui/chart"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown } from "@fortawesome/free-solid-svg-icons"
const chartData = [
  { month: "January", card: 186, deck: 80 },
  { month: "February", card: 305, deck: 200 },
  { month: "March", card: 237, deck: 120 },
  { month: "April", card: 73, deck: 190 },
  { month: "May", card: 209, deck: 130 },
  { month: "June", card: 214, deck: 140 },
  { month: "July", card: 186, deck: 80 },
  { month: "August", card: 305, deck: 200 },
  { month: "September", card: 237, deck: 120 },
  { month: "October", card: 73, deck: 190 },
  { month: "November", card: 209, deck: 130 },
  { month: "December", card: 214, deck: 140 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BarChartPlaceholder() {
  return (
    // skipcq: JS-0415
    <Card> 
      <CardHeader>
        <div className="flex flex-col space-y-2 text-sm">
            <div className="w-full flex justify-between items-center">
              <CardTitle className="hidden lg:flex text-[hsl(var(--text))]">Your Cards/Deck Statistics</CardTitle>
              <CardTitle className="flex lg:hidden text-xs text-[hsl(var(--text))]">Your Cards/Deck Statistics</CardTitle>
              <div className="py-1 px-2 space-x-2 items-center text-center justify-between rounded max-h-[40px] bg-[hsl(var(--background3))] text-white">
                <span>2025</span>
                <FontAwesomeIcon icon={faCaretDown} />
              </div>
            </div>
            <CardDescription className="text-xs">Decks / Cards created January - December 2025</CardDescription>
        </div>
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
            <Bar dataKey="card" fill="goldenrod" radius={2} />
            <Bar dataKey="deck" fill="gold" radius={2} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
