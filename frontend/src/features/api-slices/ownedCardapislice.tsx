import { createEntityAdapter } from "@reduxjs/toolkit";
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

        IncreaseOwnedCard: builder.mutation({
            query: ({ id, CardData }) => ({
                url: `/card/increasecard/${id}`,
                method: 'PATCH',
                body: CardData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        }),

        DecreaseOwnedCard: builder.mutation({
            query: ({ id, CardData }) => ({
                url: `/card/decreasecard/${id}`,
                method: 'PATCH',
                body: CardData
            }), 
            invalidatesTags: (result, error, arg) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        }),

        DeleteOwnedCard: builder.mutation({
            query: ({ id, CardData }) => ({
                url: `/card/${id}`,
                method: 'DELETE',
                body: CardData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        })
        
    }),
})

export const { 
    useGetOwnedCardsQuery,
    useAddNewOwnedCardMutation,
    useIncreaseOwnedCardMutation,
    useDecreaseOwnedCardMutation,
    useDeleteOwnedCardMutation,
} = ownedCardsApiSlice
