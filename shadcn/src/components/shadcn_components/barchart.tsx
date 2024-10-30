"use client"
import { useGetSpecificUserQuery } from "../../features/api-slices/usersApiSlice"
import { useSelector } from "react-redux"
import { useMemo } from "react"
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

//types
interface OwnedDeck {
    createdOn: string;
    deck: string; 
}
  
interface OwnedCard {
    addedOn: string;
    card: string

}
  
interface UserEntity {
    ownedDecks: OwnedDeck[];
    ownedCards: OwnedCard[];
}
  
interface UserData {
    entities: Record<string, UserEntity>;
}
  
interface ChartData {
    month: string;
    decks: number;
    cards: number;
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
    const { data: userData, isLoading, isError } = useGetSpecificUserQuery<UserData>(userId);
  
    // Log to check if `userData` is being fetched correctly
    console.log("Fetched userData:", userData);
  
    const chartData = useMemo<ChartData[]>(() => {
      if (!userData || !userData.entities || !userData.entities[userId]) {
      return [];
    }
  
    const monthlyData = Array.from({ length: 12 }, () => ({
        decks: 0,
        cards: 0,
    }));
    
    const ownedDecks = userData.entities[userId].ownedDecks;
    const ownedCards = userData.entities[userId].ownedCards;

    ownedDecks.forEach((deck) => {
        const createdMonth = new Date(deck.createdOn).getMonth();
        monthlyData[createdMonth].decks++;
    });

    ownedCards.forEach((card) => {
        const createdMonth = new Date(card.addedOn).getMonth();
        monthlyData[createdMonth].cards++;
    });
  
    const data = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ].map((month, index) => ({
        month,
        decks: monthlyData[index].decks,
        cards: monthlyData[index].cards,
    }));
  
    console.log("Chart data:", data);
  
    return data;
}, [userData, userId]);
  
if (isLoading) return <div>Loading statistics...</div>;
if (isError || !userData) return <div>Error loading statistics.</div>;

    return (
    <div className="relative w-[30vw]">
        <Card className="bg-blackthree border-gray-500 border-4">
        <CardHeader>
            <CardTitle className="text-gold">Your Cards/Deck Statistics</CardTitle>
            <CardDescription className="">Decks created January - December 2024</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={chartConfig} className="max-h-200 ">
            <BarChart accessibilityLayer data={chartData}>
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