import { createEntityAdapter, EntityState} from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice"
import { Id } from "./types/usertypes";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewUser: builder.mutation<string, any>({
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
        
        getUsers: builder.query<EntityState<any>, string>({
            query: () => ({
                url: '/users',
                method: "GET",
            }),
            transformResponse: (responseData: any ) => {
                const loadedUsers = responseData.map((user: Id) => {
                    user.id = user._id
                    return user
                });
                const entities = loadedUsers.reduce((acc: any, user: any) => {
                    acc[user.id] = user;
                    return acc;
                }, {});
            
                return { ids: loadedUsers.map((user: any ) => user.id), entities };
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id: string) => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),

        GetSpecificUser: builder.query<EntityState<any>, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            transformResponse: (responseData) => {
                if (responseData && typeof responseData === 'object' && "_id" in responseData) {
                    return usersAdapter.upsertOne(initialState, { ...responseData, id: responseData._id });
                }
                return initialState;
            },
            providesTags: (result: any) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        }),

        updateUser: builder.mutation<string, { id: string; userData: { username?: string, password?: string, email?: string } }>({
            query: ({ id, userData }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: userData
            }),
            invalidatesTags: (arg: any) => [
                { type: 'User', id: arg.id }
            ]
        }),

        deleteUser: builder.mutation<string, { id: string }>({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (arg: any) => [
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
