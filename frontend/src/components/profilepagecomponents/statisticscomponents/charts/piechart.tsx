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
import { useGetOwnedCardsQuery } from "../../../../app/api-slices/ownedCardapislice"
import { useSelector } from "react-redux"
export const description = "A Pie Chart displaying the user's card collection makeup by the number of monster/spell/trap cards"


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
  const { data: cardData } = useGetOwnedCardsQuery(userId)

  const chartData = React.useMemo(() => {
    if (!cardData || !cardData.entities) {
      console.error("cardData.entities is undefined or empty.");
      return [];
    }

    const ownedCards = Object.values(cardData?.entities?.defaultId?.ownedCards || {}).flat();        

    const cardCounts = {
      monster: 0,
      spell: 0,
      trap: 0,
    }
    
    ownedCards.forEach((card: any) => {
      const cardType = card.type?.toLowerCase() || "";
      const amount = card.ownedamount || 1

      if (cardType.includes("monster")) {
        cardCounts.monster += amount;
      } else if (cardType.includes("spell")) {
        cardCounts.spell += amount;
      } else if (cardType.includes("trap")) {
        cardCounts.trap += amount;
      }
    })

    return [
      { cardType: "Monster", count: cardCounts.monster, fill: chartConfig.monster.color },
      { cardType: "Spell", count: cardCounts.spell, fill: chartConfig.spell.color },
      { cardType: "Trap", count: cardCounts.trap, fill: chartConfig.trap.color },
    ]
  }, [cardData, userId])

  const totalCards = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col bg-[hsl(var(--profilebackground))] border-transparent rounded-xl">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[hsl(var(--text))]">Card Type Make-up</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square"
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
              strokeWidth={10}
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
                          className="fill-current text-[hsl(var(--text))] text-3xl font-bold"
                        >
                          {totalCards.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-current text-[hsl(var(--text))] text-muted-foreground"
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