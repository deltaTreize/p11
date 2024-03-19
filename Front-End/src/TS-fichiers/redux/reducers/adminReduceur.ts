import { ADMIN, NOT_ADMIN, AuthActionTypes, AdminState } from "../actions/typeAction";

const initialState: AdminState = {
  isAdmin: localStorage.id === "65e580d07d663d473c1b5047" ? true : false,
};

const adminReducer = (state = initialState, action: AuthActionTypes): AdminState => {
  switch (action.type) {
    case ADMIN:
      return {
        ...state,
        isAdmin: true,
      };
    case NOT_ADMIN:
      return {
        ...state,
        isAdmin: false,
      };
    default:
      return state;
  }
};
export default adminReducer;
