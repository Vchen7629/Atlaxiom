import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/header"
import "./styling/my-deck.css"
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';


const MyDeck = () => {
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    const {} = useGetSpecificUserQuery(userId, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });


    const handleCreateDeckClick = () => {
        navigate('/newDeck', { state: { userId } });
    };

    const handleModifyDeckClick = () => {
        navigate('/modifyDeck', { state: { userId } });
    }

    return (
        <>
            <Header/>
            <main className="Deck-page-background">
                <div className="Deck-page-menu-container">
                    <h1 className="Deck-page-menu-title">My decks Menu</h1>
                    <div className="New-deck-button-container">
                        <FontAwesomeIcon icon={faPlus} className="icon-styling fa-2xl"/>
                        <button className="new-deck-button" onClick={handleCreateDeckClick}>
                            <div className="Name-of-button">New Deck</div>
                            <div className="button-desc">Create a new deck </div>
                        </button>
                    </div>
                    <div className="Modify-deck-button-container">
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} className="icon-styling-two fa-2xl"/>
                        <button className="modify-deck-button" onClick={handleModifyDeckClick}>
                            <div className="Name-of-button">My Decks</div>
                            <div className="button-desc">View and Modify decks you own, add or remove cards from deck </div>
                        </button>
                    </div>
                    <div className="Delete-deck-button-container">
                        <FontAwesomeIcon icon={faTrash} className="icon-styling fa-2xl"/>
                        <button className="delete-deck-button" onClick={handleCreateDeckClick}>
                            <div className="Name-of-button">Delete Decks</div>
                            <div className="button-desc">Delete decks you own </div>
                        </button>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )

}

export default MyDeck