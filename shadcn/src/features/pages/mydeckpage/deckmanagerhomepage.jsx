import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from "../../../components/footer/Footer"
import Header from "../../../components/header/header"
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeckDisplay from './owneddeckdisplaycomponent';
import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';
import { useCreateNewDeckMutation } from '../../api-slices/decksapislice';
import CreateNewDeckComponent from './CreateNewDeckButton';


const MyDeck = () => {
    const userId = useSelector((state) => state.auth.userId);
    const navigate = useNavigate();

    const [deckName, setDeckName] = useState('');
    const [clickedOnDeck, setClickedOnCard] = useState(false);

    const [listView, setListView] = useState(true);
    const [galleryView, setGalleryView] = useState(false);

    const {} = useGetSpecificUserQuery(userId, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setDeckName(inputValue);
    };

    const handleClearClick = () => {
        setDeckName('');
        setError(null);
        setErrorMessage(null);
        //setSelectedCardData(null);
        //setSelectedSuggestion(null);
        setClickedOnCard(false);
    };

    const filterProps = {
        setListView,
        listView,
        setGalleryView,
        galleryView,
        setClickedOnCard,
        //setCurrentPage,
    };


    return (
        <main className="min-h-[110vh] flex flex-col pt-[15vh] bg-[hsl(var(--background1))] justify-between">
            <Header/>
            <div className="flex flex-col">
                <div className="flex w-[45vw] ml-[15vw] items-center justify-between">
                    <div className="text-3xl font-black text-[hsl(var(--text))]">Deck Manager</div>
                    <CreateNewDeckComponent userId={userId}/>
                </div>
                <div className="flex w-[45vw] ml-[15vw] my-[2.5vh] justify-between">
                    <div className="flex w-[15vw] h-[40px] pl-5 relative border-2 border-gray-400 justify-start text-gold">                      
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
                    <div className="flex w-20 bg-footer rounded-xl">
                        <GridListViewComponent filterProps={filterProps}/>  
                    </div>
                </div>
                <div className='flex w-[45vw] ml-[15vw] items-center justify-between'>
                    <DeckDisplay listView={listView} galleryView={galleryView} userId={userId}  deckName={deckName}/>
                </div>
            </div>
            <Footer/>

        </main>
    )

}

export default MyDeck