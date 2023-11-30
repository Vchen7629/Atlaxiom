import React from 'react';
import SearchResults from '../../components/searchresults/SearchPageResult';
import { useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';

const SearchResult = () => {
    const [selectedCardData, setSelectedCardData] = useState(null);

    return (
        <>
        <Header/>
            <div className="Searchbar-title">
                Card Details
            </div>
            <body className="card-background">
                <SearchResults/>
            </body>
        <Footer/>
        </>
    )
}

export default SearchResult;