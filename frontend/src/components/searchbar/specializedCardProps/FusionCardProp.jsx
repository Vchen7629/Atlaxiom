import React from 'react';

const FusionMonsterCard = ({ 
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
    <div className="FusionCardProp">
      <h2>{name}</h2>
      <img className="CardImage" src={image} alt={name} />
      <p>Type: {type}</p>
      <p>Attribute: {attribute}</p>
      <p>Level: {level}</p>
      <p>Race: {race}</p>
      <p>Archetype: {archetype}</p>
      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
      <p>Monster Effect: {description}</p>
    </div>
  );
};

export default FusionMonsterCard;