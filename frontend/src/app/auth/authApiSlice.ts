import { apiSlice } from "../api/apiSlice";
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

        refresh: builder.mutation<LoginResponse, void>({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
                credentials: 'include' 
            }), 
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log('Refresh response:', data)
                    dispatch(setCredentials({
                        accessToken: data.accessToken,
                        userId: data.userId,
                        username: data.username
                    }))
                } catch (err) {
                    console.error('Refresh onQueryStarted error:', err)
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