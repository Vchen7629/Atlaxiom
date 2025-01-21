"use client";
 
import { useState } from "react";
import Header from '../../components/header/header.tsx';
import Footer from '../../components/footer/Footer.tsx';

 
import Particles from "../../components/ui/particles.tsx";

 
export function HomePage() {
  const [color] = useState<string>("#FFD700");
  
  return (
    <main className="bg-gradient-to-r from-[hsl(var(--homepagegradient1))]  to-[hsl(var(--homepagegradient2))]">
    <Header/>
    <div className="relative flex min-h-[70vh] h-fit w-full flex-col overflow-hidden rounded-lg justify-center md:shadow-xl items-centeroverflow-auto pb-[3%]">    
      <Particles
        className="absolute inset-0 "
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="flex">
        <div className="relative flex flex-col items-center w-full">
          <div className= "font-black xs:text-6xl lg:text-6xl 2xl:text-8xl text-gold">
            Atlaxiom
          </div>
          <div className="relative text-2xl text-[hsl(var(--text))] top-[5vh]"> 
            Online Yugioh card collection and deck builder
          </div>
        </div>        
      </div>
    </div>
    <div className=" flex flex-col bg-[hsl(var(--background1))] min-h-[100vh] items-center">
      Start Building Your Collection today! DEVELOPEMENT
    </div>
    <Footer/>
    </main>
  );
}