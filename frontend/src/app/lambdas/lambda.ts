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
            transformErrorResponse: (response: { status: number; data: any }) => {
                return {
                  message: 'Error sending email',
                  error: response.data?.message || 'Unknown error occurred'
                };
            },
            transformResponse: (responseData: unknown): ContactLambdaResponse => {
                if (typeof responseData === 'string') {
                  try {
                    responseData = JSON.parse(responseData);
                  } catch (e) {
                    console.error('Error parsing response:', e);
                    return {
                      message: 'Error parsing response',
                      error: 'Invalid JSON response'
                    };
                  }
                }
                const response = responseData as any;
                    return {
                    message: response.message || response.data?.message || 'Success',
                    error: response.error,
                    data: response.data
                };
            },
        })
    })
})

export const { useSendContactEmailMutation } = lambdaApiSlice;