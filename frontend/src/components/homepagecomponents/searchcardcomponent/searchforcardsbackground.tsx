import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypingAnimation } from "../../ui/typing-animation";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AnimatedSearchSuggestionList } from "./animatedsearchsuggestions";

export function SearchCardBentoBackground() {
    return (
        <main className="relative flex flex-col items-center px-2 pt-8 w-full h-[45vh] bg-[hsl(var(--contrast))] shadow-lg rounded-xl">
            <div className="flex items-center p-2 h-12 w-[60%] border-2 border-gray-400 text-gray-400">
                <FontAwesomeIcon icon={faSearch} />
                <TypingAnimation className="text-lg pl-2 text-[hsl(var(--text))]" startOnView={true} delay={500}>Blue Eyes</TypingAnimation> 
            </div>
            <AnimatedSearchSuggestionList />
        </main>
    )
}