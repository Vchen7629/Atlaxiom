// Determine the card type based on the "type" property
let CardComponent;
if (cardData && cardData.data && cardData.data.length > 0) {
  const cardType = cardData.data[0].type.toLowerCase();
  switch (cardType) {
    case 'pendulum flip effect monster':
      CardComponent = FlipPendulumMonsterCard;
      break;
    default:
      CardComponent = YugiohCard;
  }
}


  {selectedSuggestion && cardData && cardData.data && cardData.data.length > 0 && (
      <CardComponent
        name={cardData.data[0].name}
        image={cardData.data[0].card_images[0].image_url}
        type={cardData.data[0].type}
        attribute={cardData.data[0].attribute}
        level={cardData.data[0].level}
        race={cardData.data[0].race}
        archetype={cardData.data[0].archetype}
        attack={cardData.data[0].atk}
        defense={cardData.data[0].def}
        description={cardData.data[0].desc}
        showEffectType={showEffectType}
        pend_desc={cardData.data[0].pend_desc}
        monster_desc={cardData.data[0].monster_desc}
        scale={cardData.data[0].scale}
        linkval={cardData.data[0].linkval}
        card_sets={cardData.data[0].card_sets[0].set_name}
      />
      
      
  )}

