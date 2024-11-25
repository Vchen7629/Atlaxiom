"use client";
 
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import { MarqueeDemo } from "../general_anim/image_anim"
import { MagicCardDemo } from "../general_anim/hover_card_anim"

 
import Particles from "../../ui/particles";
 
export function ParticlesBackgroundAnimComponent() {
  const [color, setColor] = useState("#FFD700");
  
  return (
    <main className="bg-[hsl(var(--background2))]">
    <Header/>
    <div className="relative flex min-h-[100vh] h-fit w-full flex-col overflow-hidden rounded-lg justify-center md:shadow-xl items-centeroverflow-auto pb-[3%]">    
      <Particles
        className="absolute inset-0 "
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="flex min-h-[70vh]">
        <div className="relative flex flex-col items-center justify-center w-full">
          <div className= "font-black xs:text-6xl lg:text-6xl 2xl:text-8xl text-gold">
            Atlaxiom
          </div>
          <div className="text-lg text-gray-400"> 
            All-in one website allowing you to catalog your card-collection and create 
            custom decks
          </div>
        </div>
        
      </div>
      <div className=" flex flex-col items-center">
        <div className="flex w-full justify-center">
            <MagicCardDemo/>
        </div>
        <MarqueeDemo/>
      </div>
    </div>
    <Footer/>
    </main>
  );
}