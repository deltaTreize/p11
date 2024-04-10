import { AuthActionTypes,  TokenState } from "../actions/typeAction";

const initialState: TokenState = {
  token: localStorage.token ? localStorage.token : "",
};

const tokenReducer = (state = initialState, action: AuthActionTypes): TokenState => {
  switch (action.type) {
    case "TOKEN_ON":
      return {...state, token: action.payload.token};
      case "TOKEN_OFF":
      return { ...state, token: "" };
    default:
      return state;
  }
};

export default tokenReducer;
