import { apiSlice } from "../api/apiSlice"

export const googleOauthSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        googleLogin: builder.mutation<any, any>({
            query: (tokenResponse) => ({
                url: "/google/auth/login/success",
                method: "POST",
                body: { access_token: tokenResponse.access_token },
                credentials: 'include'
            }),
        })
    })
})

export const { useGoogleLoginMutation } = googleOauthSlice;