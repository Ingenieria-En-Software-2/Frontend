import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QueryParamsRole, QueryParamsUser, Role, User } from "./types";

export const dbApi = createApi({
  reducerPath: "dbApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["User", "Role"],
  endpoints: (builder) => ({
    // User Api
    // Get users by query params
    getUsers: builder.query<User[], QueryParamsUser>({
      query: (params) => ({
        url: "user",
        params,
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query<User, number>({
      query: (id) => `user/${id}`,
      providesTags: ["User"],
    }),
    createUser: builder.mutation<number, Omit<User, "id">>({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<number, User>({
      query: ({ id, ...body }) => ({
        url: `user/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    // Role Api
    // Get roles by query params
    getRoles: builder.query<Role[], QueryParamsRole>({
      query: (params) => ({
        url: "role",
        params,
      }),
      providesTags: ["Role"],
    }),
    getRoleById: builder.query<Role, number>({
      query: (id) => `role/${id}`,
      providesTags: ["Role"],
    }),
    createRole: builder.mutation<number, Omit<Role, "id">>({
      query: (body) => ({
        url: "role",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    updateRole: builder.mutation<Role, Role>({
      query: ({ id, ...body }) => ({
        url: `role/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Role"],
    }),
    deleteRole: builder.mutation<void, number>({
      query: (id) => ({
        url: `role/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = dbApi;
