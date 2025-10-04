import { Routes, Route, useLocation } from 'react-router-dom'
import StayLoggedIn from './app/auth/stayloggedin.tsx';
import { lazy, useEffect } from 'react';
import { LoadingWrapper } from './shared/loading-components/loadingwrapper.tsx';

const SearchResults = lazy(() => (import('./features/search/pages/searchResults.tsx')))
const HomePage = lazy(() => (import("./features/homepage/pages/homepage.tsx")))
const SignUpPage = lazy(() => (import("./features/user/pages/signuppage.tsx")))
const LoginPage = lazy(() => import("./features/user/pages/login.tsx"))
const SearchBarPage = lazy(() => import("./features/search/pages/searchBar.tsx"))
const UserOwnedCardPage = lazy(() => import("./features/card_collection/pages/ownedCardPage.tsx"))
const MyDeck = lazy(() => import("./features/decks/pages/deckHomepage.tsx"))
const DeckBuilderPage = lazy(() => import("./features/decks/pages/deckBuilder.tsx"))
const Profilepage = lazy(() => import("./features/user/pages/Profilepage.tsx"))
const ContactPage = lazy(() => import("./features/misc/pages/Contact.tsx"))
const RequestPasswordResetPage = lazy(() => import("./features/user/pages/requestpasswordreset.tsx"))
const PasswordResetPage = lazy(() => import("./features/user/pages/passwordreset.tsx"))
const InvalidPage = lazy(() => import("./features/misc/pages/404.tsx"))


function App() {
  const location = useLocation();

  useEffect(() => {
    const subpage = location.pathname === '/' ? 'Home' : location.pathname.replace('/', '');
    document.title = `Atlaxiom - ${subpage.charAt(0).toUpperCase() + subpage.slice(1)}`;
  }, [location]);

  return (
    <LoadingWrapper>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<InvalidPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/search" element={<SearchBarPage/>}/>
        <Route path="/searchresult" element={<SearchResults/>}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/requestpasswordreset" element={<RequestPasswordResetPage/>} />
        <Route path="/password-reset/:token" element={<PasswordResetPage />} />

        <Route element={<StayLoggedIn/>}>
          <Route path="/loggedin" element={<HomePage/>}/>
          <Route path="searchloggedin" element={<SearchBarPage/>} />
          <Route path="/searchresultloggedin" element={<SearchResults/>}/>
          <Route path="/getcards" element={<UserOwnedCardPage/>}/>
          <Route path="/deckmanager" element={<MyDeck/>}/>
          <Route path="/modifyDeck" element={<DeckBuilderPage/>}/>         
          <Route path="/profile" element={<Profilepage />}/>
          <Route path="/contactloggedin" element={<ContactPage />} />
        </Route>
      
      </Routes>
    </LoadingWrapper>
  );
} 

export default App;