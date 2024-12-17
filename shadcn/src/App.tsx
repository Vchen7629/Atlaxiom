import { Routes, Route } from 'react-router-dom'
import HomePage from './features/pages/homepage/homepage.js';
import AccountCreationForm from './features/pages/sign-up-page/AccountCreationForm.jsx'
import LoginPage from './features/pages/loginpage/login.js';
import Banlists from './features/pages/banlist.jsx';
import SearchBarPage from './features/pages/searchpage/searchbarpage.jsx';
import SearchResults from './features/pages/searchpage/searchresults.jsx';
import StayLoggedIn from './features/auth/stayloggedin.jsx';
import Prefetch from './features/auth/Prefetch.jsx';
import UserOwnedCardPage from './features/pages/my-cards/ownedCardPage.js';
import MyDeck from './features/pages/my-decks/deckpagehomepage.js';
import DeckBuilderPage from './features/pages/my-decks/editdeckpage.js';
import Profilepage from './features/pages/profilepage/Profilepage.js';
import { ThemeProvider } from "./components/shadcn_components/darklightmode/theme-provider.js"



function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<AccountCreationForm/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="banlist" element={<Banlists />} />
        <Route path="search" element={<SearchBarPage/>}>
          <Route path="/searchresult" element={<SearchResults/>}/>
        </Route>

        <Route element={<StayLoggedIn/>}>
          <Route element={<Prefetch/>}>
            <Route path="/loggedin" element={<HomePage/>}/>
            <Route path="searchloggedin" element={<SearchBarPage/>} />
            <Route path="getcards" element={<UserOwnedCardPage/>}/>
            <Route path="deckmanager" element={<MyDeck/>}/>
            <Route path="modifyDeck" element={<DeckBuilderPage/>}/>         
            <Route path="profile" element={<Profilepage />}/>
          </Route>
        </Route>
      
      </Routes>
    </ThemeProvider>
  );
} 

export default App;