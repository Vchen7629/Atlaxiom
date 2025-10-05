import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { 
        isAuthenticated: false,
        isLoggingOut: false 
    }, 
    reducers: {
        setCredentials: (state) => {
            state.isAuthenticated = true;
        },

        logOut: (state) => {
            state.isAuthenticated = false;
            state.isLoggingOut = false;
        },
        setLoggingOut: (state) => {
            state.isLoggingOut = true;
        }
    }
})

export const { setCredentials, logOut, setLoggingOut } = authSlice.actions

export default authSlice.reducer

export const selectIsAuthenticated = (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated;
export const selectIsLoggingOut = ( state: { auth: { isLoggingOut: boolean}} ) => state.auth.isLoggingOut;


