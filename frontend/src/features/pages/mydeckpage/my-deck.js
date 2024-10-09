import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/header"
import "./styling/my-deck.css"
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';

const MyDeck = () => {
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    const {
        data: usersData,
        error,
        isLoading,
        refetch,
    } = useGetSpecificUserQuery(userId, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });


    const handleCreateDeckClick = () => {
        console.log('UserID in MyDeck:', userId)
        navigate('/newDeck', { state: { userId } });
    };

    return (
        <>
            <Header/>
            <main className="Deck-page-background">
                <button className="new-deck-button" onClick={handleCreateDeckClick}>
                    Create new decks
                </button>
            </main>
            <Footer/>
        </>
    )

}

export default MyDeck