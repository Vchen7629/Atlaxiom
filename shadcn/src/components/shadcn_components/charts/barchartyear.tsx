"use client"
import { useGetAllOwnedDecksQuery } from "../../../features/api-slices/decksapislice"
import { useGetOwnedCardsQuery } from "../../../features/api-slices/ownedCardapislice"
import { useSelector } from "react-redux"
import { Bar, BarChart, XAxis } from "recharts"
import { useMemo } from "react";
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

type Deck = {
    createdOn: string;
    deckName?: string;
}

export const description = "A multiple bar chart"

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

export function ComponentBarChart(): JSX.Element {
    const userId = useSelector((state: { auth: { userId: string } }) => state.auth.userId);
    const { data: cardData } = useGetOwnedCardsQuery(userId);
    const { data: deckData } = useGetAllOwnedDecksQuery(userId);
    
    const monthlyData = useMemo(() => {
        // Initialize an array for monthly data (12 months)
        const data = Array.from({ length: 12 }, () => ({
          decks: 0,
          cards: 0,
        }));
    
        // Process owned decks
        const ownedDeck = deckData?.entities?.undefined?.ownedDecks || [];
        ownedDeck.forEach((deck: Deck) => {
          if (deck.createdOn) {
            const createdMonth = new Date(deck.createdOn).getMonth();
            data[createdMonth].decks++;
          }
        });
    
        // Process owned cards
        const ownedCards = cardData?.entities ? Object.values(cardData.entities).flat() : [];        
        ownedCards.forEach((card) => {
            const addedOn = card?.addedOn;
            if (addedOn) {
                const addedMonth = new Date(addedOn).getMonth();
                data[addedMonth].cards += card?.ownedamount || 0;
            }
        });
    
        return data;
      }, [cardData, deckData, userId]);

    const data = useMemo(() => {
        return [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ].map((month, index) => ({
          month,
          decks: monthlyData[index].decks,
          cards: monthlyData[index].cards,
        }));
      }, [monthlyData]);

    return (
    <div className="relative w-[30vw]">
        <Card className="bg-blackthree border-gray-500 border-4">
        <CardHeader>
            <CardTitle className="text-gold">Your Cards/Deck Statistics</CardTitle>
            <CardDescription className="">Decks/Cards created January - December 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="max-h-200 ">
            <BarChart accessibilityLayer data={data}>
                <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dashed" className="bg-white"/>}
                />
                <Bar 
                    dataKey="decks" 
                    fill="goldenrod" 
                    minPointSize={5}
                />
                <Bar 
                    dataKey="cards" 
                    fill="gold" 
                    minPointSize={5}
                />
            </BarChart>
            </ChartContainer>
        </CardContent>
        </Card>
    </div>
    )
}