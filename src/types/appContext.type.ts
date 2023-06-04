export interface Action {
  type: string;
  payload: any;
}

export interface AuthInterface {
  auth_token: string;
  refresh_token: string;
}

export interface UserInterface {
  id: number;
  login: string;
  name: string;
  lastname: string;
  user_type: string;
  role_id: number;
}

export interface AppContextInterface {
  user: UserInterface;
  auth: AuthInterface;
}
