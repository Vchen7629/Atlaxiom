import { apiSlice } from "../api/apiSlice";
import { logOut, setCredentials } from "../auth/authSlice";
import { LoginCredentials, LoginResponse, RefreshResponse } from "../auth/types";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginCredentials>({
            query: credentials => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials },
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("Login response data:", data); // ✅ Debug log
                    console.log("data.authenticated:", data.authenticated);
                    if (data.authenticated) {
                        console.log("Dispatching setCredentials...");
                        dispatch(setCredentials());
                    } else {
                        console.log("authenticated is false or undefined"); // ✅ Debug log
                    }
                } catch (err) {
                    console.error('Login onQueryStarted error:', err);
                }
            }
        }),
        

        sendLogout: builder.mutation<LoginResponse, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: 'include',
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                dispatch(logOut())
                try {
                    await queryFulfilled
                    console.log("Logout successful");
                } catch (err) {
                    console.error('Logout failed:', err);
                }
            }
        }),

        refresh: builder.mutation<RefreshResponse, void>({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
                credentials: 'include' 
            }), 
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.sessionValid) {
                        dispatch(setCredentials())
                    }
                } catch (err) {
                    console.error('Refresh failed:', err)
                    dispatch(logOut())
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