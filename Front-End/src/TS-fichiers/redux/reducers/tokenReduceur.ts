import { AuthActionTypes, TOKEN_ON, TokenState } from "../actions/typeAction";

const initialState: TokenState = {
	token: localStorage.token ? localStorage.token : "",
};

const tokenReducer = (state = initialState, action: AuthActionTypes): TokenState => {
  switch (action.type) {
    case TOKEN_ON:
      return {...state, token: action.payload.token,}
    default:
      return {
        ...state
      };
  }
};

export default tokenReducer;