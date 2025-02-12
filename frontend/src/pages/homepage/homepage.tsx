"use client";
 
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';
 
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { HomepageViewStatistics } from '@/components/homepagecomponents/statisticscomponents/HomepageViewStatistics.tsx';
import { SearchHomePageComponent } from '@/components/homepagecomponents/searchcardcomponent/searchhomepagecomponent.tsx';
import { DeckHomepageComponent } from '@/components/homepagecomponents/deckcomponents/deckhomepagecomponent.tsx';

 
const HomePage = () => {  
  const navigate = useNavigate();
  
  function handleLoginClick() {
    startTransition(() => {
      navigate("/login")
    })
  } 

  function handleSignUpClick() {
    startTransition(() => {
      navigate("/signup")
    })
  }

  return (
    // skipcq: JS-0415
    <main className="bg-gradient-to-r from-[hsl(var(--homepagegradient1))]  to-[hsl(var(--homepagegradient2))]">
      <Header/>
      <div className="relative flex min-h-[70vh] h-fit w-full flex-col justify-center items-center">    
        <div className="flex">
          <div className="relative flex flex-col items-center w-full">
            <div className= "font-black text-4xl lg:text-6xl 2xl:text-8xl text-gold">
              Atlaxiom
            </div>
            <div className="font-bold text-md sm:text-lg lg:text-2xl text-[hsl(var(--profile))] pt-[5vh]"> 
              Online Yugioh card collection and deck builder
            </div>
            <div className=" absolute top-[25vh] flex justify-center lg:flex-row w-full space-x-0 space-y-[2vh] lg:space-y-0 lg:space-x-[2vw] h-fit">
              <button className="bg-[hsl(var(--profile))] border-2 border-transparent w-[50vw] h-[8vh] lg:w-[10vw] lg:h-[6vh] rounded-xl" onClick={handleSignUpClick}>
                <span className='font-bold text-[hsl(var(--background3))] text-[22px]'>Sign Up</span>
              </button>
              <button className="bg-transparent border-2 dark:border-goldenrod font-bold w-[50vw] h-[8vh] lg:w-[10vw] lg:h-[6vh] rounded-xl text-[22px]" onClick={handleLoginClick}>
                Sign in
              </button>
            </div>
          </div>        
        </div>
      </div>
      <div className="px-[3vw] flex flex-col bg-[hsl(var(--bentogridbackground))] space-y-[5vh] pt-[5vh] min-h-[100vh] pb-[10vh] items-center">
        <span className="text-3xl text-[hsl(var(--background3))] w-full md:w-1/2 mb-[5vh] text-center font-black">Create a User Account today to get access to all of the features!</span>
        <div className='w-[75vw] flex flex-col space-y-[10vh] h-fit'>
          <SearchHomePageComponent/>
          <DeckHomepageComponent />
          <HomepageViewStatistics />
        </div>
      </div>
      <Footer/>
    </main>
  );
}

export default HomePage