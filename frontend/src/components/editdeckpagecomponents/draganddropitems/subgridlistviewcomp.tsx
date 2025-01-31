import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { SubGridListViewComponentProps } from '../types/draganddropitemtypes';
import { useCallback } from 'react';

const SubGridListViewComponent= ({ filterProps }: SubGridListViewComponentProps) => {
    const {
        listView, setListView,
        galleryView, setGalleryView
    } = filterProps

    const handleListView = useCallback(() => {
        setListView(true)
        setGalleryView(false)
    }, [setListView, setGalleryView]);

    const handleGalleryView = useCallback(() => {
        setListView(false)
        setGalleryView(true)
    }, [setListView, setGalleryView]);

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

export default SubGridListViewComponent