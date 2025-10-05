import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice.js"
import { DeckApiResponse, DeckOutput, DeleteCardFromDeckInput, ModifyCardInDeckInput } from "./types/decktypes.js";
import { UpdatedCard } from "@/features/decks/types/buttontypes.js";

const DeckAdapter = createEntityAdapter({})

const initialState = DeckAdapter.getInitialState()

export const deckApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createNewDeck: builder.mutation<DeckOutput , void>({
            query: () => ({
                url: '/deck',
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),
    
        createDuplicateDeck: builder.mutation<string, { deckId: string }>({
            query: ({ deckId }) => ({
                url: `/deck/duplicate/`,
                method: 'POST',
                body: {
                    deckId
                },
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        getAllOwnedDecks: builder.query<DeckApiResponse[], void>({
            query: () => ({
                url: `/deck`,
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

        getSpecificOwnedDeck: builder.query<DeckApiResponse | null, { DeckId: string}>({
            query: ({ DeckId }) => ({
                url: `/deck/specific/${DeckId}`,
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

        makeDeckFavorite: builder.mutation<string, { deckId: string }>({
            query: ({ deckId }) => ({
                url: `deck/favorite/`,
                method: "PATCH",
                body: {
                    deckId,
                }
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        addCardsMainDeck: builder.mutation<string, { deckId: string, main_deck_cards: UpdatedCard[] }>({
            query: ({ deckId, main_deck_cards }) => ({
                url: `/deck/maindeck/`,
                method: 'PATCH',
                body: {
                    deckId,
                    main_deck_cards
                },
                credentials: 'include',
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        modifyCardAmountinMainDeck: builder.mutation<string, ModifyCardInDeckInput>({
            query: ({ DeckData }) => ({
                url: `/deck/maindeck/update/`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),


        addNewCardtoExtraDeck: builder.mutation<string, { deckId: string, extra_deck_cards: UpdatedCard[] }>({
            query: ({ deckId, extra_deck_cards }) => ({
                url: `/deck/extradeck/`,
                method: 'PATCH',
                body: {
                    deckId,
                    extra_deck_cards
                }
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        modifyCardAmountinExtraDeck: builder.mutation<string, ModifyCardInDeckInput>({
            query: ({ DeckData }) => ({
                url: `/deck/extradeck/update/`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),


        addNewCardtoSideDeck: builder.mutation<string, { deckId: string, side_deck_cards: UpdatedCard[] }>({
            query: ({ deckId, side_deck_cards }) => ({
                url: `/deck/sidedeck/`,
                method: 'PATCH',
                body: {
                    deckId,
                    side_deck_cards
                }
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        modifyCardAmountinSideDeck: builder.mutation<string, ModifyCardInDeckInput>({
            query: ({ DeckData }) => ({
                url: `/deck/sidedeck/update/`,
                method: 'PATCH',
                body: DeckData
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        deleteCardfromMainDeck: builder.mutation<string, DeleteCardFromDeckInput>({
            query: ({ DeckData }) => ({
                url: `/deck/maindeck/`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        deleteCardfromExtraDeck: builder.mutation<string, DeleteCardFromDeckInput>({
            query: ({ DeckData }) => ({
                url: `/deck/extradeck/`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        deleteCardfromSideDeck: builder.mutation<string, DeleteCardFromDeckInput>({
            query: ({ DeckData }) => ({
                url: `/deck/sidedeck/`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
        }),

        deleteDeck: builder.mutation<string, { DeckData: { deckId: string } }>({
            query: ({ DeckData }) => ({
                url: `/deck/`,
                method: 'DELETE',
                body: DeckData
            }),
            invalidatesTags: [{ type: 'Deck', id: 'LIST' }]
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