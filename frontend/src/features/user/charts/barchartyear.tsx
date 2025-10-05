"use client"
import { useGetAllOwnedDecksQuery } from "@/app/api-slices/deckApiSlice"
import { useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice"
import { Bar, BarChart, XAxis } from "recharts"
import { useMemo } from "react";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart"
import { Year } from "../types/chartTypes"
import { DeckApiResponse } from "@/app/api-slices/types/decktypes"

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

export function ComponentBarChart({ yearprops }: Year): JSX.Element {
    const {
      years,
      selectedYear, setSelectedYear
    } = yearprops
  
    const { data: cardData } = useGetOwnedCardsQuery();
    const { data: deckData } = useGetAllOwnedDecksQuery();


    function handleSelectedYear(value: string) {
      setSelectedYear(value); 
    };
    
    const monthlyData = useMemo(() => {
        const data = Array.from({ length: 12 }, () => ({
          decks: 0,
          cards: 0,
        }));
    
        const ownedDeck = deckData || [];
        ownedDeck.forEach((deck: DeckApiResponse) => {
          const deckYear = deck.createdOn.slice(0, 4);
          const createdMonth = new Date(deck.createdOn).getMonth();
          if (deckYear === String(selectedYear)) {
            data[createdMonth].decks++;
          }
        });
    
        const ownedCards = Object.values(cardData || {}).flat();
        ownedCards.forEach((card) => {
            if (card.addedOn.slice(0,4) === selectedYear) {
                const addedMonth = new Date(card?.addedOn).getMonth();
                data[addedMonth].cards += card?.ownedamount || 0;
            }
        });
    
        return data;
      }, [selectedYear, cardData, deckData]);

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
      // skipcq: JS-0415
      <Card className="relative w-full lg:w-[60vw] bg-[hsl(var(--contrast))] rounded-xl shadow-lg shadow-[hsl(var(--shadow))]">
        <CardHeader>
          <section className="flex w-full  justify-between">
            <div className="flex flex-col space-y-2">
              <CardTitle className="text-[hsl(var(--text))]">Your Cards/Deck Statistics</CardTitle>
              <CardDescription className="text-md">Decks/Cards created January - December {selectedYear}</CardDescription>
            </div>
            <div>
              <label htmlFor="monthSelect" className="sr-only">Select Month</label>
              <select
                value={selectedYear}
                onChange={(e) => handleSelectedYear(e.target.value)}
                className="p-2 rounded max-h-[40px] bg-[hsl(var(--background3))] text-white"
              >
                {years?.map((year) => (<option key={year} value={year}>{year}</option>))}
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
                fill="hsl(var(--background3))" 
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
    )
}