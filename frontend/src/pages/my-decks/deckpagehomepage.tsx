import { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeckDisplay from '../../components/deckcomponents/homepage/owneddeckdisplaycomponent.tsx';
import GridListViewComponent from '../../components/deckcomponents/homepage/grid_or_list_view.tsx';
import CreateNewDeckComponent from '../../components/deckcomponents/homepage/CreateNewDeckButton.tsx';
import { UserIdState } from './deckpagetypes.ts';


const DeckPageHomepage = () => {
    const userId = useSelector((state: UserIdState) => state.auth.userId);
    const [deckName, setDeckName] = useState<string>('');
    const [, setClickedOnCard] = useState<boolean>(false);

    const [listView, setListView] = useState<boolean>(true);
    const [galleryView, setGalleryView] = useState<boolean>(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setDeckName(inputValue);
    };

    const handleClearClick = () => {
        setDeckName('');
        //setSelectedCardData(null);
        //setSelectedSuggestion(null);
        setClickedOnCard(false);
    };

    const filterProps = {
        listView, setListView,
        galleryView, setGalleryView,
        setClickedOnCard,
        //setCurrentPage,
    };


    return (
        <main className="min-h-[110vh] flex flex-col bg-[hsl(var(--background1))] justify-between">
            <Header/>
            <div className="flex flex-col py-[15vh]">
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

export default DeckPageHomepage