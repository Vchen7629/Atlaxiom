
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { GridListViewComp } from '../types/componenttypes';

const GridListViewComponent= ({ gridlistviewprops }: GridListViewComp) => {
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
        <div className="ml-6 bg-footer flex w-[75px] rounded-xl">
            <button
                className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${listView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                onClick={handleListView}
            >
                <FontAwesomeIcon icon={faBars} className="fa-lg"/>
            </button>
            <button
                className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${galleryView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                onClick={handleGalleryView}
            >
                <FontAwesomeIcon icon={faGripHorizontal } className="fa-lg"/>
            </button>
        </div>
    )
}

export default GridListViewComponent