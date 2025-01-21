import { createSlice } from "@reduxjs/toolkit";
import { token, userId, username } from "./types";


const authSlice = createSlice({
    name: "auth",
    initialState: { token: null, userId: null, username: null }, 
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, userId, username } = action.payload
            state.token = accessToken
            state.userId = userId
            state.username = username
        },

        logOut: (state) => {
            state.token = null
            state.userId = null
            state.username = null
        },
    }
})

export const { setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: token) => state.auth.token
export const selectCurrentuserId = (state: userId) => state.auth.userId
export const selectCurrentUsername = (state: username) => state.auth.username;

