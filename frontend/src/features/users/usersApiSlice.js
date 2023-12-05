import { createSelector, createEntityAdapter} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({
    selectId: (entityArray) => {
        // Check if the entityArray is defined and has elements
        if (entityArray && entityArray.length > 0) {
          const firstEntity = entityArray[0];
          // Check if the first entity is defined and has a id property
          if (firstEntity && firstEntity.id) {
            return firstEntity.id;
          }
        }
    
        // Return a default value if the entityArray or card_name is undefined
        return 'defaultId';
      },
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                console.log('Response Data:', responseData);
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                });
                const entities = loadedUsers.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {});
            
                return { ids: loadedUsers.map(user => user.id), entities };
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),

        GetSpecificUser: builder.query({
            query: (userId) => `/users/${userId}`,
            method: "GET",
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: (responseData, username) => {
                console.log('Response Data:', responseData);
                console.log('Current USERNAME:', username);
                if (Array.isArray(responseData)) {
                    const loadedUsers = responseData.map(user => {
                        return user
                    });
                    return usersAdapter.setAll(initialState, loadedUsers)
                } else if (responseData && typeof responseData === 'object') {
                    // Handle the case where responseData is an object (single user)
                    responseData.id = responseData._id;
                    return usersAdapter.upsertOne(initialState, responseData);
                  } else {
                    // Handle other cases, e.g., responseData is undefined or not an array/object
                    return initialState;
                  }
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),

       addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/user/newuser',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),

        updateUser: builder.mutation({
            query: ({ id, userData }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: userData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),

        deleteUser: builder.mutation({
            query: ({ id, userData }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
                body: userData
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const { 
    useGetUsersQuery,
    useGetSpecificUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

//method for select all users for a admin account
    // returns the query result object
    export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

    // creates memoized selector
    const selectUsersData = createSelector(
        selectUsersResult,
        usersResult => usersResult.data // normalized state object with ids & entities
    )

    //getSelectors creates these selectors and we rename them with aliases using destructuring
    export const {
        selectAll: selectAllUsers, // returns an array for all users
        selectById: selectUserById, //Retrieves a user object with that id
        selectIds: selectUserIds // returns an array of all user ids
        // Pass in a selector that returns the users slice of state
    } = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)