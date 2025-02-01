import { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import DeckDisplay from '../../components/deckmanagerpagecomponents/display/owneddeckdisplaycomponent.tsx';
import GridListViewComponent from '../../components/deckmanagerpagecomponents/buttons/grid_or_list_view.tsx';
import CreateNewDeckComponent from '../../components/deckmanagerpagecomponents/buttons/CreateNewDeckButton.tsx';
import { UserIdState } from './deckpagetypes.ts';
import PaginationComponent from '@/components/deckmanagerpagecomponents/pagination/pagination.tsx';
import { useGetAllOwnedDecksQuery } from '@/app/api-slices/decksapislice.ts';
import { Toaster } from 'sonner';
import { GalleryDeck } from '@/components/deckbuttons/buttonprops.ts';
import { DeckApiResponse } from '@/app/api-slices/types/decktypes.ts';
import { Deck } from '@/components/deckmanagerpagecomponents/types/homepagecomponentprops.ts';

const DeckPageHomepage = () => {
    const userId = useSelector((state: UserIdState) => state.auth.userId);
    const [deckName, setDeckName] = useState<string>('');
    const { data: modifyDecks, isLoading, refetch } = useGetAllOwnedDecksQuery(userId);
    const decksToDisplay: DeckApiResponse[] = modifyDecks || [];

    const filteredDecks = decksToDisplay.filter((deck: DeckApiResponse) =>
        deck?.deck_name?.toLowerCase().includes(deckName.toLowerCase())
    );
    
    const [, setClickedOnCard] = useState<boolean>(false);

    const [listView, setListView] = useState<boolean>(true);
    const [galleryView, setGalleryView] = useState<boolean>(false);

    const suggestionsPerGalleryPage = 18;
    const suggestionsPerListPage = 7;
    const [totalListPages, setTotalListPages] = useState<number>(1);
    const [totalGalleryPages, setTotalGalleryPages] = useState<number>(1);
    function updateTotalListPages(filteredDecksLength: number) {
        setTotalListPages(Math.ceil(filteredDecksLength / suggestionsPerListPage));
    }
    function updateTotalGalleryPages(filteredDecksLength: number) {
        setTotalGalleryPages(Math.ceil(filteredDecksLength / suggestionsPerGalleryPage));
    }
    const [currentListPage, setListCurrentPage] = useState<number>(1);  
    const [currentGalleryPage, setGalleryCurrentPage] = useState<number>(1);
    const [currentPageListDecksArray, setCurrentPageListDecksArray] = useState<Deck[]>([]);
    const [currentPageGalleryDecksArray, setCurrentPageGalleryDecksArray] = useState<GalleryDeck[]>([]);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = e.target.value;
        setDeckName(inputValue);
    };

    function handleClearClick() {
        setDeckName('');
        setClickedOnCard(false);
    };

    const filterProps = {
        listView, setListView,
        galleryView, setGalleryView,
        setClickedOnCard,
        setGalleryCurrentPage,
        setListCurrentPage,
    };

    const paginationprops = {
        filteredDecks,
        listView,
        galleryView,
        currentListPage, setListCurrentPage,
        currentGalleryPage, setGalleryCurrentPage,
        suggestionsPerListPage,
        suggestionsPerGalleryPage,
        setCurrentPageListDecksArray,
        setCurrentPageGalleryDecksArray,
        totalListPages,
        totalGalleryPages,
        updateTotalListPages,
        updateTotalGalleryPages,
    }

    const deckdisplayprops = {
        isLoading,
        decksToDisplay,
        listView,
        galleryView,
        userId,
        refetch,
        currentPageListDecksArray, setCurrentPageListDecksArray,
        currentPageGalleryDecksArray, setCurrentPageGalleryDecksArray,
    }


    return (
        <main className="min-h-[110vh] flex flex-col bg-[hsl(var(--background1))] justify-between">
            <Header/>
            <div className="flex flex-col items-center lg:items-start py-[15vh]">
                <Toaster richColors  expand visibleToasts={4}/>
                <div className="flex w-[80vw] lg:w-[70vw] xl:w-[50vw] lg:ml-[15vw] items-center justify-between">
                    <span className="text-lg lg:text-3xl font-black text-[hsl(var(--text))]">Deck Manager</span>
                    <CreateNewDeckComponent userId={userId}/>
                </div>
                <div className="flex w-[80vw] lg:w-[70vw] xl:w-[50vw] lg:ml-[15vw] mt-[2.5vh] mb-[1.5vh] justify-between">
                    <div className="flex w-[50vw] lg:w-[15vw] h-[40px] pl-5 relative border-2 border-gray-400 justify-start text-[hsl(var(--text))]">                      
                      <div className="flex items-center w-full">
                        <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        <input
                          className="bg-transparent w-full h-full text-sm lg:text-xl text-[hsl(var(--text))] focus:outline-none"
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
                    <section className="hidden lg:flex">
                        <PaginationComponent paginationprops={paginationprops}/>
                    </section>
                    <div className="flex w-20 h-11 bg-footer rounded-xl">
                        <GridListViewComponent filterProps={filterProps}/>  
                    </div>
                </div>
                <section className="flex w-[80vw] lg:hidden">
                    <PaginationComponent paginationprops={paginationprops}/>
                </section>
                <div className='flex w-[80vw] lg:w-[70vw] xl:w-[50vw] lg:ml-[15vw] items-center justify-between'>
                    <DeckDisplay deckdisplayprops={deckdisplayprops}/>
                </div>
            </div>
            <Footer/>

        </main>
    )

}

export default DeckPageHomepage