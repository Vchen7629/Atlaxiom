import { UpdatedCard } from "../../../features/decks/types/buttontypes";

export const handleIncreaseCardOwnedAmount = (
    cardToIncrease: UpdatedCard, 
    setCard: React.Dispatch<React.SetStateAction<UpdatedCard[]>>, 
    setCardsToAdd: React.Dispatch<React.SetStateAction<UpdatedCard[]>>,
) => {
    setCard((prevCard: UpdatedCard[]) => {
      const updatedCard = prevCard.map(card => {
        if ((card._id || card.id) === (cardToIncrease._id || cardToIncrease.id)) {
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
    setCardsToAdd((prevPlaceholder: UpdatedCard[]) => {
      const cardExists = prevPlaceholder.some((card) => (card.name || card.card_name) === (cardToIncrease.name || cardToIncrease.card_name));

      if (!cardExists) {
        return [
          ...prevPlaceholder,
          { ...cardToIncrease, cardInDeckOwnedAmount: Math.min((cardToIncrease.cardInDeckOwnedAmount || 0) + 1, 3 ) }
        ];
      }

      return prevPlaceholder.map((card) => {
        if ((card._id || card.id) === (cardToIncrease._id || cardToIncrease.id)) {
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
    cardToDecrease: UpdatedCard, 
    setCard: React.Dispatch<React.SetStateAction<UpdatedCard[]>>,
    setCardsToDecrease: React.Dispatch<React.SetStateAction<UpdatedCard[]>>,
) => {
    setCard((prevCard: UpdatedCard[]) => {
      const updatedCard = prevCard.map(card => {
        if ((card._id || card.id) === (cardToDecrease._id || cardToDecrease.id)) {
          return { 
            ...card, 
            cardInDeckOwnedAmount: Math.max((card.cardInDeckOwnedAmount || 0) - 1, 1)
          } 
        } else {
          return card;
        } 
      })
      return updatedCard;
    })
    setCardsToDecrease((prevPlaceholder: UpdatedCard[]) => {
      const cardExists = prevPlaceholder.some(card => (card.name || card.card_name) === (cardToDecrease.name || cardToDecrease.card_name));

      if (!cardExists) {
        return [
            ...prevPlaceholder,
            { ...cardToDecrease, cardInDeckOwnedAmount: Math.max((cardToDecrease.cardInDeckOwnedAmount || 0) - 1, 1) }
        ];
      }

      return prevPlaceholder.map(card => {
        if ((card._id || card.id) === (cardToDecrease._id || cardToDecrease.id)) {
          return {
            ...card,
            cardInDeckOwnedAmount: Math.max((card.cardInDeckOwnedAmount || 0) - 1, 1),
          };
        }
        return card;
      })
    })
}

export const handleDeleteCardClick = (
    cardToDelete: UpdatedCard,
    setCards: React.Dispatch<React.SetStateAction<UpdatedCard[]>>,
    removeFromArray: React.Dispatch<React.SetStateAction<UpdatedCard[]>>,
    setCardsToDelete: React.Dispatch<React.SetStateAction<UpdatedCard[]>>,
) => {
    setCards((prevCards: UpdatedCard[]) => 
      prevCards.filter(card => {
        const cardId = card?.id || card?._id;
        const deleteCardId = cardToDelete?.id || cardToDelete?._id;
        return cardId !== deleteCardId;
      })
    );
    removeFromArray((prevPlaceHolder: UpdatedCard[]) => 
        prevPlaceHolder.filter(
            card => (card._id || card.id) !== (cardToDelete._id || cardToDelete.id)
        )
    );
    setCardsToDelete((prevPlaceholder: UpdatedCard[]) => {
        const cardExists = prevPlaceholder.some(card => (card.name || card.card_name) === (cardToDelete.name || cardToDelete.card_name));
  
        if (!cardExists) {
          return [
            ...prevPlaceholder,
            cardToDelete, 
          ];
        }

        return prevPlaceholder;
    });
  };

