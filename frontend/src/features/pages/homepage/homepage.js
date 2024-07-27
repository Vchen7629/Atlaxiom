import React from 'react';
import "./styling/body.css"
import "./styling/banner.css"
import "./styling/parallelogram.css"
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/Footer';



const HomePage = () => {
   
    const content = (
        <section className="public">
            <Header/>
            <main className="Homepage-body-container">
                <div className= "homepagetitlebox">Welcome to DeckDataBaseOnline!</div>
                <div className="homepagedescriptionbox"> 
                    All-in one website allowing you to catalog your card-collection and create 
                    custom decks
                </div>
                <div className="tech-circle"></div>
            </ main>
            <Footer/>
        </section>
    )
    return content
}

export default HomePage

