import { apiSlice } from "../api/apiSlice"
import { invalidatesTags } from "./types/decktypes";
import { UserData } from "./types/usertypes";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        addNewUser: builder.mutation<string, { username: string, email: string, password: string,}>({
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
        
        GetSpecificUser: builder.query<UserData | null, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
            }),
            transformResponse: (responseData: UserData) => {
                if (responseData && typeof responseData === 'object' && "_id" in responseData) {
                    return responseData;
                }
                return null;
            },
            providesTags: (result: UserData | null | undefined) => {
                if (result?.ids) {
                    return [{ type: 'User', id: result._id }];
                }
                return [];
            }
        }),

        updateUser: builder.mutation<string, { id: string; userData: { username?: string, password?: string, email?: string } }>({
            query: ({ id, userData }) => ({
                url: `/users/${id}`,
                method: 'PATCH',
                body: userData
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'User', id: arg.id }
            ]
        }),

        deleteUser: builder.mutation<string, { id: string }>({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, arg: invalidatesTags) => [
                { type: 'User', id: arg.id }
            ]
        }),
    }),
})

export const { 
    useGetSpecificUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice
