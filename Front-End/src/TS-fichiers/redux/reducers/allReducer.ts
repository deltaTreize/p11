import { combineReducers } from "redux";
import tokenReducer from "./tokenReduceur";
import userReducer from "./userReduceur";

const allReducer = combineReducers({
  user : userReducer,
  token: tokenReducer,
})

export default allReducer;