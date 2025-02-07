import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth/authSlice"
import { lambdaApiSlice } from "./lambdas/lambda.ts";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [lambdaApiSlice.reducerPath]: lambdaApiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(lambdaApiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)