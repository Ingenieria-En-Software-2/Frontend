export type Role = {
  id: number;
  description: string;
};

export type User = {
  id: number;
  login: string;
  password: string;
  name: string;
  lastname: string;
  user_type: string;
  role_id: number;
};

export type QueryParams = {
  page_size?: number;
  page_number?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
};

export type QueryParamsUser =
  | (Omit<QueryParams, "sort_by"> &
      Partial<Omit<User, "password">> & {
        sort_by?: keyof Omit<User, "password">;
      })
  | undefined;

export type QueryParamsRole = (Omit<QueryParams, "sort_by"> & { sort_by?: keyof Role }) | undefined;

export type UpdateRoleParams = Partial<Omit<Role, "id">> & Pick<Role, "id">;
export type UpdateUserParams = Partial<Omit<User, "id">> & Pick<User, "id">;
