import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const ownedCardsAdapter = createEntityAdapter({
    selectId: (entityArray) => {
        // Check if the entityArray is defined and has elements
        if (entityArray && entityArray.length > 0) {
          const firstEntity = entityArray[0];
          // Check if the first entity is defined and has a card_name property
          if (firstEntity && firstEntity.card_name) {
            return firstEntity.card_name;
          }
        }
    
        // Return a default value if the entityArray or card_name is undefined
        return 'defaultId';
      },
}) 

const initialState = ownedCardsAdapter.getInitialState()

export const ownedCardsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getOwnedCards: builder.query({
            query: (id) => `/dash/users/ownedcards/${id}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                console.log('Response Data:', responseData);
                
                
                if (!responseData || !responseData.ownedCards || !Array.isArray(responseData.ownedCards)) {
                    // Handle the case where the response data is not as expected
                    console.error('Invalid response data:', responseData);
                    return initialState; 
                }

                const Userdata = {
                    ownedCards: responseData.ownedCards.map(card => ({
                        id: card._id,
                        name: card.card_name,
                        type: card.type,
                        subtype: card.race,
                        attribute: card.attribute,
                        archetype: card.archetype,
                        level: card.level,
                        linkval: card.linkval,
                        pendscale: card.scale,
                        attack: card.atk,
                        defense: card.def,
                        desc: card.desc,
                        monsterdesc: card.monster_desc,
                        penddesc: card.pend_desc,
                        image: card.image_url,
                        ownedProp: card.ownedprop,
                    })),
                };
                const state = ownedCardsAdapter.setAll(initialState, Userdata)
                return state;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'OwnedCard', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'OwnedCard', id }))
                    ]
                } else return [{ type: 'OwnedCard', id: 'LIST' }]
            }
        }),

        /*getOwnedCards: builder.query({
            query: () => "/users",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                console.log('Response Data:', responseData);
                const loadedcardata = responseData.map(card => {
                    card.id = card._id
                    return card
                });
                return ownedCardsAdapter.setAll(initialState, loadedcardata);
                
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'OwnedCard', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'OwnedCard', id }))
                    ]
                } else return [{ type: 'OwnedCard', id: 'LIST' }]
            }
        }), */

    }),
})

export const { useGetOwnedCardsQuery } = ownedCardsApiSlice

// returns the query result object
export const selectOwnedCardsResult = ownedCardsApiSlice.endpoints.getOwnedCards.select();

// creates memoized selector
const selectOwnedCardsData = createSelector(
    selectOwnedCardsResult,
    (ownedCardsResult) => ownedCardsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllOwnedCards, // returns an array for all ownedCard
    selectById: selectOwnedCardById, //Retrieves a user object with that id
} = ownedCardsAdapter.getSelectors(state => selectOwnedCardsData(state) ?? initialState)