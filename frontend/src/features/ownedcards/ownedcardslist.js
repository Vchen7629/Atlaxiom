import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ownedcards.css'

import OwnedCardTable from './ownedCardTable';

const UserOwnedCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserAndOwnedCards = async () => {
            try {
                const response = await fetch(`http://localhost:3001/dash/users/ownedcards/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }

                const userData = await response.json();
                setUser(userData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchUserAndOwnedCards();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h2 className="usernamecontainer">User Owned Cards</h2>
            {user.ownedCards && user.ownedCards.length > 0 ? (
              <div className="testing">
                <OwnedCardTable cards={user.ownedCards} />
              </div>
            ) : (
                <p>User has no owned cards.</p>
            )}
        </div>
    );
}

export default UserOwnedCard;