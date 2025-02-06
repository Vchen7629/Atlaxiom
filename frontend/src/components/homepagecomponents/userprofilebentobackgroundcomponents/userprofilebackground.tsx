import { BarChartPlaceholder } from "./barchartplaceholder";

export function UserProfileBentoGridBackground() {
    return (
        <main className="justify-center absolute top-[-8vh] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 flex items-center px-2 pt-8 w-full h-full">
           <BarChartPlaceholder />
        </main>
    )
}