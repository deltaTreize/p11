import { AuthActionTypes, IS_LOGIN, IS_LOGOUT, LoggedState } from "../actions/typeAction";

const initialState: LoggedState = {
  isLoggedIn: localStorage.token ? true : false,
};

const loggedReducer = (state = initialState, action: AuthActionTypes): LoggedState => {
  switch (action.type) {
    case IS_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };
    case IS_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default loggedReducer;