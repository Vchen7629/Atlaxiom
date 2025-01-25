import { apiSlice } from "../../app/api/apiSlice";
import { logOut, resetLoggingOutState, setCredentials } from "./authSlice";
import { Refresh } from "./types";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<string, any>({
            query: credentials => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials },
                credentials: 'include',
            })
        }),
        

        sendLogout: builder.mutation<string, any>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted({ dispatch }) {
                try {
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                    dispatch(resetLoggingOutState());
                    console.log("logout")
                } catch (err) {
                    console.error("sendLogout onQueryStarted returned with error: ", err)
                }
            }
        }),

        refresh: builder.mutation<Refresh, void>({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
                credentials: 'include' 
            }), 
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken, userId, username } = data
                    dispatch(setCredentials({ accessToken, userId, username }))
                } catch (err) {
                    throw err
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 