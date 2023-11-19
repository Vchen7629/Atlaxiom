import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice"
import { v4 as uuidv4 } from 'uuid'

const ownedCardsAdapter = createEntityAdapter({
    selectId: (ownedCard) => ownedCard._id || uuidv4(),
})

const initialState = ownedCardsAdapter.getInitialState()


export const ownedCardsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        //createOwnedCard: builder.mutation({
            //query: ({ Userid, })
        //}),

        getOwnedCards: builder.query({
            query: () => `/users`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                console.log('Response Data:', responseData);
            try {
                if (responseData.message) {
                    console.error('API messageError:', responseData.message);
                    return initialState; // or handle the error accordingly
                }

                if (Array.isArray(responseData.ownedCards)) {

                    const processedCards = responseData.ownedCards.map(card => ({
                        id: ownedCardsAdapter.selectId(card) || uuidv4(),
                        card_name: card.card_name,
                        image_url: card.image_url,
                            // Add other properties as needed
                    }));  

                    return ownedCardsAdapter.setAll(initialState, processedCards);

                } else if (typeof responseData === 'object') {

                    const ownedCard = {
                        id: ownedCardsAdapter.selectId(responseData),
                        card_name: responseData.card_name,
                        image_url: responseData.image_url,
                        // Add other properties as needed
                    };

                    return ownedCardsAdapter.setAll(initialState, [ownedCard]);
                
                } else {
                    
                    console.error('Invalid Response Data:', responseData);
                    return initialState; // or handle the error accordingly
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return initialState; // or handle the error in a way that makes sense for your application
            }
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
    selectAllOwnedCards: selectAllOwnedCards, // returns an array for all ownedCard
    selectOwnedCardsById: selectOwnedCardById, //Retrieves a user object with that id
} = ownedCardsAdapter.getSelectors(state => selectOwnedCardsData(state) ?? initialState)