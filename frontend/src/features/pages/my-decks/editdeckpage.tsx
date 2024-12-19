import { useEffect } from 'react';
import Header from '../../../components/header/header.tsx';
import Footer from '../../../components/footer/Footer.tsx';
import { useLocation } from 'react-router-dom';
import { useGetSpecificOwnedDeckMutation } from '../../api-slices/decksapislice.ts';
import DeckBuilderPageSidebarComponent from './decksidebarcomponents/deckbuilderpagesidebar.tsx';
//import GridListViewComponent from '../../../components/searchbar/grid_or_list_view';

const DeckBuilderPage = () => {
    const location = useLocation();
    const { userId, deckId } = location.state || {};
    const [getSpecificDeck, { data: deckData, isLoading }] = useGetSpecificOwnedDeckMutation();
    //const [listView, setListView] = useState(true);
    //const [galleryView, setGalleryView] = useState(false);

    useEffect(() => {
        if (deckId && userId) {
            getSpecificDeck({ id: userId, DeckData: { deckId } });
            console.log("deck data", deckData)
        }
    }, [deckId, userId, getSpecificDeck]);

    const deck = deckData?.entities?.undefined?.[0];

    /*const filterProps = {
        setListView,
        listView,
        setGalleryView,
        galleryView
    }*/

    return (
        <>  
        <Header/>
            <main className="flex w-full min-h-[110vh] bg-[hsl(var(--background1))]">           
                {!isLoading && deckData && (
                    <>
                    <section className="flex flex-col w-[80vw] pt-[76px]">
                        <header className="flex justify-between items-center p-5 w-full h-[13vh] bg-gradient-to-t from-[hsl(var(--homepagegradient1))] to-[hsl(var(--homepagegradient3))]">
                            <section className="flex flex-col h-full justify-between">
                                <div className='text-3xl font-black text-[hsl(var(--text))]'>{deck?.deck_name}</div>
                                <div>Created On: {deck?.createdOn}</div>
                            </section>
                            <section>
                                <button className="flex text-sm flex-col px-8 py-2 items-center rounded-2xl bg-blue-400">
                                    <div>Save</div>
                                    <div>{deck?.lastUpdated}</div>
                                </button>
                            </section>
                        </header>
                        <main className="flex flex-col h-[87vh] bg-transparent">
                            <section className="flex flex-col justify-between h-1/2 w-full  p-4">
                                <header className="flex w-full py-2 pl-[3vw] justify-between text-[hsl(var(--text))]">
                                    <div className="font-black">Main Deck</div>
                                    <div className="flex h-full items-center space-x-4">
                                        <div className="font-bold">Total Main Deck Cards: {deck?.total_cards_main_deck}</div>
                                        {/*<div className='flex w-20 bg-footer rounded-xl'>
                                            <GridListViewComponent filterProps={filterProps}/>
                                        </div>*/}
                                    </div>
                                </header>
                                <div className="bg-deckpage w-full h-[90%] rounded-2xl"></div>
                            </section>
                            <section className="h-1/4 w-full p-4 justify-between flex flex-col">
                                < header className="flex w-full px-[3vw] justify-between text-[hsl(var(--text))]">
                                    <div className="font-black">Extra Deck</div>
                                    <div className="font-bold">Total Extra Deck Cards: {deck?.total_cards_extra_deck}</div>
                                </header>
                                <div className="bg-deckpage w-full h-[80%] rounded-2xl"></div>
                            </section>
                            <section className="h-1/4 w-full p-4 justify-between">
                                <header className="flex w-full px-[3vw] justify-between text-[hsl(var(--text))]">
                                    <div className="font-black">Side Deck</div>
                                    <div className="font-bold">Total Side Cards: {deck?.total_cards_side_deck}</div>
                                </header>
                                <div className="bg-deckpage w-full h-[90%] rounded-2xl"></div>
                            </section>
                        </main>
                    </section>
                    <section className="flex flex-col max-h-[110vh] w-[20vw] pt-[76px] px-4 justify-between">
                        <DeckBuilderPageSidebarComponent userId={userId}/>
                    </section>
                    </>
                )}
            </main>
        <Footer/>
        </>
    );
};

export default  DeckBuilderPage