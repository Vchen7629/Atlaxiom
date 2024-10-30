"use client"
import * as React from "react"
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
import { useGetSpecificUserQuery } from "../../features/api-slices/usersApiSlice"
import { useSelector } from "react-redux"
export const description = "A radial chart with stacked sections"

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

    const userId = useSelector((state) => state.auth.userId)
    const { data: userData } = useGetSpecificUserQuery(userId)

    const chartData = React.useMemo(() => {
        if (!userData || !userData.entities || !userData.entities[userId]) return []

        const totalOwnedCards = userData.entities[userId].totalOwnedCards || 0
        const totalCards = 13418

        return [
            { name: "Collection", owned: totalOwnedCards, total: totalCards }
        ]
    }, [userData, userId])

    return (
        <Card className="flex flex-col max-h-[20vh] bg-transparent border-transparent">
        <CardHeader className="items-center pb-0">
            <CardTitle className="text-gold mb-[2vh]">Collection status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
            <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
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
                                <>
                                    <text 
                                        x={viewBox.cx} 
                                        y={viewBox.cy} 
                                        textAnchor="middle" 
                                        className="text-goldenrod relative"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy - 10}
                                            className="fill-current text-2xl font-bold"
                                        >
                                            {chartData[0].owned} / {chartData[0].total}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy + 14}
                                            className="fill-current text-gray-300 text-sm text-muted-foreground"
                                        >
                                            Cards Owned
                                        </tspan>
                                    </text>
                                </>
                            )
                        }
                    }}
                />
                </PolarRadiusAxis>
                <RadialBar
                dataKey="total"
                stackId="a"
                cornerRadius={5}
                fill="hsl(var(--chart-1))"
                className="stroke-transparent stroke-2"
                />
                <RadialBar
                dataKey="owned"
                fill="hsl(var(--chart-2))"
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