import { useGetAllOwnedDecksQuery } from "@/app/api-slices/deckApiSlice"
import { useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice"
import { useMemo, useState } from "react"
import { Bar, BarChart, XAxis } from "recharts"
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
import { ChartData, SelectedYear } from "../types/chartTypes"
import { DeckApiResponse } from "@/app/api-slices/types/decktypes"

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

export function ComponentBarMonthChart({ selectedYear }: SelectedYear): JSX.Element {
    const { data: deckData } = useGetAllOwnedDecksQuery();
    const { data: cardData } = useGetOwnedCardsQuery()
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const currentMonth = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState<string>(months[currentMonth]);
    const [statisticType, setStatisticType] = useState<"cards" | "decks">("cards");

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

    const chartData = useMemo<ChartData[]>(() => {
      if (!cardData) {
            console.error("cardData.entities is undefined or empty.");
            return [];
      }

      const currentYear = new Date().getFullYear();
      
      const ownedDeck = deckData || [];
      const ownedCards = Object.values(cardData || {}).flat();

      if (selectedMonth === "All") return [];

      const monthIndex = months.indexOf(selectedMonth);
      const daysInSelectedMonth = daysInMonth(monthIndex, currentYear);

      const dailyData = Array.from({ length: daysInSelectedMonth }, (_, i) => ({
          day: `${selectedMonth.slice(0,3)} ${i + 1}`,
          decks: 0,
          cards: 0,
      }));

        ownedDeck.forEach((deck: DeckApiResponse)=> {
            const deckYear = deck.createdOn.slice(0, 4);
            const createdDate = new Date(deck.createdOn);
            if (createdDate.getMonth() === monthIndex && deckYear === selectedYear) {
                dailyData[createdDate.getDate() - 1].decks++;
            }
        });

        ownedCards.forEach((card) => {
            const addedDate = new Date(card.addedOn);
            const deckYear = card.addedOn.slice(0, 4);
            const amount = card.ownedamount || 1
            if (addedDate.getMonth() === monthIndex && deckYear === selectedYear) {
                dailyData[addedDate.getDate() - 1].cards += amount;
            }
        });

      return dailyData;
    }, [ 
        selectedYear, 
        selectedMonth,
        cardData,
        deckData,
        months
    ]);

    const totalCards = chartData.reduce((acc, curr) => acc + curr.cards, 0);
    const totalDecks = chartData.reduce((acc, curr) => acc + curr.decks, 0);

    function SetCardView() {
        setStatisticType("cards")
    }

    function setDeckView() {
        setStatisticType("decks")
    }

    function Header() {
        return (
            <div className="flex flex-col items-center lg:items-start space-y-2">
                <CardTitle className="text-[hsl(var(--text))] lg:text-2xl">Your Cards/Deck Statistics</CardTitle>
                <CardDescription className="text-lg">
                    {`Card Statistics for ${selectedMonth} of ${selectedYear}`}
                </CardDescription>
            </div>
        )
    }

    function SwapCardDeck() {
        return (
            <div className="flex items-center space-x-[2vw]">
                <div>
                    <label htmlFor="monthSelect" className="sr-only">Select Month</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="p-2 rounded max-h-[40px] bg-[hsl(var(--background3))] text-[hsl(var(--text))]"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>  
                <div className="flex space-x-8">
                    <button
                        onClick={SetCardView}
                        className={`flex flex-col items-center w-fit py-1 bg-transparent ${statisticType === "cards" ? "border-b-2 border-goldenrod" : " border-b-2 border-transparent"} text-[hsl(var(--text))]`}
                    >
                        <div className="text-md lg:text-lg text-muted-foreground">Total Cards</div>
                        <span className="lg:text-md font-bold leading-none sm:text-3xl">{totalCards}</span>
                    </button>
                    <button
                        onClick={setDeckView}
                        className={`flex flex-col items-center w-fit py-1 bg-transparent ${statisticType === "decks" ? "border-b-2 border-goldenrod" : "border-b-2 border-transparent"} text-[hsl(var(--text))]`}
                    >
                        <div className="text-md lg:text-lg text-muted-foreground">Total Decks</div>
                        <span className="lg:text-md font-bold leading-none sm:text-3xl">{totalDecks}</span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        // skipcq: JS-0415
        <Card className="relative w-full lg:w-[60vw] bg-[hsl(var(--contrast))] rounded-xl shadow-lg shadow-[hsl(var(--shadow))]">
            <CardHeader>
                <div className="flex flex-col lg:flex-row w-full  justify-between">
                    <Header/>
                    <SwapCardDeck/>
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
                            <Bar dataKey="decks" fill="hsl(var(--background3))" minPointSize={5} />
                        )}
                        {statisticType === "cards" && (
                            <Bar dataKey="cards" fill="gold" minPointSize={5} />
                        )}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
