import { Outlet } from 'react-router-dom'
import DashHeader from './dashheader'
import DashFooter from './dashfooter'
import "./styling/dash-page.css"

const DashLayout = () => {
    return (
        <>
            <DashHeader />
            <div className ="dash-page-body">
                <Outlet />
            </div>
            <DashFooter />
        </>
    )
}

export default DashLayout