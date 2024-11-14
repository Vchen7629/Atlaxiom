import { useTheme } from "next-themes";
 
import { MagicCard } from "../../ui/magic-card";

 
export function MagicCardDemo() {
  const { theme } = useTheme();
  return (
    <main className="flex flex-col w-full items-center">
        <div
        className={
            "flex flex-row justify-center w-full gap-4 "
        }
        >  
        <MagicCard
            className="cursor-pointer flex-col items-center  shadow-2xl whitespace-nowrap max-w-[20vw] h-[400px] bg-blackone border-goldenrod"
            gradientColor={theme === "dark" ? "#3C3105" : "#3C3105"}
        >
            <div className="text-white">Decks</div>
        </MagicCard>
        <MagicCard
            className="cursor-pointer flex-col items-center  shadow-2xl whitespace-nowrap max-w-[20vw] h-[400px] bg-blackone border-goldenrod"
            gradientColor={theme === "dark" ? "#3C3105" : "#3C3105"}
        >
            <div className="text-white">Collection</div>
        </MagicCard>
        <MagicCard
            className="cursor-pointer flex-col items-center  shadow-2xl whitespace-nowrap  max-w-[20vw] h-[400px] bg-blackone border-goldenrod"
            gradientColor={theme === "dark" ? "#3C3105" : "#3C3105"}
        >
            <div className="text-white">Magic</div>
        </MagicCard>
        </div>
    </main>
  );
}