import { useState } from 'react';
import GridListViewComponent from '../buttons/gridlistviewcomponent';
import AllCardsSearchResultsDisplayComponent from '../sidebardisplaycomponents/allcardsdisplaycomponent';
import AllCardsSearchBarComponent from '../searchbar/allcardssearchbarcomponent';
import CollectionDisplayComponent from '../sidebardisplaycomponents/collectiondisplaycomponent';
import CollectionSearchBarComponent from '../searchbar/collectionsearchbarcomponent';
import { GalleryResult, Result, Sidebar } from '../types/sidebarcomponenttypes';
import { Card } from '../types/datatypes';


const DeckBuilderPageSidebarComponent = ({ sidebarprops }: Sidebar) => {
    const {
        userId,
        allCardsView, setAllCardsView,
        allCardsListResults, setAllCardsListResults,
        collectionCardsView, setCollectionCardsView,
        collectionCardData, setCollectionCardData
    } = sidebarprops
    
    const maxResults = 99999;
    const [galleryView, setGalleryView] = useState(false);
    const [listView, setListView] = useState(true);
    const [, setError] = useState<string | null>(null);

    const [allCardsCurrentPage, setAllCardsCurrentPage] = useState(1);
    const [allCardsName, setAllCardsName] = useState('');
    const [allCardsData, setAllCardsData] = useState<Card[]>([]);
    const [allCardsCurrentListResults, setAllCardsCurrentListResults] = useState<Card[]>([]);
    const [allCardsGalleryResults, setAllCardsGalleryResults] = useState<Card[]>([]);
    const [allCardsCurrentGalleryResults, setAllCardsCurrentGalleryResults] = useState<Card[]>([]);

    const [collectionCurrentPage, setCollectionCardsCurrentPage] = useState(1);
    const [collectionCardsName, setCollectionCardsName] = useState('');
    const [collectionListResults, setCollectionListResults] = useState<Result[]>([]);
    const [collectionCurrentListResults, setCollectionCurrentListResults] = useState<Result[]>([]);
    const [collectionGalleryResults, setCollectionGalleryResults] = useState<GalleryResult[]>([]);
    const [collectionCurrentGalleryResults, setCollectionCurrentGalleryResults] = useState<GalleryResult[]>([]);


    const resultsPerListPage = 6;
    const allCardsTotalListPages = Math.ceil(allCardsListResults.length / resultsPerListPage);
    const collectionTotalListPage = Math.ceil(collectionListResults.length / resultsPerListPage);
    const resultsPerGalleryPage = 28;
    const allCardsTotalGalleryPages = Math.ceil(allCardsGalleryResults.length / resultsPerGalleryPage);
    const collectionTotalGalleryPage = Math.ceil(collectionGalleryResults.length / resultsPerGalleryPage);


    const handleAllCardsView = () => {
        setAllCardsView(true);
        setCollectionCardsView(false);
    }

    const handleCollectionCardsView = () => {
        setAllCardsView(false);
        setCollectionCardsView(true);
    }

    const filterProps = {
        listView, setListView,
        galleryView, setGalleryView,
        setAllCardsCurrentPage,
        setCollectionCardsCurrentPage
    }

    const AllCardsDisplayCompProps = {
        listView,
        allCardsListResults,
        allCardsCurrentListResults,
        galleryView,
        allCardsGalleryResults, 
        allCardsCurrentGalleryResults,       
    }

    const CollectionDisplayCompProps = {
        listView,
        galleryView,
        collectionListResults,
        collectionCurrentListResults,
        collectionGalleryResults,
        collectionCurrentGalleryResults,
    }

    const AllCardsSearchBarCompProps = {
        allCardsData, setAllCardsData,
        allCardsName, setAllCardsName,
        allCardsCurrentPage, setAllCardsCurrentPage,
        allCardsListResults, setAllCardsListResults,
        allCardsGalleryResults, setAllCardsGalleryResults,
        allCardsTotalListPages,
        allCardsTotalGalleryPages,
        resultsPerListPage,
        resultsPerGalleryPage,
        setAllCardsCurrentListResults,
        setAllCardsCurrentGalleryResults,
        setError,
        maxResults,
        listView,
        galleryView,
        allCardsView
    }

    const CollectionSearchBarCompProps = {
        userId,
        listView,
        galleryView,
        collectionCardData, setCollectionCardData,
        collectionCardsName, setCollectionCardsName,
        collectionListResults, setCollectionListResults,
        collectionGalleryResults, setCollectionGalleryResults,
        collectionCurrentPage,
        setCollectionCurrentListResults,
        setCollectionCardsCurrentPage,
        collectionTotalListPage,
        collectionTotalGalleryPage,
        collectionCardsView,
        setCollectionCurrentGalleryResults,
        resultsPerGalleryPage,
        resultsPerListPage,
        maxResults,
    } 

    return (
        <>
            <header className="flex flex-col w-full h-[15%] pt-4 space-y-2">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex bg-footer rounded-lg text-sm">
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
            <div className="flex w-full h-[80%] bg-[hsl(var(--editdeckdraganddropbackground))] p-2 rounded-2xl mb-4 mt-[5vh]">
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