
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmarkSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import GridListViewComponent from "../buttons/gridlistviewcomponent";
import { Card } from "../types/datatypes";
import { GalleryResult, Result } from "../types/sidebarcomponenttypes";
import MobileCollectionMonsterCardSearchBarComponent from "../mobiledaddcardsearchbar/collectionmonstercardsearchbar";
import { useGetOwnedCardsQuery } from "@/app/api-slices/ownedCardapislice";
import MobileCollectionMonsterCardDisplayComponent from "../mobiledrawerdisplay/collectionmonstercarddisplay";
import AllCardsMobileSearchBarComponent from "../mobiledaddcardsearchbar/allcardsmonstercardsearchbar";
import MobileAllCardsMonsterCardDisplayComponent from "../mobiledrawerdisplay/allcardsmonstercarddisplay";

const AddMonsterCardDrawer = ({ monstercarddrawerprops }: any) => {
    const {
        userId,
        openDrawer, setOpenDrawer,
        allCardsView, setAllCardsView,
        allCardsListResults, setAllCardsListResults,
        collectionCardsView, setCollectionCardsView,
        collectionMonsterCards, setCollectionMonsterCards,
        allMonsterCards, setAllMonsterCards,
        setMonsterCards
    } = monstercarddrawerprops
    

    const maxResults = 99999;
    const [galleryView, setGalleryView] = useState(false);
    const [listView, setListView] = useState(true);
    const [, setError] = useState<string | null>(null);

    const { data: cardData, isLoading } = useGetOwnedCardsQuery(userId)
    
    
    const [allCardsCurrentPage, setAllCardsCurrentPage] = useState(1);
    const [allCardsName, setAllCardsName] = useState('');
    const [allCardsCurrentListResults, setAllCardsCurrentListResults] = useState<Card[]>([]);
    const [allCardsGalleryResults, setAllCardsGalleryResults] = useState<Card[]>([]);
    const [allCardsCurrentGalleryResults, setAllCardsCurrentGalleryResults] = useState<Card[]>([]);
    
    const [collectionCurrentPage, setCollectionCardsCurrentPage] = useState(1);
    const [collectionCardsName, setCollectionCardsName] = useState('');
    const [collectionListResults, setCollectionListResults] = useState<Result[]>([]);
    const [collectionCurrentListResults, setCollectionCurrentListResults] = useState<Result[]>([]);
    const [collectionGalleryResults, setCollectionGalleryResults] = useState<GalleryResult[]>([]);
    const [collectionCurrentGalleryResults, setCollectionCurrentGalleryResults] = useState<GalleryResult[]>([]);
    
    
    const resultsPerListPage = 3;
    const allCardsTotalListPages = Math.ceil(allCardsListResults.length / resultsPerListPage);
    const collectionTotalListPage = Math.ceil(collectionListResults.length / resultsPerListPage);
    const resultsPerGalleryPage = 8;
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

    const AllCardsSearchBarCompProps = {
        allMonsterCards, setAllMonsterCards,
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
        cardData,
        listView,
        galleryView,
        collectionMonsterCards, setCollectionMonsterCards,
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

    const AllCardsDisplayCompProps = {
        listView,
        allCardsListResults,
        allCardsCurrentListResults,
        galleryView,
        allCardsGalleryResults, 
        allCardsCurrentGalleryResults,
        setMonsterCards,       
    }

    const CollectionDisplayCompProps = {
        isLoading,
        listView,
        galleryView,
        collectionListResults,
        collectionCurrentListResults,
        collectionGalleryResults,
        collectionCurrentGalleryResults,
    }

    const filterProps = {
        listView, setListView,
        galleryView, setGalleryView,
        setAllCardsCurrentPage,
        setCollectionCardsCurrentPage
    }


    return (
        <Drawer modal={false} open={openDrawer === "monster"}>
            <DrawerTrigger asChild>
                <Button 
                    className={`text-white h-9 px-2 bg-footer rounded-md`} 
                    variant="default" 
                    onClick={() => setOpenDrawer("monster")}
                >
                    <FontAwesomeIcon icon={faPlus}/>Add Card
                </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[75vh]">
                <div className="mx-auto max-w-full">
                    <DrawerHeader className="flex w-full justify-between">
                        <DrawerTitle className="text-2xl text-[hsl(var(--background3))]">Add Monster Cards</DrawerTitle>
                            <DrawerClose className="bg-transparent" onClick={() => setOpenDrawer(null)}>
                                <FontAwesomeIcon icon={faXmarkSquare} className="fa-2xl text-[hsl(var(--background3))]"/>
                            </DrawerClose>
                    </DrawerHeader>
                    <section className="flex w-full flex-col pl-2 space-y-[1%]">
                        <div className="w-full flex justify-between">
                            <div className="flex w-fit bg-footer rounded-lg text-xs">
                                <button className={`px-2 py-1 rounded-lg ${allCardsView ? "bg-[hsl(var(--background3))]" : "bg-transparent"}`} onClick={handleAllCardsView}>All cards</button>
                                <button className={`px-2 py-1 rounded-lg ${collectionCardsView ? "bg-[hsl(var(--background3))]" : "bg-transparent"}`} onClick={handleCollectionCardsView}>Owned Cards</button>
                            </div>
                            <div className="flex w-[68px] h-9 bg-footer rounded-xl">
                                <GridListViewComponent filterProps={filterProps}/>
                            </div>
                        </div>
                        <div>
                            {allCardsView && (
                                <AllCardsMobileSearchBarComponent AllCardsSearchBarCompProps={AllCardsSearchBarCompProps}/>
                            )}
                            {collectionCardsView && (
                                <MobileCollectionMonsterCardSearchBarComponent CollectionSearchBarCompProps={CollectionSearchBarCompProps}/>
                            )}
                        </div>
                        <div className="flex flex-col">
                            {collectionCardsView && (
                                <MobileCollectionMonsterCardDisplayComponent CollectionDisplayCompProps={CollectionDisplayCompProps} />
                            )}
                            {allCardsView && (
                                <MobileAllCardsMonsterCardDisplayComponent AllCardsDisplayCompProps={AllCardsDisplayCompProps}/>
                            )}
                        </div>
                    </section>
                </div> 
            </DrawerContent>
        </Drawer>
    )}

export default AddMonsterCardDrawer