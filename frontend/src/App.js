import { Routes, Route } from 'react-router-dom'

import Layout from './components/layout'
import Public from './components/publicpage/public'
import Login from './features/auth/login';
import DashLayout from './components/dash/dashlayout'
import Welcome from './features/auth/welcome'
import OwnedCardsList from './features/ownedcards/ownedcardslist'
import UsersList from './features/users/userslist'
import Banlists from './features/pages/banlist';
import ContactInfos from './features/pages/contactinfo';
import AboutUs from './features/pages/aboutus';
import Searchs from './features/pages/search';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="login" element={<Login />} />
        <Route path="banlist" element={<Banlists />} />
        <Route path="contact-info" element={<ContactInfos />} />
        <Route path="About-us" element={<AboutUs />} />
        <Route path="search" element={<Searchs />} />
 
        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="ownedcards">
            <Route index element={<OwnedCardsList />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
          </Route>

        </Route>{/* End Dash path */}

      </Route>
    </Routes>
  );
}  //hiearchy where it starts by rendering the layout then it renders login and dashlayout

export default App;