import { apiSlice } from "../api/apiSlice"
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
        
        GetSpecificUser: builder.query<UserData | null, void>({
            query: () => ({
                url: `/user`,
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

        updateUser: builder.mutation<string, { userData: { username?: string, password?: string, email?: string } }>({
            query: ({ userData }) => ({
                url: `/user`,
                method: 'PATCH',
                body: userData
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }]
        }),

        deleteUser: builder.mutation<string, void>({
            query: () => ({
                url: `/user`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'User', id: 'LIST' }]
        }),
    }),
})

export const { 
    useGetSpecificUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice
