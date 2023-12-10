import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import DashLayout from './components/dash/dashlayout'
import Banlists from './features/pages/banlist';
import ContactInfos from './features/pages/contactinfo';
import AboutUs from './features/pages/aboutus';
import Searchs from './features/pages/search';
import UserOwnedCard from './features/pages/my-cards/ownedcardslist.js';
import HomePage from './features/pages/homepage/homepage.js';
import SearchResult from './features/pages/searchresult';
import AccountCreationForm from './features/auth/AccountCreationForm.js'
import LoginPage from './features/auth/login.js'
import Prefetch from './features/auth/Prefetch.js'
import Profilepage from './features/pages/profilepage/Profilepage.js';
import StayLoggedIn from './features/auth/stayloggedin.js';
import MyDeck from './features/pages/mydeckpage/my-deck.js';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
          <Route path="signup" element={<AccountCreationForm/>}/>
          <Route path="login" element={<LoginPage/>}/>
          {/*<Route path="banlist" element={<Banlists />} />*/}
          <Route path="banlist" element={<Banlists />} />
          <Route path="contact-info" element={<ContactInfos />} />
          <Route path="About-us" element={<AboutUs />} />

          <Route path="search">
            <Route index element={<Searchs />} />
            <Route path=":cardname" element={<SearchResult />} />
          </Route>

          <Route element={<StayLoggedIn/>}>
            <Route element={<Prefetch/>}>
              <Route path="card" element={<DashLayout />}>
                <Route index element={<HomePage/>}/>
                <Route path="getcards" element={<UserOwnedCard/>}/>
                <Route path=":username" element={<Profilepage />}/>
              </Route>
              
              <Route path="mydeck" element={<MyDeck/>}/>
              <Route path="users" element={<DashLayout />}>
                <Route index element={<Searchs/>}/>
                  <Route path=":userId"/>
              </Route>
              <Route path="profile" element={<Profilepage />}/>
            </Route>
          </Route>
      </Route>
    </Routes>
  );
}  //hiearchy where it starts by rendering the layout then it renders login and dashlayout

export default App;