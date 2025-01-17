import { useSelector } from 'react-redux';
import { BreadcrumbSearchResult } from '../../components/searchpagecomponents/searchresultpagecomponents/breadcrumb.tsx';
import { SearchAuth, SearchUserId } from './types/searchbarpagestypes.ts';
import { PriceChartComponent } from '@/components/searchpagecomponents/searchresultpagecomponents/pricechart.tsx';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/footer/Footer.tsx';
import Header from '@/components/header/header.tsx';
import { CardSet } from '@/components/searchpagecomponents/types/searchresultcomptypes.ts';
import { useState } from 'react';
import { ComponentCardSetPopup } from '@/components/searchpagecomponents/searchresultpagecomponents/addcard.tsx';

const SearchResults = () => { 
    const location = useLocation();
    const { selectedCardData } = location.state || {}
    const [cardSets, setCardSets] = useState<CardSet[]>([]);
   
    const authenticated = useSelector((state: SearchAuth) => state.auth.token !== null);
    const userId = useSelector((state: SearchUserId) => state.auth.userId);

    const addcardprops = {
      selectedCardData,
      userId, 
      cardSets, setCardSets
    }
    
    return (
      <main className="min-h-[100vh]">
        <div className="flex flex-col min-h-[120vh] bg-[hsl(var(--background1))] justify-between overflow-auto" >
          <Header/>
          <main className="flex flex-col py-[13vh] w-[100vw] justify-center items-center">
              <div className="flex w-[84%] items-center">
                <BreadcrumbSearchResult/>
              </div>
              <main className="flex w-[100vw]">
                  <div className='flex flex-col w-[15vw] mx-[5%] justify-center space-y-[4vh]'>
                    <img className="object-contain"
                        src={selectedCardData?.card_images[0].image_url}
                    /> 
                    {authenticated && (
                      <div>
                        <div className="flex justify-center">
                          <ComponentCardSetPopup addcardprops={addcardprops} />
                        </div>
                      </div>
                    )}
                  </div> 
                  <div className="flex flex-col w-[30vw] pt-[3%]">
                      <span className="text-4xl text-[hsl(var(--background3))] w-full">{selectedCardData?.name}</span>
                      <span className="flex  my-[4%] text-md text-[hsl(var(--text))] w-full min-h-[8vh] h-auto max-h-[35vh] overflow-auto">{selectedCardData?.desc}</span>
                      <div className="flex flex-col h-[79%] w-full pt-[4%]">
                        <section className="flex mb-[4%] w-full space-x-[15%]">
                          <div className="flex flex-col max-w-1/3">
                            <span className="mb-1 font-bold text-[hsl(var(--background3))]">Card Type</span> 
                            <span className="text-[hsl(var(--text))] text-lg"> {selectedCardData?.type}</span>
                          </div>
                          {selectedCardData?.archetype && (
                            <div className="flex flex-col max-w-1/3">
                              <span className="mb-1 font-bold text-[hsl(var(--background3))]">Archetype</span>
                              <span className="text-[hsl(var(--text))] text-lg">{selectedCardData.archetype}</span>
                            </div>
                          )}
                          <div className="flex flex-col max-w-1/3 text-[hsl(var(--background3))]">
                            {selectedCardData?.type?.includes("Spell") ? (
                              <span className="mb-1 font-bold">Spell Type:</span>
                            ) : selectedCardData?.type?.includes("Trap") ? (
                              <span className="mb-1 font-bold">Trap Type:</span>
                            ) : (
                              <span className="mb-1 font-bold">Race:</span>
                            )}
                            <span className="text-[hsl(var(--text))] text-lg">{selectedCardData?.race}</span>
                          </div>
                        </section>
                        {(selectedCardData?.scale || selectedCardData?.linkval || selectedCardData?.atk || selectedCardData?.atk === 0 || selectedCardData?.def || selectedCardData?.def === 0) && (
                          <section className="flex flex-col w-full space-y-[4%]">
                            <div className="flex space-x-[4%]">
                              {selectedCardData.scale && (
                                <div className="flex text-xl text-white">
                                  <span className="mr-5">Pend-Scale:</span>
                                  <span className="text-[hsl(var(--text))]">{selectedCardData.scale}</span>
                                </div>
                              )}
                              {selectedCardData.linkval && (
                                <div className="flex text-lg">
                                  <span className="mr-5 text-[hsl(var(--background3))]">Link-value:</span>
                                  <span  className="text-[hsl(var(--text))]">{selectedCardData.linkval}</span>
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-[4%]">
                              {(selectedCardData.atk || selectedCardData.atk === 0) && (
                                <div className="flex text-lg">
                                  <span className="mr-5 text-[hsl(var(--background3))]">Attack:</span>
                                  <span className="text-[hsl(var(--text))]">{selectedCardData.atk}</span>
                                </div>
                              )}
                              {(selectedCardData.def || selectedCardData.def === 0) && (
                                <div className="flex text-lg">
                                  <span className="mr-5 text-[hsl(var(--background3))]">Defense:</span>
                                  <span className="text-[hsl(var(--text))]">{selectedCardData.def}</span>
                                </div>
                              )}
                            </div>
                          </section>
                        )}
                      </div>
                  </div>
                  <div className='flex w-[45vw] items-center'>
                    <PriceChartComponent />
                  </div>    
              </main>        
          </main>
          <Footer/>
        </div>
      </main>
    )


}

export default SearchResults