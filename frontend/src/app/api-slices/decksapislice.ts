import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice.js"
import { DeckApiResponse, DeckInput, DeckOutput, invalidatesTags } from "./types/decktypes.js";
import { UpdatedCard } from "@/components/editdeckpagecomponents/types/buttontypes.js";

const DeckAdapter = createEntityAdapter({})

const initialState = DeckAdapter.getInitialState()

export const deckApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createNewDeck: builder.mutation<DeckOutput , DeckInput>({
            query: (data) => ({
                url: '/deck',
                method: 'POST',
                body: data
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
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
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        getAllOwnedDecks: builder.query<DeckApiResponse[], string>({
            query: (id) => ({
                url: `/deck/${id}`,
                method: "GET",
            }),
            transformResponse: (responseData: { ownedDecks: DeckApiResponse[]}): DeckApiResponse[] => {
                const updatedDecks = DeckAdapter.upsertMany(initialState, responseData.ownedDecks.map(deck => ({ ...deck, id: deck._id })));
                return updatedDecks.ids.map(id => updatedDecks.entities[id]) as DeckApiResponse[];
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

        getSpecificOwnedDeck: builder.query<DeckApiResponse | null, { id: string; DeckId: string}>({
            query: ({ id, DeckId }) => ({
                url: `/deck/specific/${id}/${DeckId}`,
                method: "GET",
            }),
            transformResponse: (responseData: DeckApiResponse[]) => {
                if (Array.isArray(responseData) && responseData.length > 0) {
                    return responseData[0];
                }
                return null;
            },
            providesTags: (result: DeckApiResponse | null | undefined) => {
                if (result?.id) {
                    return [{ type: 'Deck', id: result._id }]
                } 
                return []
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
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        addCardsMainDeck: builder.mutation<string, { id: string, deckId: string, main_deck_cards: UpdatedCard[] }>({
            query: ({ id, deckId, main_deck_cards }) => ({
                url: `/deck/maindeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    main_deck_cards
                },
                credentials: 'include',
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinMainDeck: builder.mutation<string, { id: string, DeckData: { deckId: string, cardUpdates: { card_name: string, modifyAmount: number }[] } }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),


        addNewCardtoExtraDeck: builder.mutation<string, { id: string, deckId: string, extra_deck_cards: UpdatedCard[] }>({
            query: ({ id, deckId, extra_deck_cards }) => ({
                url: `/deck/extradeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    extra_deck_cards
                }
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinExtraDeck: builder.mutation<string, { id: string, DeckData: { deckId: string, cardUpdates: { card_name: string, modifyAmount: number }[] } }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),


        addNewCardtoSideDeck: builder.mutation<string, { id: string, deckId: string, side_deck_cards: UpdatedCard[] }>({
            query: ({ id, deckId, side_deck_cards }) => ({
                url: `/deck/sidedeck/${id}`,
                method: 'PATCH',
                body: {
                    deckId,
                    side_deck_cards
                }
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        modifyCardAmountinSideDeck: builder.mutation<string, { id: string, DeckData: { deckId: string, cardUpdates: { card_name: string, modifyAmount: number }[] } }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/update/${id}`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id }
            ]
        }),

        deleteCardfromMainDeck: builder.mutation<string, { id: string, DeckData: { deckId: string, cardUpdates: { card_name: string }[] } }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/maindeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteCardfromExtraDeck: builder.mutation<string, { id: string, DeckData: { deckId: string, cardUpdates: { card_name: string }[] } }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/extradeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteCardfromSideDeck: builder.mutation<string, { id: string, DeckData: { deckId: string, cardUpdates: { card_name: string }[] } }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/sidedeck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'Deck', id: arg.id}
            ]
        }),

        deleteDeck: builder.mutation<string, { id: string, DeckData: { deckId: string } }>({
            query: ({ id, DeckData }) => ({
                url: `/deck/${id}`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
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