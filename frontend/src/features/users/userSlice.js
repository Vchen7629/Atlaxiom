import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: { username: null, password: null}, // Initial state for users
  reducers: {
    setUsersData: (state, action) => {
        if (action.payload) {
            const { username } = action.payload;
            state.username = username;
            console.log("action payload was successful")
        } else {
            console.log("error fetching action payload")
        }
    },

    UsersDataLogout: (state, action) => {
        state.username = null
        state.password = null
    }
  },
});

export const { setUsersData, UsersDataLogout } = usersSlice.actions;

export default usersSlice.reducer;

export const selectCurrentUsername = (state) => state.users.username;
export const selectCurrentPassword = (state) => state.users.password;


