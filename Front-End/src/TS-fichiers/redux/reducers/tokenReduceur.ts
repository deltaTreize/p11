import { AuthActionTypes, TOKEN_ON, TOKEN_OFF, TokenState } from "../actions/typeAction";

const initialState: TokenState = {
	token: localStorage.token || "",
};

const tokenReducer = (state = initialState, action: AuthActionTypes): TokenState => {
  switch (action.type) {
    case TOKEN_ON:
      return {
        ...state,
        token: state.token,
      };
    case TOKEN_OFF:
      return {
        ...state,
        token: "",
      };
    default:
      return {
        ...state,
        token: "",
      };
  }
};

export default tokenReducer;