import React from 'react';
import SearchResults from './searchresultpage/SearchPageResult';
import { useState } from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/Footer';

const SearchResult = () => {

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