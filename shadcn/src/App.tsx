import { Routes, Route } from 'react-router-dom'
import HomePage from './features/pages/homepage/homepage.js';
import AccountCreationForm from './features/pages/sign-up-page/AccountCreationForm.jsx'
import LoginPage from './features/pages/loginpage/login.js';
import Banlists from './features/pages/banlist.jsx';
import SearchBar from './features/pages/searchpage/searchbar.jsx';
import StayLoggedIn from './features/auth/stayloggedin.jsx';
import Prefetch from './features/auth/Prefetch.jsx';
import UserOwnedCardTable from './features/pages/my-cards/ownedCardTable.jsx';
import MyDeck from './features/pages/mydeckpage/my-deck.jsx';
import CreateNewDeckForm from './features/pages/mydeckpage/new-deck-creation-form.jsx';
import Deckview from './features/pages/mydeckpage/My-deck-Display.jsx';
import Profilepage from './features/pages/profilepage/Profilepage.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="signup" element={<AccountCreationForm/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="banlist" element={<Banlists />} />
      <Route path="search" element={<SearchBar/>} />

      <Route element={<StayLoggedIn/>}>
        <Route element={<Prefetch/>}>
          <Route path="/loggedin" element={<HomePage/>}/>
          <Route path="searchloggedin" element={<SearchBar/>} />
          <Route path="getcards" element={<UserOwnedCardTable/>}/>
          <Route path="mydeckhomepage" element={<MyDeck/>}/>
          <Route path="newDeck" element={<CreateNewDeckForm/>}/>
          <Route path="modifyDeck" element={<Deckview/>}/>         
          <Route path="profile" element={<Profilepage />}/>
        </Route>
      </Route>
    
    </Routes>
  );
} 

export default App;