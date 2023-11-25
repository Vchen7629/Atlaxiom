import React from 'react';
import DashHeader from '../dash/dashheader';
import "./styling/body.css"
import "./styling/banner.css"
import "./styling/parallelogram.css"
import DashFooter from '../dash/dashfooter';



const HomePage = () => {
   
    const content = (
        <section className="public">
            <DashHeader/>
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
            <DashFooter/>
        </section>
    )
    return content
}

export default HomePage

