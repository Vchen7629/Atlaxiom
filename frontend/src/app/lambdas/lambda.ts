import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactLambdaRequest, LambdaResponse, PasswordResetLambdaRequest, PasswordResetReqLambdaRequest, VerifyTokenLambdaRequest } from "./types";

export const lambdaEmailApiSlice = createApi({
    reducerPath: "lambdaContactApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3005",
        //baseUrl: "https://api.atlaxiom.com:2096",
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        sendContactEmail: builder.mutation<LambdaResponse, ContactLambdaRequest>({
            query: (contactData) => ({
                url: "/contact",
                method: "POST",
                body: contactData,
            }),
        }),
        sendPasswordResetEmail: builder.mutation<LambdaResponse, PasswordResetReqLambdaRequest>({
            query: (passwordData) => ({
                url: "/password/token",
                method: "POST",
                body: passwordData,
            }),
        }),
        verifyToken: builder.mutation<LambdaResponse, VerifyTokenLambdaRequest>({
            query: (tokenData) => ({
                url: "/password/validate-token",
                method: "PATCH",
                body: tokenData,
                credentials: 'include'
            })
        }),
        resetPassword: builder.mutation<LambdaResponse, PasswordResetLambdaRequest>({
            query: (passwordData) => ({
                url: "/password/reset",
                method: "POST",
                body: passwordData,
                credentials: "include"
            })
        })
    })
})

export const { 
    useSendContactEmailMutation,
    useSendPasswordResetEmailMutation, 
    useVerifyTokenMutation, 
    useResetPasswordMutation
} = lambdaEmailApiSlice;
