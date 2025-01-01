import { useGetAllOwnedDecksQuery } from "../../../features/api-slices/decksapislice"
import { useGetOwnedCardsQuery } from "../../../features/api-slices/ownedCardapislice"

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

// Types
interface OwnedDeck {
    createdOn: string;
    deck: string; 
}

interface OwnedCard {
    addedOn: string;
    card: string;
}

interface UserEntity {
    ownedDecks: OwnedDeck[];
    ownedCards: OwnedCard[];
}

interface UserData {
    entities: Record<string, UserEntity>;
}

interface ChartData {
    day: string;
    decks: number;
    cards: number;
}

export const description = "A multiple bar chart";

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
    const { data: deckData } = useGetAllOwnedDecksQuery<UserData>(userId);
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

      ownedDeck.forEach((deck) => {
          const createdDate = new Date(deck.createdOn);
          if (createdDate.getMonth() === monthIndex && createdDate.getFullYear() === currentYear) {
              dailyData[createdDate.getDate() - 1].decks++;
          }
      });

      ownedCards.forEach((card) => {
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
          <Card className="bg-blackthree w-[70vw] border-gray-500 border-4">
              <CardHeader>
                <div className="flex w-full  justify-between">
                    <div>
                        <CardTitle className="text-gold mb-5">Your Cards/Deck Statistics</CardTitle>
                        <CardDescription className="">
                            {`Daily statistics for ${selectedMonth} 2024`}
                        </CardDescription>
                    </div>
                    <div className="flex">
                        <div className="">
                            <label htmlFor="monthSelect" className="sr-only">Select Month</label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="p-2 border rounded border-2 max-h-[40px] border-goldenrod text-white"
                            >
                                {months.map((month) => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>  
                        <div className="flex relative top-[-20px] right-[-25px]">
                            <button
                                onClick={() => setStatisticType("cards")}
                                className={`flex flex-col items-center px-4 py-2 w-[120px]  ${statisticType === "cards" ? "border-b-2 border-goldenrod" : "bg-transparent border-b-2 border-transparent"} text-white`}
                            >
                                
                                <div className="text-xs text-muted-foreground">Total Cards</div>
                                <span className="text-md text-gold font-bold leading-none sm:text-3xl">{totalCards}</span>
                            </button>
                            <button
                                onClick={() => setStatisticType("decks")}
                                className={`flex flex-col items-center p-2 w-[120px]  ${statisticType === "decks" ? "border-b-2 border-goldenrod" : "bg-transparent border-b-2 border-transparent"} text-white`}
                            >
                                <div className="text-xs text-muted-foreground">Total Decks</div>
                                <span className="text-md text-gold font-bold leading-none sm:text-3xl">{totalDecks}</span>
                            </button>
                        </div>
                    </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[35vh] w-full">
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
