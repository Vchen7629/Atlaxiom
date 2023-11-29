import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import "./styling/SearchResult.css"

const SearchResult = () => {
  const { cardname } = useParams();
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        const data = await response.json();

        if (response.ok) {
          // Log the entire data fetched from the API
          console.log('Fetched data from API:', data);

          // Filter the data based on cardname
          const filteredData = data.data.find((card) =>
            card.name.toLowerCase().includes(decodeURIComponent(cardname).toLowerCase())
          );
          // Log the filtered data
          console.log('Filtered data:', filteredData);
          setFilteredData(filteredData);
          
        } else {
          console.error('Error fetching card data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, [cardname]);
  
  return (
    <div className="Card-container">
        {filteredData ? (
            <>
            <img 
                className="card-image"
                src={filteredData.card_images && filteredData.card_images.length > 0 ? filteredData.card_images[0].image_url : 'fallback-image-url'}
                alt={filteredData.card_images && filteredData.card_images.length > 0 ? filteredData.card_images[0].image_url_small : 'fallback-image-url-small'}
            />
            <div className="card-details">
                <h1 className="card-name">{filteredData.name}</h1>
                <div className="horizontal-line-name"/>
                    <div className="cardbody">
                        {(filteredData.level || filteredData.linkval || filteredData.attribute || filteredData.type || filteredData.race || filteredData.archetype) && (
                            <div className="columnone">
                                {filteredData.type && 
                                    <p className="card-type-container">
                                        <div className="card-type-header">Type:</div> 
                                            <div className="card-type-body">{filteredData.type}</div>
                                    </p>
                                }

                                {filteredData.race && 
                                    <p className="card-subtype-container">
                                        <div className="card-subtype-header">Sub-Type:</div>
                                            <div className="card-subtype-body">{filteredData.race}</div>
                                    </p>
                                }

                                {filteredData.attribute && 
                                    <p className="card-attribute-container">
                                        <div className="card-attribute-header">Attribute: </div>
                                            <div className="card-attribute-body">{filteredData.attribute}</div>
                                    </p>
                                }

                                {filteredData.archetype && 
                                    <p className="card-archetype-container">
                                        <div className="card-archetype-header">archetype:</div> 
                                            <div className="card-archetype-body">{filteredData.archetype}</div>
                                    </p>
                                }
                            </div>
                        )}

                        {(filteredData.atk || filteredData.def || filteredData.linkval || filteredData.level || filteredData.scale) && (
                            <div className="columntwo">
                                {filteredData.level && 
                                    <p className="card-level-container">
                                        <div className="card-level-header">Level/Rank:</div> 
                                            <div className="card-level-body">{filteredData.level}</div>
                                    </p>
                                }

                                {filteredData.linkval && 
                                    <p className="card-link-container">
                                        <div className="card-link-header">Link value:</div> 
                                            <div className="card-link-body">{filteredData.linkval}</div>
                                    </p>
                                }

                                {filteredData.scale && 
                                    <p className="card-pendulum-scale-container">
                                        <div className="card-pendulum-scale-header">Pendulum scale value:</div> 
                                            <div className="card-pendulum-scale-body">{filteredData.scale}</div>
                                    </p>
                                }

                                {filteredData.atk && 
                                    <p className="card-atk-container">
                                        <div className="card-atk-header">Attack: </div>
                                            <div className="card-atk-body">{filteredData.atk}</div>
                                    </p>
                                }
                                {filteredData.def && 
                                    <p className="card-def-container">
                                        <div className="card-def-header">Defense: </div>
                                            <div className="card-def-body">{filteredData.def}</div>
                                    </p>
                                }
                            </div>
                        )}
                    </div>
                    <div className="card-descriptions-container">
                        <div>
                            {filteredData.type && filteredData.type.toLowerCase() === "normal monster" && filteredData.desc && (
                                <p className="normal-desc-container">
                                    <div className="normal-desc-header"> Flavor text: </div>
                                    <div className="normal-desc-body">{filteredData.desc}</div>
                                </p>
                                )}

                            {filteredData.pend_desc && 
                                <p className="pend-desc-container">
                                    <div className="pend-desc-header">Pendulum effect: </div>
                                        <div className="pend-desc-body">{filteredData.pend_desc}</div>
                                </p>
                            }

                            {filteredData.monster_desc && 
                                <p className="monster-desc-container">
                                    <div className="monster-desc-header">Monster effect: </div>
                                        <div className="monster-desc-body">{filteredData.monster_desc}</div>
                                </p>
                            }
                        </div>
                    </div>
            </div>
            </>
            ) : (
            <p>No matching cards found.</p>
            )}
           
    </div>
  );
};

export default SearchResult;