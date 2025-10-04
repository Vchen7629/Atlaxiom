import { useState } from 'react';
import { useSelector } from 'react-redux';
import Footer from "@/shared/components/Footer.tsx"
import Header from "@/shared/components/header.tsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import GridListViewComponent from '../../../shared/buttons/gridOrListView.tsx';
import { UserIdState } from '../types/deckPage.ts';
import PaginationComponent from '@/features/decks/buttons/pagination.tsx';
import { useGetAllOwnedDecksQuery } from '@/app/api-slices/decksapislice.ts';
import { Toaster } from 'sonner';
import { DeckApiResponse } from '@/app/api-slices/types/decktypes.ts';
import DeckDisplay from '@/features/user/components/deckDisplayWrapper.tsx';
import { useHandleSubmitCreate } from '../hooks/useHandleSubmitCreate.tsx';
import { toastSuccessMessage } from '@/shared/types/toast.ts';
import FormatDeckApiResponse from '@/shared/utils/formatDeckApiResponse.tsx';
import ModifyDataDB from '@/shared/buttons/modifyDataDB.tsx';
import NormalizeToToastError from '@/shared/utils/normalizeToToastError.tsx';

const DeckHomepage = () => {
    const userId = useSelector((state: UserIdState) => state.auth.userId);
    const [deckName, setDeckName] = useState<string>('');
    const { data: modifyDecks, isLoading, refetch } = useGetAllOwnedDecksQuery(userId);
    const decksToDisplay: DeckApiResponse[] = modifyDecks || [];
    const handleSubmitCreate = useHandleSubmitCreate()

    const filteredDecks = decksToDisplay.filter((deck: DeckApiResponse) =>
        deck?.deck_name?.toLowerCase().includes(deckName.toLowerCase())
    );

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
    };

    const filterProps = {
        listView, setListView,
        galleryView, setGalleryView,
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
                    <ModifyDataDB<toastSuccessMessage, unknown>
                        onModify={() => handleSubmitCreate()}
                        successMessage={(data: toastSuccessMessage) => `Created New Deck Named: ${data?.name}`}
                        errorHandler={(error: unknown) => FormatDeckApiResponse(NormalizeToToastError(error), "create")}
                        className='flex text-md px-4 py-2 rounded-2xl bg-[hsl(var(--background3))] shadow-lg'
                    >
                        New Deck
                    </ModifyDataDB>
                </div>
                <div className="flex w-[80vw] lg:w-[70vw] xl:w-[60vw] lg:ml-[15vw] mt-[2.5vh] mb-[1.5vh] justify-between">
                    <div className="flex w-[50vw] lg:w-[20vw] h-[40px] pl-5 relative justify-start text-[hsl(var(--text))] bg-[hsl(var(--contrast))] shadow-lg shadow-[hsl(var(--shadow))] text-gray-400 rounded-lg border-2 border-gray-400 dark:border-gray-600 focus:outline-none">                   
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
                    <div className="flex w-20 h-11 bg-[hsl(var(--contrast))] shadow-md shadow-[hsl(var(--shadow))] rounded-xl">
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

export default DeckHomepage