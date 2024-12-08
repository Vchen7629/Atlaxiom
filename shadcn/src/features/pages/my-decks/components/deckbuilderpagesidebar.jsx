import { useState } from 'react';
import GridListViewComponent from '../../../../components/searchbar/grid_or_list_view';
import { useGetOwnedCardsQuery } from '../../../api-slices/ownedCardapislice';
import AllCardsSearchResultsDisplayComponent from './allcardsdisplaycomponent';
import AllCardsSearchBarComponent from './allcardssearchbarcomponent';
import CollectionDisplayComponent from './collectiondisplaycomponent';
import CollectionSearchBarComponent from './collectionsearchbarcomponent';


const DeckBuilderPageSidebarComponent = ({ userId }) => {
    const maxResults = 99999;
    const [galleryView, setGalleryView] = useState(false);
    const [listView, setListView] = useState(true);
    const [error, setError] = useState(null);

    const [allCardsCurrentPage, setAllCardsCurrentPage] = useState(1);
    const [allCardsName, setAllCardsName] = useState('');
    const [allCardsData, setAllCardsData] = useState([]);
    const [allCardsView, setAllCardsView] = useState(true);
    const [allCardsListResults, setAllCardsListResults] = useState([]);
    const [allCardsCurrentListResults, setAllCardsCurrentListResults] = useState([]);
    const [allCardsGalleryResults, setAllCardsGalleryResults] = useState([]);
    const [allCardsCurrentGalleryResults, setAllCardsCurrentGalleryResults] = useState([]);

    const [collectionCurrentPage, setCollectionCardsCurrentPage] = useState(1);
    const [collectionCardsName, setCollectionCardsName] = useState('');
    const [collectionCardData, setCollectionCardData] = useState([]);
    const [collectionCardsView, setCollectionCardsView] = useState(false);
    const [collectionListResults, setCollectionListResults] = useState([]);
    const [collectionCurrentListResults, setCollectionCurrentListResults] = useState([]);
    const [collectionGalleryResults, setCollectionGalleryResults] = useState([]);
    const [collectionCurrentGalleryResults, setCollectionCurrentGalleryResults] = useState([]);


    const resultsPerListPage = 8;
    const allCardsTotalListPages = Math.ceil(allCardsListResults.length / resultsPerListPage);
    const collectionTotalListPage = Math.ceil(collectionListResults.length / resultsPerListPage);
    const resultsPerGalleryPage = 28;
    const allCardsTotalGalleryPages = Math.ceil(allCardsGalleryResults.length / resultsPerGalleryPage);
    const collectionTotalGalleryPage = Math.ceil(collectionGalleryResults.length / resultsPerGalleryPage);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleAllCardsView = () => {
        setAllCardsView(true);
        setCollectionCardsView(false);
    }

    const handleCollectionCardsView = () => {
        setAllCardsView(false);
        setCollectionCardsView(true);
    }

    const filterProps = {
        setListView,
        listView,
        setGalleryView,
        galleryView,
    }

    const AllCardsDisplayCompProps = {
        listView,
        allCardsListResults,
        allCardsCurrentListResults,
        galleryView,
        allCardsGalleryResults, 
        allCardsCurrentGalleryResults,       
        allCardsData,
    }

    const CollectionDisplayCompProps = {
        userId,
        listView,
        galleryView,
        collectionListResults,
        collectionCurrentListResults,
        collectionGalleryResults,
        collectionCurrentGalleryResults,
        collectionCardData,
        collectionCardsName,
    }

    const AllCardsSearchBarCompProps = {
        allCardsCurrentPage,
        setAllCardsCurrentPage,
        allCardsTotalListPages,
        allCardsTotalGalleryPages,
        resultsPerListPage,
        resultsPerGalleryPage,
        allCardsData,
        setAllCardsData,
        allCardsCurrentListResults,
        setAllCardsCurrentListResults,
        allCardsCurrentGalleryResults,
        setAllCardsCurrentGalleryResults,
        allCardsName,
        setAllCardsName,
        allCardsListResults,
        setAllCardsListResults,
        allCardsGalleryResults,
        setAllCardsGalleryResults,
        error,
        setError,
        maxResults,
        listView,
        galleryView,
        allCardsView
    }

    const CollectionSearchBarCompProps = {
        userId,
        collectionCardData,
        setCollectionCardData,
        listView,
        galleryView,
        collectionCardsName,
        setCollectionCardsName,
        collectionCurrentPage,
        setCollectionCurrentListResults,
        setCollectionCardsCurrentPage,
        collectionTotalListPage,
        collectionTotalGalleryPage,
        collectionCardsView,
        collectionListResults,
        setCollectionListResults,
        collectionGalleryResults,
        setCollectionGalleryResults,
        setCollectionCurrentGalleryResults,
        resultsPerGalleryPage,
        resultsPerListPage,
        maxResults,
    } 

    return (
        <>
            <header className="flex flex-col w-full h-[15%] pt-4 space-y-2">
                <div className="flex justify-between items-center mb-2">
                    <div className=" bg-footer rounded-lg">
                        <button className={`px-2 py-1 rounded-lg ${allCardsView ? "bg-[hsl(var(--background3))]" : "bg-transparent"}`} onClick={handleAllCardsView}>All cards</button>
                        <button className={`px-2 py-1 rounded-lg ${collectionCardsView ? "bg-[hsl(var(--background3))]" : "bg-transparent"}`} onClick={handleCollectionCardsView}>Owned Cards</button>
                    </div>
                    <div className="flex w-20 bg-footer rounded-xl">
                        <GridListViewComponent filterProps={filterProps}/>
                    </div>
                </div>
                <div className='w-full h-fit'>
                    {allCardsView && (
                        <AllCardsSearchBarComponent AllCardsSearchBarCompProps={AllCardsSearchBarCompProps}/>
                    )}
                    {collectionCardsView && (
                        <CollectionSearchBarComponent CollectionSearchBarCompProps={CollectionSearchBarCompProps}/>
                    )}
                </div>
            </header>
            <div className="flex w-full h-[85%] bg-deckpage p-2 rounded-2xl mb-4">
                {allCardsView && (
                    <AllCardsSearchResultsDisplayComponent AllCardsDisplayCompProps={AllCardsDisplayCompProps}/>
                )}
                {collectionCardsView && (
                    <CollectionDisplayComponent CollectionDisplayCompProps={CollectionDisplayCompProps}/>
                )}
            </div>
        </>
    )
}

export default DeckBuilderPageSidebarComponent