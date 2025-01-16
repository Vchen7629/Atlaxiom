import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { GridListViewComponentProps } from '../types/searchbartypes';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const GridListViewComponent= ({ gridlistviewprops }: GridListViewComponentProps) => {
    const {
        setClickedOnCard,
        listView, setListView,
        galleryView, setGalleryView
    } = gridlistviewprops

    const handleListView = () => {
        setListView(true)
        setGalleryView(false)
        setClickedOnCard(false)
    }

    const handleGalleryView = () => {
        setListView(false)
        setGalleryView(true)
        setClickedOnCard(false)
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className='flex'>
                        <button
                            className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${listView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                            onClick={handleListView}
                        >
                            <FontAwesomeIcon icon={faBars} className="fa-xl"/>
                        </button>
                        <button
                            className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${galleryView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                            onClick={handleGalleryView}
                        >
                            <FontAwesomeIcon icon={faGripHorizontal } className="fa-xl"/>
                        </button>
                    </div>
                </TooltipTrigger>
                <TooltipContent className="bg-[hsl(var(--ownedcardcollection))] border-transparent" side="bottom">
                    <span className="text-[hsl(var(--text))]">Swap between List and Gallery View</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default GridListViewComponent