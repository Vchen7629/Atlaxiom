import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shared/ui/tooltip"
import { useSelector } from 'react-redux';
import { UserIdState } from "@/features/decks/types/deckPage";
   
export function BreadcrumbSearchResult() {
    const isAuthenticated = useSelector((state: UserIdState) => state.auth.userId !== null);
    
    return (
        <TooltipProvider>
            <Breadcrumb>
                <BreadcrumbList>
                    <Tooltip>
                        <TooltipTrigger>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="text-[hsl(var(--text))] bg-transparent text-lg hover:text-gold" href={isAuthenticated ? "/loggedin" : "/"}>Home</BreadcrumbLink>
                            </BreadcrumbItem>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent">
                            <span className="text-[hsl(var(--text))]">Navigate to home</span>
                        </TooltipContent>
                    </Tooltip>
                    <BreadcrumbSeparator />
                    <Tooltip>
                        <TooltipTrigger>
                            <BreadcrumbItem>
                                <BreadcrumbLink  className="text-[hsl(var(--text))] bg-transparent text-lg hover:text-gold" href={isAuthenticated ? "/searchloggedin" : "/search"}>Search</BreadcrumbLink>
                            </BreadcrumbItem>
                        </TooltipTrigger>
                        <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent">
                            <span className="text-[hsl(var(--text))]">Navigate to Card Search Page</span>
                        </TooltipContent>
                    </Tooltip>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage  className="text-[hsl(var(--text))] text-lg">...</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </TooltipProvider>
    )
  }