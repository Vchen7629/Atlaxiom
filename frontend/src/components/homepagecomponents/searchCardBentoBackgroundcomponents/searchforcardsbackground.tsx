import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TypingAnimation } from "../../ui/typing-animation";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { AnimatedSearchSuggestionList } from "./animatedsearchsuggestions";

export function SearchCardBentoBackground() {
    return (
        <main className="flex flex-col items-center px-2 pt-8 w-full h-full">
            <div className="flex items-center p-2 h-12 w-[60%] border-2 border-gray-400">
                <FontAwesomeIcon icon={faSearch} />
                <TypingAnimation className="text-lg pl-2" startOnView={true} delay={500}>Blue Eyes</TypingAnimation> 
            </div>
            <AnimatedSearchSuggestionList />
        </main>
    )
}