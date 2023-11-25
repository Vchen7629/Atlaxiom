
import DashFooter from "../../components/dash/dashfooter"
import DashHeader from "../../components/dash/dashheader"
import SearchBar from "../../components/searchbar/searchbar"
import "../pages/styling/banner.css"



const Searchs = () => {
    return (
    <>
        <DashHeader/>
            <div className="Searchbar-title">
                Card Search
            </div>
            <body>
                <SearchBar/>
            </body>
        <DashFooter/>
    </>
    )
}

export default Searchs