import React, { useState, useEffect } from 'react';
import './ownedcards.css';

const UserOwnedCardTable = ({ ownedCards }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    updateVisibleCards();
  }, [currentPage, ownedCards]);

  useEffect(() => {
    setTotalPages(Math.ceil(ownedCards.length / itemsPerPage));
  }, [ownedCards]);

  const updateVisibleCards = () => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const currentVisibleCards = ownedCards.slice(startIdx, endIdx);
    setVisibleCards(currentVisibleCards);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <h2>User Owned Cards</h2>
      <table>
        <thead>
          <tr>
            <th className="card-image-name-title">Image</th>
            <th className="card-details-table-head">Card-details</th>
            <th className="card-stats-table-head">Card Stats</th>
            <th className="card-desc-table-head">Card Description</th>
          </tr>
        </thead>
        <tbody>
          {visibleCards.map((card) => (
            <tr key={card.id}>
              <td>
                <img
                  className="cardtableimage"
                  src={card.image}
                  alt={card.name}
                />
                {card.ownedProp ? 'Owned' : 'Not Owned'}
              </td>
              <td>
                  {card.name &&
                  <div className="table-card-name-container">
                    <div className="table-card-name-header">Card Name:</div>
                    <p className="table-card-name-body">{card.name}</p>
                  </div>
                  }
        
                  {card.type && 
                    <div className="table-card-type-container">
                      <div className="table-card-type-header">Card Type:</div>
                      <p className="table-card-type-body">{card.type}</p>
                    </div>
                  }

                  {card.subtype &&
                    <div className="table-card-subtype-container">
                      <div className="table-card-subtype-header">Card Sub-Type:</div>
                      <p className="table-card-subtype-body">{card.subtype}</p>
                    </div>
                  }


                  {card.attribute &&
                    <div className="table-card-attribute-container">
                      <div className="table-card-attribute-header">Carc Attribute:</div>
                      <p className="table-card-attribute-body">{card.attribute}</p>
                    </div>
                  }

                  {card.archetype &&
                    <div className="table-card-archetype-container">
                      <div className="table-card-archetype-header">Card Archetype:</div>
                      <p className="table-card-archetype-body">{card.archetype}</p>
                    </div>
                  }
              </td>
              <td>
                  {card.level &&
                    <div className="table-card-level-container">
                      <div className="table-card-level-header">Card level:</div>
                      <p className="table-card-level-body">{card.level}</p>
                    </div>
                  }

                  {card.linkval &&
                    <div className="table-card-linkval-container">
                      <div className="table-card-linkval-header">Link value:</div>
                      <p className="table-card-linkval-body">{card.linkval}</p>
                    </div>
                  }
                  
                  {card.pendscale &&
                    <div className="table-card-pendscale-container">
                      <div className="table-card-pendscale-header">Pend Scale:</div>
                      <p className="table-card-penscale-body">{card.pendscale}</p>
                    </div>
                  }

                  {card.attack &&
                    <div className="table-card-attack-container">
                      <div className="table-card-attack-header">Attack:</div>
                      <p className="table-card-attack-body">{card.attack}</p>
                    </div>
                  }

                  {card.defense &&
                    <div className="table-card-defense-container">
                      <div className="table-card-defense-header">Defense:</div>
                      <p className="table-card-defense-body">{card.defense}</p>
                    </div>
                  }
              </td>
              <td>
                  <div>
                    {card.desc}
                  </div>
                  <div>
                    {card.monsterdesc}
                  </div>
                  <div>
                    {card.penddesc}
                  </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="button-left"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {'<'}
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="button-right"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default UserOwnedCardTable;