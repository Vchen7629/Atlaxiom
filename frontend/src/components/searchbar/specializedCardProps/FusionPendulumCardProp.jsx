import React from 'react';

const FusionPendulumMonsterCard = ({ 
    name, 
    image, 
    type, 
    attribute, 
    level, 
    scale,
    race, 
    archetype,
    attack, 
    defense,
    pend_desc,
    monster_desc
}) => {
  return (
    <div className="FusionPendulumCardProp">
      <h2>{name}</h2>
      <img className="CardImage" src={image} alt={name} />
      <p>Type: {type}</p>
      <p>Attribute: {attribute}</p>
      <p>Level: {level}</p>
      <p>Pendulum Scale: {scale}</p>
      <p>Race: {race}</p>
      <p>Archetype: {archetype}</p>
      <p>Attack: {attack}</p>
      <p>Defense: {defense}</p>
      <p>Pendulum Effect: {pend_desc}</p>
      <p>Monster Effect: {monster_desc}</p>
    </div>
  );
};

export default FusionPendulumMonsterCard;