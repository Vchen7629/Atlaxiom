import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice.js"

const DeckAdapter = createEntityAdapter({})

const initialState = DeckAdapter.getInitialState()

export const deckApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createNewDeck: builder.mutation<any, any >({
            query: (data) => ({
                url: '/deck',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),
    
        createDuplicateDeck: builder.mutation<string, { id: string; deckId: string }>({
            query: ({ id, deckId }) => ({
                url: `/deck/duplicate/${id}`,
                method: 'POST',
                body: {
                    deckId
                },
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        getAllOwnedDecks: builder.query<EntityState<any>, string>({
            query: (id) => ({
                url: `/deck/${id}`,
                method: "GET",
            }),
            transformResponse: (responseData: any) => {
                return DeckAdapter.upsertOne(initialState, { ...responseData, id: responseData._id });
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: 'Deck', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Deck', id }))
                    ]
                } else return [{ type: 'Deck', id: 'LIST' }]
            }
        }),

        getSpecificOwnedDeck: builder.query<EntityState<any>, { id: string; DeckId: string}>({
            query: ({ id, DeckId }) => ({
                url: `/deck/specific/${id}/${DeckId}`,
                method: "GET",
            }),
            transformResponse: (responseData: any) => {
                return DeckAdapter.upsertOne(initialState, { ...responseData, id: responseData._id });
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: 'Deck', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'Deck', id }))
                    ]
                } else return [{ type: 'Deck', id: 'LIST' }]
            }
        }),

        makeDeckFavorite: builder.mutation<string, { id: string, deckId: string }>({
            query: ({ id, deckId }) => ({
                url: `deck/favorite/${id}`,
                method: "PATCH",
                body: {
                    deckId,
                }
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        addCardsMainDeck: builder.mutation<string, { id: string, deckId: string, main_deck_cards: { main_deck_cards: any } }>({
            query: ({ id, deckId, main_deck_cards }) => ({
                url: `/deck/maindeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    main_deck_cards
                },
                credentials: 'include',
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinMainDeck: builder.mutation<string, { id: string, DeckData: any }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),


        addNewCardtoExtraDeck: builder.mutation<string, { id: string, deckId: string, extra_deck_cards: any }>({
            query: ({ id, deckId, extra_deck_cards }) => ({
                url: `/deck/extradeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    extra_deck_cards
                }
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinExtraDeck: builder.mutation<string, { id: string, DeckData: any }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),


        addNewCardtoSideDeck: builder.mutation<string, { id: string, deckId: string, side_deck_cards: any }>({
            query: ({ id, deckId, side_deck_cards }) => ({
                url: `/deck/sidedeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    side_deck_cards
                }
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinSideDeck: builder.mutation<string, { id: string, DeckData: any }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        deleteCardfromMainDeck: builder.mutation<string, { id: string, DeckData: any }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteCardfromExtraDeck: builder.mutation<string, { id: string, DeckData: any }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteCardfromSideDeck: builder.mutation<string, { id: string, DeckData: any }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (arg: any) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteDeck: builder.mutation<string, { id: string, DeckData: any }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (arg: any) => [
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
    useMakeDeckFavoriteMutation,
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