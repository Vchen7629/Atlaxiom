"use client";
 
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';
 
import { useNavigate } from 'react-router-dom';
import { startTransition } from 'react';
import { SearchCardBentoBackground } from '@/components/homepagecomponents/searchcardcomponent/searchforcardsbackground.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Database, SlidersHorizontal, TrendingUpIcon, Sword, Folder, FolderPlus, SquareDashedMousePointer, Star } from 'lucide-react';
import { CreateDeckBackground } from '@/components/homepagecomponents/deckBentoBackgroundComponents/animatedCreateDeck.tsx';
import { HomepageViewStatistics } from '@/components/homepagecomponents/statisticscomponents/HomepageViewStatistics.tsx';

 
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
    <main className="bg-gradient-to-r from-[hsl(var(--homepagegradient1))]  to-[hsl(var(--homepagegradient2))]">
    <Header/>
    <div className="relative flex min-h-[70vh] h-fit w-full flex-col justify-center items-center pb-[3\1%]">    
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
        <div className='animate-fade-in-up relative flex flex-col lg:flex-row space-x-[5vh] w-full max-h-[50vh] '>
          <div className=" w-full lg:w-[50%] h-full">
            <SearchCardBentoBackground/>
          </div>
          <div className="w-full lg:w-[50%] h-full flex flex-col space-y-[5vh] ">
            <div className="flex space-x-8 w-full justify-center text-[hsl(var(--background3))]">
              <FontAwesomeIcon icon={faSearch} className='fa-2xl'/>
              <span className='text-3xl font-bold'>Search For Cards</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Database className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Search From a database of thousands of Yu-gi-oh Cards</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Sword className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>View card statistics and data</span>
            </div>
            <div className="flex space-x-4 items-center">
              <SlidersHorizontal className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Apply Various Filters to your search</span>
            </div>
            <div className="flex space-x-4 items-center">
              <TrendingUpIcon className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>View Historical Price Data of the Card</span>
            </div>
          </div>
        </div>
        <div className='animate-fade-in-up relative flex flex-col lg:flex-row space-x-[5vh] w-full max-h-[50vh] '>
          <div className="w-[50%] h-full flex flex-col space-y-[5vh] ">
            <div className="flex space-x-6 w-full justify-center text-[hsl(var(--background3))]">
              <Folder className='w-10 h-9'/>
              <span className='text-3xl font-bold'>Create and Manage your Decks</span>
            </div>
            <div className="flex space-x-4 items-center">
              <FolderPlus className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Create new card decks</span>
            </div>
            <div className="flex space-x-4 items-center">
              <SquareDashedMousePointer className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Add owned and cards from database to your decks via drag and drop</span>
            </div>
            <div className="flex space-x-4 items-center">
              <Star className='w-8 h-8 text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Favorite, Duplicate, and Delete Owned Decks</span>
            </div>
            <div className="flex space-x-4 items-center">
              <FontAwesomeIcon icon={faSearch} className='fa-xl text-[hsl(var(--background3))]'/>
              <span className='text-xl text-[hsl(var(--text))] font-bold'>Search through owned decks</span>
            </div>
          </div>
          <div className=" w-[50%] h-full">
            <CreateDeckBackground/>
          </div>
        </div>
        <HomepageViewStatistics />
      </div>
    </div>
    <Footer/>
    </main>
  );
}

export default HomePage