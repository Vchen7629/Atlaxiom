export const handleIncreaseCardOwnedAmount = (
    cardToIncrease: any, 
    setCard: React.Dispatch<React.SetStateAction<any[]>>, 
    setCardsToAdd: React.Dispatch<React.SetStateAction<any[]>>,
) => {
    setCard((prevCard: any) => {
      const updatedCard = prevCard.map((card: any) => {
        if ((card._id || card.id) === (cardToIncrease._id || cardToIncrease.id)) {
          //console.log(`Increasing card ${card.id || card._id} amount to ${card.cardInDeckOwnedAmount + 1}`); 
          return { 
            ...card, 
            cardInDeckOwnedAmount: Math.min((card.cardInDeckOwnedAmount || 0) + 1, 3)
          } 
        } else {
          return card;
        } 
      });
      return updatedCard;
    })
    setCardsToAdd((prevPlaceholder: any[]) => {
      const cardExists = prevPlaceholder.some((card: any) => (card.name || card.card_name) === (cardToIncrease.name || cardToIncrease.card_name));

      if (!cardExists) {
        console.log(`Adding card ${cardToIncrease.card_name} to the main deck placeholder.`);
        return [
          ...prevPlaceholder,
          { ...cardToIncrease, cardInDeckOwnedAmount: Math.min((cardToIncrease.cardInDeckOwnedAmount || 0) + 1, 3 ) }
        ];
      }

      return prevPlaceholder.map((card: any) => {
        if ((card._id || card.id) === (cardToIncrease._id || cardToIncrease.id)) {
          console.log(`Updating card ${card.card_name || cardToIncrease.card_name} amount to ${Math.min((card.cardInDeckOwnedAmount || 0) + 1, 3)}.`);
          return {
            ...card,
            cardInDeckOwnedAmount: Math.min((card.cardInDeckOwnedAmount || 0) + 1, 3),
          };
        }
        return card;
      });
    })
};

export const handleDecreaseCardOwnedAmount = (
    cardToDecrease: any, 
    setCard: React.Dispatch<React.SetStateAction<any[]>>,
    setCardsToDecrease: React.Dispatch<React.SetStateAction<any[]>>,
) => {
    setCard((prevCard: any) => {
      const updatedCard = prevCard.map((card: any) => {
        if ((card._id || card.id) === (cardToDecrease._id || cardToDecrease.id)) {
          return { 
            ...card, 
            cardInDeckOwnedAmount: Math.max((card.cardInDeckOwnedAmount || 0) - 1, 0)
          } 
        } else {
          return card;
        } 
      }).filter((card: any) => card.cardInDeckOwnedAmount > 0);
      return updatedCard;
    })
    setCardsToDecrease((prevPlaceholder: any[]) => {
      const cardExists = prevPlaceholder.some((card: any) => (card.name || card.card_name) === (cardToDecrease.name || cardToDecrease.card_name));

      if (!cardExists) {
        console.log(`Adding card ${cardToDecrease.card_name} to the main deck placeholder.`);
        return [
            ...prevPlaceholder,
            { ...cardToDecrease, cardInDeckOwnedAmount: Math.max((cardToDecrease.cardInDeckOwnedAmount || 0) - 1, 0) }
        ];
      }

      return prevPlaceholder.map((card: any) => {
        if ((card._id || card.id) === (cardToDecrease._id || cardToDecrease.id)) {
          console.log(`Updating card ${card.card_name || cardToDecrease.card_name} amount to ${Math.min((card.cardInDeckOwnedAmount || 0) + 1, 3)}.`);
          return {
            ...card,
            cardInDeckOwnedAmount: Math.min((card.cardInDeckOwnedAmount || 0) - 1, 0),
          };
        }
        return card;
      }).filter((card: any) => card.cardInDeckOwnedAmount > 0);
    })
}

export const handleDeleteMonsterCardClick = (
    cardToDelete: any,
    setMonsterCards: React.Dispatch<React.SetStateAction<any[]>>
) => {
    setMonsterCards((prevCards: any) => 
      prevCards.filter((card: any) => {
        const cardId = card?.id || card?._id;
        const deleteCardId = cardToDelete?.id || cardToDelete?._id;
        return cardId !== deleteCardId;
      })
    );
  };

export const handleDeleteSpellCardClick = (
    cardToDelete: any,
    setSpellCards: React.Dispatch<React.SetStateAction<any[]>>
) => {
    setSpellCards((prevCards: any) => 
      prevCards.filter((card: any) => {
        const cardId = card?.id || card?._id;
        const deleteCardId = cardToDelete?.id || cardToDelete?._id;
        return cardId !== deleteCardId;
      })
    );
  };

export  const handleDeleteTrapCardClick = (
    cardToDelete: any,
    setTrapCards: React.Dispatch<React.SetStateAction<any[]>>
) => {
    setTrapCards((prevCards: any) => 
      prevCards.filter((card: any) => {
        const cardId = card?.id || card?._id;
        const deleteCardId = cardToDelete?.id || cardToDelete?._id;
        return cardId !== deleteCardId;
      })
    );
  };

