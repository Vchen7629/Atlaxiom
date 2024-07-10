import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAddNewOwnedCardMutation } from '../../api-slices/ownedCardapislice';
import "./styling/SearchResult.css"

const SearchResult = () => {
  const { cardname } = useParams();
  const [carddata, setCardData] = useState(null);
  const [isloading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const [AddNewOwnedCard] = useAddNewOwnedCardMutation();

  const apiurl = "https://db.ygoprodeck.com/api/v7/cardinfo.php"

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`${apiurl}?name=${encodeURIComponent(cardname)}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Fetched data from API:', data);
          setCardData(data.data[0]);
        } else {
          console.error('Error fetching card data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchCardData();
  }, [cardname]);

  const handleButtonClick = async () => {
    if (carddata) {
        const cardToPost = {
            ownedCards: [
                {
                    card_name: carddata.name,
                    image_url: carddata.card_images && carddata.card_images.length > 0 ? carddata.card_images[0].image_url : 'fallback-image-url',
                    ownedprop: "True",
                    type: carddata.type,
                    race: carddata.race,
                    attribute: carddata.attribute,
                    archetype: carddata.archetype,
                    level: carddata.level,
                    linkval: carddata.linkval,
                    scale: carddata.scale,
                    atk: carddata.atk,
                    def: carddata.def,
                    desc: carddata.desc || carddata.pend_desc || carddata.monster_desc,
                },
            ],
        };

        try {
            const result = await AddNewOwnedCard({ id: userId, CardData: cardToPost }).unwrap();
            console.log("Card data successfully posted:", result);
        } catch (error) {
            console.error('Error posting card data:', error);
        }
    }
  }
  
  return (
    <div className="Card-container">
        {carddata !== null && !isloading ? (
            <>
                <img 
                    className="card-image"
                    src={carddata.card_images && carddata.card_images.length > 0 ? carddata.card_images[0].image_url : 'fallback-image-url'}
                    alt={carddata.card_images && carddata.card_images.length > 0 ? carddata.card_images[0].image_url_small : 'fallback-image-url-small'}
                />
            <div className="card-details">
                <h1 className="card-name">{carddata.name}</h1>
                <div className="horizontal-line-name"/>
                    <div className="cardbody">
                        {(carddata.level || carddata.linkval || carddata.attribute || carddata.type || carddata.race || carddata.archetype) && (
                            <div className="columnone">
                                {carddata.type && 
                                    <p className="card-type-container">
                                        <div className="card-type-header">Type:</div> 
                                        <div className="card-type-body">{carddata.type[0]}</div>
                                    </p>
                                }

                                {carddata.race && 
                                    <p className="card-subtype-container">
                                        <div className="card-subtype-header">Sub-Type:</div>
                                        <div className="card-subtype-body">{carddata.race}</div>
                                    </p>
                                }

                                {carddata.attribute && 
                                    <p className="card-attribute-container">
                                        <div className="card-attribute-header">Attribute: </div>
                                        <div className="card-attribute-body">{carddata.attribute}</div>
                                    </p>
                                }

                                {carddata.archetype && 
                                    <p className="card-archetype-container">
                                        <div className="card-archetype-header">archetype:</div> 
                                        <div className="card-archetype-body">{carddata.archetype}</div>
                                    </p>
                                }
                            </div>
                        )}

                        {(carddata.atk || carddata.def || carddata.linkval || carddata.level || carddata.scale) && (
                            <div className="columntwo">
                                {carddata.level && 
                                    <p className="card-level-container">
                                        <div className="card-level-header">Level/Rank:</div> 
                                        <div className="card-level-body">{carddata.level}</div>
                                    </p>
                                }

                                {carddata.linkval && 
                                    <p className="card-link-container">
                                        <div className="card-link-header">Link value:</div> 
                                        <div className="card-link-body">{carddata.linkval}</div>
                                    </p>
                                }

                                {carddata.scale && 
                                    <p className="card-pendulum-scale-container">
                                        <div className="card-pendulum-scale-header">Pendulum scale value:</div> 
                                        <div className="card-pendulum-scale-body">{carddata.scale}</div>
                                    </p>
                                }

                                {carddata.atk && 
                                    <p className="card-atk-container">
                                        <div className="card-atk-header">Attack: </div>
                                        <div className="card-atk-body">{carddata.atk}</div>
                                    </p>
                                }

                                {carddata.def && 
                                    <p className="card-def-container">
                                        <div className="card-def-header">Defense: </div>
                                        <div className="card-def-body">{carddata.def}</div>
                                    </p>
                                }
                            </div>
                        )}
                    </div>
                        <div className="card-descriptions-container">
                            <div>
                                {carddata.type && carddata.type.toLowerCase() === "normal monster" && carddata.desc && (
                                    <p className="normal-desc-container">
                                        <div className="normal-desc-header"> Flavor text: </div>
                                        <div className="normal-desc-body">{carddata.desc}</div>
                                    </p>
                                )}

                                {carddata.pend_desc && 
                                    <p className="pend-desc-container">
                                        <div className="pend-desc-header">Pendulum effect: </div>
                                        <div className="pend-desc-body">{carddata.pend_desc}</div>
                                    </p>
                                }

                                {carddata.monster_desc && 
                                    <p className="monster-desc-container">
                                        <div className="monster-desc-header">Monster effect: </div>
                                            <div className="monster-desc-body">{carddata.monster_desc}</div>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="button-container">
                            <button className="my-button" onClick={handleButtonClick}>Add to Owned</button>
                        </div>
                    </div>
            </>
            ) : (
                <div className="card-details">
                    <p className="loading-body">
                        <h1 className="loading-text">Loading Card Data</h1>
                    </p>
                </div>
        )}
    </div>
  );
};

export default SearchResult;