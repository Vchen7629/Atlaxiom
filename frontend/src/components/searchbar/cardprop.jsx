import React from 'react';


const YugiohCard = ({ 
    name, 
    image, 
    type, 
    attribute, 
    level, 
    race, 
    archetype, 
    attack,
    defense, 
    description,
}) => {
  return (
    <div className="YugiohCardProp">
      <div className="CardName">
        <h2>{name}</h2>
      </div>
      <img
        className="Cardimage"
        src={image}
        alt={name}
        style={{ maxWidth: '200px' }}
        
      /> 
      
       
       <div className="descriptioncontainer">
            <p>Card effect: {description}</p>
        </div>
        <p className="Cardtype">Type: {type}</p>
        <p className="CardRace">Race: {race}</p>
        <p className="Cardattribute">Attribute: {attribute}</p>
        <p className="Cardlevel_Rank">Level: {level}</p>
        <p className="Cardattack">Attack: {attack}</p>
        <p className="Carddefense">Defense: {defense}</p>
        <p className="CardArchetype">Archetype: {archetype}</p>
    
    </div>
  );
}; 

export default YugiohCard;