import { useGetSpecificUserQuery } from "../../features/api-slices/usersApiSlice"
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
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ComponentBarMonthChart(): JSX.Element {
    const userId = useSelector((state: { auth: { userId: string } }) => state.auth.userId);
    const { data: userData, isLoading, isError } = useGetSpecificUserQuery<UserData>(userId);
    
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const currentMonth = new Date().getMonth();
    const [selectedMonth, setSelectedMonth] = useState<string>(months[currentMonth]);

    const daysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

    const chartData = useMemo<ChartData[]>(() => {
      if (!userData || !userData.entities || !userData.entities[userId]) {
          return [];
      }

      const currentYear = new Date().getFullYear();
      
      const ownedDecks = userData.entities[userId].ownedDecks;
      const ownedCards = userData.entities[userId].ownedCards;

      if (selectedMonth === "All") return [];

      const monthIndex = months.indexOf(selectedMonth);
      const daysInSelectedMonth = daysInMonth(monthIndex, currentYear);

      const dailyData = Array.from({ length: daysInSelectedMonth }, (_, i) => ({
          day: `${selectedMonth.slice(0,3)} ${i + 1}`,
          decks: 0,
          cards: 0,
      }));

      ownedDecks.forEach((deck) => {
          const createdDate = new Date(deck.createdOn);
          if (createdDate.getMonth() === monthIndex && createdDate.getFullYear() === currentYear) {
              dailyData[createdDate.getDate() - 1].decks++;
          }
      });

      ownedCards.forEach((card) => {
          const addedDate = new Date(card.addedOn);
          if (addedDate.getMonth() === monthIndex && addedDate.getFullYear() === currentYear) {
              dailyData[addedDate.getDate() - 1].cards++;
          }
      });

      return dailyData;
    }, [userData, userId, selectedMonth]);

    if (isLoading) return <div>Loading statistics...</div>;
    if (isError || !userData) return <div>Error loading statistics.</div>;

    return (
      <div>
          <Card className="bg-blackthree w-[70vw] border-gray-500 border-4">
              <CardHeader>
                <div className="flex w-full justify-between">
                    <div>
                        <CardTitle className="text-gold mb-5">Your Cards/Deck Statistics</CardTitle>
                        <CardDescription className="">
                            {`Daily statistics for ${selectedMonth} 2024`}
                        </CardDescription>
                    </div>
                  <div className="top-4 right-4">
                        <label htmlFor="monthSelect" className="sr-only">Select Month</label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="p-2 border rounded text-gold"
                        >
                            {months.map((month) => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[40vh] w-full">
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
                        <Bar dataKey="decks" fill="goldenrod" minPointSize={5} className=""/>
                        <Bar dataKey="cards" fill="gold" minPointSize={5} />
                    </BarChart>
                </ChartContainer>
              </CardContent>
          </Card>
      </div>
    );
}
