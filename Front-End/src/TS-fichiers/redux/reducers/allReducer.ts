import { combineReducers } from "redux";
import   userReducer   from "./userReduceur";
// import  loggedReducer  from "./loggedReducer";
import tokenReducer from "./tokenReduceur";

const allReducer = combineReducers({
  user : userReducer,
  token: tokenReducer,
})

export default allReducer;