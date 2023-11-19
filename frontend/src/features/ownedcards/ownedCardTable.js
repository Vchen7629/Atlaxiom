import React from 'react';

const OwnedCardTable = ({ cards }) => (
    <table>
        <thead>
            <tr>
                <th>Card Image</th>
                <th>Card Name</th>
                <th>Owned</th>
            </tr>
        </thead>
        <tbody>
            {cards.map(card => (
                <tr key={card._id}>
                    <td>
                      <img 
                        className="cardimage"
                        src={card.image_url} 
                        alt={card.card_name} />
                    </td>
                    <td>{card.card_name}</td>
                    <td>{card.ownedprop ? 'Yes' : 'No'}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default OwnedCardTable;