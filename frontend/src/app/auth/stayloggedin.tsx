import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { startTransition, Suspense, useEffect, useRef } from "react"
import { useRefreshMutation } from "./authApiSlice.ts"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectLoggingOut } from "./authSlice"
import HomePage from "@/pages/homepage/homepage.tsx"
import SearchBarPage from "@/pages/searchpage/searchbarpage.tsx"
import FoldingCube from "@/components/loadingcomponents/foldingcube.tsx"
import UserOwnedCardPage from "@/pages/my-cards/ownedCardPage.tsx"
import MyDecks from "@/components/accountbuttons/dropdownmenubuttons/decks.tsx"
import Profilepage from "@/pages/profilepage/Profilepage.tsx"
import PrivacyPolicyPage from "@/pages/privacypolicypage/privacypolicypage.tsx"
import SiteHelpPage from "@/pages/sitehelppage/Documentation.tsx"

const StayLoggedIn = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const token = useSelector(selectCurrentToken)
    const loggingOut = useSelector(selectLoggingOut);
    const effectRan = useRef(false)

    const [refresh, {
        isUninitialized,
        isSuccess,
        isError,
    }] = useRefreshMutation()

    useEffect(() => {        
        if (effectRan.current === true || process.env.NODE_ENV !== "development") {
            if (!token && !loggingOut) {
                const verifyRefreshToken = async() => {
                    try {
                        await refresh()
                    } catch (err) {
                        console.error(err)
                    }
                }

                verifyRefreshToken();
            }
        }
        
        return () => {
            effectRan.current = true;
        };

    }, [refresh, token, loggingOut])

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
            case '/privacyloggedin':
                return <PrivacyPolicyPage />;
            case '/FAQloggedin':
                return <SiteHelpPage />;
            default:
                return <div className="w-full h-screen" />;
        }
    };

    if (isError) {
        startTransition(() => {
            navigate("/login");
        });
        return null;
    } else if (isSuccess) {
        return (
            <Suspense fallback={getCurrentFallback()}>
                <Outlet />
            </Suspense>
        );
    } else if (token && isUninitialized) {
        return (
            <Suspense fallback={getCurrentFallback()}>
                <Outlet />
            </Suspense>
        );
    }

    return null;

}

export default StayLoggedIn
