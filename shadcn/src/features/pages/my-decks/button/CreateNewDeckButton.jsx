import React, { useState, useEffect } from 'react';
import { useCreateNewDeckMutation } from '../../../api-slices/decksapislice';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateNewDeckComponent = ({ userId }) => {

    const navigate = useNavigate()

    const [addNewDeck] = useCreateNewDeckMutation()

    const handleCreateDeckClick = async () => {
        try {
            const payload = { id: userId };
            const result = await addNewDeck(payload).unwrap();
    
            if (result  && result.deck && result.deck._id) {
                navigate('/modifyDeck', { state: { deckId: result.deck._id, userId: userId } });
            } else {
                console.error("Error: Deck creation failed, missing deck ID.");
            }
        } catch (error) {
            console.error("Error occurred during addNewDeck:", error);
            if (error.status === 404 && error.data?.message === "Owned Decks not found for the user") {
                alert("No decks found for this user. Please create a new deck.");
            } else {
                alert("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <button className="flex text-xl px-4 py-2 rounded-3xl bg-[hsl(var(--background3))]" onClick={handleCreateDeckClick}>
            New Deck
        </button>
    )
};

export default CreateNewDeckComponent