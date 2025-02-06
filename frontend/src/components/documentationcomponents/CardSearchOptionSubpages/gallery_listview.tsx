import { faBars, faGripHorizontal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function GalleryListViewSubPage() {

    return (
        <main className="flex flex-col space-y-[3vh] w-full h-full">
            <span className="text-4xl text-[hsl(var(--background3))] font-bold">Changing between Gallery and List View</span>
            <span className="w-[80%] text-lg font-normal text-gray-400">Search results can be displayed as either a list or gallery card results</span>
            <div className="flex items-center space-x-2 w-[80%] text-lg font-normal text-gray-400">
                <span>Interact with the gallery / list view button: </span>
                <div className='flex bg-footer rounded-xl'>
                    <span className="text-white p-1 px-2 rounded-xl mr-2 bg-[hsl(var(--background3))]">
                        <FontAwesomeIcon icon={faBars} className="fa-sm"/>
                    </span>
                    <span className="text-gray-400 p-1 rounded-xl mr-2 bg-transparent">
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-sm"/>
                    </span>
                </div>
                <span>To swap between gallery and list view</span>
            </div>
            <span className="w-[80%] text-lg font-normal text-gray-400">The currently selected option is displayed by the gold background</span>
            <div className="flex items-center space-x-2">
                <span className="text-xl text-[hsl(var(--text))]"> List View Active: </span>
                <div className='flex bg-footer rounded-2xl'>
                    <span className="text-white p-1 px-2 rounded-xl mr-2 bg-[hsl(var(--background3))]">
                        <FontAwesomeIcon icon={faBars} className="fa-xs"/>
                    </span>
                    <span className="text-gray-400 p-1 rounded-xl mr-1 bg-transparent">
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-xs"/>
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-xl text-[hsl(var(--text))]"> Gallery View Active: </span>
                <div className='flex bg-footer rounded-2xl'>
                    <span className="text-gray-400 p-1 px-2 rounded-xl mr-1 bg-transparent">
                        <FontAwesomeIcon icon={faBars} className="fa-xs"/>
                    </span>
                    <span className="text-white p-1 px-2 rounded-xl bg-[hsl(var(--background3))]">
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-xs"/>
                    </span>
                </div>
            </div>
        </main>
    )
}