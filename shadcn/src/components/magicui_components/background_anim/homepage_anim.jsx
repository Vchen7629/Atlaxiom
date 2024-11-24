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
    <>
    <Header/>
    <div className="relative flex min-h-[92vh] h-fit w-full flex-col overflow-hidden rounded-lg justify-center md:shadow-xl items-centeroverflow-auto pt-[3%]">    
      <Particles
        className="absolute inset-0 "
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="flex bg-[hsl(var(--background2))] min-h-[70vh]">
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
      <div className="bg-[hsl(var(--background2))] flex flex-col items-center">
        <div className="flex w-full justify-center">
            <MagicCardDemo/>
        </div>
        <MarqueeDemo/>
      </div>
    </div>
    <Footer/>
    </>
  );
}