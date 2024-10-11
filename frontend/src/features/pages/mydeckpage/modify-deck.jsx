import React, { useState, useRef, useEffect } from 'react';
import { useGetAllOwnedDecksQuery } from '../../api-slices/decksapislice';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import "./styling/view-decks.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGripHorizontal, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';


const Deckmodify = () => {
    const location = useLocation();
    const { userId } = location.state || {};
    const navigate = useNavigate()

    const [searchTerm, setSearchTerm] = useState('');

    const [listView, setListView] = useState(true);
    const [listViewDecks, setListViewDecks] = useState([]);

    const [galleryView, setGalleryView] = useState(false);  

    const {
        data: modifyDecks,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetAllOwnedDecksQuery(userId);
    
    const decksToDisplay = modifyDecks?.entities?.undefined?.ownedDecks || [];
    console.log("decks to display is", decksToDisplay)

    console.log("hi sir", modifyDecks)

    useEffect(() => {
        if (userId) {
            refetch(); 
            console.log("Refetched data after entering Modify Deck page");
        }
    }, [userId, refetch]);


    const handleListView = () => {
        setListView(true)
        setGalleryView(false)
    }

    const handleGalleryView = () => {
        setListView(false)
        setGalleryView(true)
    }

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleClearClick = () => {
        setSearchTerm('')
    }
   
    const content = (
        <>  
        <Header/>
            <main className="view-decks-page-background">
                <div className="view-decks-display-card">
                <div className="view-decks-header"> 
                    <h1  className="view-decks-title">Your Decks</h1> 
                    <div className="view-decks-searchbar">
                        <FontAwesomeIcon icon={faSearch} className="modify-deck-search-icon fa-xl"/>
                        <input 
                           className="Modify-deck-search-bar-input"
                           placeholder="Enter Your Deck Name"
                           value={searchTerm}
                           onChange={handleSearchTerm}
                        />
                        <button className="modify-deck-clear-icon" onClick={handleClearClick}>
                            <FontAwesomeIcon icon={faTimes} className="fa-xl"/>
                        </button>
                        
                    </div>
                    <button
                        className="list-view-setting-button"
                        onClick={handleListView}
                    >
                        <FontAwesomeIcon icon={faBars} className="fa-2xl"/>
                    </button>
                    <button
                        className="gallery-view-setting-button"
                        onClick={handleGalleryView}
                    >
                        <FontAwesomeIcon icon={faGripHorizontal} className="fa-2xl"/>
                    </button>
                </div>
                <div className="My-Decks-Display-Container">
                    {listView && (
                        <>
                            <div className="My-Decks-Display-List">
                                <div className="List-view-header">

                                </div>
                                {decksToDisplay.map((deck) => (
                                    <>
                                    <div className="list-view-deck-item" key={deck._id}>
                                        <div className="list-view-deck-name">
                                            <strong>{deck.deck_name}</strong>
                                        </div>
                                        <div className="list-view-deck-desc">{deck.deck_desc}</div>
                                        <div>{deck.lastUpdated}</div>
                                    </div>
                                    </>
                                ))}               
                            </div>
                        </>
                    )}        
                    {galleryView && (
                        <>
                            <div className="My-Decks-Gallery-List">
                                Gallery View
                            </div>
                        </>
                    )}               
                </div>
                </div>
            </main>
        <Footer/>
        </>
    );

    return content
};

export default Deckmodify