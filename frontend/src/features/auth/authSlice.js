import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: { token: null, userId: null}, 
    reducers: {
        setCredentials: (state, action) => {
            const { accessToken, userId } = action.payload
            state.token = accessToken
            state.userId = userId
        },

        logOut: (state, action) => {
            state.token = null
            state.userId = null
        },
    }
})

export const { setCredentials, logOut} = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentuserId = (state) => state.auth.userId
