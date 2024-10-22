import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import DashLayout from './components/dash/dashlayout'
import Banlists from './features/pages/banlist';
import ContactInfos from './features/pages/contactinfo';
import HomePage from './features/pages/homepage/homepage.js';
import AccountCreationForm from './features/pages/sign-up-page/AccountCreationForm.js'
import LoginPage from './features/pages/loginpage/login.js';
import Prefetch from './features/auth/Prefetch.js'
import Profilepage from './features/pages/profilepage/Profilepage.js';
import StayLoggedIn from './features/auth/stayloggedin.js';
import MyDeck from './features/pages/mydeckpage/my-deck.js';
import CreateNewDeckForm from './features/pages/mydeckpage/new-deck-creation-form.jsx';
import Deckview from './features/pages/mydeckpage/My-deck.jsx';
import UserOwnedCardTable from './features/pages/my-cards/ownedCardTable.jsx';
import SearchBar from './features/pages/searchpage/searchbar.jsx';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
          <Route path="signup" element={<AccountCreationForm/>}/>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="banlist" element={<Banlists />} />
          <Route path="privacy-policy" element={<HomePage/>} />
          <Route path="contact-info" element={<ContactInfos />} />
          <Route path="search" element={<SearchBar/>} />
        </Route>

          <Route element={<StayLoggedIn/>}>
            <Route element={<Prefetch/>}>
              <Route path="searchloggedin" element={<SearchBar/>} />
              <Route path="card" element={<DashLayout />}>
                <Route path="getcards" element={<UserOwnedCardTable/>}/>
              </Route>
              <Route path="mydeckhomepage" element={<MyDeck/>}/>
              <Route path="newDeck" element={<CreateNewDeckForm/>}/>
              <Route path="modifyDeck" element={<Deckview/>}/>         
              <Route path="users" element={<DashLayout />}/>
              <Route path="profile" element={<Profilepage />}/>
            </Route>
          </Route>
    </Routes>
  );
} 

export default App;