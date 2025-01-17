import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/loginpage/login.tsx';
import Banlists from './pages/banlist.tsx';
import SearchBarPage from './pages/searchpage/searchbarpage.tsx';
import StayLoggedIn from './features/auth/stayloggedin.tsx';
import UserOwnedCardPage from './pages/my-cards/ownedCardPage.tsx';
import MyDeck from './pages/my-decks/deckpagehomepage.tsx';
import DeckBuilderPage from './pages/my-decks/editdeckpage.tsx';
import Profilepage from './pages/profilepage/Profilepage.tsx';
import { HomePage } from './pages/homepage/homepage.tsx';
import SignUpPageComponent from './pages/sign-up-page/signuppage.tsx';
import { lazy, Suspense } from 'react';
import FoldingCube from './components/loadingcomponents/foldingcube.tsx';

const SearchResults = lazy(() => delayLoadTimer(import('./pages/searchpage/searchresults.tsx')))

async function delayLoadTimer (promise: any) {
  return new Promise(resolve => {
    setTimeout(resolve, 800);
  }).then(() => promise);
}

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<SignUpPageComponent/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="banlist" element={<Banlists />} />
        <Route path="search" element={<SearchBarPage/>}/>
        <Route path="/searchresult" element={<SearchResults/>}/>

        <Route element={<StayLoggedIn/>}>
          <Route path="/loggedin" element={<HomePage/>}/>
          <Route path="searchloggedin" element={<SearchBarPage/>} />
          <Route 
            path="/searchresultloggedin" 
            element={
              <Suspense fallback={<FoldingCube/>}>
                <SearchResults/>
              </Suspense>
            }/>
          <Route path="getcards" element={<UserOwnedCardPage/>}/>
            <Route path="deckmanager" element={<MyDeck/>}/>
          <Route path="modifyDeck" element={<DeckBuilderPage/>}/>         
          <Route path="profile" element={<Profilepage />}/>
          <Route path="banlistloggedin" element={<Banlists />} />
        </Route>
      
      </Routes>
  );
} 

export default App;