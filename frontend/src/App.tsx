import { Routes, Route } from 'react-router-dom'
import AccountCreationForm from './features/pages/sign-up-page/AccountCreationForm.tsx'
import LoginPage from './features/pages/loginpage/login.tsx';
import Banlists from './features/pages/banlist.tsx';
import SearchBarPage from './features/pages/searchpage/searchbarpage.tsx';
import SearchResults from './features/pages/searchpage/searchresults.tsx';
import StayLoggedIn from './features/auth/stayloggedin.tsx';
import UserOwnedCardPage from './features/pages/my-cards/ownedCardPage.tsx';
import MyDeck from './features/pages/my-decks/deckpagehomepage.tsx';
import DeckBuilderPage from './features/pages/my-decks/editdeckpage.tsx';
import Profilepage from './features/pages/profilepage/Profilepage.tsx';
import { ThemeProvider } from "./components/shadcn_components/darklightmode/theme-provider.js"
import { HomePage } from './features/pages/homepage/homepage.tsx';



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
          <Route path="/loggedin" element={<HomePage/>}/>
          <Route path="searchloggedin" element={<SearchBarPage/>} />
          <Route path="getcards" element={<UserOwnedCardPage/>}/>
          <Route path="deckmanager" element={<MyDeck/>}/>
          <Route path="modifyDeck" element={<DeckBuilderPage/>}/>         
          <Route path="profile" element={<Profilepage />}/>
          <Route path="banlistloggedin" element={<Banlists />} />
        </Route>
      
      </Routes>
    </ThemeProvider>
  );
} 

export default App;