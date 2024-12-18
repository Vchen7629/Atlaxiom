import { useSelector } from 'react-redux';
import { ComponentCardSetPopup } from './searchresultcomponents/addcard';
import { BreadcrumbSearchResult } from './searchresultcomponents/breadcrumb.tsx';
import { SearchAuth, SearchResult, SearchUserId } from './types/searchbarpagestypes.ts';

const SearchResults = ({selectedCardData, cardSets}: SearchResult) => { 
    const authenticated = useSelector((state: SearchAuth) => state.auth.token !== null);
    const userId = useSelector((state: SearchUserId) => state.auth.userId);
    
    return (
        <main className="flex flex-col w-full items-center">
            <div className="flex w-[80%] items-center">
                <BreadcrumbSearchResult/>
            </div>
            <main className="flex mt-[5vh] w-[90%] ">
                <img className="w-[15vw] object-contain mx-[5%] "
                    src={selectedCardData.card_images[0].image_url}
                    alt={selectedCardData.name}
                /> 
                <div className="flex flex-col w-[30%] pt-[1%]">
                    <div className="text-4xl text-goldenrod w-full">{selectedCardData.name}</div>
                    <div className="flex my-[4%] text-xl text-gray-300 w-full">{selectedCardData.desc}</div>
                      <div className="flex flex-col h-[79%] w-[80%] pt-[4%]">
                        <div className="flex mb-[4%] w-full justify-between">
                          <div className="flex flex-col max-w-1/2 text-white">
                            <div className="text-gold mb-1">Card Type</div> 
                            <div className="text-gray-200 text-xl"> {selectedCardData.type}</div>
                          </div>
                          {selectedCardData.archetype && (
                            <div className="flex flex-col max-w-1/2 text-white">
                              <div className="text-gold mb-1">Archetype</div>
                              <div className="text-gray-200 text-xl">{selectedCardData.archetype}</div>
                            </div>
                          )}
                          <div className="flex flex-col max-w-1/2 text-white">
                            <div className="text-gold">Race:</div>
                            <div className="text-gray-200 text-xl">{selectedCardData.race}</div>
                          </div>
                        </div>
                        {(selectedCardData.scale || selectedCardData.linkval || selectedCardData.atk || selectedCardData.def)&& (
                          <>
                          <div className="flex mb-[4%] w-[90%] justify-left">
                            {selectedCardData.scale && (
                              <>
                              <div className="flex text-xl text-white">
                                <div className="mr-5">Pend-Scale:</div>
                                <div className="mr-[50px]">{selectedCardData.scale}</div>
                              </div>
                              </>
                            )}
                            {selectedCardData.linkval && (
                              <>
                              <div className="flex text-xl text-white">
                                <div className="mr-5">Link-value:</div>
                                <div className="mr-[50px]">{selectedCardData.linkval}</div>
                              </div>
                              </>
                            )}
                            {selectedCardData.atk && (
                              <>
                              <div className="flex text-xl text-white">
                                <div className="mr-5">Attack:</div>
                                <div className="mr-[50px]">{selectedCardData.atk}</div>
                              </div>
                              </>
                            )}
                            {selectedCardData.def && (
                              <>
                              <div className="flex text-xl text-white">
                                <div className="mr-5">Defense:</div>
                                <div>{selectedCardData.def}</div>
                              </div>
                              </>
                            )}
                          </div>
                          </>
                        )}
                        
                      </div>
                      {authenticated && (
                        <div>
                          <div className="flex justify-center">
                            <ComponentCardSetPopup selectedCardData={selectedCardData} userId={userId} cardSets={cardSets} />
                          </div>
                        </div>
                        )} 
                    </div>    
                  </main>        
                </main>
    )


}

export default SearchResults