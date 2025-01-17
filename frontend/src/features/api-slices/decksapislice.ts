import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice.js"

const DeckAdapter = createEntityAdapter({})

const initialState = DeckAdapter.getInitialState()

export const deckApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createNewDeck: builder.mutation({
            query: (data) => ({
                url: '/deck',
                method: 'POST',
                body: data,
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),
        
        createDuplicateDeck: builder.mutation({
            query: ({ id, deckId }) => ({
                url: `/deck/duplicate/${id}`,
                method: 'POST',
                body: {
                    deckId
                },
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
            query: ({ id, DeckId }) => ({
                url: `/deck/specific/${id}/${DeckId}`,
                method: "GET",
            }),
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

        addCardsMainDeck: builder.mutation({
            query: ({ id, deckId, main_deck_cards }) => ({
                url: `/deck/maindeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    main_deck_cards
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinMainDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),


        addNewCardtoExtraDeck: builder.mutation({
            query: ({ id, deckId, extra_deck_cards }) => ({
                url: `/deck/extradeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    extra_deck_cards
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinExtraDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),


        addNewCardtoSideDeck: builder.mutation({
            query: ({ id, deckId, side_deck_cards }) => ({
                url: `/deck/sidedeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    side_deck_cards
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinSideDeck: builder.mutation({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/update/${id}`,
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
    useCreateDuplicateDeckMutation,
    useGetSpecificOwnedDeckQuery,
    useAddCardsMainDeckMutation,
    useAddNewCardtoExtraDeckMutation,
    useAddNewCardtoSideDeckMutation,
    useModifyCardAmountinMainDeckMutation,
    useModifyCardAmountinExtraDeckMutation,
    useModifyCardAmountinSideDeckMutation,
    useDeleteCardfromMainDeckMutation,
    useDeleteCardfromExtraDeckMutation,
    useDeleteCardfromSideDeckMutation,
    useDeleteDeckMutation
} = deckApiSlice