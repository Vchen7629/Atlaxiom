import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ContactLambdaRequest, ContactLambdaResponse } from "./types";

export const lambdaApiSlice = createApi({
    reducerPath: "lambdaApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://h8eu5qryxj.execute-api.us-west-1.amazonaws.com/default",
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (builder) => ({
        sendContactEmail: builder.mutation<ContactLambdaResponse, ContactLambdaRequest>({
            query: (contactData) => ({
                url: "/Contact_form_Lambda",
                method: "POST",
                body: contactData,
            }),
        })
    })
})

export const { useSendContactEmailMutation } = lambdaApiSlice;