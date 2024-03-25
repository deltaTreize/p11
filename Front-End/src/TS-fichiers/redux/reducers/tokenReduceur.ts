import { AuthActionTypes,  TokenState } from "../actions/typeAction";

const initialState: TokenState = {
  token: localStorage.token ? localStorage.token : null,
};

const tokenReducer = (state = initialState, action: AuthActionTypes): TokenState => {
  switch (action.type) {
    case "TOKEN_ON":
      return {...state, token: action.payload.token};
      case "TOKEN_OFF":
      return { ...state, token: null };
    default:
      return state;
  }
};

export default tokenReducer;
