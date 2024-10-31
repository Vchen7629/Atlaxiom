"use client"
import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetSpecificUserQuery } from "../../features/api-slices/usersApiSlice"
import { useSelector } from "react-redux"
export const description = "A donut chart with text"


const chartConfig = {
  monster: {
    label: "Monster",
    color: "hsl(var(--chart-1))",
  },
  spell: {
    label: "Spell",
    color: "hsl(var(--chart-2))",
  },
  trap: {
    label: "Trap",
    color: "purple",
  },  
} satisfies ChartConfig

export function ComponentPieChart() {
  const userId = useSelector((state: { auth: { userId: string } }) => state.auth.userId);
  const { data: userData, isLoading, isError } = useGetSpecificUserQuery(userId)

  const chartData = React.useMemo(() => {
    if (!userData || !userData.entities || !userData.entities[userId]) return []

    const ownedCards = userData.entities[userId].ownedCards

    const cardCounts = {
      monster: 0,
      spell: 0,
      trap: 0,
    }

    ownedCards.forEach((card) => {
      const cardType = card.type ? card.type.toLowerCase() : ""

      if (cardType.includes("monster")) {
        cardCounts.monster++
      } else if (cardType.includes("spell")) {
        cardCounts.spell++
      } else if (cardType.includes("trap")) {
        cardCounts.trap++
      }
    })

    console.log("Card Counts:", cardCounts)

    return [
      { cardType: "Monster", count: cardCounts.monster, fill: chartConfig.monster.color },
      { cardType: "Spell", count: cardCounts.spell, fill: chartConfig.spell.color },
      { cardType: "Trap", count: cardCounts.trap, fill: chartConfig.trap.color },
    ]
  }, [userData, userId])

  if (isLoading) return <div>Loading chart data...</div>
  if (isError) return <div>Error loading chart data.</div>

  const totalCards = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col  bg-transparent border-transparent">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-gold">Card Type Make-up</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[22vh]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="cardType"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="text-goldenrod"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-current text-3xl font-bold"
                        >
                          {totalCards.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-current text-gray-300 text-muted-foreground"
                        >
                          total Cards
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}