import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { GridListViewComponentProps } from '../types/searchbartypes';

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
        <>
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
        </>
    )
}

export default GridListViewComponent