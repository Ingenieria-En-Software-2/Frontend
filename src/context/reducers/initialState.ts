import { AppContextInterface } from "types/appContext.type";

const initialState: AppContextInterface = {
  auth: {
    auth_token: "",
    refresh_token: "",
  },
  user: {
    id: -1,
    name: "",
    lastname: "",
    login: "",
    role_id: -1,
    user_type: "",
  },
};

export default initialState;
