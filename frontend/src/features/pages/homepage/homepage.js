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
            <banner>
                <div className="banner"></div>
            </banner> 
            <main className="Homepage-body-container">
                <h1 className= "homepagetitlebox">
                    Welcome to the My Deck Database website
                </h1>
                
                <div className='body-container'>
                    <div className="homepage-parallelogram-upperleft"></div>
                    <div className="homepage-parallelogram-bottomleft"></div>
                    <div className="homepage-parallelogram-upperright"></div>
                    <div className="homepage-parallelogram-bottomright"></div>
                    <div className="tech-circle"></div>
                </div>
            </ main>
            <Footer/>
        </section>
    )
    return content
}

export default HomePage

