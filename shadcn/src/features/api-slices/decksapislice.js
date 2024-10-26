import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const DeckAdapter = createEntityAdapter({})

const initialState = DeckAdapter.getInitialState()

export const deckApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createNewDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/${id}`,
                method: 'POST',
                body: DeckData,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        getAllOwnedDecks: builder.query({
            query: (id) => `/deck/${id}`,
            method: "GET",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                return DeckAdapter.upsertOne(initialState, { ...responseData, id: responseData._id });
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Deck', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Deck', id }))
                    ]
                } else return [{ type: 'Deck', id: 'LIST' }]
            }
        }),

        getSpecificOwnedDeck: builder.query({
            query: (id) => `/deck/specific/${id}`,
            method: "GET",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData) => {
                return DeckAdapter.upsertOne(initialState, { ...responseData, id: responseData._id });
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Deck', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Deck', id }))
                    ]
                } else return [{ type: 'Deck', id: 'LIST' }]
            }
        }),

        addNewCardtoMainDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        increaseCardAmountinMainDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/increase/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        decreaseCardAmountinMainDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/decrease/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        addNewCardtoExtraDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        increaseCardAmountinExtraDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/increase/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        decreaseCardAmountinExtraDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/decrease/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        addNewCardtoSideDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        increaseCardAmountinSideDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/increase/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        decreaseCardAmountinSideDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/decrease/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        deleteCardfromMainDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteCardfromExtraDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteCardfromSideDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id}
            ]
        })
    })

})

export const {
    useGetAllOwnedDecksQuery,
    useCreateNewDeckMutation,
    useGetSpecificOwnedDeckQuery,
    useAddNewCardtoMainDeckMutation,
    useAddNewCardtoExtraDeckMutation,
    useAddNewCardtoSideDeckMutation,
    useIncreaseCardAmountinMainDeckMutation,
    useIncreaseCardAmountinExtraDeckMutation,
    useIncreaseCardAmountinSideDeckMutation,
    useDecreaseCardAmountinMainDeckMutation,
    useDecreaseCardAmountinExtraDeckMutation,
    useDecreaseCardAmountinSideDeckMutation,
    useDeleteCardfromMainDeckMutation,
    useDeleteCardfromExtraDeckMutation,
    useDeleteCardfromSideDeckMutation,
    useDeleteDeckMutation
} = deckApiSlice