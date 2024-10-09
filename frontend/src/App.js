import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import DashLayout from './components/dash/dashlayout'
import Banlists from './features/pages/banlist';
import ContactInfos from './features/pages/contactinfo';
import Search from './features/pages/search';
import UserOwnedCard from './features/pages/my-cards/ownedcardslist.js';
import HomePage from './features/pages/homepage/homepage.js';
import SearchResult from './features/pages/searchresult';
import SearchResultLoggedIn from './features/pages/searchresultpage/SearchPageResultLoggedin.jsx';
import AccountCreationForm from './features/pages/sign-up-page/AccountCreationForm.js'
import LoginPage from './features/pages/loginpage/login.js';
import Prefetch from './features/auth/Prefetch.js'
import Profilepage from './features/pages/profilepage/Profilepage.js';
import StayLoggedIn from './features/auth/stayloggedin.js';
import MyDeck from './features/pages/mydeckpage/my-deck.js';
import CreateNewDeckForm from './features/pages/mydeckpage/new-deck-creation-form.jsx';
import Deckview from './features/pages/mydeckpage/view-deck.jsx';


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
          
          <Route path="search">
            <Route index element={<Search />} />
            <Route path=":cardname" element={<SearchResult />} />
          </Route>

          <Route element={<StayLoggedIn/>}>
            <Route element={<Prefetch/>}>
              <Route path="searchloggedin" element={<Search/>}/>
              <Route path=":cardname" element={<SearchResultLoggedIn />}/>
              <Route path="card" element={<DashLayout />}>
                <Route path="getcards" element={<UserOwnedCard/>}/>
              </Route>
              <Route path="mydeckhomepage" element={<MyDeck/>}/>
              <Route path="newDeck" element={<CreateNewDeckForm/>}/>
              <Route path="viewDeck" element={<Deckview/>}/>         
              <Route path="users" element={<DashLayout />}/>
              <Route path="profile" element={<Profilepage />}/>
            </Route>
          </Route>
      </Route>
    </Routes>
  );
} 

export default App;