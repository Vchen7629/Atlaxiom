import { DeckDisplayComponent } from '../../decks/types/types.ts';
import { useEffect, useState } from 'react';
import { waveform } from 'ldrs';
import { DeckDisplay } from '../../../shared/components/deckDisplay.tsx';

const DeckDisplayWrapper = ({ deckdisplayprops }: DeckDisplayComponent) => {
    const {
        isLoading,
        decksToDisplay,
        listView,
        galleryView,
        refetch,
        refetchUser,
        currentPageListDecksArray, setCurrentPageListDecksArray,
        currentPageGalleryDecksArray, setCurrentPageGalleryDecksArray,
    } = deckdisplayprops
    const [showLoading, setShowLoading] = useState(true);
    
    waveform.register()
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => {
                setShowLoading(false);
            }, 250);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [isLoading]);


    const MappedListProps = {
        deckApiData: currentPageListDecksArray,
        refetch,
        refetchUser,
        listView,
        galleryView,
        setCurrentPageListDecksArray,
        setCurrentPageGalleryDecksArray
    }

    const MappedGalleryProps = {
        deckApiData: currentPageGalleryDecksArray,
        listView,
        galleryView,
        setCurrentPageListDecksArray,
        setCurrentPageGalleryDecksArray
    }


    return listView ? (
        <main className='flex flex-col w-full'>
            {(showLoading ||isLoading) ? (
                <div className="flex flex-col h-[45vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                    <span>Loading</span>
                    <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                </div>
            ) : currentPageListDecksArray.length > 0 ? (
                <DeckDisplay DeckDisplayProps={MappedListProps}/>
            ) : decksToDisplay.length === 0 ? (
                <div className="flex h-[45vh] w-full items-center justify-center">
                    <span className="text-xl font-bold text-[hsl(var(--text))]">
                        You Don&apos;t Own any Decks, Click the New Deck Button To add a new deck
                    </span>
                </div>
            ) : (
                <div className="flex h-[45vh] w-full items-center justify-center">
                    <span className="text-xl font-bold text-[hsl(var(--text))]">
                        No Decks matching the Search Input found
                    </span>
                </div>
            )}            
        </main>       
    ) : galleryView && (
        <main className='flex flex-col w-full'>
            {(showLoading ||isLoading) ? (
                <div className="flex flex-col h-[45vh] space-y-[5vh] items-center justify-center text-center text-xl lg:text-3xl text-[hsl(var(--background3))] font-black">
                    <span>Loading</span>
                    <l-waveform size="50" stroke="3.5" speed="1" color="hsl(var(--background3))" />
                </div>
            ) : currentPageGalleryDecksArray.length > 0 ? (
                <DeckDisplay DeckDisplayProps={MappedGalleryProps}/>
            ) : decksToDisplay.length === 0 ? (
                <div className="flex h-[45vh] w-full items-center justify-center">
                    <span className="text-xl font-bold text-[hsl(var(--text))]">
                        You Don&apos;t Own any Decks, Click the New Deck Button To add a new deck
                    </span>
                </div>
            ) : (
                <div className="flex h-[45vh] w-full items-center justify-center">
                    <span className="text-xl font-bold text-[hsl(var(--text))]">
                        No Decks matching the Search Input found
                    </span>
                </div>
            )}          
        </main>           
    );
};

export default DeckDisplayWrapper