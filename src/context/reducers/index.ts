import { combineReducers } from "redux";
import { Action /*AuthInterface, UserInterface*/ } from "types/appContext.type";
import initialState from "./initialState";
import { dbApi } from "services/dbApi";

export const authenticateReducer = (state = initialState.auth, action: Action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export const userReducer = (state = initialState.user, action: Action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authenticateReducer,
  [dbApi.reducerPath]: dbApi.reducer,
});

export default rootReducer;
