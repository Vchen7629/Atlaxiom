
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal } from '@fortawesome/free-solid-svg-icons';

const GridListViewComponent= ({ gridlistviewprops }) => {
    const {
        setListView,
        setGalleryView,
        listView,
        galleryView
    } = gridlistviewprops

    const handleListView = () => {
        setListView(true)
        setGalleryView(false)
    }

    const handleGalleryView = () => {
        setListView(false)
        setGalleryView(true)
    }

    return (
        <>
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
        </>
    )
}

export default GridListViewComponent