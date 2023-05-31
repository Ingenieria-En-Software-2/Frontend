export type PaginatedApiObject = {
  item_count: number;
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  total_items: number;
};

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

export type UserApiObject = {
  item_count: number;
  items: User[];
  next_page: number | null;
  previous_page: number | null;
  total_pages: number;
  total_items: number;
};

export type QueryParams = {
  page_size?: number;
  page_number?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
};

export type UserQueryParams =
  | (Omit<QueryParams, "sort_by"> &
      Partial<Omit<User, "password">> & {
        sort_by?: keyof Omit<User, "password">;
      })
  | undefined;

export type RoleQueryParams = (Omit<QueryParams, "sort_by"> & { sort_by?: keyof Role }) | undefined;

export type UpdateRoleParams = Partial<Omit<Role, "id">> & Pick<Role, "id">;
export type UpdateUserParams = Partial<Omit<User, "id">> & Pick<User, "id">;
