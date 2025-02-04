import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"
import { GetOwnedCardsResponse } from "./types/ownedcardtypes";
import { invalidatesTags } from "./types/decktypes";

const ownedCardsAdapter = createEntityAdapter({}) 

const initialState = ownedCardsAdapter.getInitialState()

export const ownedCardsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        AddNewOwnedCard: builder.mutation<string, { id: string; CardData: any }>({
            query: ({ id, CardData }) => ({
              url: `/card/${id}`,
              method: 'POST',
              body: CardData,
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'OwnedCards', id: arg.id }
            ],
            
        }),

        getOwnedCards: builder.query<GetOwnedCardsResponse[], string>({
            query: (id) => ({
                url: `/card/${id}`,
                method: 'GET',
            }),
            transformResponse: (responseData: { ownedCards: GetOwnedCardsResponse[]}): GetOwnedCardsResponse[] => {
                const updatedCards = ownedCardsAdapter.upsertMany(initialState, responseData.ownedCards.map(card => ({ ...card, id: card._id })));
                console.log(updatedCards)
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

        IncreaseOwnedCard: builder.mutation<string, { id: string; CardData: { card_name: string, increaseOwnedAmount: number } }>({
            query: ({ id, CardData }) => ({
                url: `/card/increasecard/${id}`,
                method: 'PATCH',
                body: CardData,
                credentials: 'include'
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        }),

        DecreaseOwnedCard: builder.mutation<string, { id: string; CardData: { card_name: string, decreaseOwnedAmount: number } }>({
            query: ({ id, CardData }) => ({
                url: `/card/decreasecard/${id}`,
                method: 'PATCH',
                body: CardData,
                credentials: 'include'
            }), 
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        }),

        DeleteOwnedCard: builder.mutation<string, { id: string; CardData: { card_name: string } }>({
            query: ({ id, CardData }) => ({
                url: `/card/${id}`,
                method: 'DELETE',
                body: CardData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
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
