export type Id = {
    id?: string;
    _id?: string
}

export type GetUserResponse = {
    id: string;
    _id: string;
    image_url: string;
    desc: string
}

export type UserData = {
    active: boolean;
    creation: string;
    email: string;
    id: string;
    lastAdded: string;
    lastCardUpdated: string;
    lastDeleted: string;
    lastUsernameUpdated: string;
    totalOwnedCards: number;
    totalOwnedDecks: number;
    uniqueCards: number;
    username: string;
    __v: number;
    _id: string;
    ids?: string
}