import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PaginatedApiObject,
  RoleQueryParams,
  UserQueryParams,
  Role,
  UpdateRoleParams,
  UpdateUserParams,
  User,
  Transaction,
  TransactionQueryParams,
} from "./types";

export const dbApi = createApi({
  reducerPath: "dbApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["User", "Role", "Transaction"],
  endpoints: (builder) => ({
    // User Api
    // Get users by query params
    getUsers: builder.query<PaginatedApiObject & { items: User[] }, UserQueryParams>({
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
    updateUser: builder.mutation<number, UpdateUserParams>({
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
    getRoles: builder.query<PaginatedApiObject & { items: Role[] }, RoleQueryParams>({
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
    updateRole: builder.mutation<Role, UpdateRoleParams>({
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

    // Transaction Api
    // Get transactions by query params
    getTransactionsByUser: builder.query<PaginatedApiObject & { items: Transaction[] }, void>({
      query: () => ({
        url: "user_transactions",
      }),
      providesTags: ["Transaction"],
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
  useGetTransactionsByUserQuery,
} = dbApi;
