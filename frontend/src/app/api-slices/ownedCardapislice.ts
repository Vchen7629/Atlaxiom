import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"

const ownedCardsAdapter = createEntityAdapter<any>({
    selectId: (entityArray: any) => {
        // Check if the entityArray is defined and has elements
        if (entityArray && entityArray.length > 0) {
          const firstEntity = entityArray[0];
          // Check if the first entity is defined and has a card_name property
          if (firstEntity?.card_name) {
            return firstEntity.card_name;
          }
        }
    
        // Return a default value if the entityArray or card_name is undefined
        return 'defaultId';
      },
}) 

const initialState: EntityState<any> = ownedCardsAdapter.getInitialState()

export const ownedCardsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        AddNewOwnedCard: builder.mutation<string, { id: string; CardData: any }>({
            query: ({ id, CardData }) => ({
              url: `/card/${id}`,
              method: 'POST',
              body: CardData,
            }),
            invalidatesTags: (arg: any) => [
                { type: 'OwnedCards', id: arg.id }
            ],
            
        }),

        getOwnedCards: builder.query<EntityState<any>, string>({
            query: (id) => ({
                url: `/card/${id}`,
                method: 'GET',
            }),
            transformResponse: (responseData: any) => {
                return ownedCardsAdapter.upsertOne(initialState, { ...responseData, id: responseData._id });
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: 'OwnedCards', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'OwnedCard', id }))
                    ]
                } else return [{ type: 'OwnedCards', id: 'LIST' }]
            },
            
        }),

        IncreaseOwnedCard: builder.mutation<string, { id: string; CardData: { card_name: string, increaseOwnedAmount: number } }>({
            query: ({ id, CardData }) => ({
                url: `/card/increasecard/${id}`,
                method: 'PATCH',
                body: CardData,
                credentials: 'include'
            }),
            invalidatesTags: (arg: any) => [
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
            invalidatesTags: (arg: any) => [
                { type: 'OwnedCards', id: arg.id }
            ]
        }),

        DeleteOwnedCard: builder.mutation<string, { id: string; CardData: { card_name: string } }>({
            query: ({ id, CardData }) => ({
                url: `/card/${id}`,
                method: 'DELETE',
                body: CardData
            }),
            invalidatesTags: (arg: any) => [
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
