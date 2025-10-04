"use client";
 
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/shared/ui/animated-list";
import blueeyesabyssdragon from "../../../../img/blue-eyes-abyss-dragon.jpg"
import blueeyesaltultdragon from "../../../../img/blue-eyes-alternative-ult-dragon.jpg"
import blueeyesaltwhitedragon from "../../../../img/blue-eyes-alternative-white-dragon.jpg"
import blueeyeschaosdragon from "../../../../img/blue-eyes-chaos-dragon.jpg" 

interface Item {
  name: string;
  description: string;
  icon: string;
  color: string;
}
 
let SearchCards = [
  {
    name: "Blue-Eyes Abyss Dragon",
    description: "If this card is Special Summoned: You can add 1 Ritual Spell or 1 Polymerization from your Deck",
    icon: blueeyesabyssdragon,
    color: "transparent",
  },
  {
    name: "Blue-Eyes Alternative Ultimate Dragon",
    description: "Your opponent cannot target or destroy this card with card effects.",
    icon: blueeyesaltultdragon,
    color: "transparent",
  },
  {
    name: "Blue-Eyes Alternative White Dragon",
    description: "Once per turn: You can target 1 monster your opponent controls; destroy it.",
    icon: blueeyesaltwhitedragon,
    color: "transparent",
  },
  {
    name: "Blue-Eyes Chaos Dragon",
    description: "Your opponent cannot target this card with card effects, also it cannot be destroyed by your opponent's card effects.",
    icon: blueeyeschaosdragon,
    color: "transparent",
  },
];
 
SearchCards = Array.from({ length: 10 }, () => SearchCards).flat();
 
const SearchCard = ({ name, description, icon, color }: Item) => {
  return (
    <figure // skipcq: JS-0415
      className={cn(
        "relative mx-auto min-h-fit w-[80%] cursor-pointer overflow-hidden rounded-md p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div 
            className="flex size-10 w-[10%] items-center justify-center rounded-2xl"
            style={{ backgroundColor: color }}
        >
           {typeof icon === "string" && icon.startsWith("/") ? (
                <img src={icon} alt={name} className="w-fit" />
                ) : (
                <span className="text-xl">{icon}</span>
            )}
        </div>
        <div className="flex flex-col w-[90%] overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg text-[hsl(var(--background3))]">{name}</span>
          </figcaption>
          <p className="text-xs lg:text-sm font-normal text-[hsl(var(--text))]">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};
 
export function AnimatedSearchSuggestionList({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[150px] lg:h-[300px] mt-[2vh] w-full overflow-hidden [mask-image:linear-gradient(to_top,transparent_1%,#000_100%)]",
        "before:absolute before:inset-x-0 before:top-0 before:h-12 ",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-12 ",
        className,
      )}
    >
      <AnimatedList>
        {SearchCards.map((item, idx) => (
          <SearchCard {...item} key={idx} /> // skipcq: JS-0437
        ))}
      </AnimatedList>
    </div>
  );
}