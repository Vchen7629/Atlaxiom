import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"
import { GetOwnedCardsResponse } from "./types/ownedcardtypes";
import { invalidatesTags } from "./types/decktypes";

const ownedCardsAdapter = createEntityAdapter({}) 

const initialState = ownedCardsAdapter.getInitialState()

export const ownedCardsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        AddNewOwnedCard: builder.mutation<string, { CardData: any }>({
            query: ({ CardData }) => ({
              url: `/card`,
              method: 'POST',
              body: CardData,
            }),
            invalidatesTags: [{ type: 'OwnedCards', id: 'LIST' }]  
        }),

        getOwnedCards: builder.query<GetOwnedCardsResponse[], void>({
            query: () => ({
                url: `/card`,
                method: 'GET',
            }),
            transformResponse: (responseData: { ownedCards: GetOwnedCardsResponse[]}): GetOwnedCardsResponse[] => {
                const updatedCards = ownedCardsAdapter.upsertMany(initialState, responseData.ownedCards.map(card => ({ ...card, id: card._id })));
                return updatedCards.ids.map(id => updatedCards.entities[id]) as GetOwnedCardsResponse[]
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: 'OwnedCards', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'OwnedCard', id }))
                    ]
                } else return [{ type: 'OwnedCards', id: 'LIST' }]
            }
        }),

        IncreaseOwnedCard: builder.mutation<string, { CardData: { card_name: string, increaseOwnedAmount: number } }>({
            query: ({ CardData }) => ({
                url: `/card/increasecard`,
                method: 'PATCH',
                body: CardData,
                credentials: 'include'
            }),
            invalidatesTags: [{ type: 'OwnedCards', id: 'LIST' }]  
        }),

        DecreaseOwnedCard: builder.mutation<string, { CardData: { card_name: string, decreaseOwnedAmount: number } }>({
            query: ({ CardData }) => ({
                url: `/card/decreasecard`,
                method: 'PATCH',
                body: CardData,
                credentials: 'include'
            }), 
            invalidatesTags: [{ type: 'OwnedCards', id: 'LIST' }]  
        }),

        DeleteOwnedCard: builder.mutation<string, { CardData: { card_name: string } }>({
            query: ({ CardData }) => ({
                url: `/card/`,
                method: 'DELETE',
                body: CardData
            }),
            invalidatesTags: [{ type: 'OwnedCards', id: 'LIST' }]  
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
