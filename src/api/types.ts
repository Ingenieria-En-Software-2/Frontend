export type Role = {
  id: number;
  description: string;
}

export type User = {
  id: number;
  login: string;
  password: string;
  name: string;
  lastname: string;
  user_type: string;
  role_id: number;
}