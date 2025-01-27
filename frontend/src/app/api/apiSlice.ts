import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../auth/authSlice.ts'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.atlaxiom.com:8443',
    credentials: 'include',
    prepareHeaders: (headers, { getState }: any) => {
        const token = getState().auth.token 

        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithReauth = async (args: any, api: any) => {
    console.log("Request arguments:", args);
    let result = await baseQuery(args, api, { credentials: "include" })

    if (result?.error?.status === 403 ) {
        // send refresh token to get new access token
        const refreshResult = await baseQuery('/auth/refresh', api, { credentials: "include" })


        if (refreshResult?.data) {
            //store the new token
            api.dispatch(setCredentials({ ...refreshResult.data}))

            //retry original query with new accesstoken
            result = await baseQuery(args, api, { credentials: "include" })
        } else {
            if (refreshResult?.error?.status === 403) {
                (refreshResult.error.data as {message: string }).message = "Your login has expired. "
            }
            return refreshResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['OwnedCards', 'Deck', 'User'],
    endpoints: () => ({})
})

