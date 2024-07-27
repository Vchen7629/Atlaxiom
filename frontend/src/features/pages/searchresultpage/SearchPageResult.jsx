import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./styling/SearchResult.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong, faSpinner } from '@fortawesome/free-solid-svg-icons';

const SearchResult = () => {
  const { cardname } = useParams();
  const [carddata, setCardData] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const apiurl = "https://db.ygoprodeck.com/api/v7/cardinfo.php"

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch(`${apiurl}?name=${encodeURIComponent(cardname)}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Fetched data from API:', data);
          setTimeout(() => {
            setCardData(data.data[0]);
            setIsLoading(false);
          }, 1000)
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

  const handleBackToSearchBarClick = async () => {
    try {
        navigate("/search")
    } catch (err) {
        console.log("Error clicking back button")
    }
  }
  
  return (
    <main>
        {carddata !== null && !isloading ? (
            <>
            <div className="Card-container">
                <main className="card-details">
                    <img className="card-image"
                        src={carddata.card_images && carddata.card_images.length > 0 ? carddata.card_images[0].image_url : 'fallback-image-url'}
                        alt={carddata.card_images && carddata.card_images.length > 0 ? carddata.card_images[0].image_url_small : 'fallback-image-url-small'}
                    />
                    <div className="Card-information-container">
                        <div className="search-card-name">{carddata.name}</div>
                        <div className="cardbody">
                                {(carddata.level || carddata.linkval || carddata.attribute || carddata.type || carddata.race || carddata.archetype) && (
                                    <div className="columnone">
                                        {carddata.type && 
                                            <p className="card-type-container">
                                                <div className="card-type-header">Type:</div> 
                                                <div className="card-type-body">{carddata.type}</div>
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

                                {(carddata.atk !== undefined || carddata.def !== undefined || carddata.linkval || carddata.level || carddata.scale) && (
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

                                        {carddata.atk !== undefined && 
                                            <p className="card-atk-container">
                                                <div className="card-atk-header">Attack: </div>
                                                <div className="card-atk-body">{carddata.atk !== null ? carddata.atk : 0}</div>
                                            </p>
                                        }

                                        {carddata.def !== undefined && 
                                            <p className="card-def-container">
                                                <div className="card-def-header">Defense: </div>
                                                <div className="card-def-body">{carddata.def !== null ? carddata.def : 0}</div>
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


                                {carddata.desc && (
                                    <p className="desc-container">
                                        <div className="normal-desc-header"> Effect: </div>
                                        <div className="normal-desc-body">{carddata.desc}</div>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
                <div className="Search-Result-back-icon-container">
                    <button 
                        className="Search-Result-back-icon"
                        onClick={handleBackToSearchBarClick}
                    > 
                        <FontAwesomeIcon icon={faLeftLong} className="fa-3x"/>
                    </button>
                </div>
            </div>
            </>
            ) : (
                <div className="loading-spinner-icon-container">
                    <div className="loading-spinner-icon">
                        <FontAwesomeIcon icon={faSpinner} className="fa-spin fa-10x"/>
                    </div>
                    <div className="loading-spinner-text">
                        <strong>Loading Card Data... </strong>
                    </div>
                </div>
        )}
    </main>
  );
};

export default SearchResult;