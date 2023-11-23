import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './ownedcards.css'

const UserOwnedCardTable = ({ ownedCards }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
    updateVisibleCards();
  }, [ownedCards]);

  const updateVisibleCards = () => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentVisibleCards = ownedCards.slice(startIdx, endIdx);

    setHasMore(endIdx < ownedCards.length);
    setVisibleCards(currentVisibleCards);
  };

  const fetchMoreData = () => {
    setTimeout(() => {
      setCurrentPage((prevPage) => prevPage + 1);
      updateVisibleCards();
    }, 500);
  };

  return (
    <div>
      <h2>User Owned Cards</h2>
      <InfiniteScroll
        dataLength={visibleCards.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Ownership</th>
            </tr>
          </thead>
          <tbody>
            {visibleCards.map((card, index) => (
              console.log("Card ID:", card.id),
              console.log("Card Name:", card.cardname),
              console.log("Card index:", index),
              
              <tr key={card.id}>
                <td className="cardtableimagecontainer">
                  <img 
                    className="cardtableimage"
                    src={card.cardimage} 
                    alt={card.cardname} />
                </td>
                <td>{card.cardname}</td>
                <td>{card.ownedProp ? 'Owned' : 'Not Owned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </InfiniteScroll>
      {!hasMore && <p>No more cards to load.</p>}
    </div>
  );
};

export default UserOwnedCardTable;