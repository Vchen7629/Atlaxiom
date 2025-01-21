"use client"
import { useGetAllOwnedDecksQuery } from "../../../../features/api-slices/decksapislice"
import { useGetOwnedCardsQuery } from "../../../../features/api-slices/ownedCardapislice"
import { useSelector } from "react-redux"
import { Bar, BarChart, XAxis } from "recharts"
import { useMemo, useState } from "react";
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
import { Deck } from "../types/charttypes"

export const description = "Bar Chart Displaying Information for decks/cards added by Year"

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

    const years = [
      "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", 
      "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"
    ];
    //const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState<string>();

    
    const monthlyData = useMemo(() => {
        const data = Array.from({ length: 12 }, () => ({
          decks: 0,
          cards: 0,
        }));
    
        // Process owned decks
        const ownedDeck = deckData?.entities?.undefined?.ownedDecks || [];
        ownedDeck.forEach((deck: Deck) => {
          const createdMonth = new Date(deck.createdOn).getMonth();
          if (deck.createdOn.slice(0,4) === selectedYear) {
            data[createdMonth].decks++;
          }
        });
    
        // Process owned cards
        const ownedCards = Object.values(cardData?.entities?.defaultId?.ownedCards || {}).flat();
        ownedCards.forEach((card: any) => {
            if (card?.addedOn.slice(0,4) === selectedYear) {
                const addedMonth = new Date(card?.addedOn).getMonth();
                data[addedMonth].cards += card?.ownedamount || 0;
            }
        });
    
        return data;
      }, [cardData, deckData, userId]);

    const months = useMemo(() => {
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
      <div className="relative w-[60vw] bg-[hsl(var(--profilebackground))] rounded-xl">
          <Card>
            <CardHeader>
              <section className="flex w-full  justify-between">
                <div className="flex flex-col space-y-2">
                  <CardTitle className="text-[hsl(var(--text))]">Your Cards/Deck Statistics</CardTitle>
                  <CardDescription className="">Decks/Cards created January - December 2024</CardDescription>
                </div>
                <div>
                  <label htmlFor="monthSelect" className="sr-only">Select Month</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="p-2 rounded max-h-[40px] bg-[hsl(var(--background1))] text-white"
                  >
                    {years.map((year) => (<option key={year} value={year}>{year}</option>))}
                  </select>  
                </div>
              </section>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[57.7vh] w-full">
                <BarChart accessibilityLayer data={months}>
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