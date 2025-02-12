import { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from "../../components/footer/Footer.tsx"
import Header from "../../components/header/header.tsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import GridListViewComponent from '../../components/deckmanagerpagecomponents/buttons/grid_or_list_view.tsx';
import CreateNewDeckComponent from '../../components/deckmanagerpagecomponents/buttons/CreateNewDeckButton.tsx';
import { UserIdState } from './deckpagetypes.ts';
import PaginationComponent from '@/components/deckmanagerpagecomponents/pagination/pagination.tsx';
import { useGetAllOwnedDecksQuery } from '@/app/api-slices/decksapislice.ts';
import { Toaster } from 'sonner';
import { DeckApiResponse } from '@/app/api-slices/types/decktypes.ts';
import DeckDisplay from '@/components/deckdisplay/deckapidisplay.tsx';

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
    const [currentPageListDecksArray, setCurrentPageListDecksArray] = useState<DeckApiResponse[]>([]);
    const [currentPageGalleryDecksArray, setCurrentPageGalleryDecksArray] = useState<DeckApiResponse[]>([]);

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
        // skipcq: JS-0415
        <main className="min-h-[110vh] flex flex-col bg-[hsl(var(--bentogridbackground))] justify-between">
            <Header/>
            <div className="flex flex-col items-center lg:items-start py-[15vh]">
                <Toaster richColors  expand visibleToasts={4}/>
                <div className="flex w-[80vw] lg:w-[70vw] xl:w-[60vw] lg:ml-[15vw] items-center justify-between">
                    <div className='flex space-x-[3vw]'>
                        <span className="text-lg lg:text-3xl font-black text-[hsl(var(--background3))] mb-1">Deck Manager</span>
                        <div className='flex space-x-[1vw]'>
                            <button className='text-xl text-gray-500 border-b-2 border-transparent hover:border-goldenrod'>
                                All Decks
                            </button>
                            <button className='text-xl text-gray-500 border-b-2 border-transparent hover:border-blue-400'>
                                Favorites
                            </button>
                        </div>
                    </div>
                    <CreateNewDeckComponent userId={userId}/>
                </div>
                <div className="flex w-[80vw] lg:w-[70vw] xl:w-[60vw] lg:ml-[15vw] mt-[2.5vh] mb-[1.5vh] justify-between">
                    <div className="flex w-[50vw] lg:w-[20vw] h-[40px] pl-5 relative justify-start text-[hsl(var(--text))] bg-[hsl(var(--border))] text-gray-400 rounded-lg border-2 border-gray-300 focus:outline-none">                   
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
                <div className='flex w-[80vw] lg:w-[70vw] xl:w-[60vw] lg:ml-[15vw] items-center justify-between'>
                    <DeckDisplay deckdisplayprops={deckdisplayprops}/>
                </div>
            </div>
            <Footer/>

        </main>
    )

}

export default DeckPageHomepage