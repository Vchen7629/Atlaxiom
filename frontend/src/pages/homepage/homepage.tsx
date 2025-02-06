"use client";
 
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';
 
import { WebsiteFeaturesBento } from "../../components/homepagecomponents/websitefeaturesbento.tsx";

 
const HomePage = () => {  
  return (
    <main className="bg-gradient-to-r from-[hsl(var(--homepagegradient1))]  to-[hsl(var(--homepagegradient2))]">
    <Header/>
    <div className="relative flex min-h-[70vh] h-fit w-full flex-col justify-center items-center pb-[3%]">    
      <div className="flex">
        <div className="relative flex flex-col items-center w-full">
          <div className= "font-black text-4xl lg:text-6xl 2xl:text-8xl text-gold">
            Atlaxiom
          </div>
          <div className="relative text-md sm:text-lg lg:text-2xl text-[hsl(var(--text))] top-[5vh]"> 
            Online Yugioh card collection and deck builder
          </div>
        </div>        
      </div>
    </div>
    <div className="px-[3vw] flex flex-col bg-[hsl(var(--background1))] space-y-[5vh] pt-[5vh] min-h-[100vh] items-center">
      <span className="text-3xl text-[hsl(var(--background3))] w-full md:w-1/2 text-center font-black">Create a User Account today to get access to all of the features!</span>
      <div className="flex w-full space-x-[2vw] h-fit px-[38%]">
        <button className="bg-[hsl(var(--signupbutton))] border-2 border-[hsl(var(--border))] font-bold text-[hsl(var(--profile))] w-[10vw] h-[6vh] rounded-3xl text-[22px]">
          Sign Up
        </button>
        <button className="bg-[hsl(var(--background3))] border-2 border-[hsl(var(--border))] font-bold  w-[10vw] h-[6vh] rounded-3xl text-[22px]">
          Sign in
        </button>
      </div>
      <WebsiteFeaturesBento />
    </div>
    <Footer/>
    </main>
  );
}

export default HomePage