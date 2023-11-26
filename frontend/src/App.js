import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import Login from './features/auth/login';
import DashLayout from './components/dash/dashlayout'
import Welcome from './features/auth/welcome'
import UsersList from './features/users/userslist'
import Banlists from './features/pages/banlist';
import ContactInfos from './features/pages/contactinfo';
import AboutUs from './features/pages/aboutus';
import Searchs from './features/pages/search';
import UserOwnedCard from './features/ownedcards/ownedcardslist';
import HomePage from './components/homepage/homepage';
import SearchResult from './features/pages/searchresult';




function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="login" element={<Login />} />
        <Route path="banlist" element={<Banlists />} />
        <Route path="contact-info" element={<ContactInfos />} />
        <Route path="About-us" element={<AboutUs />} />

        <Route path="search">
          <Route index element={<Searchs />} />
          <Route path=":cardname" element={<SearchResult />} />
        </Route>
 
        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="ownedcards">
              <Route path=":id" element={<UserOwnedCard/>}/>
        
            </Route>
          </Route>

        </Route>{/* End Dash path */}

      </Route>
    </Routes>
  );
}  //hiearchy where it starts by rendering the layout then it renders login and dashlayout

export default App;