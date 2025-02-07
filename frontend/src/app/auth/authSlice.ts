import { createSlice } from "@reduxjs/toolkit";
import { email, token, userId, username } from "./types";


const authSlice = createSlice({
    name: "auth",
    initialState: { token: null, userId: null, email: null, username: null, loggingOut: false }, 
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, userId, email, username } = action.payload
            state.token = accessToken
            state.userId = userId
            state.username = username
            state.email = email
            state.loggingOut = false;
        },

        logOut: (state) => {
            state.token = null
            state.userId = null
            state.username = null
            state.email = null
            state.loggingOut = true;
        },

        resetLoggingOutState: (state) => {
            state.loggingOut = false; 
        }
    }
})

export const { setCredentials, logOut, resetLoggingOutState } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: token) => state.auth.token
export const selectCurrentuserId = (state: userId) => state.auth.userId
export const selectCurrentEmail = (state: email) => state.auth.email;
export const selectCurrentUsername = (state: username) => state.auth.username;
export const selectLoggingOut = (state: { auth: { loggingOut: boolean }}) => state.auth.loggingOut;


