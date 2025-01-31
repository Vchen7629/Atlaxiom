import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import { GridListViewComponentProps } from '../types/buttontypes';
import { useCallback } from 'react';

const GridListViewComponent= ({ filterProps }: GridListViewComponentProps) => {
    const {
        setAllCardsCurrentPage,
        setCollectionCardsCurrentPage,
        listView, setListView,
        galleryView, setGalleryView
    } = filterProps

    const handleListView = useCallback(() => {
        setListView(true)
        setGalleryView(false)
        setAllCardsCurrentPage(1)
        setCollectionCardsCurrentPage(1)
    }, [setListView, setGalleryView, setAllCardsCurrentPage, setCollectionCardsCurrentPage]);

    const handleGalleryView = useCallback(() => {
        setListView(false)
        setGalleryView(true)
        setAllCardsCurrentPage(1)
        setCollectionCardsCurrentPage(1)
    }, [setListView, setGalleryView, setAllCardsCurrentPage, setCollectionCardsCurrentPage]);

    return (
        <>
            <button
                className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${listView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                onClick={handleListView}
            >
                <FontAwesomeIcon icon={faBars} className="fa-md lg:fa-xl"/>
            </button>
            <button
                className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${galleryView ? "bg-[hsl(var(--background3))] text-white" : "bg-transparent"}`}
                onClick={handleGalleryView}
            >
                <FontAwesomeIcon icon={faGripHorizontal } className="fa-md lg:fa-xl"/>
            </button>
        </>
    )
}

export default GridListViewComponent