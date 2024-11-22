import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,  faGripHorizontal } from '@fortawesome/free-solid-svg-icons';


const GridListViewComponent= ({ setListView, setGalleryView, setClickedOnCard, setCurrentPage, listView, galleryView }) => {
    const handleListView = () => {
        setListView(true)
        setGalleryView(false)
        setClickedOnCard(false)
        setCurrentPage(1)
    }

    const handleGalleryView = () => {
        setListView(false)
        setGalleryView(true)
        setClickedOnCard(false)
        setCurrentPage(1)
    }

    return (
        <>
            <button
                className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${listView ? "bg-goldenrod text-white" : "bg-transparent"}`}
                onClick={handleListView}
            >
                <FontAwesomeIcon icon={faBars} className="fa-xl"/>
            </button>
            <button
                className={`text-gray-400 p-2 rounded-xl hover:text-gold mr-2 ${galleryView ? "bg-goldenrod text-white" : "bg-transparent"}`}
                onClick={handleGalleryView}
            >
                <FontAwesomeIcon icon={faGripHorizontal } className="fa-xl"/>
            </button>
        </>
    )
}

export default GridListViewComponent