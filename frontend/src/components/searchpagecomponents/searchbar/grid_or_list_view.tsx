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
        listView, setListView,
        galleryView, setGalleryView
    } = gridlistviewprops

    function handleListView() {
        setListView(true)
        setGalleryView(false)
    }

    function handleGalleryView() {
        setListView(false)
        setGalleryView(true)
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className='flex'>
                        <span
                            className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${listView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                            onClick={handleListView}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleListView();
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faBars} className="fa-xl"/>
                        </span>
                        <span
                            className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${galleryView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                            onClick={handleGalleryView}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    handleGalleryView();
                                }
                            }}
                        >
                            <FontAwesomeIcon icon={faGripHorizontal } className="fa-xl"/>
                        </span>
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