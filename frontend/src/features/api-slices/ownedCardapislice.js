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
        AddNewOwnedCard: builder.mutation({
            query: ({ id, CardData }) => ({
              url: `/card/${id}`,
              method: 'POST',
              body: CardData,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        }),

        getOwnedCards: builder.query({
            query: (id) => `/card/${id}`,
            method: 'GET',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                return ownedCardsAdapter.upsertOne(initialState, { ...responseData, id: responseData._id });
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'OwnedCards', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'OwnedCard', id }))
                    ]
                } else return [{ type: 'OwnedCards', id: 'LIST' }]
            }
        }),


        /*getOwnedCards: builder.query({
            query: (userId) => `/card/${userId}`,
            method: 'GET',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
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
        }),*/

        IncreaseOwnedCard: builder.mutation({
            query: ({ id, CardData }) => ({
                url: `/card/${id}`,
                method: 'PATCH',
                body: CardData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        }),

        
    }),
})

export const { 
    useGetOwnedCardsQuery,
    useAddNewOwnedCardMutation,
    useIncreaseOwnedCardMutation,
} = ownedCardsApiSlice
