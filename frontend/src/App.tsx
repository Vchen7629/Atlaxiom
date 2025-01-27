import { Routes, Route, useLocation } from 'react-router-dom'
import StayLoggedIn from './features/auth/stayloggedin.tsx';
import { lazy, Suspense, useEffect } from 'react';
import FoldingCube from './components/loadingcomponents/foldingcube.tsx';

const SearchResults = lazy(() => (import('./pages/searchpage/searchresults.tsx')))
const HomePage = lazy(() => (import("./pages/homepage/homepage.tsx")))
const SignUpPage = lazy(() => (import("./pages/sign-up-page/signuppage.tsx")))
const LoginPage = lazy(() => import("./pages/loginpage/login.tsx"))
const SearchBarPage = lazy(() => import("./pages/searchpage/searchbarpage.tsx"))
const PrivacyPolicyPage = lazy(() => import("./pages/privacypolicypage/privacypolicypage.tsx"))
const SiteHelpPage = lazy(() => import("./pages/sitehelppage/FaqPage.tsx"))
const UserOwnedCardPage = lazy(() => import("./pages/my-cards/ownedCardPage.tsx"))
const MyDeck = lazy(() => import("./pages/my-decks/deckpagehomepage.tsx"))
const DeckBuilderPage = lazy(() => import("./pages/my-decks/editdeckpage.tsx"))
const Profilepage = lazy(() => import("./pages/profilepage/Profilepage.tsx"))

function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = window.location.href;
  }, [location]);

  return (
    <Suspense fallback={<FoldingCube/>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/search" element={<SearchBarPage/>}/>
        <Route path="/searchresult" element={<SearchResults/>}/>
        <Route path="/privacy" element={<PrivacyPolicyPage/>}/>
        <Route path="/FAQ" element={<SiteHelpPage/>}/>

        <Route element={<StayLoggedIn/>}>
          <Route path="/loggedin" element={<HomePage/>}/>
          <Route path="searchloggedin" element={<SearchBarPage/>} />
          <Route path="/searchresultloggedin" element={<SearchResults/>}/>
          <Route path="/getcards" element={<UserOwnedCardPage/>}/>
          <Route path="/deckmanager" element={<MyDeck/>}/>
          <Route path="/modifyDeck" element={<DeckBuilderPage/>}/>         
          <Route path="/profile" element={<Profilepage />}/>
          <Route path="/privacyloggedin" element={<PrivacyPolicyPage/>}/>
          <Route path="/FAQloggedin" element={<SiteHelpPage/>}/>
        </Route>
      
      </Routes>
    </Suspense>
  );
} 

export default App;