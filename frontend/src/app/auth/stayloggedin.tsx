import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Suspense, useEffect, useRef } from "react"
import { useRefreshMutation } from "../api-slices/authApiSlice.ts"
import { useSelector } from "react-redux"
import { selectIsAuthenticated,  selectIsLoggingOut } from "./authSlice"
import HomePage from "@/features/homepage/pages/homepage.tsx"
import SearchBarPage from "@/features/search/pages/searchBar.tsx"
import FoldingCube from "@/shared/loading-components/foldingcube.tsx"
import UserOwnedCardPage from "@/features/card_collection/pages/ownedCardPage.tsx"
import MyDecks from "@/shared/navigation/decks.tsx"
import Profilepage from "@/features/user/pages/Profilepage.tsx"

const StayLoggedIn = () => {
    const location = useLocation();
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const loggingOut = useSelector(selectIsLoggingOut);
    const refreshAttempted = useRef(false)

    const [refresh, {
        isSuccess,
        isLoading,
        isError,
    }] = useRefreshMutation()

    // This runs once on mount 
    useEffect(() => {
        // Only run once on component mount
        if (!refreshAttempted.current && !isAuthenticated && !loggingOut) {
            refreshAttempted.current = true
            console.log("StayLoggedIn: Attempting refresh on mount")
            refresh()
        }
    }, []) 

    // Reset refresh flag when logging out
    useEffect(() => {
        if (loggingOut) {
            refreshAttempted.current = false
        }
    }, [loggingOut])

    const getCurrentFallback = () => {
        switch (location.pathname) {
            case '/loggedin':
                return <HomePage />;
            case '/searchloggedin':
                return <SearchBarPage />;
            case '/searchresultloggedin':
                return <FoldingCube />;
            case '/getcards':
                return <UserOwnedCardPage />;
            case '/deckmanager':
                return <MyDecks />;
            case '/modifydeck':
                return <FoldingCube />;
            case '/profile':
                return <Profilepage />;
            default:
                return <div className="w-full h-screen" />;
        }
    };

    console.log("StayLoggedIn render:", { 
        isAuthenticated, 
        isSuccess, 
        isLoading, 
        isError, 
        refreshAttempted: refreshAttempted.current,
        pathname: location.pathname 
    });

    if (isError) {
       console.log("Auth error, redirecting to login")
        return <div>Redirecting to login...</div>;
    } 
    
    if (isSuccess || isAuthenticated) {
        console.log("Authenticated, showing outlet");
        return (
            <Suspense fallback={getCurrentFallback()}>
                <Outlet />
            </Suspense>
        );
    } 
    
    if (isLoading) {
        console.log("Loading, showing fallback");
        return getCurrentFallback();
    }

    console.log("Default case, showing fallback");
    return getCurrentFallback();
}

export default StayLoggedIn
