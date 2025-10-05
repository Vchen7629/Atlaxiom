import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../auth/authSlice.ts'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://pm87cq0tbe.execute-api.us-west-1.amazonaws.com',
    //baseUrl: 'http://localhost:3000',
    credentials: 'include',
})

const baseQueryWithReauth = async (args: any, api: any) => {
    let result = await baseQuery(args, api, { credentials: "include" })
    console.log(result)

    if (result?.error?.status === 403 ) {
        console.log("403 error, attempting refresh...")
        const refreshResult = await baseQuery('/auth/refresh', api, { credentials: "include" })

        if (refreshResult?.data) {
            console.log("Refresh successful, setting credentials")
            api.dispatch(setCredentials())
            result = await baseQuery(args, api, { credentials: "include" })
        } else {
            console.log("Refresh failed")
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

