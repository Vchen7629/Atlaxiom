import { Link } from 'react-router-dom'
import React from 'react';
import DashFooter from '../dash/dashfooter';
import DashHeader from '../dash/dashheader';





const Public = () => {
   
    const content = (
        <section className="public">
            <DashHeader/>
            <banner>
                <div className="banner"></div>
            </banner> 
            <body>
                <h1 className= "h1titlebox">
                    Welcome to the My Deck Database website
                </h1>
                
                <div className='body-container'>
                    <div className="homepage-parallelogram-upperleft"></div>
                    <div className="homepage-parallelogram-bottomleft"></div>
                    <div className="homepage-parallelogram-upperright"></div>
                    <div className="homepage-parallelogram-bottomright"></div>
                    <div className="tech-circle"></div>
                </div>
            </body>
            <DashFooter/>
        </section>
    )
    return content
}

export default Public

