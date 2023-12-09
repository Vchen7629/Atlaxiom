
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/header"
import SearchBar from "./searchbarpage/searchbar"
import "../pages/styling/banner.css"



const Searchs = () => {
    return (
    <>
        <Header/>
            <div className="Searchbar-title">
                Card Search
            </div>
            <body>
                <SearchBar/>
            </body>
        <Footer/>
    </>
    )
}

export default Searchs