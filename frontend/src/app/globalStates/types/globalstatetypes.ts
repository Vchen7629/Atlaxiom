export type RefetchCardState = {
    cardRefetch: boolean;
    setCardRefetch: (value: boolean) => void;
}

export type GlobalCardStateProviderProps = {
    children: React.ReactNode;
}

export type RefetchDeckState = {
    deckRefetch: boolean;
    setDeckRefetch: (value: boolean) => void;
}

export type GlobalDeckStateProviderProps = {
    children: React.ReactNode;
}
