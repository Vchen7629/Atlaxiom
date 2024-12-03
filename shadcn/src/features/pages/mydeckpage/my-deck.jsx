import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/header"
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';


const MyDeck = () => {
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    const [deckName, setDeckName] = useState('');
    const [clickedOnDeck, setClickedOnCard] = useState(false);

    const {} = useGetSpecificUserQuery(userId, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });


    const handleCreateDeckClick = () => {
        navigate('/newDeck', { state: { userId } });
    };

    const handleModifyDeckClick = () => {
        navigate('/modifyDeck', { state: { userId } });
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setDeckName(inputValue);
        setClickedOnCard(false);
        //setSelectedCardData(null);
        //setCurrentPage(1);
        //setErrorMessage(null);
    };

    const handleClearClick = () => {
        setDeckName('');
        setError(null);
        setErrorMessage(null);
        //setSelectedCardData(null);
        //setSelectedSuggestion(null);
        setClickedOnCard(false);
      };

    return (
        <main className="min-h-[110vh] flex flex-col pt-[15vh] bg-[hsl(var(--background1))] justify-between">
            <Header/>
            <div className="flex flex-col">
                <div className="flex w-[60vw] ml-[15vw] items-center justify-between">
                    <div className="text-3xl font-black text-[hsl(var(--text))]">Deck Manager</div>
                    <div className="flex w-[25vw] h-[50px] pl-5 relative border-2 border-gray-400 justify-start text-gold">                      
                      <div className="flex items-center w-full">
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        <input
                          className="bg-transparent w-full h-full text-xl text-white focus:outline-none"
                          type="text"
                          value={deckName}
                          onChange={handleInputChange}
                          placeholder="Search Your Decks"
                        />
                        {deckName && (
                          <button className="cursor-pointer mr-[25px]" onClick={handleClearClick}>
                            <FontAwesomeIcon icon={faTimes} className="fa-lg" />
                          </button>
                        )}
                      </div>
                    </div>
                    <button className="flex text-xl px-4 py-2 rounded-3xl bg-[hsl(var(--background3))]">New Deck</button>
                </div>
            </div>
            <Footer/>
        </main>
    )

}

export default MyDeck