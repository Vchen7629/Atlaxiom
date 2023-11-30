import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import DashLayout from './components/dash/dashlayout'
import UsersList from './features/users/userslist'
import Banlists from './features/pages/banlist';
import ContactInfos from './features/pages/contactinfo';
import AboutUs from './features/pages/aboutus';
import Searchs from './features/pages/search';
import UserOwnedCard from './features/ownedcards/ownedcardslist';
import HomePage from './features/pages/homepage/homepage.js';
import SearchResult from './features/pages/searchresult';
import EditUser from './features/users/editUser.js';
import AccountCreationForm from './features/auth/AccountCreationForm.js'
import LoginPage from './features/auth/login.js'
import Prefetch from './features/auth/Prefetch.js'
import Profile from './features/pages/profilepage/Profile.js'




function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="login" element={<LoginPage/>}/>
        <Route path="signup" element={<AccountCreationForm/>}/>
        <Route path="banlist" element={<Banlists />} />
        <Route path="contact-info" element={<ContactInfos />} />
        <Route path="About-us" element={<AboutUs />} />

        <Route path="search">
          <Route index element={<Searchs />} />
          <Route path=":cardname" element={<SearchResult />} />
        </Route>

        <Route element={<Prefetch/>}>
          <Route path="dash" element={<DashLayout />}>

            <Route index element={<Profile />} />

            <Route path="users">
              <Route path=":id" element={<EditUser/>}/>
              <Route index element={<UsersList />} />
              <Route path="ownedcards">
                <Route path=":id" element={<UserOwnedCard/>}/>
              </Route>
            </Route>

          </Route>
        </Route>

      </Route>
    </Routes>
  );
}  //hiearchy where it starts by rendering the layout then it renders login and dashlayout

export default App;