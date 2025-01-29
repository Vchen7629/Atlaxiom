"use client"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
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
import { useGetSpecificUserQuery } from "../../../../app/api-slices/usersApiSlice"
import { useSelector } from "react-redux"
import { userId } from "../types/charttypes"
import { useMemo } from "react"
export const description = "A radial chart displaying the user's unique cards compared to the total unique cards"

const chartConfig = {
  ownedCards: {
    label: "owned",
    color: "hsl(var(--chart-1))",
  },
  totalCards: {
    label: "total",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function ComponentRadialChart() {

    const userId = useSelector((state: userId) => state.auth.userId)
    const { data: userData } = useGetSpecificUserQuery(userId)

    const chartData = useMemo(() => {
        if (!userData || !userData.entities || !userData.entities[userId]) return []

        const totalOwnedCards = userData.entities[userId].totalOwnedCards || 0
        const totalCards = 13418

        return [
            { name: "Collection", owned: totalOwnedCards, total: totalCards }
        ]
    }, [userData, userId])

    return (
        <Card className="flex flex-col bg-[hsl(var(--profilebackground))] items-center border-transparent rounded-xl">
        <CardHeader>
            <CardTitle className="text-[hsl(var(--text) mb-[2vh]">Collection status</CardTitle>
        </CardHeader>
        <CardContent className="flex pb-0 h-[22vh]">
            <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square"
            >
            <RadialBarChart
                data={chartData}
                endAngle={180}
                innerRadius={80}
                outerRadius={130}
            >
                <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                    content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                                <text 
                                    x={viewBox.cx} 
                                    y={viewBox.cy} 
                                    textAnchor="middle" 
                                    className="text-[hsl(var(--text))] relative"
                                >
                                    <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-current text-2xl font-bold"
                                    >
                                        {chartData[0].owned} / {chartData[0].total}
                                    </tspan>
                                    <tspan
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        className="fill-current pt-[10vh] text-lg text-muted-foreground"
                                    >
                                        Cards Owned
                                    </tspan>
                                </text>
                            )
                        }
                    }}
                />
                </PolarRadiusAxis>
                <RadialBar
                    dataKey="total"
                    stackId="a"
                    cornerRadius={5}
                    fill="hsl(var(--background1))"
                    className="stroke-transparent stroke-2"
                />
                <RadialBar
                    dataKey="owned"
                    fill="hsl(var(--background3))"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                />
            </RadialBarChart>
            </ChartContainer>
        </CardContent>
        </Card>
    )
}