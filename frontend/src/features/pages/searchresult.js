import React from 'react';
import DashFooter from "../../components/dash/dashfooter"
import DashHeader from "../../components/dash/dashheader"
import SearchResults from '../../components/searchresults/SearchPageResult';
import { useState } from 'react';

const SearchResult = () => {
    const [selectedCardData, setSelectedCardData] = useState(null);

    return (
        <>
        <DashHeader/>
            <div className="Searchbar-title">
                Card Details
            </div>
            <body className="card-background">
                <SearchResults/>
            </body>
        <DashFooter/>
        </>
    )
}

export default SearchResult;