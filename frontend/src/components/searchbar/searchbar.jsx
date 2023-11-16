import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import debounce from 'lodash/debounce';
import './searchbar.css';
import YugiohCard from './cardprop.jsx';
import Fuse from 'fuse.js';
import FlipPendulumMonsterCard from './specializedCardProps/FlipPendulumCardProp.jsx';

const SearchBar = () => {
    const [cardName, setCardName] = useState('');
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);
    const [threshold] = useState(0.3); // Initial threshold value
    const [data] = useState({ data: [] }); // Initial state for data
    const [showEffectType] = useState(false);
    const maxSuggestions = 20;

    const apiUrl = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    const searchCard = async () => {
        try {
          if (!cardName.trim()) {
            return;
          }
    
          const response = await fetch(`${apiUrl}?fname=${encodeURIComponent(cardName)}`);
          const data = await response.json();
    
          if (response.ok) {
            setCardData(data);
            setError(null);
    
            // Set the suggestions based on the results
            setSuggestions(data.data.slice(0, maxSuggestions).map((card) => card.name));
          } else {
            setError(`Error: ${data.message}`);
            setCardData(null);
            setSuggestions([]);
            setSelectedSuggestion(null);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please try again.');
          setCardData(null);
          setSuggestions([]);
          setSelectedSuggestion(null);
        }
      };
    
        // Debounce the searchCard function with a delay of 500 milliseconds
        const debouncedSearchCard = debounce(searchCard, 500);
        
        useEffect(() => {
            debouncedSearchCard();
        }, [debouncedSearchCard]);
        
        const handleInputChange = (e) => {
            setCardName(e.target.value);
            setSelectedSuggestion(null);
        };
        
        const handleSuggestionClick = (suggestion) => {
            setCardName(suggestion);
            setSelectedSuggestion(suggestion);
            setSuggestions([]);
        };
        
        const handleInputFocus = () => {
            // Clear suggestions and reset selectedSuggestion when input is focused
            setSuggestions([]);
            setSelectedSuggestion(null);
        };
        
        // Create a new Fuse instance with dynamic threshold
        const fuseOptions = {
            keys: ['name'],
            threshold: threshold,
        };
        const fuse = new Fuse(data?.data || [], fuseOptions);
        
        // Determine the card type based on the "type" property
        let CardComponent;
        if (cardData && cardData.data && cardData.data.length > 0) {
            const cardType = cardData.data[0].type.toLowerCase();
            switch (cardType) {
                case 'pendulum flip effect monster':
                    CardComponent = FlipPendulumMonsterCard;
                    break
                default:
                    CardComponent = YugiohCard; 
                }
              }
      
        return (
          <div className="search-bar-container">
          <div className="Input-Wrapper">
            <input
              type="text"
              value={cardName}
              onChange={handleInputChange}
    
              onFocus={handleInputFocus}
              placeholder="Enter card name"
              
            />
            <button className="Searchbar-button" onClick={searchCard}>
              <FontAwesomeIcon icon={faSearch} rotation={90} />
              Search
            </button>
          </div>
    
          {suggestions.length > 0 && (
            <div className="suggestion-list">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className={`suggestion ${selectedSuggestion === suggestion ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
    
          {error && <p style={{ color: 'red' }}>{error}</p>}
    
          
    
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
        </div>
        );
    };

export default SearchBar;