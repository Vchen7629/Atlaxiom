import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";
import { LoginCredentials, LoginResponse, Refresh } from "./types";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginCredentials>({
            query: credentials => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials },
                credentials: 'include',
            })
        }),
        

        sendLogout: builder.mutation<string, Record<string, never>>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled; 
                dispatch(logOut());
            }
        }),

        refresh: builder.mutation<Refresh, void>({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
                credentials: 'include' 
            }), 
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled
                const { accessToken, userId, username } = data
                dispatch(setCredentials({ accessToken, userId, username }))
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 