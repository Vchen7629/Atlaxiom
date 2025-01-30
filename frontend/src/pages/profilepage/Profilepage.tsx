import { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import { useGetSpecificUserQuery } from '../../app/api-slices/usersApiSlice.ts';
import UserStatistics from './profile-subpages/statistics.tsx';
import { UserId } from './types/subpagetypes.ts';
import NavBarComponent from '../../components/profilepagecomponents/components/navbar.tsx';
import ProfilePageHeader from '../../components/profilepagecomponents/components/profilepageheader.tsx';
import ViewDecks from './profile-subpages/deckpage.tsx';
import DeckSearchBar from '../../components/profilepagecomponents/viewdeckcomponents/decksearchbarcomp.tsx';
import GridListViewComponent from '../../components/profilepagecomponents/viewdeckcomponents/gridlistviewcomponent.tsx';
import EditAccountPage from './profile-subpages/editaccountpage.tsx';
import { useGetAllOwnedDecksQuery } from '@/app/api-slices/decksapislice.ts';
import PaginationComponent from '@/components/profilepagecomponents/viewdeckcomponents/pagination/pagination.tsx';
import { Deck } from '@/components/profilepagecomponents/statisticscomponents/types/paginationtypes.ts';
import BarChartViewButton from '@/components/profilepagecomponents/statisticscomponents/buttons/barchartbutton.tsx';
import { DeckApiResponse } from '@/app/api-slices/types/decktypes.ts';


const Profilepage = () => {
    const [selectedNavItem, setSelectedNavItem] = useState('');
    const userId = useSelector((state: UserId) => state.auth.userId);
    const [deckName, setDeckName] = useState('')
    const [deckActive, setDeckActive] = useState(true);
    const [statisticsActive, setStatisticsActive] = useState(false);
    const [editActive, setEditActive] = useState(false);

    const [listView, setListView] = useState(true);
    const [galleryView, setGalleryView] = useState(false);

    const { data: modifyDecks, refetch: refetchdecks } = useGetAllOwnedDecksQuery(userId);
    const decksToDisplay = modifyDecks || [];
    const filteredDecks = decksToDisplay.filter((deck: Deck) => deck?.deck_name?.toLowerCase().includes(deckName.toLowerCase()));
    const suggestionsPerGalleryPage = 20;
    const suggestionsPerListPage = 7;
    const [totalListPages, setTotalListPages] = useState<number>(1);
    const [totalGalleryPages, setTotalGalleryPages] = useState<number>(1);
    const updateTotalListPages = (filteredDecksLength: number) => {
        setTotalListPages(Math.ceil(filteredDecksLength / suggestionsPerListPage));
    }
    const updateTotalGalleryPages = (filteredDecksLength: number) => {
        setTotalGalleryPages(Math.ceil(filteredDecksLength / suggestionsPerGalleryPage));
    }
    const [currentListPage, setListCurrentPage] = useState<number>(1);  
    const [currentGalleryPage, setGalleryCurrentPage] = useState<number>(1);
    const [currentListPageResults, setCurrentListPageResults] = useState<DeckApiResponse[]>([])
    const [currentGalleryPageResults, setCurrentGalleryPageResults] = useState<DeckApiResponse[]>([])

    const [yearView, setYearView] = useState<boolean>(true);
    const [monthView, setMonthView] = useState<boolean>(false);

    const {data: usersData, refetch} = useGetSpecificUserQuery(userId);

    const user = usersData?.entities[userId]

    const navbarprops = {
        deckActive, setDeckActive,
        statisticsActive, setStatisticsActive,
        editActive, setEditActive,
        setSelectedNavItem
    }

    const gridlistviewprops = {
        listView, setListView,
        galleryView, setGalleryView
    }

    const deckprops = {
        user,
        deckName,
        listView,
        galleryView,
        refetch,
        refetchdecks,
        filteredDecks,
        currentListPageResults, setCurrentListPageResults,
        currentGalleryPageResults, setCurrentGalleryPageResults,
    }

    const paginationprops = {
        filteredDecks,
        listView,
        galleryView,
        currentListPage, setListCurrentPage,
        currentGalleryPage, setGalleryCurrentPage,
        suggestionsPerListPage,
        suggestionsPerGalleryPage,
        setCurrentListPageResults,
        setCurrentGalleryPageResults,
        totalListPages,
        totalGalleryPages,
        updateTotalListPages,
        updateTotalGalleryPages,
    }

    const statisticsprops = {
        yearView,
        monthView
    }

    const barchartbuttonprops = {
        yearView, setYearView,
        monthView, setMonthView
    }

    const renderProfileContent = () => {
        const header = <ProfilePageHeader usersData={user}/>
              
        switch (selectedNavItem) {
            case 'deck': 
                return (
                    <>
                        {header}
                        <div className="flex flex-col xl:flex-row items-center">
                            <NavBarComponent navbarprops={navbarprops}/>
                            <PaginationComponent paginationprops={paginationprops}/>
                            <div className='flex justify-between w-full lg:w-fit'>
                                <DeckSearchBar deckName={deckName} setDeckName={setDeckName}/>
                                <GridListViewComponent gridlistviewprops={gridlistviewprops}/>
                            </div>
                        </div>
                        <ViewDecks deckprops={deckprops}/>
                    </>
                );
            case 'statistics':
                return (
                    <>
                        {header}
                        <div className="flex flex-col md:flex-row items-center w-full justify-between">
                            <NavBarComponent navbarprops={navbarprops}/>
                            <BarChartViewButton barchartbuttonprops={barchartbuttonprops}/>
                        </div>
                        <UserStatistics statisticsprops={statisticsprops}/>
                    </>
                );
            case 'edit':
                return (
                    <>
                        {header}
                        <NavBarComponent navbarprops={navbarprops}/>
                        <EditAccountPage user={user} refetch={refetch}/>
                    </>
                );
            default:
                return (
                    <>
                        {header}
                        <div className="flex flex-col xl:flex-row items-center">
                            <NavBarComponent navbarprops={navbarprops}/>
                            <PaginationComponent paginationprops={paginationprops}/>
                            <div className="flex justify-between w-full lg:w-fit">
                                <DeckSearchBar deckName={deckName} setDeckName={setDeckName}/>
                                <GridListViewComponent gridlistviewprops={gridlistviewprops}/>
                            </div>
                        </div>
                        <ViewDecks deckprops={deckprops}/>
                    </>
                );
            }
        };

    return (
        <main className="min-h-[100vh] flex flex-col justify-center">
            <Header/>
            <div className="flex justify-center pt-[10vh] bg-[hsl(var(--background1))] min-h-[120vh]">
                <div className="flex flex-col w-full px-[5%] lg:px-[10%] my-[3%]">
                    <div className="flex flex-col align-center w-full">
                        {renderProfileContent()}
                    </div>
                </div>
            </div>
            <Footer/>
        </main>
    );
    };

    export default Profilepage;