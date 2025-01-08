import { useGetAllOwnedDecksQuery } from "../../../../features/api-slices/decksapislice"
import { useGetOwnedCardsQuery } from "../../../../features/api-slices/ownedCardapislice"

import { useSelector } from "react-redux"
import { useMemo, useState } from "react"
import { Bar, BarChart, XAxis } from "recharts"
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
import { ChartData, deckData } from "../types/charttypes"

// Types

export const description = "Bar Chart Displaying Information for decks/cards added by Month";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-4))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ComponentBarMonthChart(): JSX.Element {
    const userId = useSelector((state: { auth: { userId: string } }) => state.auth.userId);
    const { data: deckData } = useGetAllOwnedDecksQuery(userId);
    const { data: cardData } = useGetOwnedCardsQuery(userId)
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const currentMonth = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState<string>(months[currentMonth]);
    const [statisticType, setStatisticType] = useState<"cards" | "decks">("cards");

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

    const chartData = useMemo<ChartData[]>(() => {
      if (!cardData || !cardData.entities) {
            console.error("cardData.entities is undefined or empty.");
            return [];
      }

      const currentYear = new Date().getFullYear();
      
      const ownedDeck = deckData?.entities?.undefined?.ownedDecks || [];
      const ownedCards = Object.values(cardData?.entities?.defaultId?.ownedCards || {}).flat();

      if (selectedMonth === "All") return [];

      const monthIndex = months.indexOf(selectedMonth);
      const daysInSelectedMonth = daysInMonth(monthIndex, currentYear);

      const dailyData = Array.from({ length: daysInSelectedMonth }, (_, i) => ({
          day: `${selectedMonth.slice(0,3)} ${i + 1}`,
          decks: 0,
          cards: 0,
      }));

      ownedDeck.forEach((deck: deckData) => {
          const createdDate = new Date(deck.createdOn);
          if (createdDate.getMonth() === monthIndex && createdDate.getFullYear() === currentYear) {
              dailyData[createdDate.getDate() - 1].decks++;
          }
      });

      ownedCards.forEach((card: any) => {
          const addedDate = new Date(card.addedOn);
          const amount = card.ownedamount || 1
          if (addedDate.getMonth() === monthIndex && addedDate.getFullYear() === currentYear) {
              dailyData[addedDate.getDate() - 1].cards += amount;
          }
      });

      return dailyData;
    }, [ userId, selectedMonth]);

    const totalCards = chartData.reduce((acc, curr) => acc + curr.cards, 0);
    const totalDecks = chartData.reduce((acc, curr) => acc + curr.decks, 0);

    return (
      <div>
          <Card className="relative w-[60vw] bg-[hsl(var(--profilebackground))] rounded-xl">
              <CardHeader>
                <div className="flex w-full  justify-between">
                    <div className="flex flex-col space-y-2">
                        <CardTitle className="text-gold">Your Cards/Deck Statistics</CardTitle>
                        <CardDescription className="">
                            {`Card Statistics for ${selectedMonth} of 2024`}
                        </CardDescription>
                    </div>
                    <div className="flex items-center space-x-[2vw]">
                        <div>
                            <label htmlFor="monthSelect" className="sr-only">Select Month</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="p-2 rounded max-h-[40px] bg-[hsl(var(--background1))] text-white"
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>  
                        <div className="flex space-x-8">
                            <button
                                onClick={() => setStatisticType("cards")}
                                className={`flex flex-col items-center w-fit py-1 ${statisticType === "cards" ? "border-b-2 border-goldenrod" : "bg-transparent border-b-2 border-transparent"} text-white`}
                            >
                                
                                <div className="text-xs text-muted-foreground">Total Cards</div>
                                <span className="text-sm text-gold font-bold leading-none sm:text-3xl">{totalCards}</span>
                            </button>
                            <button
                                onClick={() => setStatisticType("decks")}
                                className={`flex flex-col items-center w-fit py-1  ${statisticType === "decks" ? "border-b-2 border-goldenrod" : "bg-transparent border-b-2 border-transparent"} text-white`}
                            >
                                <div className="text-xs text-muted-foreground">Total Decks</div>
                                <span className="text-sm text-gold font-bold leading-none sm:text-3xl">{totalDecks}</span>
                            </button>
                        </div>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[55vh] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <XAxis
                            dataKey="day"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" className="bg-white" />}
                        />
                        {statisticType === "decks" && (
                            <Bar dataKey="decks" fill="goldenrod" minPointSize={5} />
                        )}
                        {statisticType === "cards" && (
                            <Bar dataKey="cards" fill="gold" minPointSize={5} />
                        )}
                    </BarChart>
                </ChartContainer>
              </CardContent>
          </Card>
      </div>
    );
}
