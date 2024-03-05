import { combineReducers } from "redux";
import  userReduceur  from "./userReduceur";
import  loggedReduceur  from "./loggedReduceur";
import tokenReduceur from "./tokenReduceur";
import adminReduceur from "./adminReduceur";

const allReduceur = combineReducers({
  user : userReduceur,
  isLogged : loggedReduceur,
  token: tokenReduceur,
  admin: adminReduceur 
})

export default allReduceur;