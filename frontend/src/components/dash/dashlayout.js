import { Outlet } from 'react-router-dom'
import "./styling/dash-page.css"
import Header from '../header/header'
import Footer from '../footer/Footer'

const DashLayout = () => {
    return (
        <>
            <Header />
            <div className ="dash-page-body">
                <Outlet />
            </div>
            <Footer/>
        </>
    )
}

export default DashLayout