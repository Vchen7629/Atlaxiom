import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // eslint-disable-next-line
    tagTypes: ['OwnedCards', 'User'],
    endpoints: builder => ({})
})

