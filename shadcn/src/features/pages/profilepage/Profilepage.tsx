import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';
import { useGetSpecificUserQuery } from '../../api-slices/usersApiSlice.ts';
import DeleteAccount from './profile-subpages/deleteaccount';
import UserStatistics from './profile-subpages/statistics';
import Security from './profile-subpages/security';
import { UserId } from './types/subpagetypes';
import NavBarComponent from './components/navbar.tsx';
import ProfilePageHeader from './components/profilepageheader.tsx';
import ViewDecks from './profile-subpages/deckpage.tsx';
import DeckSearchBar from './components/decksearchbarcomp.tsx';
import GridListViewComponent from './components/gridlistviewcomponent.tsx';


const Profilepage = () => {
    const [selectedNavItem, setSelectedNavItem] = useState('');
    const userId = useSelector((state: UserId) => state.auth.userId);
    const [deckName, setDeckName] = useState('')
    const [deckActive, setDeckActive] = useState(true);
    const [statisticsActive, setStatisticsActive] = useState(false);
    const [editActive, setEditActive] = useState(false);

    const [listView, setListView] = useState(true);
    const [galleryView, setGalleryView] = useState(false);

    const navbarprops = {
        deckActive,
        setDeckActive,
        statisticsActive,
        setStatisticsActive,
        editActive,
        setEditActive,
        setSelectedNavItem
    }

    const gridlistviewprops = {
        setListView,
        setGalleryView,
        listView,
        galleryView
    }

    const deckprops = {
        deckName,
        listView,
        galleryView
    }

    useEffect(() => {
    }, [userId]);
    
    const { 
        data: usersData, 
        isLoading,
        isError,
        error,
        refetch 
    } = useGetSpecificUserQuery(userId);

    const renderProfileContent = () => {
        const { ids, entities } = usersData || {}

        if (!Array.isArray(ids) || ids.length === 0) {
            return <p>No user data available</p>;
        }

        const defaultIdKey = ids[0];
        const user = entities[defaultIdKey];
        console.log("profile user:", user?.username)

        if (isError) {
          return <p>Error loading user data</p>;
        }
        
        if (isLoading || usersData == null) {
          return <p>Loading user data...</p>;
        } 
        if (!userId) {
          return <p>Please Login</p>;
        }

        if (error) {
            return <p>Err</p>
        }

        const header = <ProfilePageHeader user={user} />
              
        switch (selectedNavItem) {
            case 'deck': 
                return (
                    <>
                        {header}
                        <div className="flex items-center">
                            <NavBarComponent navbarprops={navbarprops}/>
                            <DeckSearchBar deckName={deckName} setDeckName={setDeckName}/>
                            <div className="ml-6 bg-footer flex  w-[75px] rounded-xl">
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
                        <NavBarComponent navbarprops={navbarprops}/>
                        <UserStatistics refetch={refetch}/>
                    </>
                );
            case 'edit':
                return (
                    <>
                        {header}
                        <NavBarComponent navbarprops={navbarprops}/>
                        <UserStatistics refetch={refetch}/>
                    </>
                );
            case 'security':
                return (
                    <Security user={user} />
                    );
            case 'delete':
                return (
                    <DeleteAccount user={user}/>
                );
            default:
                return (
                    <>
                        {header}
                        <div className="flex items-center">
                            <NavBarComponent navbarprops={navbarprops}/>
                            <DeckSearchBar deckName={deckName} setDeckName={setDeckName}/>
                            <div className="ml-6 bg-footer flex w-20 rounded-xl">
                                <GridListViewComponent gridlistviewprops={gridlistviewprops}/>
                            </div> 
                        </div>
                        <ViewDecks deckprops={deckprops}/>
                    </>
                );
            }
        };

    return (
        <>
        <main className="min-h-[100vh] flex flex-col justify-center">
            <Header/>
            <div className="flex justify-center pt-[10vh] bg-[hsl(var(--background1))] min-h-[120vh]">
                    <div className="flex flex-col w-full px-[10%] my-[3%]">
                        <div className="flex flex-col align-center w-full px-[20px]">
                            {renderProfileContent()}
                        </div>
                </div>
            </div>
            <Footer/>
        </main>
        </>
    );
    };

    export default Profilepage;