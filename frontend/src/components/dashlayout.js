import { Outlet } from 'react-router-dom'
import DashHeader from './dashheader'
import DashFooter from './dashfooter'

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className ="dash-container">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}

export default DashLayout