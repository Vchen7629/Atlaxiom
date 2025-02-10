import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./auth/authSlice"
import { lambdaEmailApiSlice } from "./lambdas/lambda.ts";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [lambdaEmailApiSlice.reducerPath]: lambdaEmailApiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(apiSlice.middleware)
        .concat(lambdaEmailApiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)