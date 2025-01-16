import { useSelector } from 'react-redux';
import { ComponentCardSetPopup } from '../../components/searchpagecomponents/searchresultpagecomponents/addcard.tsx';
import { BreadcrumbSearchResult } from '../../components/searchpagecomponents/searchresultpagecomponents/breadcrumb.tsx';
import { SearchAuth, SearchResult, SearchUserId } from './types/searchbarpagestypes.ts';
import { PriceChartComponent } from '@/components/searchpagecomponents/searchresultpagecomponents/pricechart.tsx';

const SearchResults = ({ searchresultprops }: SearchResult) => { 
    const { 
      selectedCardData, 
      cardSets, setCardSets
    } = searchresultprops
  
    const authenticated = useSelector((state: SearchAuth) => state.auth.token !== null);
    const userId = useSelector((state: SearchUserId) => state.auth.userId);
    console.log(selectedCardData)

    const addcardprops = {
      selectedCardData,
      userId, 
      cardSets, setCardSets
    }
    
    return (
        <main className="flex flex-col w-[100vw] items-center">
            <div className="flex w-[80%] items-center">
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
                    <div className="text-4xl text-goldenrod w-full">{selectedCardData?.name}</div>
                    <div className="flex  my-[4%] text-lg text-gray-300 w-full min-h-[8vh] h-auto max-h-[35vh] overflow-auto">{selectedCardData?.desc}</div>
                      <div className="flex flex-col h-[79%] w-full pt-[4%]">
                        <div className="flex mb-[4%] w-full space-x-[15%]">
                          <div className="flex flex-col max-w-1/3 text-white">
                            <div className="text-gold mb-1">Card Type</div> 
                            <div className="text-gray-200 text-xl"> {selectedCardData?.type}</div>
                          </div>
                          {selectedCardData?.archetype && (
                            <div className="flex flex-col max-w-1/3 text-white">
                              <div className="text-gold mb-1">Archetype</div>
                              <div className="text-gray-200 text-xl">{selectedCardData.archetype}</div>
                            </div>
                          )}
                          <div className="flex flex-col max-w-1/3 text-white">
                            {selectedCardData?.type?.includes("Spell") ? (
                              <div className="text-gold mb-1">Spell Type:</div>
                            ) : selectedCardData?.type?.includes("Trap") ? (
                              <div className="text-gold mb-1">Trap Type:</div>
                            ) : (
                              <div className="text-gold mb-1">Race:</div>
                            )}
                            <div className="text-gray-200 text-xl">{selectedCardData?.race}</div>
                          </div>
                        </div>
                        {(selectedCardData?.scale || selectedCardData?.linkval || selectedCardData?.atk || selectedCardData?.def) && (
                            <div className="flex flex-col w-full space-y-[4%]">
                              <div className="flex space-x-[4%]">
                                {selectedCardData.scale && (
                                  <div className="flex text-xl text-white">
                                    <div className="mr-5">Pend-Scale:</div>
                                    <div>{selectedCardData.scale}</div>
                                  </div>
                                )}
                                {selectedCardData.linkval && (
                                  <div className="flex text-lg text-white">
                                    <div className="mr-5 text-[hsl(var(--background3))]">Link-value:</div>
                                    <div>{selectedCardData.linkval}</div>
                                  </div>
                                )}
                              </div>
                              <div className="flex space-x-[4%]">
                                {selectedCardData.atk && (
                                  <div className="flex text-lg text-white">
                                    <div className="mr-5 text-[hsl(var(--background3))]">Attack:</div>
                                    <div>{selectedCardData.atk}</div>
                                  </div>
                                )}
                                {selectedCardData.def && (
                                  <div className="flex text-lg text-white">
                                    <div className="mr-5 text-[hsl(var(--background3))]">Defense:</div>
                                    <div>{selectedCardData.def}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                        )}
                        
                      </div>
                </div>
                <div className='flex w-[45vw] items-center'>
                  <PriceChartComponent />
                </div>    
            </main>        
        </main>
    )


}

export default SearchResults