import { combineReducers } from "redux";
import  userReducer  from "./userReduceur";
import  loggedReducer  from "./loggedReducer";
import tokenReducer from "./tokenReduceur";
import adminReducer from "./adminReduceur";

const allReducer = combineReducers({
  user : userReducer,
  isLogged : loggedReducer,
  token: tokenReducer,
  admin: adminReducer 
})

export default allReducer;