import React from 'react';
import { useGetOwnedCardsQuery } from './ownedCardapislice';
import OwnedCardTable from './ownedCardTable';

const UserOwnedCard = () => {
  const {
    data: userOwnedCards,
    error,
    isLoading,
    isSuccess,
  } = useGetOwnedCardsQuery({ username: 'your-username' }, {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    if (error.status === 404) {
      return <div className="user-not-found">User not found</div>;
    }

    console.error('Error fetching user data:', error);
    return <div>Error fetching user data</div>;
  }

  const ownedCards = userOwnedCards?.ownedCards;

  if (isSuccess) {
    console.log('userOwnedCards:', userOwnedCards);
    return <OwnedCardTable ownedCards={ownedCards} />;

    /*return (
      
      <div>
        <h2>User Owned Cards</h2>
        {ownedCards && ownedCards.length > 0 ? (
          <ul>
            {ownedCards.map((card) => (
              <li key={card.id}>
                <img src={card.cardimage} alt={card.cardname} />
                <p>{card.cardname}</p>
                <p>{card.ownedProp ? 'Owned' : 'Not Owned'}</p>
              
              </li>
            ))}
          </ul>
        ) : (
          <p>User has no owned cards.</p>
        )}
      </div>
    );*/
  }

  return null; // Optional: Handle other states or return null if none of the conditions are met
};

export default UserOwnedCard;